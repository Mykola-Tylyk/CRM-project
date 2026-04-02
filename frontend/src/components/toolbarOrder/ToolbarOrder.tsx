import "./ToolbarOrder.css";

import debounce from "lodash.debounce";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useAppSelector } from "../../redux/hooks/useAppSelector";

const ToolbarOrder = () => {
    const { user } = useAppSelector((state) => state.authSlice);
    const { groups } = useAppSelector((state) => state.orderSlice.orders);
    const [isStartDateFocused, setIsStartDateFocused] =
        useState<boolean>(false);
    const [query, setQuery] = useSearchParams();
    const [isEndFocused, setIsEndFocused] = useState<boolean>(false);

    const debouncedChange = useMemo(
        () =>
            debounce((key: string, value: string) => {
                const currentParams = Object.fromEntries(query.entries());
                let updatedParams = {
                    ...currentParams,
                    [key]: value,
                    page: "1",
                };

                Object.keys(updatedParams).forEach((paramKey) => {
                    if (
                        updatedParams[paramKey] === "" ||
                        updatedParams[paramKey] == null
                    ) {
                        delete updatedParams[paramKey];
                    }
                });

                setQuery(updatedParams);
            }, 500),
        [query, setQuery],
    );

    const normalizeDates = (start?: string | null, end?: string | null) => {
        const isValid = (d?: string | null) => {
            if (!d) return false;
            const date = new Date(d);
            return !isNaN(date.getTime());
        };

        let startDate = isValid(start) ? start! : "";
        let endDate = isValid(end) ? end! : "";

        if (startDate && endDate && startDate > endDate) {
            endDate = startDate;
        }

        return { startDate, endDate };
    };

    useEffect(() => {
        const rawStart = query.get("start_date");
        const rawEnd = query.get("end_date");

        const { startDate, endDate } = normalizeDates(rawStart, rawEnd);

        const currentParams = Object.fromEntries(query.entries());

        const updatedParams = {
            ...currentParams,
            start_date: startDate || undefined,
            end_date: endDate || undefined,
        };

        const cleanedParams = Object.fromEntries(
            Object.entries(updatedParams).filter(([, value]) => value),
        ) as Record<string, string>;

        if (rawStart !== startDate || rawEnd !== endDate) {
            setQuery(cleanedParams);
        }

        setFilters((prev) => ({
            ...prev,
            start_date: startDate,
            end_date: endDate,
        }));
    }, [query]);

    const handleChange = (key: string, value: string) => {
        debouncedChange(key, value);
    };

    const [filters, setFilters] = useState({
        name: "",
        surname: "",
        email: "",
        phone: "",
        age: "",
        course: "",
        course_format: "",
        course_type: "",
        status: "",
        group: "",
        start_date: "",
        end_date: "",
        my: false,
    });

    useEffect(() => {
        setFilters({
            name: query.get("name") || "",
            surname: query.get("surname") || "",
            email: query.get("email") || "",
            phone: query.get("phone") || "",
            age: query.get("age") || "",
            course: query.get("course") || "",
            course_format: query.get("course_format") || "",
            course_type: query.get("course_type") || "",
            status: query.get("status") || "",
            group: query.get("group") || "",
            my: query.get("my") === "true",
            start_date: query.get("start_date") || "",
            end_date: query.get("end_date") || "",
        });
    }, [query]);

    const handleReset = () => {
        setFilters({
            name: "",
            surname: "",
            email: "",
            phone: "",
            age: "",
            course: "",
            course_format: "",
            course_type: "",
            status: "",
            group: "",
            start_date: "",
            end_date: "",
            my: false,
        });
        setQuery({ page: "1", order: "-order_number" });
    };

    const handleExport = () => {
        const queryParams = new URLSearchParams();

        if (query.get("order")) {
            queryParams.set("order", query.get("order")!);
        } else {
            queryParams.set("order", "-_id");
        }

        if (query.get("name"))
            queryParams.set("searchName", query.get("name")!);

        if (query.get("surname"))
            queryParams.set("searchSurname", query.get("surname")!);

        if (query.get("email"))
            queryParams.set("searchEmail", query.get("email")!);

        if (query.get("phone"))
            queryParams.set("searchPhone", query.get("phone")!);

        if (query.get("age")) queryParams.set("searchAge", query.get("age")!);

        if (query.get("course"))
            queryParams.set("searchCourse", query.get("course")!);

        if (query.get("course_format"))
            queryParams.set("searchFormat", query.get("course_format")!);

        if (query.get("course_type"))
            queryParams.set("searchType", query.get("course_type")!);

        if (query.get("status"))
            queryParams.set("searchStatus", query.get("status")!);

        if (query.get("group"))
            queryParams.set("searchGroup", query.get("group")!);

        if (query.get("my") === "true" && user?._id) {
            queryParams.set("searchMy", user._id);
        }

        if (query.get("start_date"))
            queryParams.set("searchStartDate", query.get("start_date")!);

        if (query.get("end_date"))
            queryParams.set("searchEndDate", query.get("end_date")!);

        window.location.href = `/api/orders/export?${queryParams.toString()}`;
    };

    return (
        <div className={"div_wrapper__toolbar_order"}>
            <div className={"div_wrapper_search_input__toolbar_order"}>
                <div className={"div_wrapper_1_row__toolbar_order"}>
                    <input
                        type="text"
                        placeholder="Name"
                        className={"input_search__toolbar_order"}
                        value={filters.name}
                        onChange={(e) => {
                            const value = e.target.value;
                            setFilters({ ...filters, name: value });
                            handleChange("name", value);
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Surname"
                        className={"input_search__toolbar_order"}
                        value={filters.surname}
                        onChange={(e) => {
                            const value = e.target.value;
                            setFilters({ ...filters, surname: value });
                            handleChange("surname", value);
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Email"
                        className={"input_search__toolbar_order"}
                        value={filters.email}
                        onChange={(e) => {
                            const value = e.target.value;
                            setFilters({ ...filters, email: value });
                            handleChange("email", value);
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Phone"
                        className={"input_search__toolbar_order"}
                        value={filters.phone}
                        onChange={(e) => {
                            const value = e.target.value;
                            setFilters({ ...filters, phone: value });
                            handleChange("phone", value);
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Age"
                        className={"input_search__toolbar_order"}
                        value={filters.age}
                        onChange={(e) => {
                            const value = e.target.value;
                            setFilters({ ...filters, age: value });
                            handleChange("age", value);
                        }}
                    />
                    <select
                        className={"input_search__toolbar_order"}
                        value={filters.course}
                        onChange={(e) => {
                            const value = e.target.value;
                            setFilters({ ...filters, course: value });
                            handleChange("course", value);
                        }}
                    >
                        <option value="">all courses</option>
                        <option value="fs">FS</option>
                        <option value="qacx">QACX</option>
                        <option value="jcx">JCX</option>
                        <option value="jscx">JSCX</option>
                        <option value="fe">FE</option>
                        <option value="pcx">PCX</option>
                    </select>
                </div>
                <div className={"div_wrapper_2_row__toolbar_order"}>
                    <select
                        className={"input_search__toolbar_order"}
                        value={filters.course_format}
                        onChange={(e) => {
                            const value = e.target.value;
                            setFilters({ ...filters, course_format: value });
                            handleChange("course_format", value);
                        }}
                    >
                        <option value="">all formats</option>
                        <option value="static">static</option>
                        <option value="online">online</option>
                    </select>
                    <select
                        className={"input_search__toolbar_order"}
                        value={filters.course_type}
                        onChange={(e) => {
                            const value = e.target.value;
                            setFilters({ ...filters, course_type: value });
                            handleChange("course_type", value);
                        }}
                    >
                        <option value="">all types</option>
                        <option value="pro">pro</option>
                        <option value="minimal">minimal</option>
                        <option value="premium">premium</option>
                        <option value="incubator">incubator</option>
                        <option value="vip">vip</option>
                    </select>
                    <select
                        className={"input_search__toolbar_order"}
                        value={filters.status}
                        onChange={(e) => {
                            const value = e.target.value;
                            setFilters({ ...filters, status: value });
                            handleChange("status", value);
                        }}
                    >
                        <option value="">all statuses</option>
                        <option value="In work">In work</option>
                        <option value="New">New</option>
                        <option value="Agree">Agree</option>
                        <option value="Disagree">Disagree</option>
                        <option value="Dubbing">Dubbing</option>
                    </select>
                    <select
                        className={"input_search__toolbar_order"}
                        value={filters.group}
                        onChange={(e) => {
                            const value = e.target.value;
                            setFilters({ ...filters, group: value });
                            handleChange("group", value);
                        }}
                    >
                        <option value="">all groups</option>
                        {groups &&
                            groups.map((group) => (
                                <option key={group} value={group}>
                                    {group}
                                </option>
                            ))}
                    </select>
                    <input
                        type={
                            filters.start_date || isStartDateFocused
                                ? "date"
                                : "text"
                        }
                        placeholder="Start date"
                        className={"input_search__toolbar_order"}
                        onFocus={() => {
                            setIsStartDateFocused(true);
                        }}
                        onBlur={() => {
                            setIsStartDateFocused(false);
                        }}
                        value={filters.start_date}
                        max={filters.end_date || undefined}
                        onChange={(e) => {
                            const value = e.target.value;
                            setFilters({ ...filters, start_date: value });
                            handleChange("start_date", value);
                        }}
                    />
                    <input
                        type={
                            filters.end_date || isEndFocused ? "date" : "text"
                        }
                        placeholder="End date"
                        className={"input_search__toolbar_order"}
                        onFocus={() => {
                            setIsEndFocused(true);
                        }}
                        onBlur={() => {
                            setIsEndFocused(false);
                        }}
                        value={filters.end_date}
                        min={filters.start_date || undefined}
                        onChange={(e) => {
                            const value = e.target.value;
                            setFilters({ ...filters, end_date: value });
                            handleChange("end_date", value);
                        }}
                    />
                </div>
            </div>
            <div className={"div_wrapper_buttons__toolbar_order"}>
                <label className="custom-checkbox__toolbar_order">
                    <input
                        type="checkbox"
                        checked={query.get("my") === "true"}
                        onChange={(e) => {
                            handleChange("my", e.target.checked ? "true" : "");
                        }}
                    />
                    <span className="checkmark__toolbar_order"></span>
                    My
                </label>
                <button
                    className={"buttons__toolbar_order"}
                    onClick={() => handleReset()}
                >
                    <img src="/img/Reset.png" alt="Reset" />
                </button>
                <button
                    className={"buttons__toolbar_order"}
                    onClick={() => handleExport()}
                >
                    <img src="/img/Excel.png" alt="Excel" />
                </button>
            </div>
        </div>
    );
};

export { ToolbarOrder };

import "./ToolbarOrder.css";

import debounce from "lodash.debounce";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

const ToolbarOrder = () => {
    const [typeStartDate, setTypeStartDate] = useState<"text" | "date">("text");
    const [typeEndDate, setTypeEndDate] = useState<"text" | "date">("text");

    const [query, setQuery] = useSearchParams();

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

    const handleChange = (key: string, value: string) => {
        debouncedChange(key, value);
    };

    const [filters, setFilters] = useState({
        name: "",
        surname: "",
        email: "",
        phone: "",
        age: "",
    });

    const handleReset = () => {
        setFilters({ name: "", surname: "", email: "", phone: "", age: "" });
        setQuery({ page: "1" });
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
                        value={query.get("course") || ""}
                        onChange={(e) => handleChange("course", e.target.value)}
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
                        value={query.get("course_format") || ""}
                        onChange={(e) =>
                            handleChange("course_format", e.target.value)
                        }
                    >
                        <option value="">all formats</option>
                        <option value="static">static</option>
                        <option value="online">online</option>
                    </select>
                    <select
                        className={"input_search__toolbar_order"}
                        value={query.get("course_type") || ""}
                        onChange={(e) =>
                            handleChange("course_type", e.target.value)
                        }
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
                        value={query.get("status") || ""}
                        onChange={(e) => handleChange("status", e.target.value)}
                    >
                        <option value="">all statuses</option>
                        <option value="In work">In work</option>
                        <option value="New">New</option>
                        <option value="Aggre">Aggre</option>
                        <option value="Disaggre">Disaggre</option>
                        <option value="Dubbing">Dubbing</option>
                    </select>
                    <select
                        className={"input_search__toolbar_order"}
                        // value={query.get("course") || ""}
                        // onChange={(e) => handleChange("course", e.target.value)}
                    >
                        <option value="">all groups</option>
                        <option value="groups">groups</option>
                    </select>
                    <input
                        type={typeStartDate}
                        placeholder="Start date"
                        className={"input_search__toolbar_order"}
                        onFocus={() => setTypeStartDate("date")}
                        onBlur={(e) => {
                            if (!e.target.value) setTypeStartDate("text");
                        }}
                    />
                    <input
                        type={typeEndDate}
                        placeholder="End date"
                        className={"input_search__toolbar_order"}
                        onFocus={() => setTypeEndDate("date")}
                        onBlur={(e) => {
                            if (!e.target.value) setTypeEndDate("text");
                        }}
                    />
                </div>
            </div>
            <div className={"div_wrapper_buttons__toolbar_order"}>
                <label className="custom-checkbox__toolbar_order">
                    <input type="checkbox" />
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
                    onClick={() => handleReset()}
                >
                    <img src="/img/Excel.png" alt="Excel" />
                </button>
            </div>
        </div>
    );
};

export { ToolbarOrder };

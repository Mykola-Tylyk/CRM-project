import "./EditOrdersModal.css";

import { joiResolver } from "@hookform/resolvers/joi";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useAppDispatch } from "../../redux/hooks/useAppDispatch";
import { useAppSelector } from "../../redux/hooks/useAppSelector";
import { orderSliceActions } from "../../redux/slices/orderSlice/orderSlice";
import { OrdersValidator } from "../../validators/orders.validator";

type EditOrdersModalProps = {
    onClose: () => void;
    selectedOrderId: string | null;
};

type OrderFormSubmit = {
    name?: string;
    surname?: string;
    already_paid?: number | string;
    email?: string;
    phone?: string;
    age?: number | string;
    course?: string;
    course_format?: string;
    course_type?: string;
    status?: string;
    newGroup?: string;
    group?: string;
    sum?: number | string;
};

type NormalizedOrder = {
    _id: string;
    user_id: string;
    name?: string;
    surname?: string;
    already_paid?: number;
    email?: string;
    phone?: string;
    age?: number;
    course?: string;
    course_format?: string;
    course_type?: string;
    status: string;
    group?: string;
    sum?: number;
};

const EditOrdersModal: FC<EditOrdersModalProps> = ({
    onClose,
    selectedOrderId,
}) => {
    const { orders } = useAppSelector((state) => state.orderSlice);
    const { user } = useAppSelector((state) => state.authSlice);
    const dispatch = useAppDispatch();

    const [selectButton, setSelectButton] = useState<boolean>(false);
    const [arrGroups, setArrGroups] = useState<string[]>([]);

    useEffect(() => {
        if (orders.groups) {
            setArrGroups(orders.groups);
        }
    }, [orders.groups]);

    const {
        register,
        handleSubmit,
        reset,
        resetField,
        setValue,
        watch,
        formState: { errors },
    } = useForm<OrderFormSubmit>({
        mode: "all",
        resolver: joiResolver(OrdersValidator.edit),
        context: {
            groups: arrGroups,
        },
    });

    const watchedGroup = watch("newGroup");

    useEffect(() => {
        const currentOrder = orders.data.find(
            (order) => order._id === selectedOrderId,
        );

        reset({
            name: currentOrder?.name ?? "",
            surname: currentOrder?.surname ?? "",
            already_paid:
                currentOrder?.already_paid !== null &&
                currentOrder?.already_paid !== undefined
                    ? currentOrder.already_paid
                    : "",
            email: currentOrder?.email ?? "",
            phone: currentOrder?.phone ?? "",
            age:
                currentOrder?.age !== null && currentOrder?.age !== undefined
                    ? currentOrder.age
                    : "",
            course: currentOrder?.course ?? "",
            course_format: currentOrder?.course_format ?? "",
            course_type: currentOrder?.course_type ?? "",
            status:
                currentOrder?.status !== null &&
                currentOrder?.status !== undefined
                    ? currentOrder.status
                    : "in work",
            newGroup: "",
            group:
                currentOrder?.group !== null &&
                currentOrder?.group !== undefined
                    ? currentOrder.group
                    : "",
            sum:
                currentOrder?.sum !== null && currentOrder?.sum !== undefined
                    ? currentOrder.sum
                    : "",
        });
    }, [selectedOrderId]);

    const clickedOnAddAndSubmit = () => {
        if (!watchedGroup || errors.newGroup?.message) return;

        const newGroups = [...arrGroups, watchedGroup];
        setArrGroups(newGroups);

        setValue("group", watchedGroup);
        resetField("newGroup");
        setSelectButton(false);

        handleSubmit(customHandler)();
    };

    const clickedOnAdd = () => {
        if (!watchedGroup || errors.newGroup?.message) return;

        setArrGroups((prevState) => [...prevState, watchedGroup]);

        setValue("group", watchedGroup);
        setSelectButton(false);
        resetField("newGroup");
    };

    const clickedSelect = () => {
        if (errors.newGroup?.message) {
            resetField("newGroup");
        }

        setSelectButton(false);
    };

    const toNumber = (value?: number | string) =>
        value === "" || value === undefined ? undefined : Number(value);

    const normalizeOrder = (
        data: OrderFormSubmit,
        orderId: string,
        userId: string,
    ): NormalizedOrder => ({
        _id: orderId,
        user_id: userId,
        name: data.name,
        surname: data.surname,
        already_paid: toNumber(data.already_paid),
        email: data.email,
        phone: data.phone,
        age: toNumber(data.age),
        course: data.course,
        course_format: data.course_format,
        course_type: data.course_type,
        status: data.status!,
        group: data.group,
        sum: toNumber(data.sum),
    });

    const customHandler = async (formDataProps: OrderFormSubmit) => {
        if (!selectedOrderId) throw new Error("Order ID missing");
        if (!user?._id) throw new Error("User ID missing");
        if (!formDataProps.status) throw new Error("Status is required");

        const normalized = normalizeOrder(
            formDataProps,
            selectedOrderId,
            user._id,
        );

        try {
            const result = await dispatch(
                orderSliceActions.updateOrder(normalized),
            );

            if (result.meta.requestStatus === "fulfilled") {
                dispatch(orderSliceActions.setTrigger());
                onClose();
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className={"modal_overlay__edit_orders_modal"} onClick={onClose}>
            <div
                className={"modal_window__edit_orders_modal"}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={"modal_content__edit_orders_modal"}>
                    <form>
                        <div className={"div_input_wrapper__edit_orders_modal"}>
                            <div
                                className={
                                    "div_input_with_button__edit_orders_modal"
                                }
                            >
                                <label className={"label__edit_orders_modal"}>
                                    Group
                                    {selectButton ? (
                                        <input
                                            className={`input__edit_orders_modal ${errors.group?.message && "input_error__edit_orders_modal"}`}
                                            type="text"
                                            placeholder={"Group"}
                                            {...register("newGroup")}
                                        />
                                    ) : (
                                        <select
                                            className={`input__edit_orders_modal ${errors.group?.message && "input_error__edit_orders_modal"}`}
                                            {...register("group")}
                                        >
                                            <option value="">
                                                not selected
                                            </option>
                                            {arrGroups.map((g, i) => (
                                                <option key={i} value={g}>
                                                    {g}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                </label>
                                <div
                                    className={
                                        "div_wrapper_for_button_in_input__edit_orders_modal"
                                    }
                                >
                                    {selectButton ? (
                                        <>
                                            <button
                                                className={
                                                    "button_group__edit_orders_modal"
                                                }
                                                type={"button"}
                                                onClick={clickedOnAdd}
                                            >
                                                ADD
                                            </button>
                                            <button
                                                className={
                                                    "button_group__edit_orders_modal"
                                                }
                                                type={"button"}
                                                onClick={clickedSelect}
                                            >
                                                SELECT
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            className={
                                                "button_group__edit_orders_modal"
                                            }
                                            type={"button"}
                                            onClick={() =>
                                                setSelectButton(true)
                                            }
                                        >
                                            ADD GROUP
                                        </button>
                                    )}
                                </div>
                                {errors.group?.message && (
                                    <div
                                        className={
                                            "div_error_message__edit_orders_modal"
                                        }
                                    >
                                        {errors.group?.message}
                                    </div>
                                )}
                                {errors.newGroup?.message && (
                                    <div
                                        className={
                                            "div_error_message__edit_orders_modal"
                                        }
                                    >
                                        {errors.newGroup?.message}
                                    </div>
                                )}
                            </div>
                            <label className={"label__edit_orders_modal"}>
                                Status
                                <select
                                    className={`input__edit_orders_modal ${errors.status?.message && "input_error__edit_orders_modal"}`}
                                    {...register("status")}
                                >
                                    <option value="in work">In work</option>
                                    <option value="new">New</option>
                                    <option value="agree">Agree</option>
                                    <option value="disagree">Disagree</option>
                                    <option value="dubbing">Dubbing</option>
                                </select>
                                {errors.status?.message && (
                                    <div
                                        className={
                                            "div_error_message__edit_orders_modal"
                                        }
                                    >
                                        {errors.status?.message}
                                    </div>
                                )}
                            </label>
                        </div>
                        <div className={"div_input_wrapper__edit_orders_modal"}>
                            <label className={"label__edit_orders_modal"}>
                                Name
                                <input
                                    className={`input__edit_orders_modal ${errors.name?.message && "input_error__edit_orders_modal"}`}
                                    type="text"
                                    placeholder={"Name"}
                                    {...register("name")}
                                />
                                {errors.name?.message && (
                                    <div
                                        className={
                                            "div_error_message__edit_orders_modal"
                                        }
                                    >
                                        {errors.name?.message}
                                    </div>
                                )}
                            </label>
                            <label className={"label__edit_orders_modal"}>
                                Sum
                                <input
                                    className={`input__edit_orders_modal ${errors.sum?.message && "input_error__edit_orders_modal"}`}
                                    type="text"
                                    placeholder={"Sum"}
                                    {...register("sum")}
                                    onKeyDown={(e) => {
                                        const allowedKeys = [
                                            "Backspace",
                                            "Delete",
                                            "ArrowLeft",
                                            "ArrowRight",
                                            "Tab",
                                        ];

                                        if (
                                            !/[0-9.]/.test(e.key) &&
                                            !allowedKeys.includes(e.key)
                                        ) {
                                            e.preventDefault();
                                        }

                                        if (
                                            e.key === "." &&
                                            e.currentTarget.value.includes(".")
                                        ) {
                                            e.preventDefault();
                                        }
                                    }}
                                />
                                {errors.sum?.message && (
                                    <div
                                        className={
                                            "div_error_message__edit_orders_modal"
                                        }
                                    >
                                        {errors.sum?.message}
                                    </div>
                                )}
                            </label>
                        </div>
                        <div className={"div_input_wrapper__edit_orders_modal"}>
                            <label className={"label__edit_orders_modal"}>
                                Surname
                                <input
                                    className={`input__edit_orders_modal ${errors.surname?.message && "input_error__edit_orders_modal"}`}
                                    type="text"
                                    placeholder={"Surname"}
                                    {...register("surname")}
                                />
                                {errors.surname?.message && (
                                    <div
                                        className={
                                            "div_error_message__edit_orders_modal"
                                        }
                                    >
                                        {errors.surname?.message}
                                    </div>
                                )}
                            </label>
                            <label className={"label__edit_orders_modal"}>
                                Already paid
                                <input
                                    className={`input__edit_orders_modal ${errors.already_paid?.message && "input_error__edit_orders_modal"}`}
                                    type="text"
                                    placeholder={"Already paid"}
                                    {...register("already_paid")}
                                    onKeyDown={(e) => {
                                        const allowedKeys = [
                                            "Backspace",
                                            "Delete",
                                            "ArrowLeft",
                                            "ArrowRight",
                                            "Tab",
                                        ];

                                        if (
                                            !/[0-9.]/.test(e.key) &&
                                            !allowedKeys.includes(e.key)
                                        ) {
                                            e.preventDefault();
                                        }

                                        if (
                                            e.key === "." &&
                                            e.currentTarget.value.includes(".")
                                        ) {
                                            e.preventDefault();
                                        }
                                    }}
                                />
                                {errors.already_paid?.message && (
                                    <div
                                        className={
                                            "div_error_message__edit_orders_modal"
                                        }
                                    >
                                        {errors.already_paid?.message}
                                    </div>
                                )}
                            </label>
                        </div>
                        <div className={"div_input_wrapper__edit_orders_modal"}>
                            <label className={"label__edit_orders_modal"}>
                                Email
                                <input
                                    className={`input__edit_orders_modal ${errors.email?.message && "input_error__edit_orders_modal"}`}
                                    type="text"
                                    placeholder={"Email"}
                                    {...register("email")}
                                />
                                {errors.email?.message && (
                                    <div
                                        className={
                                            "div_error_message__edit_orders_modal"
                                        }
                                    >
                                        {errors.email?.message}
                                    </div>
                                )}
                            </label>
                            <label className={"label__edit_orders_modal"}>
                                Course
                                <select
                                    className={`input__edit_orders_modal ${errors.course?.message && "input_error__edit_orders_modal"}`}
                                    {...register("course")}
                                >
                                    <option value="">not selected</option>
                                    <option value="FS">FS</option>
                                    <option value="QACX">QACX</option>
                                    <option value="JCX">JCX</option>
                                    <option value="JSCX">JSCX</option>
                                    <option value="FE">FE</option>
                                    <option value="PCX">PCX</option>
                                </select>
                                {errors.course?.message && (
                                    <div
                                        className={
                                            "div_error_message__edit_orders_modal"
                                        }
                                    >
                                        {errors.course?.message}
                                    </div>
                                )}
                            </label>
                        </div>
                        <div className={"div_input_wrapper__edit_orders_modal"}>
                            <label className={"label__edit_orders_modal"}>
                                Phone
                                <input
                                    className={`input__edit_orders_modal ${errors.phone?.message && "input_error__edit_orders_modal"}`}
                                    type="text"
                                    placeholder={"Phone"}
                                    {...register("phone")}
                                    onKeyDown={(e) => {
                                        const allowedKeys = [
                                            "Backspace",
                                            "Delete",
                                            "ArrowLeft",
                                            "ArrowRight",
                                            "Tab",
                                        ];

                                        const value = e.currentTarget.value;
                                        const cursorPosition =
                                            e.currentTarget.selectionStart ?? 0;

                                        if (/[0-9]/.test(e.key)) return;

                                        if (e.key === "+") {
                                            const hasPlus = value.includes("+");

                                            if (
                                                !hasPlus &&
                                                cursorPosition === 0
                                            ) {
                                                return;
                                            }
                                        }

                                        if (!allowedKeys.includes(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                />
                                {errors.phone?.message && (
                                    <div
                                        className={
                                            "div_error_message__edit_orders_modal"
                                        }
                                    >
                                        {errors.phone?.message}
                                    </div>
                                )}
                            </label>
                            <label className={"label__edit_orders_modal"}>
                                Course format
                                <select
                                    className={`input__edit_orders_modal ${errors.course_format?.message && "input_error__edit_orders_modal"}`}
                                    {...register("course_format")}
                                >
                                    <option value="">not selected</option>
                                    <option value="static">static</option>
                                    <option value="online">online</option>
                                </select>
                                {errors.course_format?.message && (
                                    <div
                                        className={
                                            "div_error_message__edit_orders_modal"
                                        }
                                    >
                                        {errors.course_format?.message}
                                    </div>
                                )}
                            </label>
                        </div>
                        <div className={"div_input_wrapper__edit_orders_modal"}>
                            <label className={"label__edit_orders_modal"}>
                                Age
                                <input
                                    className={`input__edit_orders_modal ${errors.age?.message && "input_error__edit_orders_modal"}`}
                                    type="text"
                                    placeholder={"Age"}
                                    {...register("age")}
                                    onKeyDown={(e) => {
                                        if (
                                            !/[0-9]/.test(e.key) &&
                                            ![
                                                "Backspace",
                                                "Delete",
                                                "ArrowLeft",
                                                "ArrowRight",
                                            ].includes(e.key)
                                        ) {
                                            e.preventDefault();
                                        }
                                    }}
                                />
                                {errors.age?.message && (
                                    <div
                                        className={
                                            "div_error_message__edit_orders_modal"
                                        }
                                    >
                                        {errors.age?.message}
                                    </div>
                                )}
                            </label>
                            <label className={"label__edit_orders_modal"}>
                                Course type
                                <select
                                    className={`input__edit_orders_modal ${errors.course_type?.message && "input_error__edit_orders_modal"}`}
                                    {...register("course_type")}
                                >
                                    <option value="">not selected</option>
                                    <option value="pro">pro</option>
                                    <option value="minimal">minimal</option>
                                    <option value="premium">premium</option>
                                    <option value="incubator">incubator</option>
                                    <option value="vip">vip</option>
                                </select>
                                {errors.course_type?.message && (
                                    <div
                                        className={
                                            "div_error_message__edit_orders_modal"
                                        }
                                    >
                                        {errors.course_type?.message}
                                    </div>
                                )}
                            </label>
                        </div>
                        <div
                            className={"div_button_wrapper__edit_orders_modal"}
                        >
                            <button
                                className={"button__edit_orders_modal"}
                                type={"button"}
                                onClick={onClose}
                            >
                                CLOSE
                            </button>
                            <button
                                className={"button__edit_orders_modal"}
                                type={"button"}
                                onClick={
                                    selectButton
                                        ? clickedOnAddAndSubmit
                                        : handleSubmit(customHandler)
                                }
                            >
                                SUBMIT
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export { EditOrdersModal };

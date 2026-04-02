import { IComment } from "./comment.interface";

export interface IOrder {
    _id: string;
    order_number: number;
    age: number;
    already_paid: null | number;
    course: string;
    course_format: string;
    course_type: string;
    created_at: Date;
    email: string;
    msg: null | string;
    name: string;
    phone: string;
    status: null | string;
    sum: null | number;
    surname: string;
    utm: string;
    group: null | string;
    user_id: null | string;
    user_name: null | string;
    last_comments: null | IComment[];
}

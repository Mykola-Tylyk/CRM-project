export interface IOrder {
    _id: string;
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
}

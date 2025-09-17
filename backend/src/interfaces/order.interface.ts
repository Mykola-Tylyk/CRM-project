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

export interface IOrderQuery {
    pageSize: number;
    page: number;
    searchName?: string;
    searchSurname?: string;
    searchEmail?: string;
    searchPhone?: string;
    searchAge?: number;
    order?: string;
}

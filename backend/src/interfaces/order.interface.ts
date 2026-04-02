import { Types } from "mongoose";

import { ICommentResponse } from "./comment.interface";

export interface IOrder {
    _id: string;
    order_number: number | null;
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
    group?: null | string;
    user_id?: null | Types.ObjectId;
    user_name?: null | string;
    updated_at?: Date;
    last_comments?: ICommentResponse[] | null;
}

export interface IOrderQuery {
    pageSize?: number;
    page?: number;
    searchName?: string;
    searchSurname?: string;
    searchEmail?: string;
    searchPhone?: string;
    searchAge?: number;
    searchCourse?: string;
    searchFormat?: string;
    searchType?: string;
    searchStatus?: string;
    searchGroup?: string;
    searchMy?: string;
    searchStartDate?: Date;
    searchEndDate?: Date;
    order?: string;
}

export interface IOrderUpdate {
    _id: string;
    age?: number;
    already_paid?: null | number;
    course?: string;
    course_format?: string;
    course_type?: string;
    email?: string;
    msg?: null | string;
    name?: string;
    phone?: string;
    status?: null | string;
    sum?: null | number;
    surname?: string;
    utm?: string;
    group?: null | string;
    user_id: null | string;
    user_name?: null | string;
    last_comments?: ICommentResponse[] | null;
}

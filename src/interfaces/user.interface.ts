export interface IUser {
    _id: string;
    name: string;
    surname: string;
    age: number;
    createdAt: Date;
    updatedAt: Date;
}

// id, name, surname, email, phone, age, course, course_format, course_type, status, sum, alreadyPaid, created_at


export type IUserDTO = Pick<IUser, "name" | "surname" | "age">
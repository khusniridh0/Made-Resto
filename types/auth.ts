export type AuthData = {
    email: string;
    password: string;
}

export type FormState = {
    status: number;
    formInput?: AuthData;
}
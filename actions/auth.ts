import { FormState } from "@/types";

// dummy credentials
const DUMMY_CREDENTIALS = {
    email: 'admin@mail.com',
    password: 'admin123',
}

export type formState = FormState;

export const formAuth = async (_prevState: FormState, formData: FormData): Promise<FormState> => {
    const formInput = Object.fromEntries(formData);

    if (formInput.email !== DUMMY_CREDENTIALS.email || formInput.password !== DUMMY_CREDENTIALS.password) {
        return {
            status: 401,
            formInput: {
                email: String(formInput.email),
                password: ''
            },
        };
    }

    return { status: 200 };
}
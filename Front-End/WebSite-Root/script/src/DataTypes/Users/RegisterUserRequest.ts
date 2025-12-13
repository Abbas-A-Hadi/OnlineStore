export type RegisterUserRequest = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dateOfBirthAsDateOnlyString: string;
};

export function GetNewEmptyRegisterUserRequest(): RegisterUserRequest
{
    return {email: "", password: "", firstName: "", lastName: "", dateOfBirthAsDateOnlyString: ""};
}
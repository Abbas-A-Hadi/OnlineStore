export type RegisterUserRequest = {
    Email: string;
    Password: string;
    FirstName: string;
    LastName: string;
    DateOfBirthAsDateOnlyString: string;
};

export function GetNewEmptyRegisterUserRequest(): RegisterUserRequest
{
    return {Email: "", Password: "", FirstName: "", LastName: "", DateOfBirthAsDateOnlyString: ""};
}
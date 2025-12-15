import { Guid } from "../Guid.js";
export declare class User {
    Id: Guid;
    Email: string;
    FirstName: string;
    LastName: string;
    DateOfBirthAsDateOnlyAsString: string;
    AccessToken: string;
    RefreshToken: string;
    private constructor();
    static Empty(): User;
    static CreateNew(email: string, firstName: string, lastName: string, dateOfBirthAsDateOnlyString: string, accessToken: string, refreshToken: string): User;
    static Restore(id: Guid, email: string, firstName: string, lastName: string, dateOfBirthAsDateOnlyString: string, accessToken: string, refreshToken: string): User;
}
//# sourceMappingURL=User.d.ts.map
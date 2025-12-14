import { Guid } from "../Guid.js";
export declare class User {
    Id: Guid;
    Email: string;
    FirstName: string;
    LastName: string;
    DateOfBirthAsDateOnlyString: string;
    private constructor();
    static Empty(): User;
    static CreateNew(email: string, firstName: string, lastName: string, dateOfBirthAsDateOnlyString: string): User;
    static Restore(id: Guid, email: string, firstName: string, lastName: string, dateOfBirthAsDateOnlyString: string): User;
}
//# sourceMappingURL=User.d.ts.map
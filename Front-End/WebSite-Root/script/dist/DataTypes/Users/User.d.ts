import { Guid } from "../Guid.js";
export declare class User {
    id: Guid;
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    private constructor();
    static Empty(): User;
    static CreateNew(email: string, firstName: string, lastName: string, dateOfBirth: Date): User;
    static Restore(id: Guid, email: string, firstName: string, lastName: string, dateOfBirth: Date): User;
}
//# sourceMappingURL=User.d.ts.map
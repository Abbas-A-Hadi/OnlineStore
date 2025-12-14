import { Guid } from "../Guid.js";
export class User {
    constructor(Id, Email, FirstName, LastName, DateOfBirthAsDateOnlyString) {
        this.Id = Id;
        this.Email = Email;
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.DateOfBirthAsDateOnlyString = DateOfBirthAsDateOnlyString;
    }
    static Empty() {
        return new User(Guid.Empty(), "", "", "", "");
    }
    static CreateNew(email, firstName, lastName, dateOfBirthAsDateOnlyString) {
        return new User(Guid.New(), email, firstName, lastName, dateOfBirthAsDateOnlyString);
    }
    static Restore(id, email, firstName, lastName, dateOfBirthAsDateOnlyString) {
        return new User(id, email, firstName, lastName, dateOfBirthAsDateOnlyString);
    }
}
//# sourceMappingURL=User.js.map
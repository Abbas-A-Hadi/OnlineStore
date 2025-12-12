import { Guid } from "../Guid.js";
export class User {
    constructor(id, email, firstName, lastName, dateOfBirth) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
    }
    static Empty() {
        return new User(Guid.Empty(), "", "", "", new Date());
    }
    static CreateNew(email, firstName, lastName, dateOfBirth) {
        return new User(Guid.New(), email, firstName, lastName, dateOfBirth);
    }
    static Restore(id, email, firstName, lastName, dateOfBirth) {
        return new User(id, email, firstName, lastName, dateOfBirth);
    }
}
//# sourceMappingURL=User.js.map
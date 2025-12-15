import { Guid } from "../Guid.js";
export class User {
    constructor(Id, Email, FirstName, LastName, DateOfBirthAsDateOnlyAsString, AccessToken, RefreshToken) {
        this.Id = Id;
        this.Email = Email;
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.DateOfBirthAsDateOnlyAsString = DateOfBirthAsDateOnlyAsString;
        this.AccessToken = AccessToken;
        this.RefreshToken = RefreshToken;
    }
    static Empty() {
        return new User(Guid.Empty(), "", "", "", "", "", "");
    }
    static CreateNew(email, firstName, lastName, dateOfBirthAsDateOnlyString, accessToken, refreshToken) {
        return new User(Guid.New(), email, firstName, lastName, dateOfBirthAsDateOnlyString, accessToken, refreshToken);
    }
    static Restore(id, email, firstName, lastName, dateOfBirthAsDateOnlyString, accessToken, refreshToken) {
        return new User(id, email, firstName, lastName, dateOfBirthAsDateOnlyString, accessToken, refreshToken);
    }
}
//# sourceMappingURL=User.js.map
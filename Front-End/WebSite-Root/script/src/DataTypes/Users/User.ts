import {Guid} from "../Guid.js";

export class User {
    private constructor(public Id: Guid, public Email: string, public FirstName: string, 
                        public LastName: string, public DateOfBirthAsDateOnlyAsString: string, 
                        public AccessToken: string, public RefreshToken: string) {}
    
    static Empty(): User { 
        return new User(Guid.Empty(), "", "", "", "", "", ""); 
    }
    
    static CreateNew(email: string, firstName: string, lastName: string, 
                     dateOfBirthAsDateOnlyString: string, accessToken: string, refreshToken: string): User
    {
        return new User(Guid.New(), email, firstName, lastName, dateOfBirthAsDateOnlyString, accessToken, refreshToken);
    }
    
    static Restore(id: Guid, email: string, firstName: string, lastName: string, 
                   dateOfBirthAsDateOnlyString: string, accessToken: string, refreshToken: string): User 
    {
        return new User(id, email, firstName, lastName, dateOfBirthAsDateOnlyString, accessToken, refreshToken);
    }
}
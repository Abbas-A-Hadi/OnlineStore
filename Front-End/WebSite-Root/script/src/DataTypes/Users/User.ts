import {Guid} from "../Guid.js";

export class User {
    private constructor(public Id: Guid, public Email: string, public FirstName: string, public LastName: string, 
                public DateOfBirthAsDateOnlyString: string) {}
    
    static Empty(): User { 
        return new User(Guid.Empty(), "", "", "", ""); 
    }
    
    static CreateNew(email: string, firstName: string, lastName: string, dateOfBirthAsDateOnlyString: string): User
    {
        return new User(Guid.New(), email, firstName, lastName, dateOfBirthAsDateOnlyString);
    }
    
    static Restore(id: Guid, email: string, firstName: string, lastName: string, dateOfBirthAsDateOnlyString: string): User 
    {
        return new User(id, email, firstName, lastName, dateOfBirthAsDateOnlyString);
    }
}
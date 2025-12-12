import {Guid} from "../Guid.js";

export class User {
    private constructor(public id: Guid,public email:string, public firstName:string, public lastName:string, 
                public dateOfBirth: Date) {}
    
    static Empty(): User { 
        return new User(Guid.Empty(), "", "", "", new Date()); 
    }
    
    static CreateNew(email: string, firstName: string, lastName: string, dateOfBirth: Date): User
    {
        return new User(Guid.New(), email, firstName, lastName, dateOfBirth);
    }
    
    static Restore(id: Guid, email: string, firstName: string, lastName: string, dateOfBirth: Date): User 
    {
        return new User(id, email, firstName, lastName, dateOfBirth);
    }
}
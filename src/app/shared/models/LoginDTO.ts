import { User } from 'app/shared/models/user';

export class LoginDTO {

    Id: string;
    user : User;
    FirstName : string;
    LastName : string;
    Username : string;
    JwtToken : string;
    RefreshToken : string;
    
}
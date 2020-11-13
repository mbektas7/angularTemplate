﻿import { CarModel } from './CarModel';
import { UserPhotoModel } from './UserPhotoModel';

export class User {
    Id: string;
    Username: string;
    Password: string;
    IsFemale : boolean;
    Birthday : string;
    Name: string;
    Surname: string;
    jwtToken?: string;
    avatar : string;
    photo : UserPhotoModel;
    car : CarModel;
    About : string;
    Address: string;
    Phone : string;
}



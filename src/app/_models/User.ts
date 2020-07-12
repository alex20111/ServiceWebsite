import { Access } from './Access';
import { UserWbsAccess } from './UserWbsAccess';
export class User {

    constructor() { }

    public id: number;
    public userName: string;
    public password?: string;
    public firstName: string;
    public lastName: string;
    public access: Access;
    public email: string;
    public authToken?: string;
    public lastLogin?: Date;
    public userWeb?: UserWbsAccess[] ;

    // get an access level and return true if the user has that access level.
    hasAccess(level: Access): boolean{
        return this.access === level;
    }

}
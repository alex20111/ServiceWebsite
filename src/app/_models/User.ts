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
    public lastLogin?: string;
    public userWeb?: UserWbsAccess[] ;

    // get an access level and return true if the user has that access level.
    hasAccess(level: Access): boolean{
        return this.access === level;
    }

    // lastLoginDate(): string{
    //     let dateField = '';
    //     if (this.lastLogin){
    //         // console.log(JSON.parse(this.lastLogin));
    //         // return JSON.parse(this.lastLogin);
    //         dateField = this.lastLogin.substring(0, this.lastLogin.indexOf('['));
    //         // console.log(dateField);
    //     }
    //     return dateField;
        
    // }



}
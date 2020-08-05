import { Access } from '../_models/Access';
import { Websites } from '../_models/Websites';

export class UserCommon{

// common
acc = Access; // user access to make availaible to the html
web = Websites; // Websites availaible
userAcc: Access[] = [Access.Admin, Access.Regular, Access.View, Access.Unauthorized];
userWeb: Websites[] = [Websites.service, Websites.Isabelle, Websites.Mathieu, Websites.Headless];

}
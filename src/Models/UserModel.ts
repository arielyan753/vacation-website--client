import RoleModel from "./RoleModel";

class UserModel {
	public userId: number = 0;
    public firstName: string;
    public lastName: string;
    public username: string;
    public password: string;
    public role: RoleModel;
}

export default UserModel;

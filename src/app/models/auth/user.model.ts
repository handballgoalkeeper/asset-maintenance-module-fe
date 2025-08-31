import PermissionModel from './permission.model';

export default interface UserModel {
  id: number,
  name: string,
  email: string,
  permissions: PermissionModel[]
};

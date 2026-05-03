export interface UserModel {
  uid: string;
  email: string;
  displayName?: string;
  role?: 'admin' | 'user';
  bonosIds?: string[];
}

export interface IUserState {
  userName: string;
  id: string;
  active: boolean;
}

export interface UserStateModel {
  users: IUserState[];
  currentUser: IUserState;
}

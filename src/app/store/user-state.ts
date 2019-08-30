import { State, Action, StateContext, NgxsOnInit } from '@ngxs/store';
import { IUserState, UserStateModel } from 'app/models/user-state';

export class AddUser {
  static readonly type = '[user] AddUser';
  constructor(public user: IUserState) {}
}

export class SetCurrentUser {
  static readonly type = '[user] SetCurrentUser';
  constructor(public currentUser: IUserState) {}
}

export class UpdateUsers {
  static readonly type = '[user] UpdateUsers';
  constructor(public users: IUserState[]) {}
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    users: [],
    currentUser: { userName: '', id: '', active: false }
  }
})
export class UserState implements NgxsOnInit {
  @Action(UpdateUsers)
  UpdateUsers(ctx: StateContext<UserStateModel>, action: UpdateUsers) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      users: action.users
    });
  }

  @Action(AddUser)
  AddUser(ctx: StateContext<UserStateModel>, action: AddUser) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      users: [...state.users, action.user]
    });
  }

  @Action(SetCurrentUser)
  SetCurrentUser(ctx: StateContext<UserStateModel>, action: SetCurrentUser) {
    const state = ctx.getState();
    const list = state.users.map(user => {
      return {
        userName: user.userName,
        id: user.id,
        active: user.userName === action.currentUser.userName
      };
    });
    ctx.setState({
      ...state,
      users: list,
      currentUser: action.currentUser
    });
  }

  ngxsOnInit(ctx: StateContext<UserStateModel>) {
    console.log('user state initialized');
    ctx.dispatch([]);
  }
}

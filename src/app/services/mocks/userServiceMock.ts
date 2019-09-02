import { IUserState } from 'app/models/user-state';
import { Observable, of } from 'rxjs';

export class userServiceMock {
  getAllUsers(): void {}

  getCurrentUser(): IUserState {
    return {
      userName: 'test',
      id: '1234',
      active: false
    };
  }

  currentUser(): Observable<IUserState> {
    return of({} as IUserState);
  }

  getCurrentUsers(): IUserState[] {
    return [] as IUserState[];
  }

  streamUsersUpdates(): Observable<IUserState> {
    return of({} as IUserState);
  }

  getLatestUsers(): void {}
}

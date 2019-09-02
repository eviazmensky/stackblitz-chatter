import { IUserState } from 'app/models/user-state';
import { Observable, of, Subject } from 'rxjs';
import { subscribeOn } from 'rxjs/operators';

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

  addUser(username: string): Observable<any> {
    return of(username);
  }

  getLatestUsers(): void {}

  setActiveUser(): void {}

  listAllUsers(): Observable<IUserState[]> {
    return of([] as IUserState[]);
  }
}

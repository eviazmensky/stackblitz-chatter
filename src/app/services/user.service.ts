import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { IUserState } from 'app/models/user-state';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { StreamService } from './stream.service';
import { AddUser, UpdateUsers, SetCurrentUser } from 'app/store/user-state';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  @Select(state => state.user.users) private users$: Observable<IUserState[]>;
  @Select(state => state.user.currentUser) currentUser$: Observable<IUserState>;
  @Select(state => state.user.users.filter((user: IUserState) => user.active)) activeUsers$: Observable<IUserState[]>;

  constructor(private httpService: HttpService, private streamService: StreamService, private store: Store) {
    streamService.sendMessage('userAdded', '');
    streamService.getMessages('userActive').subscribe((updatedUsers: IUserState[]) => this.updateUsers(updatedUsers));
  }

  listAllUsers(): Observable<IUserState[]> {
    return this.users$;
  }

  listActiveUsers(): Observable<IUserState[]> {
    return this.activeUsers$;
  }

  getCurrentUsers(): IUserState[] {
    return this.store.selectSnapshot(state => state.user.users);
  }

  getAllUsers() {
    this.httpService.get('allUsers').subscribe((users: []) => {
      users.forEach(user => this.addUserToStore(user));
    });
  }

  getLatestUsers() {
    this.streamUsersUpdates().subscribe(user => {
      this.addUserToStore(user);
    });
  }

  streamUsersUpdates(): Observable<IUserState> {
    return this.streamService
      .getMessages<IUserState>('userAdded')
      .pipe(distinctUntilChanged((prev: IUserState, curr: IUserState) => prev.id === curr.id));
  }

  currentUser(): Observable<IUserState> {
    return this.currentUser$;
  }

  getCurrentUser(): IUserState {
    return this.store.selectSnapshot(state => state.user.currentUser);
  }

  addUser(userName: string): Observable<any> {
    console.log(`serivice ${userName}`);
    return this.httpService.post('addUser', { UserName: userName });
  }

  verifyUserName(userName: string): Observable<boolean> {
    this.streamService.sendMessage('verifyUserName', userName);
    return this.streamService.getMessages<boolean>('verifiedUserName');
  }

  setActiveUser(user: IUserState) {
    this.httpService.post('activeUser', { userId: user.id }).subscribe(() => this.setCurrentUser(user));
  }

  setUserInactive(user: IUserState) {
    this.streamService.sendMessage('deactivateUser', user);
  }

  private addUserToStore(user: IUserState) {
    const userInList = this.store
      .selectSnapshot(state => state.user.users)
      .some((userListItem: IUserState) => userListItem.id === user.id);
    if (!userInList) {
      this.store.dispatch(new AddUser(user));
    }
  }

  private updateUsers(users: IUserState[]) {
    this.store.dispatch(new UpdateUsers(users));
  }

  private setCurrentUser(user: IUserState) {
    this.store.dispatch(new SetCurrentUser(user));
  }
}

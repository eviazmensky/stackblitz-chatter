import { Component, OnInit, OnDestroy } from '@angular/core';
import { debounceTime, flatMap, takeUntil, distinctUntilChanged, tap, mapTo, map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit, OnDestroy {
  newUserName = '';
  private canHaveUserName$ = new Subject<string>();
  private destroy$ = new Subject();
  userNameValid$ = this.canHaveUserName$.pipe(
    distinctUntilChanged(),
    debounceTime(150),
    flatMap(userName => this.userService.verifyUserName(userName)),
    map(valid => !valid)
  );

  constructor(private userService: UserService) {}

  ngOnInit() {}

  handleChange() {
    this.canHaveUserName$.next(this.newUserName);
  }

  addUser() {
    if (this.newUserName) {
      this.userService
        .addUser(this.newUserName)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.newUserName = '';
        });
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}

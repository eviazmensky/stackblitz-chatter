import { Component, OnInit, Input } from '@angular/core';
import { IUserState } from 'app/models/user-state';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-user-row',
  templateUrl: './user-row.component.html',
  styleUrls: ['./user-row.component.scss']
})
export class UserRowComponent implements OnInit {
  @Input() user: IUserState;

  constructor(private userService: UserService) {}

  ngOnInit() {}

  setAsActiveUser() {
    this.userService.setActiveUser(this.user);
  }
}

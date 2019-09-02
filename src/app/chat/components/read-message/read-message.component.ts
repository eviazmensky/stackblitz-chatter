import { Component, OnInit, Input } from '@angular/core';
import { IChatState } from 'app/models/chat-state';
import { UserService } from 'app/services/user.service';
import { IUserState } from 'app/models/user-state';

@Component({
  selector: 'app-read-message',
  templateUrl: './read-message.component.html',
  styleUrls: ['./read-message.component.scss']
})
export class ReadMessageComponent implements OnInit {
  @Input() message: IChatState;
  currentUserMessage = false;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.currentUser().subscribe((user: IUserState) => {
      this.currentUserMessage = this.setCurrentUser(user.userName);
    });
  }

  private setCurrentUser(user: string): boolean {
    return user === this.message.sender;
  }
}

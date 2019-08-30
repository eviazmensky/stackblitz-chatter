import { Component, OnInit } from '@angular/core';
import { ChatService } from 'app/services/chat.service';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  chats$ = this.chatService.getMessages();
  private activeUser = this.userService.getCurrentUser();
  canSendMessage: boolean = !!this.activeUser.userName;

  constructor(private chatService: ChatService, private userService: UserService) {}

  ngOnInit() {}

  onMessageChange(event: string) {
    this.chatService.addMessage({
      sender: this.activeUser.userName,
      message: event
    });
  }
}

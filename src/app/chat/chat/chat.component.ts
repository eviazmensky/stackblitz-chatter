import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from 'app/services/chat.service';
import { UserService } from 'app/services/user.service';
import { takeUntil, filter, debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  chats$ = this.chatService.getMessages();
  private activeUser = this.userService.getCurrentUser();
  private destroy$ = new Subject();
  private contentUpdated$ = new Subject();
  canSendMessage: boolean = !!this.activeUser.userName;

  constructor(private chatService: ChatService, private userService: UserService) {}

  ngOnInit() {
    this.contentUpdated$
      .pipe(
        debounceTime(300),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        const chatWindow = document.querySelector('#chatWindow');
        chatWindow.scrollTo({ top: chatWindow.scrollHeight, behavior: 'smooth' });
        // potential improvement - instead of waiting for the app to be updated by the back end,
        // add a flag to the messages that the data is not confirmed, that way the store can be updated
        // in more real time and the the scroll won't happen so 'disjointedly'
      });
  }

  onMessageChange(event: string) {
    this.chatService.addChatMessage({
      sender: this.activeUser.userName,
      message: event
    });
  }

  onContentUpdated(event: boolean): void {
    this.contentUpdated$.next();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

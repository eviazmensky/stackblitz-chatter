import { Component, OnInit } from '@angular/core';
import { HttpService } from 'app/services/http.service';
import { StreamService } from 'app/services/stream.service';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { ChatService } from 'app/services/chat.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ng-chatter';
  appText: string;
  user: string;
  messages$ = this.chatService.getMessages();

  constructor(
    private httpService: HttpService,
    private chatService: ChatService,
    private streamService: StreamService,
    private userService: UserService
  ) {
    window.onbeforeunload = () => {
      if (this.userService.getCurrentUser()) {
        this.userService.setUserInactive(this.userService.getCurrentUser());
      }
    };
  }

  ngOnInit() {
    // health check
    this.httpService
      .get('')
      .pipe(
        catchError(() => {
          console.log('backend is down');
          return EMPTY;
        })
      )
      .subscribe(data => console.log('backend is up', data));

    this.streamService.getMessages('connection').subscribe(data => console.log(data));
    // calls to get historical data here when the app loads instead of when the module loads. ensures the call only happens once
    this.chatService.getAllMessages();
    this.userService.getAllUsers();
  }
}

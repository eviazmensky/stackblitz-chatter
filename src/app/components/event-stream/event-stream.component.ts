import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'app/services/user.service';
import { ChatService } from 'app/services/chat.service';
import { Subject, merge } from 'rxjs';
import { map, takeUntil, tap, delay, filter, distinctUntilChanged } from 'rxjs/operators';
import { IUserState } from 'app/models/user-state';
import { IChatState } from 'app/models/chat-state';
import { StreamService } from 'app/services/stream.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-stream',
  templateUrl: './event-stream.component.html',
  styleUrls: ['./event-stream.component.scss']
})
export class EventStreamComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();
  private activeUsers = 0;
  events: string[] = [];

  constructor(
    private userService: UserService,
    private chatService: ChatService,
    private streamService: StreamService,
    private router: Router
  ) {}

  ngOnInit() {
    this.activeUsers = this.calcActiveUsers(this.userService.getCurrentUsers());
    // if following code merges three streams into a single output. If a 4th is added, it should be moved into a service
    merge(
      this.userService.streamUsersUpdates().pipe(
        filter(() => this.router.url !== '/users'),
        map((user: IUserState) => `${user.userName} has been added`)
      ),
      this.streamService.getMessages('userActive').pipe(
        filter(() => this.router.url !== '/users'),
        map((users: IUserState[]) => this.calcActiveUsers(users)),
        distinctUntilChanged(),
        filter((activeCount: number) => activeCount !== this.activeUsers),
        map((activeCount: number) => this.userChangeStatusMessage(activeCount))
      ),
      this.chatService.getChatStream().pipe(
        filter(() => this.router.url !== '/simple-chat'),
        map(message => `${(message as IChatState).sender} just posted a new message `)
      )
    )
      .pipe(
        tap((event: string) => this.events.push(event)),
        delay(5000),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.events.shift();
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  private calcActiveUsers(users: IUserState[]): number {
    return users.filter(user => user.active).length;
  }

  private userChangeStatusMessage(count: number): string {
    const status = count > this.activeUsers ? 'active' : 'inactive';
    this.activeUsers = count;
    return `A user has become ${status}`;
  }
}

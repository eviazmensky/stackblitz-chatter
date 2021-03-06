import { Injectable } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { StreamService } from './stream.service';
import { Observable } from 'rxjs';
import { IChatState } from '../models/chat-state';
import { addChatMessage } from '../store/chat-state';
import { HttpService } from './http.service';

interface ChatHistory {
  chatHistory: IChatState[];
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  @Select(state => state.chat.messages) chat$: Observable<IChatState>;

  constructor(private store: Store, private streamService: StreamService, private httpService: HttpService) {
    this.getChatStream().subscribe((message: any) => this.addMessageToStore(message));
  }

  getChatStream(): Observable<IChatState> {
    return this.streamService.getMessages<IChatState>('message');
  }

  private addMessageToStore(message: IChatState) {
    this.store.dispatch(new addChatMessage(message));
  }

  addChatMessage(message: IChatState) {
    this.streamService.sendMessage('message', message);
  }

  getMessages(): Observable<IChatState> {
    return this.chat$;
  }

  getAllMessages() {
    this.httpService.get('loadAll').subscribe((data: ChatHistory) => {
      data.chatHistory.forEach(msg => {
        this.addMessageToStore(msg);
      });
    });
  }
}

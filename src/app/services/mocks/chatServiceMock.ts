import { Observable, of } from 'rxjs';
import { IChatState } from 'app/models/chat-state';

export class chatServiceMock {
  static addChatMessage(addChatMessage: any) {
    throw new Error('Method not implemented.');
  }
  getAllMessages(): void {}
  getMessages(): Observable<IChatState[]> {
    return of([] as IChatState[]);
  }
  addChatMessage(param: IChatState): void {}

  getChatStream(): Observable<IChatState> {
    return of({} as IChatState);
  }
}

import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Global } from 'app/enums/global.enum';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class StreamService {
  private socket;
  constructor() {
    this.socket = io(Global.baseApiUrl);
  }

  sendMessage(channel: string, message: any): void {
    this.socket.emit(channel, message);
  }

  getMessages<T>(channel: string): Observable<T> {
    const subject: Subject<T> = new Subject<T>();
    this.socket.on(channel, data => {
      subject.next(data);
    });
    return subject;
  }
}

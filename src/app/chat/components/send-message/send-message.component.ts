import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.scss']
})
export class SendMessageComponent implements OnInit {
  @Output() messageChange: EventEmitter<string> = new EventEmitter<string>();
  @Input() canSend: boolean = true;
  messageText: string;

  constructor() {}

  ngOnInit() {}

  sendMessage() {
    if ( this.canSend ) {
    this.messageChange.emit(this.messageText);
    this.messageText = '';
    }
  }
}

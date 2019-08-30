import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import { SendMessageComponent } from './components/send-message/send-message.component';
import { ReadMessageComponent } from './components/read-message/read-message.component';
import { FormsModule } from '@angular/forms';
import { ChatRoutingModule } from './chat-routing.module';

@NgModule({
  declarations: [ChatComponent, SendMessageComponent, ReadMessageComponent],
  imports: [
    CommonModule,
    FormsModule,
    ChatRoutingModule
  ]
})
export class ChatModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StreamService } from './services/stream.service';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { ChatState } from './store/chat-state';
import { UserState } from './store/user-state';
import { ChatModule } from './chat/chat.module';
import { UsersModule } from './users/users.module';
import { NavComponent } from './components/nav/nav.component';
import { EventStreamComponent } from './components/event-stream/event-stream.component';
import { HomeComponent } from './components/home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    EventStreamComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ChatModule,
    UsersModule,
    NgxsModule.forRoot([
      ChatState,
      UserState
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot()
  ],
  providers: [StreamService],
  bootstrap: [AppComponent]
})
export class AppModule { }

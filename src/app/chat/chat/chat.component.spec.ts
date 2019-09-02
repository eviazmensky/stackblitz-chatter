import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatComponent } from './chat.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ChatService } from 'app/services/chat.service';
import { chatServiceMock } from 'app/services/mocks/chatServiceMock';
import { userServiceMock } from 'app/services/mocks/userServiceMock';
import { UserService } from 'app/services/user.service';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChatComponent],
      providers: [
        { provide: ChatService, useClass: chatServiceMock },
        { provide: UserService, useClass: userServiceMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should send a message', () => {
    spyOn(component['chatService'], 'addChatMessage');
    component.onMessageChange('test');
    expect(component['chatService'].addChatMessage).toHaveBeenCalled();
  });

  it('should be able to send a message', () => {
    expect(component.canSendMessage).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EventStreamComponent } from './event-stream.component';
import { ChatService } from 'app/services/chat.service';
import { chatServiceMock } from 'app/services/mocks/chatServiceMock';
import { UserService } from 'app/services/user.service';
import { userServiceMock } from 'app/services/mocks/userServiceMock';
import { StreamService } from 'app/services/stream.service';
import { RouterTestingModule } from '@angular/router/testing';
import { IUserState } from 'app/models/user-state';

describe('EventStreamComponent', () => {
  let component: EventStreamComponent;
  let fixture: ComponentFixture<EventStreamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EventStreamComponent],
      imports: [RouterTestingModule.withRoutes([])],
      providers: [
        { provide: ChatService, useClass: chatServiceMock },
        { provide: UserService, useClass: userServiceMock },
        StreamService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate the number of active users', () => {
    const usersArray: IUserState[] = [
      { userName: 'test', active: false, id: '1234' },
      { userName: 'Ttest', active: true, id: '4321' },
      { userName: 'Ztest', active: true, id: '2412' }
    ];
    expect(component['calcActiveUsers'](usersArray)).toBe(2);
  });

  describe('active user changes', () => {
    it('should increase', () => {
      component['activeUsers'] = 0;
      expect(component['userChangeStatusMessage'](1)).toBe('A user has become active');
    });
    it('should decrease', () => {
      component['activeUsers'] = 2;
      expect(component['userChangeStatusMessage'](1)).toBe('A user has become inactive');
    });
  });
});

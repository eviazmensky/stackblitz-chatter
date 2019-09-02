import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpService } from './services/http.service';
import { ChatService } from './services/chat.service';
import { chatServiceMock } from './services/mocks/chatServiceMock';
import { UserService } from './services/user.service';
import { userServiceMock } from './services/mocks/userServiceMock';
import { httpServiceMock } from './services/mocks/httpServiceMock';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [
        { provide: HttpService, useClass: httpServiceMock },
        { provide: ChatService, useClass: chatServiceMock },
        { provide: UserService, useClass: userServiceMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ng-chatter'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('ng-chatter');
  });

  it('should render 3 children', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.children.length).toEqual(3);
  });
});

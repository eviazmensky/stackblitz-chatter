import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SendMessageComponent } from './send-message.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpService } from 'app/services/http.service';
import { Observable, of } from 'rxjs';

// tslint:disable-next-line: class-name
class mockHttpService {
  get<T>(url: string): Observable<T> {
    return of({} as T);
  }
}

describe('SendMessageComponent', () => {
  let component: SendMessageComponent;
  let fixture: ComponentFixture<SendMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SendMessageComponent],
      providers: [{ provide: HttpService, useClass: mockHttpService }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit a change', () => {
    component.messageText = 'hello';
    component.canSend = true;
    fixture.detectChanges();
    spyOn(component.messageChange, 'emit');
    component.sendMessage();
    expect(component.messageChange.emit).toHaveBeenCalled();
  });
});

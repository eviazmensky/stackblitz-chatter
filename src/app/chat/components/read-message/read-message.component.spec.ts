import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadMessageComponent } from './read-message.component';
import { userServiceMock } from 'app/services/mocks/userServiceMock';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UserService } from 'app/services/user.service';

describe('ReadMessageComponent', () => {
  let component: ReadMessageComponent;
  let fixture: ComponentFixture<ReadMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReadMessageComponent],
      providers: [{ provide: UserService, useClass: userServiceMock }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadMessageComponent);
    component = fixture.componentInstance;
    component.message = {
      sender: 'test',
      message: 'test'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('setting current user', () => {
    it('should set current user to true', () => {
      expect(component['setCurrentUser']('test')).toBeTruthy();
    });
    it('should set current user to false', () => {
      expect(component['setCurrentUser']('ztest')).toBeFalsy();
    });
  });
});

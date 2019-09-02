import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRowComponent } from './user-row.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UserService } from 'app/services/user.service';
import { userServiceMock } from 'app/services/mocks/userServiceMock';

describe('UserRowComponent', () => {
  let component: UserRowComponent;
  let fixture: ComponentFixture<UserRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserRowComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: UserService, useClass: userServiceMock }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRowComponent);
    component = fixture.componentInstance;
    component.user = {
      userName: 'test',
      id: '1234',
      active: false
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set an active user', () => {
    spyOn(component['userService'], 'setActiveUser');
    component.setAsActiveUser();
    expect(component['userService'].setActiveUser).toHaveBeenCalled();
  });
});

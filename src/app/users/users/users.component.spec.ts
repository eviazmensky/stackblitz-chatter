import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersComponent } from './users.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UserService } from 'app/services/user.service';
import { userServiceMock } from 'app/services/mocks/userServiceMock';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UsersComponent],
      providers: [{ provide: UserService, useClass: userServiceMock }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the latest users', () => {
    spyOn(component['userService'], 'getLatestUsers');
    component.ngOnInit();
    expect(component['userService'].getLatestUsers).toHaveBeenCalled();
  });
});

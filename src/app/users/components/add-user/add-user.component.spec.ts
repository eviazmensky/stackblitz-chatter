import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddUserComponent } from './add-user.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UserService } from 'app/services/user.service';
import { userServiceMock } from 'app/services/mocks/userServiceMock';

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddUserComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: UserService, useClass: userServiceMock }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

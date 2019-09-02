import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NavComponent } from './nav.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UserService } from 'app/services/user.service';
import { userServiceMock } from 'app/services/mocks/userServiceMock';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: UserService, useClass: userServiceMock }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

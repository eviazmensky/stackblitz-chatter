import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { httpServiceMock } from './mocks/httpServiceMock';
import { HttpService } from './http.service';
import { NgxsModule } from '@ngxs/store';

describe('UserService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([])],
      providers: [{ provide: HttpService, useClass: httpServiceMock }]
    })
  );

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });
});

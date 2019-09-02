import { TestBed } from '@angular/core/testing';
import { ChatService } from './chat.service';
import { NgxsModule } from '@ngxs/store';
import { HttpService } from './http.service';
import { httpServiceMock } from './mocks/httpServiceMock';

describe('ChatService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpService,
          useClass: httpServiceMock
        }
      ],
      imports: [NgxsModule.forRoot([])]
    })
  );

  it('should be created', () => {
    const service: ChatService = TestBed.get(ChatService);
    expect(service).toBeTruthy();
  });
});

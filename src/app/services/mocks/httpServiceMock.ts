import { Observable, of } from 'rxjs';

export class httpServiceMock {
  get<T>(): Observable<T> {
    return of({} as T);
  }
}

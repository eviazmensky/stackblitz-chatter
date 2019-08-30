import { Injectable } from '@angular/core';
import { Global } from 'app/enums/global.enum';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  get<T>(url: string): Observable<T> {
    const requestUrl = `${Global.baseApiUrl}${url}`;
    return this.http.get<T>(requestUrl);
  }

  post<T>(url: string, payload: {}): Observable<T> {
    const requestUrl = `${Global.baseApiUrl}${url}`;
    const headers = new HttpHeaders();
    headers.append('content-type', 'application/json');
    console.log(headers);
    return this.http.post<T>(requestUrl, payload, {headers});
  }
}

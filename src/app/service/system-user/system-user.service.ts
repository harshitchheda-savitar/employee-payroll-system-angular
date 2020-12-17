import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SystemUserService {
  baseUrl: string = environment.apiEndPointBaseUrl;

  constructor(private http: HttpClient) { }

  //service method to post data during login system-user
  userLoginCredsPost(data): Observable<any> {
    return this.http.post<any>(this.baseUrl + "api/v1/user/login", data);
  }
}

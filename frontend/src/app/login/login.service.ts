import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private url = "https://ec2-18-191-107-73.us-east-2.compute.amazonaws.com.sslip.io"

    constructor(private httpClient: HttpClient) { }

    public login(credenciais:any): Observable<any> {
        return this.httpClient.post<any>(`${this.url}/login`, credenciais);
    }
}
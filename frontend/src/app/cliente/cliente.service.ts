import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ClienteService {
    private url = "https://ec2-18-191-107-73.us-east-2.compute.amazonaws.com.sslip.io"
    //private url = "http://localhost:3000"

    constructor(private httpClient: HttpClient) { }
    public saveCliente(cliente:any): Observable<any> {
        return this.httpClient.post<any>(`${this.url}/cadastro-cliente`, cliente);
    }

    public getAllClientes(): Observable<any> {
        return this.httpClient.get<any>(`${this.url}/clientes`);
    }
}

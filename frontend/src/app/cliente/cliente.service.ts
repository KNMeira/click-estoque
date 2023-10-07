import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ClienteService {
    //private url = "https://ec2-18-191-107-73.us-east-2.compute.amazonaws.com.sslip.io"
    private url = "http://localhost:3000"

    constructor(private httpClient: HttpClient) { }
    public saveCliente(cliente: any): Observable<any> {
        return this.httpClient.post<any>(`${this.url}/cadastro-cliente`, cliente);
    }

    public getAllClientes(): Observable<any> {
        return this.httpClient.get<any>(`${this.url}/clientes`);
    }

    public getCliente(data: any): Observable<any> {
        return this.httpClient.post<any>(`${this.url}/cliente`, data);
    }

    public deleteCliente(idCliente: any): Observable<any> {
        return this.httpClient.post<any>(`${this.url}/delete-cliente`, { id: idCliente });
    }

    public editCliente(cliente: any): Observable<any> {
        return this.httpClient.post<any>(`${this.url}/editar-cliente`, cliente);
    }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EstoqueService {
    private url = "http://localhost:3000"

    constructor(private httpClient: HttpClient) { }

    public saveProduto(produto:any): Observable<any> {
        return this.httpClient.post<any>(`${this.url}/cadastro-produto`, produto);
    }
}
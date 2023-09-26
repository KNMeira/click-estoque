import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FornecedoresService {
    private url = "http://18.191.107.73:3000"

    constructor(private httpClient: HttpClient) { }

    public saveFornecedor(fornecedor: any): Observable<any> {
        return this.httpClient.post<any>(`${this.url}/cadastro-fornecedor`, fornecedor);
    }

    public editFornecedor(fornecedor: any): Observable<any> {
        return this.httpClient.post<any>(`${this.url}/editar-fornecedor`, fornecedor);
    }

    public getAllFornecedores(): Observable<any> {
        return this.httpClient.get(`${this.url}/fornecedores`);
    }

    public getFornecedor(cnpj: any): Observable<any> {
        return this.httpClient.post(`${this.url}/fornecedor`, cnpj);
    }
}
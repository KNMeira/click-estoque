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

    public getFornecedores(): Observable<any> {
        return this.httpClient.get<any>(`${this.url}/fornecedores`);
    }

    public getEstoque(): Observable<any> {
        return this.httpClient.get<any>(`${this.url}/estoque`);
    }

    public getPeca(codigo:any): Observable<any> {
        return this.httpClient.post<any>(`${this.url}/peca`, codigo);
    }

    public editProduto(produto:any): Observable<any> {
        return this.httpClient.post<any>(`${this.url}/editar-produto`, produto);
    }
}
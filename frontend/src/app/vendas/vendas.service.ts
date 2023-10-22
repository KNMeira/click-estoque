import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class VendasService {
    private url = "https://ec2-18-191-107-73.us-east-2.compute.amazonaws.com.sslip.io"
    //private url = "http://localhost:3000"

    constructor(private httpClient: HttpClient) { }

    public saveVenda(venda: any) {
        return this.httpClient.post<any>(`${this.url}/cadastro-venda`, venda);
    }

    public editVenda(venda: any) {
        return this.httpClient.post<any>(`${this.url}/editar-venda`, venda);
    }

    public getVendas(filtro: any) {
        return this.httpClient.post<any>(`${this.url}/buscar-vendas`, filtro);
    }

    public getVendasRelatorio(periodo: any) {
        return this.httpClient.post<any>(`${this.url}/vendas-logs`, periodo);
    }
    
    public deleteVenda(id: any) {
        return this.httpClient.post<any>(`${this.url}/delete-venda`, {id: id});
    }

    public getVenda(id: any) {
        return this.httpClient.post<any>(`${this.url}/venda`, id);
    }

}
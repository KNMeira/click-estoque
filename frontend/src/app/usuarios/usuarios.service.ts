import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UsuariosService {
    private url = "https://ec2-18-191-107-73.us-east-2.compute.amazonaws.com.sslip.io"

    constructor(private httpClient: HttpClient) { }

    public cadastrar(usuario:any): Observable<any> {
        return this.httpClient.post<any>(`${this.url}/cadastro-usuario`, usuario);
    }

    public getAllUsuarios(): Observable<any> {
        return this.httpClient.get<any>(`${this.url}/usuarios`);
    }

    public getUsuario(filtro: any): Observable<any> {
        return this.httpClient.post<any>(`${this.url}/usuario`, filtro);
    }

    public editarUsuario(dadosUsuario: any): Observable<any> {
        return this.httpClient.post<any>(`${this.url}/editar-usuario`, dadosUsuario);
    }
}
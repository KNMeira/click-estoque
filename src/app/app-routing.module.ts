import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EstoqueComponent } from './estoque/estoque.component';
import { ClienteComponent } from './cliente/cliente.component';
import { FornecedoresComponent } from './fornecedores/fornecedores.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { SuporteComponent } from './suporte/suporte.component';
import { RelatoriosComponent } from './relatorios/relatorios.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth/auth.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [authGuard]},
  {path: 'estoque', component: EstoqueComponent, canActivate: [authGuard]},
  {path: 'cliente', component: ClienteComponent, canActivate: [authGuard]},
  {path: 'fornecedores', component: FornecedoresComponent, canActivate: [authGuard]},
  {path: 'relatorios', component: RelatoriosComponent, canActivate: [authGuard]},
  {path: 'usuarios', component: UsuariosComponent, canActivate: [authGuard]},
  {path: 'suporte', component: SuporteComponent, canActivate: [authGuard]},
  {path: '**', component: HomeComponent, canActivate: [authGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EstoqueComponent } from './estoque/estoque.component';
import { ClienteComponent } from './cliente/cliente.component';
import { FornecedoresComponent } from './fornecedores/fornecedores.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { SuporteComponent } from './suporte/suporte.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'estoque', component: EstoqueComponent},
  {path: 'cliente', component: ClienteComponent},
  {path: 'fornecedores', component: FornecedoresComponent},
  {path: 'usuarios', component: UsuariosComponent},
  {path: 'suporte', component: SuporteComponent},
  {path: '**', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

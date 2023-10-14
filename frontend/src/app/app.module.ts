import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { EstoqueComponent } from './estoque/estoque.component';
import { CadastroProdutosEstoqueComponent } from './estoque/cadastro-produtos-estoque/cadastro-produtos-estoque.component';
import { ListaEstoqueComponent } from './estoque/lista-estoque/lista-estoque.component';
import { EditarProdutoEstoqueComponent } from './estoque/editar-produto-estoque/editar-produto-estoque.component';
import { ClienteComponent } from './cliente/cliente.component';
import { CadastrarClienteComponent } from './cliente/cadastrar-cliente/cadastrar-cliente.component';
import { ListaClienteComponent } from './cliente/lista-cliente/lista-cliente.component';
import { EditarClienteComponent } from './cliente/editar-cliente/editar-cliente.component';
import { FornecedoresComponent } from './fornecedores/fornecedores.component';
import { CadastrarFornecedoresComponent } from './fornecedores/cadastrar-fornecedores/cadastrar-fornecedores.component';
import { ListarFornecedoresComponent } from './fornecedores/listar-fornecedores/listar-fornecedores.component';
import { EditarFornecedoresComponent } from './fornecedores/editar-fornecedores/editar-fornecedores.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { CadastrarUsuariosComponent } from './usuarios/cadastrar-usuarios/cadastrar-usuarios.component';
import { EditarUsuariosComponent } from './usuarios/editar-usuarios/editar-usuarios.component';
import { ListarUsuariosComponent } from './usuarios/listar-usuarios/listar-usuarios.component';
import { SuporteComponent } from './suporte/suporte.component';
import { RelatoriosComponent } from './relatorios/relatorios.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CpfMaskDirective } from './directives/cpf-mask.directive';
import { PhoneMaskDirective } from './directives/phone-mask.directive';
import { CnpjMaskDirective } from './directives/cnpj-mask.directive';
import { RegistrarEntradasComponent } from './estoque/registrar-entradas/registrar-entradas.component';
import { RegistrarSaidasComponent } from './estoque/registrar-saidas/registrar-saidas.component';
import { VendasComponent } from './vendas/vendas.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SideMenuComponent,
    EstoqueComponent,
    CadastroProdutosEstoqueComponent,
    ListaEstoqueComponent,
    EditarProdutoEstoqueComponent,
    ClienteComponent,
    CadastrarClienteComponent,
    ListaClienteComponent,
    EditarClienteComponent,
    FornecedoresComponent,
    CadastrarFornecedoresComponent,
    ListarFornecedoresComponent,
    EditarFornecedoresComponent,
    UsuariosComponent,
    CadastrarUsuariosComponent,
    EditarUsuariosComponent,
    ListarUsuariosComponent,
    SuporteComponent,
    RelatoriosComponent,
    LoginComponent,
    CpfMaskDirective,
    CnpjMaskDirective,
    PhoneMaskDirective,
    RegistrarEntradasComponent,
    RegistrarSaidasComponent,
    VendasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

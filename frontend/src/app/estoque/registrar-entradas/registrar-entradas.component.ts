import { Component, OnInit } from '@angular/core';
import { EstoqueService } from '../estoque.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-registrar-entradas',
  templateUrl: './registrar-entradas.component.html',
  styleUrls: ['./registrar-entradas.component.scss']
})
export class RegistrarEntradasComponent implements OnInit {

  public pecas: any = [];
  public arrayFormEntradas: any = [];
  public isPecasLoaded: boolean = false;
  public isLoadingRegistro: boolean = false;

  public formRegistrarEntradas: FormGroup = new FormGroup({});

  constructor(private estoqueService: EstoqueService) { }

  ngOnInit(): void {
    
    this.estoqueService.getEstoque().subscribe((prods) => {
      prods.forEach((peca:any) => {
        this.formRegistrarEntradas.addControl(peca.id_peca, new FormControl(0))
      });
  
      this.pecas = prods
      this.isPecasLoaded = true;
    })
  }

  public registrarEntradas(){
    this.isLoadingRegistro = true;
    const data = this.formRegistrarEntradas.value;
    this.estoqueService.registrarEntradas(data).subscribe((res) => {
    this.isLoadingRegistro = false;

      alert(res.msg)
      
    })
    
  }  
}

import { Component, OnInit } from '@angular/core';
import { EstoqueService } from '../estoque.service';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-registrar-entradas',
  templateUrl: './registrar-entradas.component.html',
  styleUrls: ['./registrar-entradas.component.scss']
})
export class RegistrarEntradasComponent implements OnInit {

  public pecas: any = [];
  public arrayFormEntradas: any = [];

  public formRegistrarEntradas: FormGroup = new FormGroup({});

  constructor(private estoqueService: EstoqueService, private fb: FormBuilder) { }

  ngOnInit(): void {
    
    this.estoqueService.getEstoque().subscribe((prods) => {
      prods.forEach((peca:any) => {
        this.formRegistrarEntradas.addControl(peca.id_peca, new FormControl(0))
      });
      console.log(this.formRegistrarEntradas);
  
      this.pecas = prods
    })
  }

  public registrarEntradas(){
    const data = this.formRegistrarEntradas.value;
    this.estoqueService.registrarEntradas(data).subscribe((res) => {
      console.log(res);
      alert(res.msg)
      
    })
    
  }  
}

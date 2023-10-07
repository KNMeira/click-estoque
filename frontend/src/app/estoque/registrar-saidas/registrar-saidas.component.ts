import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EstoqueService } from '../estoque.service';

@Component({
  selector: 'app-registrar-saidas',
  templateUrl: './registrar-saidas.component.html',
  styleUrls: ['./registrar-saidas.component.scss']
})
export class RegistrarSaidasComponent {
  public pecas: any = [];
  public arrayFormSaidas: any = [];
  public isPecasLoaded: boolean = false;
  public isLoadingRegistro: boolean = false;

  public formRegistrarSaidas: FormGroup = new FormGroup({});

  constructor(private estoqueService: EstoqueService) { }

  ngOnInit(): void {
    
    this.estoqueService.getEstoque().subscribe((prods) => {
      prods.forEach((peca:any) => {
        this.formRegistrarSaidas.addControl(peca.id_peca, new FormControl(0))
      });
  
      this.pecas = prods
      this.isPecasLoaded = true;
    })
  }

  public registrarSaidas(){
    this.isLoadingRegistro = true;
    const data = this.formRegistrarSaidas.value;
    this.estoqueService.registrarSaidas(data).subscribe((res) => {
      this.isLoadingRegistro = false;
      alert(res.msg)
      
    })
    
  }  

}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoModel } from 'src/app/models/producto.model';
import { ProductoService } from 'src/app/services/producto.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto-nuevo',
  templateUrl: './producto-nuevo.component.html',
  styleUrls: ['./producto-nuevo.component.css']
})
export class ProductoNuevoComponent implements OnInit {

  @Output() mostrar :EventEmitter<boolean>

  false = false;
  forma :FormGroup;
  producto :ProductoModel = new ProductoModel();

  constructor(  private fb: FormBuilder,
                private pd: ProductoService  
  ) { 
    this.crearFormulario();
    this.mostrar = new EventEmitter();
  }

  ngOnInit (): void {
  }

  crearFormulario () {
    this.forma = this.fb.group({
      nombre:       ['', [Validators.required, Validators.minLength(5)] ],
      precio:       ['', [Validators.required, Validators.min(0)] ],
      inventario:   ['', [Validators.required, Validators.min(0)] ],
      disponible:   ['', ],
      imagen:       ['', [Validators.required, Validators.minLength(10)]],
      descripcion:  ['', [Validators.required, Validators.minLength(5)] ]
    });   
  }

  guardar () {
    this.producto = this.forma.value;
    console.log( 'Producto', this.producto );
    if( this.forma.valid ){
      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        text: 'Espere por favor',
      });
      Swal.showLoading();
      this.pd.crearProducto( this.producto )
        .subscribe( resp => {
          Swal.close();
          Swal.fire({
            icon: 'success',
            text: 'Producto guardado con exito',
          });
          console.log( 'Resp', resp );
          this.mostrar.emit( this.false );
        }, ( err ) => {
          Swal.fire({
            allowOutsideClick: false,
            icon: 'error',
            title: 'Error',
            text: err.error.error.message,
          });
        });
    } else {
      Swal.fire({
        allowOutsideClick: false,
        icon: 'error',
        title: 'Error'
      });
    }
    console.log( this.forma );
    this.forma.reset();
  }

}

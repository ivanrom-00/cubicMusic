import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductoModel } from 'src/app/models/producto.model';
import { ProductoService } from 'src/app/services/producto.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  ocultar = false;
  productos : ProductoModel[];
  forma :FormGroup;
  producto :ProductoModel = new ProductoModel();

  constructor( private fb: FormBuilder, private pd: ProductoService, private router: Router ) {
   }

  ngOnInit(): void {
    this.getProducto();
  }

  getProducto () {
    this.pd.getProductos()
      .subscribe( resp => {
        this.productos = resp;
      });
  }

  crearFormulario ( producto :ProductoModel ) {
    this.forma = this.fb.group({
      id:           [producto.id , ],
      nombre:       [producto.nombre, [Validators.required, Validators.minLength(5)] ],
      precio:       [producto.precio, [Validators.required, Validators.min(0)] ],
      inventario:   [producto.inventario, [Validators.required, Validators.min(0)] ],
      disponible:   [producto.disponible, ],
      imagen:       [producto.imagen, [Validators.required, Validators.minLength(10)]],
      descripcion:  [producto.descripcion, [Validators.required, Validators.minLength(5)] ]
    });  
    this.ocultar = true; 
  }

  actualizar () {
    this.producto = this.forma.value;
    console.log( 'Producto', this.producto );
    if( this.forma.valid ){
      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        text: 'Espere por favor',
      });
      Swal.showLoading();
      this.pd.actualizarProducto( this.producto )
        .subscribe( resp => {
          Swal.close();
          Swal.fire({
            icon: 'success',
            text: 'Producto actualizado con exito',
          });
          console.log( 'Resp', resp );
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
    this.getProducto();
    this.router.navigateByUrl('/admin');
  }

  borrarProducto ( producto: ProductoModel, index ) {
    Swal.fire({
      title: '¿Esta seguro?',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {
      if( resp.value ) {
        this.productos.splice( index, 1 );
        this.pd.deleteProducto( producto.id ).subscribe( resp => {
          console.log( resp );
          
        });
      }
    })
  }

}

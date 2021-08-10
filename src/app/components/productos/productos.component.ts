import { Component, OnInit } from '@angular/core';
import { ProductoModel } from 'src/app/models/producto.model';
import { AuthService } from 'src/app/services/auth.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  sesion :boolean ;
  productos :ProductoModel[];

  constructor( private producto: ProductoService,
               private carrito : CarritoService,
               private auth: AuthService ) { 

    this.sesion = this.auth.estaAutenticado();

  }

  ngOnInit(): void {
    this.sesion = this.auth.estaAutenticado();
    this.getProducto();
  }

  getProducto () {
    this.producto.getProductos()
      .subscribe( (resp :ProductoModel[]) => {
        this.productos = resp;
      });      
  }

  agregarCarrito( producto : ProductoModel ) {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor',
    });
    Swal.showLoading();
    this.carrito.actualizarCarrito( producto ).then( resp => {
      console.log( resp );
      Swal.close();Swal.fire({
        icon: 'success',
        text: 'Producto agregado',
      })
    })
    
  }

}

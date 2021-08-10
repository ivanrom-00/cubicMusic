import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService } from 'src/app/services/carrito.service';
import Swal from 'sweetalert2';

import { CarritoModel } from 'src/app/models/carrito.model';

import { jsPDF } from "jspdf";
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {


  hayProd :boolean = false;
  car :any;
  total : number = 0;

  constructor( private carrito: CarritoService,
                private router : Router,
                private auth: AuthService
    ) { }

  ngOnInit(): void {
    this.getCarrito();
  }

  getCarrito () {
    this.carrito.obtenerCarrito().then( (resp: CarritoModel[]) => {
      console.log( resp );
      
      this.car = resp;
      this.obtenerTotal();
    });
  }

  obtenerTotal () {
    if( this.car.prods ) {
      this.car.prods.forEach( e => {
        this.total += e.precio * e.cant;
        this.hayProd = true;
      });
    }
  }

  comprar () {
    this.carrito.comprar().subscribe( resp => {
      this.venta();
    })
  }

  venta () {
    this.carrito.venta( this.total ).subscribe( resp => {
      this.getCarrito();
      Swal.close();Swal.fire({
        icon: 'success',
        text: 'Compra exitosa',
      });
      this.imprimir();
      this.router.navigateByUrl('/productos');
    })
  }

  imprimir() {  

      const prods = this.car.prods;

      const img = 'https://i1.sndcdn.com/avatars-000335053878-pdqhu1-t500x500.jpg';
      
      
      const doc = new jsPDF();
      doc.addImage( img, 'JPEG', 15, 15, 40, 40 );
      doc.setFontSize( 20 );
      doc.text( `Recibo de compra`, 80, 35 );
      doc.setFontSize( 10 );
      doc.text( `ID compra:  ${ this.car.id }`, 15, 60 );
      doc.text( `ID Usuario:  ${ this.car.usrId }`, 15, 70 );
      doc.text( `Fecha:  ${ new Date }`, 15, 80 );

      doc.line( 20, 93, 180, 93 );

      doc.text( `Nombre`, 30, 100 );
      doc.text( `Cantidad`, 83, 100  );
      doc.text( `Precio`, 110, 100 );
      doc.text( `Subtotal`, 150, 100  );

      doc.line( 20, 103, 180, 103 );

      let es = 10;
      prods.forEach( e => {
        doc.text( `${ e.nombre }`, 30, 100 + es );
        doc.text( `${ e.cant }`, 90, 100 + es );
        doc.text( `${ e.precio }`, 113, 100 + es );
        doc.text( `${ e.cant * e.precio }`, 153, 100 + es );
        es += 10;
      });

      doc.line( 20, 95 + es, 180, 95 + es );

      doc.setFontSize( 13 );

      doc.text( `Total:  $ ${ this.total }`, 150, 120 + es );
      
      doc.save('ticket');
    
  }



}

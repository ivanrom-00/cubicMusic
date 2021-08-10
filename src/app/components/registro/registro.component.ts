import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

import { UsuarioModel } from 'src/app/models/usuario.model';
import Swal from 'sweetalert2';
import { CarritoService } from 'src/app/services/carrito.service';
import { CarritoModel } from 'src/app/models/carrito.model';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  car: CarritoModel = new CarritoModel();
  recordarme = false;

  constructor(  private auth: AuthService,
                private router: Router,
                private carrito: CarritoService
) {
   }

  ngOnInit() {
    this.usuario = new UsuarioModel();
    this.usuario.email = 'fati@gmail.com';
    this.usuario.password = '123456';
    this.usuario.nombre = 'Fatima';
  }

  onSubmit(form : NgForm) {
    if ( form.invalid ) {
      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        text: 'Espere por favor',
      });
      Swal.showLoading();
    }
    this.auth.nuevoUsuario( this.usuario )
      .subscribe( resp => {
        console.log( 'Respuesta', resp );
        Swal.close();
        if( this.recordarme ){
          localStorage.setItem( 'email', this.usuario.email );
        }
        this.car.usrId = this.usuario.email;
        this.carrito.crearCarrito( this.car ).subscribe( resp => {
          console.log( ' Resp', resp );
          localStorage.setItem( 'carId', resp['name'] );
        })
        this.router.navigateByUrl('/home');
      }, ( err ) => {
        console.log( 'Error', err );
        Swal.fire({
          allowOutsideClick: false,
          icon: 'error',
          title: 'Error',
          text: err.error.error.message,
        });
        
      });
  }


}

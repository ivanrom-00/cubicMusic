import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { CarritoService } from 'src/app/services/carrito.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();
  recordarme = false;

  constructor( private auth: AuthService,
               private router: Router,
               private carrito : CarritoService
  ) {

   }

  ngOnInit(): void {
    if( localStorage.getItem( 'email' ) ){
      this.usuario.email = localStorage.getItem( 'email' );
      this.recordarme = true;
    }
    this.usuario.email = 'fati@gmail.com';
    this.usuario.password = '123456';

  }

  login ( form: NgForm) {
    if ( form.invalid ) {
      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        text: 'Espere por favor',
      });
      Swal.showLoading();
    }
    this.auth.login( this.usuario )
      .subscribe( resp => {
        Swal.close();
        if( this.recordarme ){
          localStorage.setItem( 'email', this.usuario.email );
        }
        this.carrito.getCarrito();
        this.router.navigateByUrl('/home');
      }, ( err )=> {
        this.auth.verificarAdmin( this.usuario ).then( resp => {
          this.router.navigateByUrl('/admin');
        }).catch ( err => {
          Swal.fire({
            allowOutsideClick: false,
            icon: 'error',
            title: 'Error',
            text: 'Verifique los datos'
          });
        })
      });
  }

}

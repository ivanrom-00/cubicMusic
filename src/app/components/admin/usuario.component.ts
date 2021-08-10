import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  editar = false;
  admins :any;
  forma: FormGroup;
  usuario : UsuarioModel = new UsuarioModel();

  constructor( private auth: AuthService,
                private fb : FormBuilder,
                private router: Router ) { }

  ngOnInit(): void {
    this.getUsuarios();
  }

  crearFormulario ( admin : UsuarioModel) {
    this.forma = this.fb.group({
      id:         [ admin.id ,      [Validators.required, Validators.minLength(5)] ],
      nombre:     [ admin.nombre ,  [Validators.required, Validators.min(0)] ],
      email:      [ admin.email ,   [Validators.required, Validators.min(0)] ],
      password:   [ admin.password , ]
    }); 
    this.editar = true; 
  }

  getUsuarios () {
    this.auth.getAdmin().then( resp => {
      this.admins = resp;
    });
    
  }

  actualizar () {
    this.usuario = this.forma.value;
    if( this.forma.valid ){
      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        text: 'Espere por favor',
      });
      Swal.showLoading();
      this.auth.actualizarAdmin( this.usuario )
        .subscribe( resp => {
          Swal.close();
          Swal.fire({
            icon: 'success',
            text: 'Usuario actualizado con exito',
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
    this.getUsuarios();
    this.router.navigateByUrl('/admin');
  }

  borrarUsuario( usuario: UsuarioModel, index ) {
    Swal.fire({
      title: '¿Esta seguro?',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {
      if( resp.value ) {
        this.admins.splice( index, 1 );
        this.auth.eliminarAdmin( usuario.id ).subscribe( resp => {
          console.log( resp );
        });
      }
    })
  }


}

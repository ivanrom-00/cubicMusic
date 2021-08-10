import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-new-edi',
  templateUrl: './usuario-new-edi.component.html',
  styleUrls: ['./usuario-new-edi.component.css']
})
export class UsuarioNewEdiComponent implements OnInit {

  forma :FormGroup;
  usuario :UsuarioModel = new UsuarioModel();
  router: any;

  constructor( private fb: FormBuilder,
               private auth: AuthService
  ) {
    this.crearFormulario();      
    }

  ngOnInit(): void {
  }

  crearFormulario () {
    this.forma = this.fb.group({
      id:         ['', ],
      nombre:     ['', [Validators.required, Validators.minLength(4)] ],
      email:      ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
      password:   ['', [Validators.required, Validators.minLength(6)] ],
    });
  }

  guardar () {
    this.usuario = this.forma.value;
    if( this.forma.valid ){
      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        text: 'Espere por favor',
      });
      Swal.showLoading();

      this.auth.createAdmin( this.usuario ).subscribe( resp => {
        Swal.close()
        Swal.fire({
          icon: 'success',
          text: 'Admin guardado con exito',
      });
        this.router.navigateByUrl('/admin');
        console.log( 'Resp', resp );
      })
    } else {
      Swal.close
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

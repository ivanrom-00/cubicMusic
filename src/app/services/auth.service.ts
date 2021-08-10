import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';

import { map } from 'rxjs/operators';
import { rejects } from 'assert';
import { UsuarioNewEdiComponent } from '../components/admin/usuario-new-edi/usuario-new-edi.component';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts';
  private apikey ='AIzaSyCuIhlcPsn9LPbq5GW4u7DtaCaVkDLgd7I';

  userToken: string;

  private urlAdmin = 'https://cubic-music-default-rtdb.firebaseio.com/cubic-music';
  
  // Crear nuevo ususario
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  // Login
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  private urlIcon = 'https://cubic-music-default-rtdb.firebaseio.com/cubic-music';

  constructor( private http: HttpClient ) {
    this.leerToken();
   }

   verificarAdmin( usuario : UsuarioModel ) {
     return new Promise((res, rej) => {
      this.http.get(
        `${ this.urlAdmin }/Usuario.json` )
         .subscribe( async resp => {
           this.adminExiste( usuario, resp ).then( resp => {
            res( resp );
           });
         });
     })
   }

   adminExiste( usuario: UsuarioModel, resp ) {
    return new Promise ( (res, rej) => {
      this.crearArreglo( resp ).then( (users : UsuarioModel[]) => {
        users.find( e => {
          if (usuario.email === e.email ) {
            res( true );
          }
        });
      });
    });
   }

   private crearArreglo ( userObj: object ) {
    const usuarios: UsuarioModel[] = [];
    return new Promise ( (res, rej ) => {
      Object.keys( userObj ).forEach( key => {
        const usuario : UsuarioModel = userObj[key];
        usuario.id = key;
        usuarios.push( usuario );
        res( usuarios );
      });
      rej( [] );
    }); 
   }

   logout () {
    localStorage.removeItem( 'token' );
    localStorage.removeItem( 'expira' );
    localStorage.removeItem( 'carId' );
    localStorage.removeItem( 'userId' );
   }

   login ( usuario: UsuarioModel ) {
    const authData = {
      ...usuario,
      returnSecureToken: true
    };
    return this.http.post(
      `${ this.url }:signInWithPassword?key=${ this.apikey }`,
      authData
    ).pipe(
      map( resp => {
        localStorage.setItem('userId', resp['email']);
        this.guardarToken( resp['idToken'] );
        return resp;
      })
    );
   }

   nuevoUsuario ( usuario: UsuarioModel ){

    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${ this.url }:signUp?key=${ this.apikey }`,
      authData
    ).pipe(
      map( resp => {
        console.log('Entro en el mapa de usuario');
        localStorage.setItem('userId', resp['email']);
        this.guardarToken( resp['idToken'] );
        return resp;
      })
    );
   }

   getAdmin(){
     return new Promise((res, rej) => {
      this.http.get(
        `${ this.urlAdmin }/Usuario.json`
      ).subscribe( resp => {
        this.crearArreglo( resp ).then( (users:UsuarioModel[]) => {
          res( users );
        })
      })
     })
   }

   createAdmin ( user: UsuarioModel ){
    return this.http.post(
      `${ this.urlAdmin }/Usuario.json`, user
    )
   }

   actualizarAdmin ( user: UsuarioModel ){
    const usuarioObj = {
      ...user
    }
    delete usuarioObj.id;
    return this.http.put(
      `${ this.urlAdmin }/Usuario/${ user.id }.json`, 
        usuarioObj
    )
  }

  eliminarAdmin( id: string ){
    return this.http.delete(
      `${ this.urlAdmin }/Usuario/${ id }.json`
    )
  }

   private guardarToken ( idToken: string ) {
    this.userToken = idToken;
    localStorage.setItem( 'token', idToken );

    let hoy = new Date();
    hoy.setSeconds( 3600 );

    localStorage.setItem( 'expira', hoy.getTime().toString() );
   }

   leerToken () {
     if( localStorage.getItem( 'token' ) ){ 
       this.userToken = localStorage.getItem( 'token' );
     } else {
       this.userToken = '';
     }
     return this.userToken;
   }

   estaAutenticado () :boolean {
     if ( this.userToken.length < 2 ) {
       return false;
     }

     const expira = Number(localStorage.getItem( 'expira' ));
     const expiraDate = new Date();
     expiraDate.setTime( expira );

     if ( expiraDate > new Date() ) {
      return true;
     } else {
       return false;
     }
   }

   obtenerVentas() {
     return new Promise ( (res ) => {
      this.http.get(
        `${ this.urlAdmin }/Ventas.json`
      ).subscribe( resp => {
        const resul = this.crearArreglo( resp );
        res( resul );
      })
     })
   }

   getUserId() {
     if ( localStorage.getItem('userId') ) {
       return localStorage.getItem('userId');
     }
   }

   getIconos () {
    return this.http.get(
      `${ this.urlIcon }/Icono.json`
    );
   }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, repeat } from 'rxjs/operators';
import { CarritoModel } from '../models/carrito.model';
import { ProductoModel } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  carritoUsuario : CarritoModel = new CarritoModel();
  total: number = 0;

  private url = 'https://cubic-music-default-rtdb.firebaseio.com/cubic-music';

  constructor( private http: HttpClient ) { 
  }

  getCarrito() {
    return new Promise ( ( res, rej ) => {
      this.http.get(
        `${ this.url }/Carrito.json`)
          .subscribe( resp => {
            const carritos = this.crearArreglo( resp );
            this.asignarCarrito( localStorage.getItem( 'userId' ), carritos ).then( (respu : CarritoModel ) => {
              this.carritoUsuario = respu;
              localStorage.setItem( 'carId', this.carritoUsuario.id );
              res( respu );
            })
          })
      });
  }

  obtenerCarrito() {
    return new Promise((resolve) => {
      this.getCarrito().then( resp => {
        resolve( resp );
      })
    });
  }

  asignarCarrito( usrId : string, array : CarritoModel[] ) {
    return new Promise ( ( res ) => {
      array.find( e => {
        if( e.usrId === usrId) {
           res( e );
        }
      });
    })
  }

  crearCarrito ( carrito :CarritoModel ) {
    delete carrito.id;
    return this.http.post(
      `${ this.url }/Carrito.json`, carrito
    )
  }

  putCarrito( item: ProductoModel ) {
    const carrito = {
      usrId: localStorage.getItem( 'userId'),
      prods: {
        name: item.nombre,
        cant: 1,
        precio: item.precio,
      }
    }
    return this.http.post( 
      `${ this.url }/Carrito.json`, carrito
    )
  }

  private obtenerIndex( nombre:string, array : any[] ) {
    return new Promise((resolve, reject ) => {
      let index = 0;
      array.forEach( e => {
        if( e.nombre === nombre ) {
          resolve( index );
        } else {
          index ++;
        }
      })
      resolve( index );
    })
  }

  actualizarCarrito( producto : ProductoModel ) {
    return new Promise ( ( res )=> {
      this.getCarrito().then( (resp :CarritoModel) => {
        let cant = 1;
        let index = 0;
        if ( resp.prods ) {
          this.obtenerIndex( producto.nombre, resp.prods ).then ( (respu :number ) => {
            index = respu;

            this.total = resp.total;

            if ( resp.prods[index] === undefined ){
              cant = 1;
            } else { 
              cant = resp.prods[index].cant + 1;
            }
            const prodObj = {
              nombre: producto.nombre,
              precio: producto.precio,
              cant: cant
            }
            const id = localStorage.getItem( 'carId' );
            this.http.put( 
              `${ this.url }/Carrito/${ id }/prods/${ index }.json`, prodObj)
              .subscribe( respuesta => {
               res( respuesta );
             })
          }).catch( err => {
            console.log('Error', err );
          })
        } else {
          const prodObj = {
            nombre: producto.nombre,
            precio: producto.precio,
            cant: cant
          }
          const id = localStorage.getItem( 'carId' );
          this.http.put( 
            `${ this.url }/Carrito/${ id }/prods/${ index }.json`, prodObj)
            .subscribe( respuesta => {
             res( respuesta );
           })
        }
      })
    })
  }

  comprar () {
    const carrito = {
      usrId: localStorage.getItem( 'userId' )
    }
    const id = localStorage.getItem( 'carId' );
    return this.http.put(
      `${ this.url }/Carrito/${ id }.json`, carrito 
    )
  }

  venta ( total ) {
    const venta = {
      usrId : localStorage.getItem( 'userId' ),
      fecha: new Date(),
      total: total
    }
    return this.http.post(
      `${ this.url }/Ventas.json`, venta
    )
  }

  private crearArreglo ( carritoObj: object ) {
    let total = 0;
    const carritos: CarritoModel[] = [];
    if ( carritoObj === null ) {
      return [];
    }
    Object.keys( carritoObj ).forEach( key => {
      const carrito : CarritoModel = carritoObj[key];
      carrito.id = key;
      carritos.push( carrito );
    });
    return carritos;
   }
}

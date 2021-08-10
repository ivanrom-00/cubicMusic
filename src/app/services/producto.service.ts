import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductoModel } from '../models/producto.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private url = 'https://cubic-music-default-rtdb.firebaseio.com/cubic-music';

  constructor( private http: HttpClient ) {

   }

   deleteProducto ( id: string ) {
     return this.http.delete(
       `${ this.url }/Producto/${ id }.json`
     )
   }

   getProductos () {
     return this.http.get(
       `${ this.url }/Producto.json`
     ).pipe(
      map( this.crearArreglo )
     );
   }

   actualizarProducto( producto: ProductoModel ) {
     const productoObj = {
       ...producto
     }
     delete productoObj.id;
     return this.http.put(
        `${ this.url }/Producto/${ producto.id}.json`,
        productoObj
     );
   }

   crearProducto ( producto: ProductoModel ) {
     return this.http.post(
       `${ this.url }/Producto.json`,
       producto
     );
   }

   private crearArreglo ( productoObj: object ) {
    const productos: ProductoModel[] = [];
    if ( productoObj === null ) {
      return [];
    }
    Object.keys( productoObj ).forEach( key => {
      const producto : ProductoModel = productoObj[key];
      producto.id = key;
      productos.push( producto );
    });
    return productos;
   }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArtistaService {

  private url = 'https://cubic-music-default-rtdb.firebaseio.com/cubic-music';

  constructor( private http: HttpClient) {

   }

   getArtistas () {
     return this.http.get(
       `${ this.url }/Artista.json`
     )
   }

   getArtista ( index ) {
      return this.http.get(
        `${ this.url }/Artista/${ index }.json`
    )
   }
}
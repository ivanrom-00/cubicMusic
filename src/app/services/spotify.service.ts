import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  token = '';

  constructor(private http: HttpClient) {
    console.log('Spotify Service Listo');
  }

  getQuery( query: string ) {

    const url = `https://api.spotify.com/v1/${ query }`;

    const urlSpotify = 'https://token-spotify-pollito.herokuapp.com/spotify/a2a5973dcd2e40dcb310e53920cda41e/816e498b559b4454a8f208f6bc01d587';
    

    this.http.get( `${ urlSpotify }`).subscribe( resp => {
      this.token = `${ resp['token_type'] } ${ resp['access_token']}`;
    })

    const headers = new HttpHeaders({
      'Authorization': this.token
    });

    return this.http.get(url, { headers });

  }


  getNewReleases() {

    return this.getQuery('browse/new-releases?limit=20')
              .pipe( map( data => data['albums'].items ));

  }

  getArtistas( termino: string ) {

    return this.getQuery(`search?q=${ termino }&type=artist&limit=15`)
                .pipe( map( data => data['artists'].items));

  }

  getArtista( id: string ) {

    return this.getQuery(`artists/${ id }`);
                // .pipe( map( data => data['artists'].items));

  }

  getTopTracks( id: string ) {

    return this.getQuery(`artists/${ id }/top-tracks?country=us`)
                .pipe( map( data => data['tracks']));

  }

  getToken () {
    this.http.get(
      ``
    )
  }

}

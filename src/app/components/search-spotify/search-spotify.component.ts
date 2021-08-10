import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-search-spotify',
  templateUrl: './search-spotify.component.html',
  styleUrls: ['./search-spotify.component.css']
})
export class SearchSpotifyComponent {

  error: boolean;

  artistas: any[] = [];
  loading: boolean;

  constructor(private spotify: SpotifyService) {

    this.error = false;

   }

  buscar(termino: string) {
    console.log(termino);

    this.loading = true;
    this.spotify.getArtistas( termino )
          .subscribe( (data: any) => {
            console.log(data);
            this.artistas = data;
            this.loading = false;
          }, ( err ) => {
            this.error = true;
          })
  }

}

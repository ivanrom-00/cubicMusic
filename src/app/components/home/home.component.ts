import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArtistaModel } from 'src/app/models/artista.model';
import { ArtistaService } from 'src/app/services/artista.service';
import { AuthService } from 'src/app/services/auth.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public artistas :ArtistaModel[] = [];

  constructor( private auth: AuthService,
               private art: ArtistaService,
               private spotify: SpotifyService,
               private router: Router       ) { }

  ngOnInit(): void {
    this.getArtistas();
    this.spotify.getNewReleases();
  }

  getArtistas () {
    this.art.getArtistas()
      .subscribe( (resp: ArtistaModel[]) => {
        this.artistas = resp;
      });
  }

  salir () {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }

}

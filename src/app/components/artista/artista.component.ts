import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistaModel } from 'src/app/models/artista.model';
import { ArtistaService } from 'src/app/services/artista.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styleUrls: ['./artista.component.css']
})
export class ArtistaComponent implements OnInit {

  artist : ArtistaModel;

  constructor(  private activatedRoute : ActivatedRoute,
                private artista : ArtistaService) { }

  ngOnInit(): void {
    this.getArtista( )
  }

  getArtista () {
    this.activatedRoute.params.subscribe( param => {
      this.artista.getArtista( param['id'] ).subscribe( (resp : ArtistaModel) => {
        this.artist = resp;
      })
    })
  }

}

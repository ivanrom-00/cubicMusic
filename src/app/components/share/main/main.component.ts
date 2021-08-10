import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArtistaModel } from 'src/app/models/artista.model';
import { ArtistaService } from 'src/app/services/artista.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  artista: ArtistaModel = new ArtistaModel();
  artistas: any;

  constructor( private artistaService: ArtistaService,
              private router: Router ) { 
    
  }

  ngOnInit(): void {
    this.getArtista();
  }

  getArtista() {
    this.artistaService.getArtistas().subscribe( resp => {
      this.artistas = resp;
    });
  }

}

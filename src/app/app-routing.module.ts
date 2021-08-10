import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { ProductoComponent } from './components/admin/producto.component';
import { ProductoNuevoComponent } from './components/admin/producto/producto-nuevo.component';
import { UsuarioNewEdiComponent } from './components/admin/usuario-new-edi/usuario-new-edi.component';
import { UsuarioComponent } from './components/admin/usuario.component';
import { VentasComponent } from './components/admin/ventas.component';
import { ArtistaSpotifyComponent } from './components/artista-spotify/artista-spotify.component';
import { ArtistaComponent } from './components/artista/artista.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { ConocenosComponent } from './components/conocenos/conocenos.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { HomeSpotifyComponent } from './components/home-spotify/home-spotify.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProduccionesComponent } from './components/producciones/producciones.component';
import { ProductosComponent } from './components/productos/productos.component';
import { RegistroComponent } from './components/registro/registro.component';
import { SearchSpotifyComponent } from './components/search-spotify/search-spotify.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'conocenos', component: ConocenosComponent },
  { path: 'servicios', component: ServiciosComponent },
  { path: 'producciones', component: ProduccionesComponent },
  { path: 'artista/:id', component: ArtistaComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'admin', component: AdminComponent,
    children: [
      { path: 'producto', component: ProductoComponent},
      { path: 'ventas', component: VentasComponent},
      { path: 'productoNuevo', component: ProductoNuevoComponent },
      { path: 'usuario', component: UsuarioComponent,
      children: [
      { path: 'usuarioAccion', component: UsuarioNewEdiComponent},
      ]
    },
      { path: '**', pathMatch: 'full', redirectTo: 'ventas' }
    ]
  },
  { path: 'carrito', component: CarritoComponent },  // canActivate:[ AuthGuard ] 
  { path: 'homeSpotify', component: HomeSpotifyComponent },
  { path: 'artist/:id', component: ArtistaSpotifyComponent },
  { path: 'search', component: SearchSpotifyComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

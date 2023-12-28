import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { PokedexComponent } from './pages/pokedex/pokedex.component';
import { InternaPokedexComponent } from './pages/interna-pokedex/interna-pokedex.component';


const routes: Routes = [
  {
    path: '',
    component: PokedexComponent
  },
  {
    path: 'pokedex',
    children:[
      { path: '', component: PokedexComponent},
      { path: ':slug', component: InternaPokedexComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

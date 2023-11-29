import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardPokemonComponent } from './card-pokemon/card-pokemon.component';
import { RouterModule } from '@angular/router'


@NgModule({
  declarations: [
    CardPokemonComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    CardPokemonComponent
  ],
})
export class ComponentsModule { }

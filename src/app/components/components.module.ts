import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardPokemonComponent } from './card-pokemon/card-pokemon.component';

@NgModule({
  declarations: [
    CardPokemonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CardPokemonComponent
  ],
})
export class ComponentsModule { }

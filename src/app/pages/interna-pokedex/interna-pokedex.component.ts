import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

interface PokemonForm {
  normal:string;
  shiny:string;
  active:boolean
}

@Component({
  selector: 'app-interna-pokedex',
  templateUrl: './interna-pokedex.component.html',
  styleUrls: ['./interna-pokedex.component.sass']
})

export class InternaPokedexComponent implements OnInit {
  showShiny:boolean = false;
  pokemonForms:PokemonForm[] = [
    {
      normal: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png',
      shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/6.png',
      active: true
    },
    {
      normal: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10034.png',
      shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/10034.png',
      active: false
    },
    {
      normal: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10035.png',
      shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/10035.png',
      active: false
    },
    {
      normal: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10196.png',
      shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/10196.png',
      active: false
    }
  ]    

  seePokemonShiny():void{
    if (this.showShiny == false) {
      this.showShiny = true
    } else{
      this.showShiny = false
    }    
  }

  toggleForm(index: number):void {
    this.pokemonForms.forEach((pokemonForm, i) => {
      pokemonForm.active = i === index;
    });
  }

  isFirstFormActive():boolean {
    return this.pokemonForms.length > 0 && !this.pokemonForms[0].active;
  }

  constructor(
    private location:Location
  ) { }

  back(): void {
    this.location.back();
  }

  ngOnInit(): void {
  }

}

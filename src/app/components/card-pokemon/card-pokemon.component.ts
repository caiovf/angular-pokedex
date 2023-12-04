import { Component, Input, OnInit } from '@angular/core';
import { PokemonData } from 'src/app/models/pokemonData';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-card-pokemon',
  templateUrl: './card-pokemon.component.html',
  styleUrls: ['./card-pokemon.component.sass']
})
export class CardPokemonComponent implements OnInit {
  @Input() pokemonName:string = '';

  pokemon:PokemonData = {
    id: 0,
    name: '',
    sprites: {
      other: {
        'official-artwork': {
          front_default: '',
          front_shiny: ''
        }
      }
    },
    types: [{
      slot:0,
      type: {
          name:'',
          url:''
      },
    }],
    stats:[{
      base_stat: '',
      effort: 0,
      stat:{
          name: ''
      }
    }]
  }
  pokemonTypes:string[] = ['fire']

  constructor(
    private service:PokemonService
  ) { }

  ngOnInit(): void {
    this.service.getPokemon(this.pokemonName).subscribe(
      {
        next: (res) => {
          this.pokemon = res
        },
        error: (err) => console.error(err)
      }
    )
  }

}
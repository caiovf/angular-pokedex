import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { PokemonService } from 'src/app/services/pokemon.service';
import { ActivatedRoute } from '@angular/router';
import { PokemonData, PokemonEvolutionTree, PokemonSpecie } from 'src/app/models/pokemonData';

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

export class InternaPokedexComponent implements OnInit  {
  pokemonName:string = ''
  showShiny:boolean = false
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

  pokemonSpecies:PokemonSpecie = {
    evolution_chain: {
      url: ''
    },
    flavor_text_entries: [{
      flavor_text:'',
        languague: {
            name:'',
            url:''
        },
        version: {
            name:'',
            url:''
        }
    }],
    varieties: [{
      is_default:false,
      pokemon:{
          name:'',
          url:''
      }
    }]
  }

  pokemonEvolution:PokemonEvolutionTree = {
    baby_trigger_item: null,
    chain: {
      evolution_details: [],
      is_baby: false,
      species: {
        name: '',
        url: ''
      }
    },
    id: 0
  };

  seePokemonShiny():void{
    if (this.showShiny == false) {
      this.showShiny = true
    } else{
      this.showShiny = false
    }
  }

  toggleForm(index: number):void {
    this.pokemonSpecies.varieties.forEach((pokemonForm, i) => {
      pokemonForm.is_default = i === index;
    });
  }

  isFirstFormActive():boolean {
    return this.pokemonForms.length > 0 && !this.pokemonSpecies.varieties[0].is_default;
  }

  getPokemonIdByUrl(url:string) {
    const urlParts = url.split('/');
    return urlParts[urlParts.length - 2];
  }

  constructor(
    private activeRoute: ActivatedRoute,
    private location:Location,
    private service:PokemonService
  ) { }

  back(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe({
      next: (res) => {
        this.pokemonName = res['slug'];
      }
    });

    this.service.getPokemon(this.pokemonName).subscribe({
      next: (res) => {
        this.pokemon = res;

        this.service.getSinglePokemon(this.pokemonName, this.pokemon.id).subscribe({
          next: (resSingle) => {
            this.pokemonSpecies = resSingle[0]
            this.pokemonEvolution = resSingle[1]
          },
          error: (err) => console.error(err)
        });
      },
      error: (err) => console.error(err)
    });
  }
}
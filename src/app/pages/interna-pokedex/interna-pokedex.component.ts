import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { PokemonService } from 'src/app/services/pokemon.service';
import { ActivatedRoute } from '@angular/router';
import { PokemonData, PokemonEvolutionTree, PokemonSpecie, Chain, Species } from 'src/app/models/pokemonData';
import { Subscription } from 'rxjs';


interface PokemonForm {
  normal:string;
  shiny:string;
  active:boolean
}

interface SpeciesInfo {
  id: number;
  name: string;
}

interface FlavorTextEntry {
  flavor_text: string;
  language: {
    name: string;
    url: string;
  };
  version: {
    name: string;
    url: string;
  };
}

@Component({
  selector: 'app-interna-pokedex',
  templateUrl: './interna-pokedex.component.html',
  styleUrls: ['./interna-pokedex.component.sass']
})

export class InternaPokedexComponent implements OnInit, OnDestroy  {
  private routeSubscription: Subscription | undefined;
  pokemonName:string = ''
  showShiny:boolean = false
  randomFlavorText:number = 0;

  speciesInfoArray:SpeciesInfo[] = [];
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
      base_stat: 0,
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
        url: '',
        evolves_to: undefined
      }
    },
    id: 0,
    evolves_to: []
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

  extractSpeciesInfoFromChain(chain: Chain, result: SpeciesInfo[] = []): SpeciesInfo[] {
    if (chain.species) {
      const id = parseInt(chain.species.url.split('/').slice(-2, -1)[0], 10);
      result.push({ id, name: chain.species.name });
    }
  
    if (chain.evolves_to) {
      for (const evolvesTo of chain.evolves_to) {
        this.extractSpeciesInfoFromChain(evolvesTo, result);
      }
    }
  
    return result;
  }

  extractSpeciesInfo(species: Species, speciesInfoArray: SpeciesInfo[]) {
    if (species) {
      speciesInfoArray.push({
        id: parseInt(this.getPokemonIdByUrl(species.url)),
        name: species.name,
      });
  
      if (species.evolves_to && species.evolves_to.length > 0) {
        for (const evolvesTo of species.evolves_to) {
          this.extractSpeciesInfo(evolvesTo.species, speciesInfoArray);
        }
      }
    }
  }
  
  extractAllSpeciesInfoFromEvolutionTree(tree: PokemonEvolutionTree): SpeciesInfo[] {
    const speciesInfoArray: SpeciesInfo[] = [];
  
    const processChain = (chain: Chain) => {
      if (chain.species) {
        this.extractSpeciesInfo(chain.species, speciesInfoArray);
      }
  
      if (chain.evolves_to && chain.evolves_to.length > 0) {
        for (const evolvesTo of chain.evolves_to) {
          processChain(evolvesTo);
        }
      }
    };
  
    if (tree && tree.chain) {
      processChain(tree.chain);
    }
  
    return speciesInfoArray;
  }

  getRandomIndexByLanguage(data: any, language: string = 'en'): number {
    const indices = data.flavor_text_entries
      .map((entry: any, index: number) => (entry.language.name === language ? index : -1))
      .filter((index: number) => index !== -1);

    return indices.length > 0 ? indices[Math.floor(Math.random() * indices.length)] : null;
  }

  substituirString(str: string, antigo: string, novo: string): string {
    return str.replace(antigo, novo);
  }

  statsCalculator(statName:string,stat:number){
    let mtp = 0
    switch (statName) {
      case 'hp':
        mtp = 3.8
      break;
      case 'attack':
        mtp = 2.6
      break;
      case 'defense':
        mtp = 2.5
      break;
      case 'special-attack':
        mtp = 2.1
      break;
      case 'special-defense':
        mtp = 2.4
      break;
      case 'speed':
        mtp = 2.4
      break;      
    
      default:
        mtp = 2.5
      break;
    }

    return Math.floor(stat * mtp)
  }
  
  constructor(
    private activeRoute: ActivatedRoute,
    private location:Location,
    private service:PokemonService
  ) { }

  back(): void {
    this.location.back();
  }

  private loadData(): void {
    this.service.getPokemon(this.pokemonName).subscribe({
      next: (res) => {
        this.pokemon = res;
        console.log(this.pokemon.stats);

        this.service.getSinglePokemon(this.pokemonName).subscribe({
          next: (resSingle) => {
            this.pokemonSpecies = resSingle[0];
            this.pokemonEvolution = resSingle[1];

            this.speciesInfoArray = this.extractAllSpeciesInfoFromEvolutionTree(this.pokemonEvolution);
            this.randomFlavorText = this.getRandomIndexByLanguage(this.pokemonSpecies.flavor_text_entries);
          },
          error: (err) => console.error(err)
        });
      },
      error: (err) => console.error(err)
    });
  }

  ngOnInit(): void {

    this.activeRoute.params.subscribe({
      next: (res) => {
        this.pokemonName = res['slug'];
        this.loadData();
      }
    });    
  }

  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }
}
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

@Component({
  selector: 'app-interna-pokedex',
  templateUrl: './interna-pokedex.component.html',
  styleUrls: ['./interna-pokedex.component.sass']
})

export class InternaPokedexComponent implements OnInit, OnDestroy  {
  private routeSubscription: Subscription | undefined;
  pokemonName:string = ''
  showShiny:boolean = false
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

        this.service.getSinglePokemon(this.pokemonName).subscribe({
          next: (resSingle) => {
            this.pokemonSpecies = resSingle[0];
            this.pokemonEvolution = resSingle[1];

            this.speciesInfoArray = this.extractAllSpeciesInfoFromEvolutionTree(this.pokemonEvolution);

            // console.log(this.pokemonEvolution.chain)
            console.log(this.extractAllSpeciesInfoFromEvolutionTree(this.pokemonEvolution));
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
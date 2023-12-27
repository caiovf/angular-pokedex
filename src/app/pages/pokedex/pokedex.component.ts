import { Component, OnInit } from '@angular/core';
import { PokemonListData } from 'src/app/models/pokemonData';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.sass']
})
export class PokedexComponent implements OnInit {
  offset:number = 0
  limit:number = 30
  firstGerationPokemon:number = 151
  loadmore:boolean = true;

  pokemons:PokemonListData = {
    count:0,
    next: null,
    previous:  null,
    results: [{
      name:'',
      url: ''
    }]
  }

  constructor(
    private service:PokemonService
  ) { }

  loadmorePokemons():void{

    if(this.pokemons.count >= this.firstGerationPokemon){
      this.offset += 30
      const nextLoading = this.offset + this.limit;

      if(nextLoading >= this.firstGerationPokemon){
        this.limit = this.firstGerationPokemon - this.offset
        this.loadmore = false;
      }

      this.service.getListPokemon(this.offset,this.limit).subscribe(
        {
          next: (res) => {
            this.pokemons.results.push(...res.results)
          },
          error: (err) => console.error(err)
        }
      )
    }
  }

  ngOnInit(): void {
    this.service.getListPokemon(this.offset,this.limit).subscribe(
      {
        next: (res) => {
          this.pokemons = res
          this.firstGerationPokemon = res.count
        },
        error: (err) => console.error(err)
      }
    )

  }

}
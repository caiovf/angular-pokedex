import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, forkJoin, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment'
import { PokemonData, PokemonEvolutionTree, PokemonListData, PokemonSingle, PokemonSpecie } from '../models/pokemonData'

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private baseURL:string = ""
  private pokeData: PokemonData | any
  private pokeList: PokemonListData | any  

  constructor(
    private http:HttpClient
  ) {
    this.baseURL = environment.apiUrl
  }

  getListPokemon(offset:number,limit:number):Observable<PokemonListData>{
    this.pokeList =
    this
    .http
    .get<PokemonListData>
    (`${this.baseURL}pokemon/?offset=${offset}&limit=${limit}`)

    return this.pokeList
  }

  getPokemon(pokemonName:string):Observable<PokemonData>{
    this.pokeData =
    this
    .http
    .get<PokemonData>
    (`${this.baseURL}pokemon/${pokemonName}`)

    return this.pokeData
  }

  getSinglePokemon(pokemonName: string): Observable<PokemonSingle> {
    let pokemonEvolutionUrl: string;
      
    const pokemonSpecie$ = this.http.get<PokemonSpecie>(`${this.baseURL}pokemon-species/${pokemonName}`)
      .pipe(        
        switchMap((data) => {          
          pokemonEvolutionUrl = data.evolution_chain.url;          
          return of(data);
        })
      );
      
    const pokemonEvolutionTree$ = pokemonSpecie$
      .pipe(
        switchMap(() => this.http.get<PokemonEvolutionTree>(pokemonEvolutionUrl))
      );    
      
    return forkJoin([pokemonSpecie$, pokemonEvolutionTree$]);
  }
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'
import { PokemonData, PokemonListData } from '../models/pokemonData'

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
    (`${this.baseURL}?offset=${offset}&limit=${limit}`)

    return this.pokeList
  }

  getPokemon(pokemonName:string):Observable<PokemonData>{
    this.pokeData = 
    this
    .http
    .get<PokemonData>
    (`${this.baseURL}${pokemonName.toLowerCase()}`)

    return this.pokeData
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, forkJoin } from 'rxjs';
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

  getSinglePokemon(pokemonName:string,pokemonId:number):Observable<PokemonSingle>{
    const pokemonSpecie = this.http.get<PokemonSpecie>(`${this.baseURL}pokemon-species/${pokemonName}`)
    const pokemonEvolutionTree = this.http.get<PokemonEvolutionTree>(`${this.baseURL}evolution-chain/${pokemonId}`)

    return forkJoin([pokemonSpecie,pokemonEvolutionTree])
  }
}
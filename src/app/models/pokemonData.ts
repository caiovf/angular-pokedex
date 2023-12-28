export type PokemonData = {
    name:string
    id:number
    types:[{
        slot:number,
        type: {
            name:string,
            url:string
        },
    }]
    sprites:{
        other:{
            'official-artwork':{
                front_default:string
                front_shiny:string
            }
        }
    }
    stats:[{
        base_stat:number
        effort:number
        stat:{
            name:string
        }
    }]
}

export type PokemonListData = {
    count:number,
    next:string|null,
    previous: string|null,
    results: [{
        name:string,
        url:string
    }]
}

export type PokemonSpecie = {
    evolution_chain: {
        url:string
    }
    flavor_text_entries: [{
        flavor_text:string
        languague: {
            name:string
            url:string
        }
        version: {
            name:string
            url:string
        }
    }]
    varieties:[{
        is_default:boolean
        pokemon:{
            name:string
            url:string
        }
    }]
}

// Evolution Tree

interface EvolutionTrigger {
    name: string;
    url: string;
}

interface EvolutionDetails {
    gender: null | string;
    held_item: null | string;
    item: null | string;
    known_move: null | string;
    known_move_type: null | string;
    location: null | string;
    min_affection: null | string;
    min_beauty: null | string;
    min_happiness: null | string;
    min_level: number;
    needs_overworld_rain: boolean;
    party_species: null | string;
    party_type: null | string;
    relative_physical_stats: null | string;
    time_of_day: string;
    trade_species: null | string;
    trigger: EvolutionTrigger;
    turn_upside_down: boolean;
}

export interface Species {
    evolves_to: any
    name: string;
    url: string;
}

interface EvolvesTo {
    evolution_details: EvolutionDetails[];
    evolves_to?: EvolvesTo[];
    is_baby: boolean;
    species: Species;
}

export interface Chain {
    evolution_details: EvolutionDetails[];
    evolves_to?: EvolvesTo[];
    is_baby: boolean;
    species: Species;
}

export type PokemonEvolutionTree = {
    evolves_to?: any
    baby_trigger_item: null | string;
    chain: Chain;
    id: number;
}

export type PokemonSingle = [PokemonSpecie,PokemonEvolutionTree]
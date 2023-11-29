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
            }
        }
    }
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
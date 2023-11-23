import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { PokedexComponent } from './pokedex/pokedex.component';
import { InternaPokedexComponent } from './interna-pokedex/interna-pokedex.component';
import { ComponentsModule } from "../components/components.module";

@NgModule({
    declarations: [
        HomeComponent,
        PokedexComponent,
        InternaPokedexComponent
    ],
    exports: [
        HomeComponent,
        PokedexComponent,
        InternaPokedexComponent
    ],
    imports: [
        CommonModule,
        ComponentsModule
    ]
})
export class PagesModule { }

import { NgModule } from '@angular/core';
import { CommonModule,Location } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { PokedexComponent } from './pokedex/pokedex.component';
import { InternaPokedexComponent } from './interna-pokedex/interna-pokedex.component';
import { ComponentsModule } from "../components/components.module";
import { RouterModule } from '@angular/router';

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
        ComponentsModule,
        RouterModule
    ],
    providers: [
        Location
    ]
})
export class PagesModule { }

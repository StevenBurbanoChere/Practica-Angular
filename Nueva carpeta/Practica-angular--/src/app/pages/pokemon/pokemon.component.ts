import { Component, OnInit } from '@angular/core';
import { Pokemons } from './interfaces/pokemons';
import { PokemonService } from './services/pokemon.service';
import { PaginacionComponent } from './paginacion/paginacion.component';
import { CardComponent } from './card/card.component';
import { SearchComponent } from './search/search.component';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [CardComponent, PaginacionComponent , SearchComponent],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.css'
})
export class PokemonComponent implements OnInit {
  pokemons: Pokemons | undefined;

  constructor(private _srvpokemon: PokemonService) {}

  ngOnInit(): void {
    this._srvpokemon.getPokemons().subscribe((pokemonsAll) => {
      pokemonsAll.results.forEach((pokemon) => {
        this._srvpokemon.getPokemon(pokemon.name).subscribe((pokemonData) => {
          pokemon.data = pokemonData;
      this._srvpokemon.nextURL = pokemonsAll.next;
      this._srvpokemon.previousURL = pokemonsAll.previous;
        });
      });

      this.pokemons = pokemonsAll;
    });
  }

  setNewPokemon(pokemonsNew: Pokemons): void {
    this.pokemons = pokemonsNew;
  }

  searchPokemon(termino:string):void{
    if(termino){
    this._srvpokemon.getPokemon(termino).subscribe((pokemon) => {
    
        this.pokemons = {
          count: 1,
          next: '' ,
          previous: null,
          results: [
            {
              name: pokemon.name,
              url:'' ,
              data: pokemon
            }
          ]
        };
        this._srvpokemon.nextURL = null;
        this._srvpokemon.previousURL = null;
        });
  }   else {
    this.ngOnInit();
}
}
}
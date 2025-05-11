import { Component, EventEmitter, Output } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { NgClass } from '@angular/common';
import { Pokemones } from '../interfaces/pokemones';

@Component({
  selector: 'pokemon-paginacion',
  imports: [NgClass],
  templateUrl: './paginacion.component.html',
  styleUrl: './paginacion.component.css',
})
export class PaginacionComponent {
  @Output() public eventNewPokemons = new EventEmitter<Pokemones>();
  constructor(private _srvPokemon: PokemonService) {}

  get nextURL(): string | null {
    return this._srvPokemon.nextURL;
  }

  get previousURL(): string | null {
    return this._srvPokemon.previousURL;
  }

  loadPokemons(url: string) {
    this._srvPokemon.getPokemones(url).subscribe((pokemonesAll) => {
      pokemonesAll.results.forEach((pokemon) => {
        this._srvPokemon.getPokemon(pokemon.name).subscribe((pokemonData) => {
          pokemon.data = pokemonData;
          this._srvPokemon.nextURL = pokemonesAll.next;
          this._srvPokemon.previousURL = pokemonesAll.previous;
          this.eventNewPokemons.emit(pokemonesAll);
        });
      });
    });
  }
}

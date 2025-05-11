import { Component, EventEmitter, Output } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { NgClass } from '@angular/common';
import { Pokemons } from '../interfaces/pokemons';

@Component({
  selector: 'pokemon-paginacion',
  imports: [NgClass],
  templateUrl: './paginacion.component.html',
  styleUrl: './paginacion.component.css'
})
export class PaginacionComponent {
  @Output() public eventNewPokemons = new EventEmitter<Pokemons>();

constructor(
  private _srvpokemon: PokemonService,
  
) { }


get nextURL(): string | null {
  return this._srvpokemon.nextURL;
}

get previousURL(): string | null {
  return this._srvpokemon.previousURL;
}

loadPokemons(url: string) {

  this._srvpokemon.getPokemons(url).subscribe((pokemonsAll) => {
    pokemonsAll.results.forEach((pokemon) => {
      this._srvpokemon.getPokemon(pokemon.name).subscribe((pokemonData) => {
        pokemon.data = pokemonData;
    
    this._srvpokemon.nextURL = pokemonsAll.next;
    this._srvpokemon.previousURL = pokemonsAll.previous;
    this.eventNewPokemons.emit(pokemonsAll);
  });
});
});
  }
}

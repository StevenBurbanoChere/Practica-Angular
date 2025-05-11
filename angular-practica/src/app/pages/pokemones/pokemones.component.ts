import { Component, OnInit } from '@angular/core';
import { CardComponent } from './card/card.component';
import { Pokemones } from './interfaces/pokemones';
import { PokemonService } from './services/pokemon.service';
import { PaginacionComponent } from './paginacion/paginacion.component';
import { SearchComponent } from './search/search.component';


@Component({
  selector: 'app-pokemones',
  imports: [CardComponent, PaginacionComponent,SearchComponent],
  templateUrl: './pokemones.component.html',
  styleUrl: './pokemones.component.css'
})
export class PokemonesComponent implements OnInit {
  pokemons: Pokemones | undefined;

  constructor(private _srvPokemon: PokemonService) {}

  ngOnInit(): void {
    this._srvPokemon.getPokemones().subscribe((pokemonesAll) => {
      pokemonesAll.results.forEach((pokemon) => {
        this._srvPokemon.getPokemon(pokemon.name).subscribe((pokemonData) => {
          pokemon.data = pokemonData;
          this._srvPokemon.nextURL = pokemonesAll.next;
          this._srvPokemon.previousURL = pokemonesAll.previous;
        });
      });
      this.pokemons = pokemonesAll;
    });
  }

  setNewPokemons(pokemonsNews: Pokemones): void {
    this.pokemons = pokemonsNews;
  }
  searchPokemon(termino:string):void{
    if(termino){
    this._srvPokemon.getPokemon(termino).subscribe((pokemon) => {
      this.pokemons = {
        count: 1,
        next: '',
        previous: null,
        results:[
        {
          name: pokemon.name,
          url: '',
          data: pokemon
        }
        ]
      };
      this._srvPokemon.nextURL= null;
      this._srvPokemon.previousURL= null;
    });
  }else{
    this.ngOnInit();
  }
  }

}
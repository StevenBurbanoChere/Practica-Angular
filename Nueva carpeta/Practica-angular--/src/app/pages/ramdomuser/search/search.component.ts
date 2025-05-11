import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
  <div class="d-flex justify-content-center my-4">
    <div class="input-group" style="max-width: 700px; width: 100%;">
      <input 
        type="text" 
        class="form-control"
        placeholder="Escribe el nombre del usuario" 
        aria-label="Buscar usuario" 
        [(ngModel)]="searchTerm"
        (input)="onInput()">
      <button class="btn btn-outline-primary" type="button" (click)="onRefresh()">Actualizar</button>
    </div>
  </div>
  `,
  styles: []
})
export class SearchComponent {
  @Output() search = new EventEmitter<string>();
  @Output() refresh = new EventEmitter<void>(); // nuevo evento
  searchTerm: string = '';

  onInput(): void {
    this.search.emit(this.searchTerm.trim());
  }

  onRefresh(): void {
    this.refresh.emit();
  }
}

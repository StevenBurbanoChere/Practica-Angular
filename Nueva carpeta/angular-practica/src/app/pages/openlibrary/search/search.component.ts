import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule], // Agrega FormsModule aquí
  template: `
  <div class="d-flex justify-content-center my-4">
    <div class="input-group mb-3" style="max-width: 600px; width: 100%;">
      <input 
        type="text" 
        class="form-control" 
        style="border-color:rgb(233, 155, 155); box-shadow: 0 0 5px rgba(255, 192, 203, 0.5);"
        placeholder="Escribe el nombre del producto" 
        aria-label="Escribe el nombre del producto" 
        aria-describedby="button-addon2"
        [(ngModel)]="searchTerm"
        (input)="onInput()"> 
    </div>
  </div>
  `,
  styles: []
})

//Componente de búsqueda
export class SearchComponent {
  @Output() searchBooks = new EventEmitter<string>();
  searchTerm: string = '';

  //Método de búsqueda
  onInput(): void {
    const trimmedTerm = this.searchTerm.trim();
    this.searchBooks.emit(trimmedTerm);
  }
}

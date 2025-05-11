import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Docs } from '../interfaces/openlibrary';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
//Llamar a la información de la API
export class ModalComponent {
  @Input() book!: Docs;
  @Input() onClose!: () => void;
  @Output() cerrar = new EventEmitter<void>();
  window = window;

  // Asignar valores por defecto en caso de que falten
  get author(): string {
    const authors = this.book.author_name;
    return Array.isArray(authors) && authors.length > 0 ? authors.join(', ') : 'Autor desconocido';
  }
  //Llamar a la editora de la API
  get publisher(): string {
    const publishers = this.book.publisher;
    return Array.isArray(publishers) && publishers.length > 0 ? publishers[0] : 'Editor desconocido';
  }
//Llamar a la fecha de publicación de la API
  get firstPublishDate(): string {
    return this.book.firstPublishDate || 'Fecha desconocida';
  }
//Llamar a la imagen de la API
  get imgUrl(): string {
    return this.book.imgUrl || 'assets/images/no-img.jpg'; // Imagen por defecto si no hay portada
  }


}

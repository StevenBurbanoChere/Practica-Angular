import { Component, OnInit } from '@angular/core';
import { OpenlibraryService } from './services/openlibrary.service';
import { Docs } from './interfaces/openlibrary';
import { NgFor, CommonModule } from '@angular/common';  
import { CardComponent } from './card/card.component';  
import { NavegationComponent } from './navegation/navegation.component';
import { SearchComponent } from './search/search.component';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-openlibrary',
  standalone: true,
  imports: [
    NgFor, 
    CommonModule, 
    CardComponent, 
    NavegationComponent, 
    SearchComponent, 
    ModalComponent
  ],
  templateUrl: './openlibrary.component.html',
  styleUrls: ['./openlibrary.component.css'],
})
export class OpenlibraryComponent implements OnInit {
  private readonly ITEMS_PER_PAGE = 20;
  private readonly MAX_ITEMS = 200;

  books: Docs[] = [];
  start: number = 0;
  selectedBook: Docs | null = null;

  constructor(private openLibraryService: OpenlibraryService) {}

  ngOnInit(): void { 
    this.loadBooks();
  }

  // Carga los libros desde el servicio
  private loadBooks(): void {
    this.openLibraryService.getBooks(this.start).subscribe({
      next: (books: Docs[]) => this.books = books,
      error: (err: any) => console.error('Error al cargar libros:', err),
    });
  }

  // Navega a la siguiente página de resultados
  onNextPage(): void {
    if (this.start + this.ITEMS_PER_PAGE < this.MAX_ITEMS) { 
      this.start += this.ITEMS_PER_PAGE;
      this.loadBooks();
    }
  }

  // Navega a la página anterior de resultados
  onPreviousPage(): void {
    if (this.start > 0) {
      this.start -= this.ITEMS_PER_PAGE;
      this.loadBooks();
    }
  }

  // Realiza búsqueda de libros por término
  onSearch(term: string): void {
    if (!term) {
      this.loadBooks();
      return;
    }

    this.openLibraryService.searchBooks(term).subscribe({
      next: (response) => {
        if (response?.docs) {
          this.books = response.docs.map(doc => 
            this.openLibraryService.mapDocToBook(doc)
          );
          this.start = 0;
        }
      },
      error: (err) => console.error('Error al buscar libros:', err)
    });
  }

  // Gestión del modal
  openModal(book: Docs): void {
    this.selectedBook = book;
  }
  //Cierra el modal
  closeModal(): void {
    this.selectedBook = null;
  }
}

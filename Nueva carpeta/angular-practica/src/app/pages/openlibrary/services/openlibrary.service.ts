import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Docs, Books } from '../interfaces/openlibrary';

@Injectable({
  providedIn: 'root',
})
export class OpenlibraryService {
  private baseUrl: string = 'https://openlibrary.org/search.json';
  private nextPage: string | null = null;
  private previousPage: string | null = null;

  constructor(private http: HttpClient) {}

  // Carga libros paginados
  getBooks(start: number = 0): Observable<Docs[]> {
    return new Observable(observer => {
      fetch(`${this.baseUrl}?title=b&fields=key,title,author_name,first_publish_year,publisher,cover_edition_key&limit=200`)
        .then(response => response.json())
        .then((result: any) => {
          const allDocs = result.docs;
          const slicedDocs = allDocs.slice(start, start + 20 ); // paginar de 20 en 20
          const books: Docs[] = slicedDocs.map((doc: any) => this.mapDocToBook(doc)); // Definir explícitamente 'doc' como 'any'
          observer.next(books);
          observer.complete();
          
        })
      
        .catch(err => observer.error(err));
    });
  }
  
  searchBooks(query: string = 'a'): Observable<Books> {
    const url = `${this.baseUrl}?q=${encodeURIComponent(query)}&fields=key,title,author_name,first_publish_year,publisher,cover_edition_key&limit=8`;    
    console.log(url);
    return this.http.get<Books>(url);
  }

  setNextPage(url: string | null) {
    this.nextPage = url;
  }

  setPreviousPage(url: string | null) {
    this.previousPage = url;
  }

 
public mapDocToBook(doc: any): Docs {
  
  /**
   * Transforma los datos del documento de la API al modelo Docs
   * @param doc Documento de la API con datos del libro
   * @returns Objeto Docs con los datos mapeados:
   * - key: Identificador del libro
   * - title: Título 
   * - author_name: Autores
   * - publisher: Editoriales
   * - firstPublishDate: Año de publicación
   * - imgUrl: URL de portada
   */
  return {
    key: doc.key,
    title: doc.title,
    author_name: Array.isArray(doc.author_name) ? doc.author_name : [],
    publisher: Array.isArray(doc.publisher) ? doc.publisher : [],
    firstPublishDate: doc.first_publish_year ? String(doc.first_publish_year) : 'Unknown Year',
    imgUrl: doc.cover_edition_key || doc.edition_key?.[0]
  ? `https://covers.openlibrary.org/b/olid/${doc.cover_edition_key }-L.jpg`
  : 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg',

  };
}

}

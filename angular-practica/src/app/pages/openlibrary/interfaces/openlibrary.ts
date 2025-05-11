/**
 * Interfaz que define la estructura de la respuesta de la API de OpenLibrary
 */
export interface Books {
  numFound: number;        // Número total de resultados encontrados
  start: number;          // Índice de inicio de los resultados
  numFoundExact: boolean; // Si el número encontrado es exacto
  num_found: number;      // Número total de resultados (duplicado)
  documentation_url: string; // URL de la documentación
  q: string;             // Consulta realizada
  offset: null;          // Desplazamiento (no usado)
  docs: Docs[];          // Array de documentos/libros
}

/**
 * Interfaz que define la estructura de un libro individual
 */
export interface Docs {
  key?: string;           // Identificador único del libro
  title?: string;         // Título del libro
  author_name?: string[]; // Array con nombres de autores
  imgUrl?: string;        // URL de la imagen de portada
  firstPublishDate?: string; // Fecha de primera publicación
  publisher?: string[];   // Array con nombres de editoriales
  author?: string;        // Autor principal (formato alternativo)
  first_publish_year?: number; // Año de primera publicación
  cover_edition_key?: string;  // Clave de la edición con portada
  covers?: string[];      // Array de IDs de portadas disponibles
}


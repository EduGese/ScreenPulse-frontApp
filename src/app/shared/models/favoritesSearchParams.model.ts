export interface FavoritesSearchParams {
    currentPage: number; 
    pageSize: number;
    sortField?: string | undefined; 
    sortOrder?: number | undefined;
    mediaType?: string | undefined; 
    searchTerm?: string | undefined;  
  }
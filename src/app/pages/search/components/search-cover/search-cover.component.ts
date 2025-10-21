import { Component } from '@angular/core';

/**
 * SearchCoverComponent displays the prominent cover area for the search page,
 * highlighting three main categories (MediaItems, TV Shows, Videogames)
 * with their respective icons and descriptions.
 *
 * The content is static and visually styled, designed as a "dumb" presentational
 * component without inputs or outputs.
 *
 * - Responsive layout adapts on mobile and tablet devices.
 * - Uses Angular Material icons for visual identification.
 * - Strong UX emphasis on clarity and design.
 *
 * @example
 * <app-search-cover></app-search-cover>
 */
@Component({
  selector: 'app-search-cover',
  templateUrl: './search-cover.component.html',
  styleUrls: ['./search-cover.component.scss']
})
export class SearchCoverComponent {}

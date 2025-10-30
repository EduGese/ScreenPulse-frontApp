import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MediaType, SearchFilters, SearchFormValue } from 'src/app/shared/models/search.model';

/**
 * Search bar component for movies, series, and games.
 * 
 * @description
 * Reactive form that allows users to search media content by title, type, and year.
 * Emits search filters to parent component on form submission.
 * 
 */

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
   /**
   * Emits search filters when the form is submitted
   * @event searchSubmitted
   */
  @Output() searchSubmitted = new EventEmitter<SearchFilters>();

  searchForm: FormGroup;
  readonly types: MediaType[] = ['movie', 'series', 'game', 'all'];
  readonly currentYear: number = new Date().getFullYear();
  /**
 * @private
 * @ignore
 */
  private titlePattern = /^\S.+|^\S$/;
  @ViewChild('searchFormFocus') searchFormFocus?: ElementRef<HTMLInputElement>;


  constructor(private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.pattern(this.titlePattern)]],
      type: ['all'],
      year: [null as number | null, [Validators.min(1900), Validators.max(this.currentYear)]]
    });
  }
  handleSubmit() {
    if (this.searchForm.invalid) return;

    const formValue = this.searchForm.value;
    const payload: SearchFilters = this.buildSearchPayload(formValue);
    this.searchSubmitted.emit(payload);

  }
  handleClear() {
    this.searchForm.reset({
      title: '',
      type: 'all',
      year: null
    });
    this.searchForm.markAsUntouched();
  }

  /**
 * @private
 * @ignore
 */
  private buildSearchPayload(formValue: SearchFormValue): SearchFilters {
  return {
    title: formValue.title,
    type: formValue.type,
    year: formValue.year !== null ? formValue.year.toString() : ''
  };
}

}

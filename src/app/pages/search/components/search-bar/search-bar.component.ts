import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MediaType, SearchFilters, SearchFormValue } from 'src/app/shared/models/search.model';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

  @Output() searchSubmitted = new EventEmitter<SearchFilters>();


  searchForm: FormGroup;
  readonly types: MediaType[] = ['movie', 'series', 'game', 'all'];
  readonly currentYear: number = new Date().getFullYear();
  private titlePattern = /^\S.+|^\S$/;
  @ViewChild('searchFormFocus') searchFormFocus?: ElementRef<HTMLInputElement>;


  constructor(private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.pattern(this.titlePattern)]],
      type: ['all'],
      year: [null as number | null, [Validators.min(1900), Validators.max(this.currentYear)]]
    });
  }
  onSubmit() {
    if (this.searchForm.invalid) return;

    const formValue = this.searchForm.value;
    const payload: SearchFilters = this.buildSearchPayload(formValue);
    this.searchSubmitted.emit(payload);

  }
  onClear() {
    this.searchForm.reset({
      title: '',
      type: 'all',
      year: null
    });
    this.searchForm.markAsUntouched();
  }

  private buildSearchPayload(formValue: SearchFormValue): SearchFilters {
  return {
    title: formValue.title,
    type: formValue.type,
    year: formValue.year !== null ? formValue.year.toString() : ''
  };
}

}

import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MediaType, SearchFilters } from 'src/app/shared/models/search.model';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

  searchForm: FormGroup;
  types: MediaType[] = ['movie', 'series', 'game', 'all'];
  currentyear: number = new Date().getFullYear();

  @Output() onSubmitEvent = new EventEmitter<SearchFilters>();
  @ViewChild('searchFormFocus') searchFormFocus!: ElementRef<HTMLInputElement>;

  constructor(private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      title: ['', Validators.required],
      type: ['all'],
      year: [null as number | null, [Validators.min(1900), Validators.max(this.currentyear)]]
    });
  }
  onSubmit(){
    if (this.searchForm.invalid) return;
    
    const formValue = this.searchForm.value;
    const payload: SearchFilters = {
      ...formValue,
      year: formValue.year?.toString() || ''
    };
    this.onSubmitEvent.emit(payload);
  
  }
  onClear(){
    this.searchForm.reset({
      type: 'all',
    });
    this.searchForm.markAsUntouched();
    
  }

}

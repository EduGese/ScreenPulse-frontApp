import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

  searchForm!: FormGroup;
  @Input()types: any[] =[];

  @Output() onSubmitEvent = new EventEmitter<any>();
  @ViewChild('searchFormFocus',) searchFormFocus!: ElementRef<HTMLInputElement>;

  constructor(private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      title: ['', Validators.required],
      type: ['all'],
      year: ['']
    });
  }

  onSubmit(){
    this.onSubmitEvent.emit(this.searchForm.value);
  
  }

  onClear(){
    this.searchForm.reset({
      type: 'all',
    });

  }
}

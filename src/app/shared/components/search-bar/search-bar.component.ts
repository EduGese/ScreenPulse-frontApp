import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

  title: string =''; 
  type: string ='all'; 
  year: string =''; 
  @Input()types: any[] =[];

  @Output() onSubmitEvent = new EventEmitter<any>();


  onSubmit(title: string, type: string, year: string){
    this.onSubmitEvent.emit({
      title: title,
      type: type,
      year: year
    })
  }

  onClear(){
    this.title = '';
    this.type = 'all';
    this.year = '';
  }

}

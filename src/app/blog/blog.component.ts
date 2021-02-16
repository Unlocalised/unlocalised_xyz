import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  animations: [
    trigger('overlayAnimation', [
      state('show', style({
        opacity: 0.7
      })),
      state('hide',   style({
        opacity: 0
      })),
      transition('show => hide', animate('500ms cubic-bezier(0.64, 0, 0.78, 0)')),
      transition('hide => show', animate('1000ms cubic-bezier(0.33, 1, 0.68, 1)'))
    ])
  ]
})
export class BlogComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filterCtrl = new FormControl();
  filteredOptions: Observable<string[]>;
  currentFilters: string[] = [];
  allFilters: string[] = ['Front-End', 'Back-End', 'Angular', 'Flutter/Dart', 'C#', 'Slack', 'Confluence', 'Atlassian'];
  state : string = "hide";

  @ViewChild('filterInput') filterInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  ngOnInit(){

  }

  constructor() {
    this.filteredOptions = this.filterCtrl.valueChanges.pipe(
        startWith(null),
        map((filterOption: string | null) => filterOption ? this._filter(filterOption) : this.allFilters.slice()));
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.currentFilters.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.filterCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.currentFilters.indexOf(fruit);

    if (index >= 0) {
      this.currentFilters.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.currentFilters.push(event.option.viewValue);
    this.filterInput.nativeElement.value = '';
    this.filterCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFilters.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }


  displayOverlay(){
    this.state = "show";
  }

  hideOverlay(){
   this.state = "hide";
  }
}

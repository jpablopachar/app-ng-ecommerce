import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AutocompleteComponent } from './components/autocomplete.component';
import { HighlightPipe } from './pipes/highlight.pipe';

@NgModule({
  declarations: [
    AutocompleteComponent,
    HighlightPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule
  ],
  exports: [
    AutocompleteComponent
  ]
})
export class AutocompleteModule { }

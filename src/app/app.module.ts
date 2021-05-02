import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { StudentsFormsModule } from "./students-forms/students-forms.module";
import { SelectedDirective } from "./directives/selected.directive";
import { SelectedButtonDirective } from "./directives/selected-button.directive";
import { SelectForDeleteDirective } from './directives/select-for-delete.directive';
import { FilterPipe } from './pipes/filter.pipe';
import { DateDontRepeatPipe } from './pipes/date-dont-repeat.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SelectedDirective,
    SelectedButtonDirective,
    SelectForDeleteDirective,
    FilterPipe,
    DateDontRepeatPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    StudentsFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

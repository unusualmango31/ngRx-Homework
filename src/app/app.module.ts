import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SelectForDeleteDirective } from "./directives/select-for-delete.directive";
import { SelectedButtonDirective } from "./directives/selected-button.directive";
import { SelectedDirective } from "./directives/selected.directive";
import { HomeComponent } from "./home/home.component";
import { DateDontRepeatPipe } from "./pipes/date-dont-repeat.pipe";
import { FilterPipe } from "./pipes/filter.pipe";
import { StudentDebugService } from "./services/student-debug.service";
import { StudentService } from "./services/student.service";
import { studentServiceProvider } from "./services/student.service.provider";
import { StudentsFormsModule } from "./students-forms/students-forms.module";
import {ActivatedRoute} from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ErrorGuardComponent } from './error-guard/error-guard.component';

@NgModule({
  declarations: [
    AppComponent,
    SelectedDirective,
    SelectedButtonDirective,
    SelectForDeleteDirective,
    FilterPipe,
    DateDontRepeatPipe,
    HomeComponent,
    ErrorPageComponent,
    ErrorGuardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    StudentsFormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [StudentDebugService, studentServiceProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }

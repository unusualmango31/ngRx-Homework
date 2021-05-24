import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SelectedButtonDirective } from "./directives/selected-button.directive";
import { SelectedDirective } from "./directives/selected.directive";
import { ErrorGuardComponent } from "./error-guard/error-guard.component";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { HomeComponent } from "./home/home.component";
import { DateDontRepeatPipe } from "./pipes/date-dont-repeat.pipe";
import { FilterPipe } from "./pipes/filter.pipe";
import { StudentDebugService } from "./services/student-debug.service";
import { StudentService } from "./services/student.service";
import { StudentsEffects } from "./store/effects/students.effects";
import { studentsReducer } from "./store/reducers/students.reducer";
import { StudentsFormsModule } from "./students-forms/students-forms.module";

@NgModule({
  declarations: [
    AppComponent,
    SelectedDirective,
    SelectedButtonDirective,
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
    StoreModule.forRoot( {
      students: studentsReducer
    }),
    EffectsModule.forRoot([StudentsEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [StudentService, StudentDebugService],
  bootstrap: [AppComponent]
})
export class AppModule { }

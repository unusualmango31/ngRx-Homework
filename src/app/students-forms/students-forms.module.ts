import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StudentsFormsComponent } from "./students-forms.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {AppRoutingModule} from '../app-routing.module';



@NgModule({
  declarations: [
    StudentsFormsComponent,
  ],
  exports: [
    StudentsFormsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ]
})
export class StudentsFormsModule { }

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "../app-routing.module";
import { StudentsFormsComponent } from "./students-forms.component";



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

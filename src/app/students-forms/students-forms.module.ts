import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StudentsFormsComponent } from "./students-forms.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";



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
    ReactiveFormsModule,
  ]
})
export class StudentsFormsModule { }

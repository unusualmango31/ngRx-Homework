import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ErrorGuardComponent } from "./error-guard/error-guard.component";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { HomeComponent } from "./home/home.component";
import { StudentsFormsComponent } from "./students-forms/students-forms.component";

const routes: Routes = [
  { path: "", component: HomeComponent , children: [
      { path: "form/add", component: StudentsFormsComponent},
      { path: "form/edit/:id", component: StudentsFormsComponent},
      { path: "error-guard", component: ErrorGuardComponent },
    ]},
  { path: "error", component: ErrorPageComponent },
  { path: "**", redirectTo: "/error" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

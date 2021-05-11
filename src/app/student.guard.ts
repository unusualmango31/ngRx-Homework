import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { StudentService } from "./services/student.service";

@Injectable({providedIn: "root"})
export class StudentGuard implements CanActivateChild {

  constructor(private studentService: StudentService, private router: Router) {
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.studentService.students.subscribe( (observer) => {
      const editedStudent = observer.find( (e) => {
        return e.id === +childRoute.params["id"];
      });
      if (editedStudent.averageRate === 5) {
        this.router.navigate(["error-guard"]);
      } else {
        return true;
      }
    });
    return true;
  }
}

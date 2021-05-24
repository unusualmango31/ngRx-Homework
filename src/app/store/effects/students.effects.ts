import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { catchError, map, mergeMap, switchMap } from "rxjs/operators";
import { Student } from "../../models/student";
import { StudentService } from "../../services/student.service";
import { LoadStudentsError, LoadStudentsSuccess, StudentsActions } from "../actions/students.actions";

@Injectable()
export class StudentsEffects {
  constructor(
    private actions$: Actions,
    private studentService: StudentService,
  ) {}
  @Effect()
  loadStudents$ = this.actions$.pipe(
    ofType(StudentsActions.LOAD_STUDENTS),
    switchMap( () => {
      return this.studentService.fetchData().pipe(
        map((students: Student[]) => new LoadStudentsSuccess(students)),
        catchError( () => of(new LoadStudentsError())),
      );
    }),
  );
}

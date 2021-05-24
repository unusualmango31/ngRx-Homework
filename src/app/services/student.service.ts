import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Student } from "../models/student";
import {AddNewStudent, DeleteStudent, EditStudent, SelectStudent} from '../store/actions/students.actions';
import { AppState, selectStudentById, selectStudents } from "../store/state/app.state";


@Injectable()
export class StudentService {
  staticStudents: Student[];
  constructor (public http: HttpClient, private store$: Store<AppState>) {
  }

  fetchData(): Observable<Student[]> {
    return this.http.get<Student[]>("http://localhost:3000/api");
  }
  getStudentsFromStore$(): Observable<Student[]> {
    return this.store$.select(selectStudents);
  }
  addStudent(student: Student): void {
    this.store$.dispatch(new AddNewStudent(student));
  }
  selectStudentById(id: number): Observable<Student> {
    this.store$.dispatch(new SelectStudent(id));
    return this.store$.select(selectStudentById);
  }
  deleteStudent (id: number): void {
    this.store$.dispatch(new DeleteStudent(id));
  }
  updateStudent(student: Student): void {
    this.store$.dispatch(new EditStudent(student));
  }
}

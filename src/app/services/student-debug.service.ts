import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import * as studentsDebugJSON from "../students-debug.json";
import { StudentsArgs } from "./student.service";


@Injectable()
export class StudentDebugService {
  students: Observable<StudentsArgs[]> = new Observable( (observer) => {
    observer.next(studentsDebugJSON.students);
  });
  constructor() {
  }
}

import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Student } from "../models/student";
import * as studentsDebugJSON from "../students-debug.json";


@Injectable()
export class StudentDebugService {
  students: Observable<Student[]> = new Observable( (observer) => {
    observer.next(studentsDebugJSON.students);
  });
}

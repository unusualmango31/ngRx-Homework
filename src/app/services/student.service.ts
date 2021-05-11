import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface StudentsArgs {
  id: number;
  surName: string;
  name: string;
  middleName: string;
  birthday: string;
  averageRate: number;
}

@Injectable()
export class StudentService {
  students: Observable<StudentsArgs[]>;
  staticStudents: StudentsArgs[];
  constructor (public http: HttpClient) {
  }

  fetchData(): Observable<StudentsArgs[]> {
    return this.http.get<StudentsArgs[]>("http://localhost:3000/api");
  }
  updateData(students: StudentsArgs[]): void {
    this.staticStudents = students;
  }
  getById(id: number) {
    return this.staticStudents.find( (e) => e.id === id);
  }
  staticToObservable(): Observable<StudentsArgs[]> {
    return new Observable<StudentsArgs[]>(subscriber => {
      subscriber.next(this.staticStudents);
    });
}
}

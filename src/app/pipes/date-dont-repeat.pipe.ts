import { Pipe, PipeTransform } from "@angular/core";
import { Student} from "../models/student";


@Pipe({
  name: "dateDontRepeat"
})
export class DateDontRepeatPipe implements PipeTransform {

  transform(students: Student[]): Student[] {
    const resultStudents = [];

    for (const student of students) {
      if (!resultStudents.map( (item) => item.birthday.slice(6, 10)).includes(student.birthday.slice(6, 10))) {
        resultStudents.push(student);
      }
    }
    return resultStudents;
  }
}

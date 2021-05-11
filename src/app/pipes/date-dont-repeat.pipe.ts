import { Pipe, PipeTransform } from "@angular/core";
import { StudentsArgs } from "../services/student.service";


@Pipe({
  name: "dateDontRepeat"
})
export class DateDontRepeatPipe implements PipeTransform {

  transform(students: StudentsArgs[]): StudentsArgs[] {
    const resultStudents = [];

    for (const student of students) {
      if (!resultStudents.map( (item) => item.birthday.slice(6, 10)).includes(student.birthday.slice(6, 10))) {
        resultStudents.push(student);
      }
    }
    return resultStudents;
  }
}

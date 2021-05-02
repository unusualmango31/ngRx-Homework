import { Pipe, PipeTransform } from "@angular/core";
import { StudentsArgs } from "../app.component";

@Pipe({
  name: "filter"
})
export class FilterPipe implements PipeTransform {

  transform(students: StudentsArgs[], search: string = ""): StudentsArgs[] {
    if (!search.trim()) {
      return students;
    }
    return students.filter( (student) => {
      if (student.name.toLowerCase().includes(search.toLowerCase())) {
        return student.name.toLowerCase().includes(search.toLowerCase());
      }
      if (student.surName.toLowerCase().includes(search.toLowerCase())) {
        return student.surName.toLowerCase().includes(search.toLowerCase());
      }
    });
  }

}

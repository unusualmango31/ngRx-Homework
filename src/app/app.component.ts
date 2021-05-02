import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DateOperations } from "./date-operations";
import * as studentsJSON from "./students.json";

export interface StudentsArgs {
  id: number;
  surName: string;
  name: string;
  middleName: string;
  birthday: string;
  averageRate: number;
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  popupType: string;
  popupText: string;
  students: Array<StudentsArgs> = studentsJSON.students;
  selectedIDs: Array<number> = [];
  filteredStudents: Array<StudentsArgs> = this.students;
  selectedStudent: StudentsArgs;
  nameForSearch: string = "";
  popupDisplay: string = "none";
  formDisplay: string = "none";
  formType: string;
  deleteType: string;
  isNeedToSelect: boolean = false;
  isShowBadRate: boolean = true;
  isResetRate: boolean = false;
  isResetBirthday: boolean = false;
  private studentId: number;
  private isModalVisable: boolean = false;
  private isReverseSort: boolean = false;


  sortElement(sortedElementName: string): void {
    this.isReverseSort = this.toggleElement(this.isReverseSort);

    if (sortedElementName === "birthday") {
      if (!this.isReverseSort) {
        this.filteredStudents.sort((a, b) => {
          return this.convertToDate( a[sortedElementName] ) > this.convertToDate( (b[sortedElementName]) ) ? -1 : 1;
        });
      } else {
        this.filteredStudents.sort((a, b) => {
          return this.convertToDate( a[sortedElementName] ) > this.convertToDate( (b[sortedElementName]) ) ? 1 : -1;
        });
      }
    } else {
      if (!this.isReverseSort) {
        this.filteredStudents.sort((a, b) => {
          return a[sortedElementName] > b[sortedElementName] ? -1 : 1;
        });
      } else {
        this.filteredStudents.sort((a, b) => {
          return a[sortedElementName] > b[sortedElementName] ? 1 : -1;
        });
      }
    }
  }
  filterStudents(filteredItemName: string, value: string): void {
    if (filteredItemName === "averageRate") {
      this.isResetBirthday = true;
      this.isResetRate = false;
      this.filteredStudents = this.students.filter( (e) => e[filteredItemName] > Number(value));
    } else if (filteredItemName === "birthday") {
      this.isResetRate = true;
      this.isResetBirthday = false;
      this.filteredStudents = this.students.filter( (e) => {
        return e[filteredItemName].substr(6, 4) === value;
      });
    }
  }
  resetStudents(): void {
    this.filteredStudents = this.students;
    this.isResetRate = true;
    this.isResetBirthday = true;
  }
  checkRate(rate: number): string {
    if (this.isShowBadRate) {
      if (rate < 3) {
        return "red";
      }
    }
  }
  find(name: string, surName: string): string {
    if ( this.nameForSearch.toLowerCase() === name.toLowerCase() || this.nameForSearch.toLowerCase() === surName.toLowerCase() ) {
      return "green";
    }
  }
  showPopup(id: number, type: string): void {
    if (type === "once") {
      this.popupText = "Удалить выбранного студента?";
      this.popupType = "once";
      this.deleteType = type;
      this.studentId = id;
    }
    if (type === "many" && this.selectedIDs.length !== 0) {
      this.popupText = "Удалить выбранных студентов?";
      this.popupType = "many";
      this.deleteType = type;
    }
    if (type === "many" && this.selectedIDs.length === 0) {
      this.popupType = "error";
      this.popupText = "Сначала выберите студентов для удаления";
    }
    if ( type === "cancel" ) {
      this.selectedIDs = [];
      this.isNeedToSelect = false;
      this.studentId = -1;
    }
    this.isModalVisable = this.toggleElement(this.isModalVisable);
    (!this.isModalVisable) ? this.popupDisplay = "none" : this.popupDisplay = "block";
  }

  deleteStudent(): void {
    if (this.deleteType === "once") {
      this.filteredStudents.splice(this.studentId, 1);
      this.selectedIDs = [];
      this.isNeedToSelect = false;
    }
    if (this.deleteType === "many") {
      for (const student of this.filteredStudents) {
        for (const id of this.selectedIDs) {
          if (student.id === id) {
            this.filteredStudents = this.filteredStudents.filter( (element) => {
              return element.id !== id;
            });
          }
        }
      }
      this.selectedIDs = [];
      this.isNeedToSelect = false;
    }
    this.showPopup(-1, "");
  }
  editStudent(student: StudentsArgs): void {
    this.selectedStudent = student;
    this.formType = "Редактирование";
    this.formDisplay = "block";
  }
  createNewStudent(): void {
    this.selectedStudent = {
      id: -1,
      surName: "",
      name: "",
      middleName: "",
      birthday: DateOperations.transformToCorrectDate(DateOperations.getStringCurrentDate()),
      averageRate: 0
    };
    console.log(this.selectedStudent);
    this.formType = "Создание";
    this.formDisplay = "block";
  }
  addStudent(student: StudentsArgs): void {
    let maxId = 0;
    this.filteredStudents.forEach( (i) => {
      if (maxId <= i.id) {
        maxId = i.id;
      }
    });
    student.id = maxId + 1;
    console.log(student.id);
    this.filteredStudents.push(student);
    this.formDisplay = "none";
  }
  updateStudent(editedStudent: StudentsArgs): void {
    for (const student of this.filteredStudents) {
      if (student.id === editedStudent.id) {
        student.surName = editedStudent.surName;
        student.name = editedStudent.name;
        student.middleName = editedStudent.middleName;
        student.birthday = editedStudent.birthday;
        student.averageRate = editedStudent.averageRate;
        console.log(student);
      }
    }
    this.formDisplay = "none";
  }
  addToSelectedStudentID(id: number): void {
    if (!this.selectedIDs.includes(id)) {
      this.selectedIDs.push(id);
    }

    console.log(this.selectedIDs);
  }
  clear(): void {
    this.isNeedToSelect = false;
    this.selectedIDs = [];
  }
  private toggleElement( toggledElement: boolean): boolean {
    if (toggledElement) {
      return false;
    }
    return true;
  }
  private convertToDate(dateStr: string): Date {
    const dd = Number(dateStr.slice(0, 2)),
          mm = Number(dateStr.slice(3, 5)),
          yyyy = Number(dateStr.slice(6, 10));

    return new Date(yyyy, mm, dd);
  }
}



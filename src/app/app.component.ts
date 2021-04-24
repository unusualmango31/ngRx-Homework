import { Component } from "@angular/core";
import { element } from "protractor";
import * as studentsJSON from "./students.json";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title: string = "Angular-homework";
  students: Array<StudentsArgs> = studentsJSON.students;
  filteredStudents: Array<StudentsArgs> = this.students;
  nameForSearch: string = "";
  popupDisplay: string = "none";
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
  showPopup(id: number): void {
    this.studentId = id;
    this.isModalVisable = this.toggleElement(this.isModalVisable);
    (!this.isModalVisable) ? this.popupDisplay = "none" : this.popupDisplay = "block";
  }

  deleteStudent(): void {
    this.filteredStudents.splice(this.studentId, 1);
    this.showPopup(-1);
  }
  private toggleElement( toggledElement: boolean): boolean {
    if (toggledElement) {
      return false;
    }
    return true;
  }
  private convertToDate(dateStr: string): Date {
    const day = Number(dateStr.slice(0, 2)),
          month = Number(dateStr.slice(3, 5)),
          year = Number(dateStr.slice(6, 10));

    return new Date(year, month, day);
  }
}

interface StudentsArgs {
  id: number;
  surName: string;
  name: string;
  middleName: string;
  birthday: string;
  averageRate: number;
}

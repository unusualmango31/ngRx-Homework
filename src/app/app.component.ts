import { Component } from '@angular/core';
import * as studentsJSON from "./students.json";
import { element } from 'protractor';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = "Angular-homework";
  students: Array<StudentsArgs> = studentsJSON.students;
  filteredStudents: Array<StudentsArgs> = this.students;
  nameForSearch: string = "";
  isShowBadRate: boolean = true;
  popupDisplay: string = "none";
  private studentId: number;
  private isModalVisable: boolean = false;
  private isReverseSort: boolean = false;

  sortElement(sortedElementName: string): void {
    this.isReverseSort = this.toggleElement(this.isReverseSort);
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
  filterStudents(filteredItemName: string, value: string): void {
    if (filteredItemName === "averageRate") {
      this.filteredStudents = this.students.filter( (e) => e[filteredItemName] > Number(value));
    } else if (filteredItemName === "birthday") {
      this.filteredStudents = this.students.filter( (e) => {
        return e[filteredItemName].substr(6, 4) === value;
      });
    }
  }
  toggleElement( toggledElement: boolean): boolean {
    if (toggledElement) {
      return false;
    }
    return true;
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
}

interface StudentsArgs {
  id: number;
  surName: string;
  name: string;
  middleName: string;
  birthday: string;
  averageRate: number;
}

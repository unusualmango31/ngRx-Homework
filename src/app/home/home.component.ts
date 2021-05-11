import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { StudentsArgs, StudentService } from "../services/student.service";
import { studentServiceProvider } from "../services/student.service.provider";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
  providers: [ studentServiceProvider ]
})
export class HomeComponent implements OnChanges, OnInit, DoCheck {
  popupType: string;
  popupText: string;
  selectedIDs: Array<number> = [];
  students: StudentsArgs[];
  filteredStudents: StudentsArgs[];
  nameForSearch: string = "";
  popupDisplay: string = "none";
  deleteType: string;
  isLoading: boolean = false;
  isFiltered: boolean = false;
  isNeedToSelect: boolean = false;
  isShowBadRate: boolean = true;
  isResetRate: boolean = false;
  isResetBirthday: boolean = false;
  private studentId: number;
  private isModalVisible: boolean = false;
  private isReverseSort: boolean = false;

  constructor(private studentService: StudentService, private router: Router, private activatedRoute: ActivatedRoute) {
  }
  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnInit(): void {
    this.fetchStudents();
  }
  ngDoCheck(): void {
    if (!this.isFiltered) {
      this.filteredStudents = this.studentService.staticStudents;
    }
  }

  fetchStudents(): void {
    this.isLoading = true;
    this.studentService.students.subscribe( (students) => {
      this.students = students;
      this.studentService.staticStudents = students;
      this.isLoading = false;
    });
  }
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
    this.isFiltered = true;
    if (filteredItemName === "averageRate") {
    this.isResetBirthday = true;
    this.isResetRate = false;
    this.filteredStudents = this.studentService.staticStudents.filter( (e) => e[filteredItemName] > Number(value));
  } else if (filteredItemName === "birthday") {
    this.isResetRate = true;
    this.isResetBirthday = false;
    this.filteredStudents =  this.studentService.staticStudents.filter( (e) => {
      return e[filteredItemName].substr(6, 4) === value;
    });
  }
}
  resetStudents(): void {
    this.filteredStudents = this.studentService.staticStudents;
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
  this.isModalVisible = this.toggleElement(this.isModalVisible);
  (!this.isModalVisible) ? this.popupDisplay = "none" : this.popupDisplay = "block";
}

  deleteStudent(): void {
    if (this.deleteType === "once") {
    this.studentService.staticStudents.splice(this.studentId, 1);
    this.selectedIDs = [];
    this.isNeedToSelect = false;
  }
  if (this.deleteType === "many") {
    for (const student of this.filteredStudents) {
      for (const id of this.selectedIDs) {
        if (student.id === id) {
          this.studentService.staticStudents = this.studentService.staticStudents.filter( (element) => {
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
  editStudent(id: number): void {
    this.isFiltered = false;
    this.resetStudents();
    this.router.navigate(["/form/edit", id]);
  }
  createNewStudent(): void {
    this.isFiltered = false;
    this.resetStudents();
    this.router.navigate(["/form/add"]);
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

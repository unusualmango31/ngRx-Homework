import { Component, DoCheck, OnInit, SimpleChanges } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Student } from "../models/student";
import { StudentService } from "../services/student.service";
import { LoadStudents } from "../store/actions/students.actions";
import { selectStudents } from "../store/state/app.state";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
  providers: []
})
export class HomeComponent implements OnInit {
  selectedIDs: Array<number> = [];
  students: Student[];
  nameForSearch: string = "";
  popupDisplay: string = "none";
  isLoading: boolean = false;
  isFiltered: boolean = false;
  isNeedToSelect: boolean = false;
  isShowBadRate: boolean = true;
  isResetRate: boolean = false;
  isResetBirthday: boolean = false;
  private studentId: number;
  private isModalVisible: boolean = false;

  constructor(private studentService: StudentService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private store$: Store,
  ) {
  }
  ngOnInit(): void {
    this.store$.dispatch(new LoadStudents());
    this.studentService.getStudentsFromStore$().subscribe( (students) => {
      this.students = students;
    });
  }

  resetStudents(): void {
    this.studentService.getStudentsFromStore$().subscribe( (students) => {
      this.students = students;
    });
  }

  filterStudents(filteredItemName: string, value: string): void {
    this.isFiltered = true;
    if (filteredItemName === "averageRate") {
      this.isResetBirthday = true;
      this.isResetRate = false;
      this.students = this.students.filter( (e) => e[filteredItemName] > Number(value));
    } else if (filteredItemName === "birthday") {
      this.isResetRate = true;
      this.isResetBirthday = false;
      this.students =  this.students.filter( (e) => {
        return e[filteredItemName].substr(6, 4) === value;
      });
    }
  }
  resetFilters(): void {
    this.resetStudents();
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
    this.isModalVisible = this.toggleElement(this.isModalVisible);
    (!this.isModalVisible) ? this.popupDisplay = "none" : this.popupDisplay = "block";
  }

  deleteStudent(): void {
    this.studentService.deleteStudent(this.studentId);
    this.showPopup(-1);
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

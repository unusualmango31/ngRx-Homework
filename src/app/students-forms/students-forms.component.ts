import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { DateOperations } from "../date-operations";
import { StudentsArgs, StudentService } from "../services/student.service";
import { CustomFormValidators } from "./students-forms.validators";
import {Observable, of} from 'rxjs';
import {mergeAll, switchAll} from 'rxjs/operators';

@Component({
  selector: "app-students-forms",
  templateUrl: "./students-forms.component.html",
  styleUrls: ["./students-forms.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentsFormsComponent implements OnInit, OnChanges {
  @Output() onAdd: EventEmitter<StudentsArgs> = new EventEmitter<StudentsArgs>();
  @Output() onEdit: EventEmitter<StudentsArgs> = new EventEmitter<StudentsArgs>();
  @Input() student: StudentsArgs;
  students: StudentsArgs[];
  formType: string;
  form: FormGroup;
  constructor(private router: Router, private activatedRoute: ActivatedRoute,  private studentService: StudentService) {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.student) {
      this.form.get("fullName").get("surName").setValue(this.student.surName);
      this.form.get("fullName").get("name").setValue(this.student.name);
      this.form.get("fullName").get("middleName").setValue(this.student.middleName);
      this.form.get("birthday").setValue(DateOperations.convertToInputDate(this.student.birthday));
      this.form.get("averageRate").setValue(this.student.averageRate);
    }
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( (params) => {
      this.student = this.studentService.getById(+params.id);
    });
    this.studentService.students.subscribe( (students) => {
      this.students = students;
    });
    this.activatedRoute.url.subscribe( (url) => {
      if (url[1].path === "add") {
        this.formType = "Добавление";
      }
      if (url[1].path === "edit") {
        this.formType = "Редактирование";
      }
    });
    this.formInit();
  }
  formInit(): void {
    if (this.student === undefined) {
      this.student = {
        id: 0,
        surName: "",
        name: "",
        middleName: "",
        birthday: DateOperations.getStringCurrentDate(),
        averageRate: 0
      };
    }
    this.form = new FormGroup({
      fullName: new FormGroup( {
        surName: new FormControl(this.student.surName, [Validators.required, Validators.minLength(2), Validators.pattern(/^[А-Яа-яёЁ]+$/)]),
        name: new FormControl(this.student.name, [Validators.required, Validators.minLength(2), Validators.pattern(/^[А-Яа-яёЁ]+$/)]),
        middleName: new FormControl(this.student.middleName, [Validators.minLength(4), Validators.pattern(/^[А-Яа-яёЁ]+$/)])
      }, [CustomFormValidators.fullName]),
      birthday: new FormControl( DateOperations.convertToInputDate(this.student.birthday), [Validators.required, CustomFormValidators.yearMore]),
      averageRate: new FormControl(this.student.averageRate, [Validators.required, CustomFormValidators.rate])
    });
  }
  submit(): void {
    if (this.form.valid) {
      const value = this.form.value,
      correctBirthday = DateOperations.transformToCorrectDate(value.birthday);
      const student: StudentsArgs = {
      id: this.student.id,
      surName: value.fullName.surName,
      name: value.fullName.name,
      middleName: value.fullName.middleName,
      birthday: correctBirthday,
      averageRate: value.averageRate
      };
    if (this.formType === "Редактирование") {
      for (const stud of this.studentService.staticStudents) {
        if (stud.id === student.id) {
          stud.surName = student.surName;
          stud.name = student.name;
          stud.middleName = student.middleName;
          stud.birthday = student.birthday;
          stud.averageRate = student.averageRate;
        }
      }
    } else if (this.formType === "Добавление") {
      let maxId = 0;
      this.students.forEach( (i) => {
        if (maxId <= i.id) {
          maxId = i.id;
        }
      });
      student.id = maxId + 1;
      this.studentService.staticStudents.push(student);
      console.log(this.students);
    }
    this.form.reset();
    this.router.navigate(["/"]);
    }
  }
  cancel(): void {
    this.form.reset();
    this.router.navigate(["/"]);
  }
}

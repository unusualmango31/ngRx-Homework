import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { StudentsArgs } from "../app.component";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DateOperations } from "../date-operations";
import { CustomFormValidators } from "./students-forms.validators";

@Component({
  selector: "app-students-forms",
  templateUrl: "./students-forms.component.html",
  styleUrls: ["./students-forms.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentsFormsComponent implements OnInit, OnChanges {
  @Output() onAdd: EventEmitter<StudentsArgs> = new EventEmitter<StudentsArgs>();
  @Output() onEdit: EventEmitter<StudentsArgs> = new EventEmitter<StudentsArgs>();
  @Output() onCancel: EventEmitter<string> = new EventEmitter<string>();
  @Input() student: StudentsArgs;
  @Input() formDisplay: string;
  @Input() formType: string;
  form: FormGroup;

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
    if (this.formDisplay === undefined) {
      this.formDisplay = "none";
    }
    this.form = new FormGroup({
      fullName: new FormGroup( {
        surName: new FormControl(this.student.surName, [Validators.required, Validators.minLength(2), Validators.pattern(/^[А-Яа-яёЁ]+$/)]),
        name: new FormControl(this.student.name, [Validators.required, Validators.minLength(2), Validators.pattern(/^[А-Яа-яёЁ]+$/)]),
        middleName: new FormControl(this.student.middleName, [Validators.minLength(4), Validators.pattern(/^[А-Яа-яёЁ]+$/)])
      }, [CustomFormValidators.fullName]),
      birthday: new FormControl( this.student.birthday, [Validators.required, CustomFormValidators.yearMore]),
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
        this.onEdit.emit(student);
        console.log("Отправка отредактированных данных");
      } else if (this.formType === "Создание") {
        this.onAdd.emit(student);
      }
      this.form.reset();
      this.formDisplay = "none";
    }
  }
  cancel(): void {
    this.form.reset();
    this.onCancel.emit("none");
    this.formDisplay = "none";
  }
}

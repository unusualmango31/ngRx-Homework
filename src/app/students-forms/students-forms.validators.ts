import { FormControl, FormGroup } from "@angular/forms";
import { DateOperations } from "../date-operations";

export class CustomFormValidators {
  static yearMore (control: FormControl): {[key: string]: boolean} {
    const currentDate = new Date (DateOperations.getStringCurrentDate()),
      pastDate = new Date(currentDate.getFullYear() - 10, currentDate.getMonth(), currentDate.getDay()),
      inputDate = new Date(control.value);
    if ( inputDate > (pastDate) ) {
      return {yearMore: true};
    }
    return null;
  }
  static rate(control: FormControl): {[key: string]: boolean} {
    if (control.value > 5 || control.value < 0) {
      return {rate: true};
    }
    return null;
  }
  static fullName(formGroup: FormControl): {[key: string]: boolean} {
    if (formGroup.get("name").value !== "" &&
      formGroup.get("surName").value !== "") {
      if ( formGroup.get("name").value === formGroup.get("surName").value) {
        return {fullName: true};
      }
    }
    if (formGroup.get("name").value !== "" &&
      formGroup.get("middleName").value !== "") {
      if (formGroup.get("name").value === formGroup.get("middleName").value) {
        return {fullName: true};
      }
    }
  }
}

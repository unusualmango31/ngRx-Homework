import { Action } from "@ngrx/store";
import { Student } from "../../models/student";

export enum StudentsActions {
  LOAD_STUDENTS = "[Students] Students is loading",
  LOAD_STUDENTS_SUCCESS = "[Students] Students loaded success",
  LOAD_STUDENTS_ERROR = "[Students] Error, students doesn't loaded",
  SELECT_STUDENT = "[Students] Student selected",
  ADD_NEW_STUDENT = "[Students] Add new student",
  EDIT_STUDENT = "[Students] Student edited",
  DELETE_STUDENT = "[Students] Delete student",
}

export class LoadStudents implements  Action {
  readonly type = StudentsActions.LOAD_STUDENTS;
}

export class LoadStudentsSuccess implements Action {
  readonly type = StudentsActions.LOAD_STUDENTS_SUCCESS;
  constructor(public payload: Student[]) {
  }
}
export class LoadStudentsError implements Action {
  readonly type = StudentsActions.LOAD_STUDENTS_ERROR;
}

export class AddNewStudent implements Action {
  readonly type = StudentsActions.ADD_NEW_STUDENT;

  constructor(public payload: Student) {
  }
}

export class SelectStudent {
  readonly type = StudentsActions.SELECT_STUDENT;

  constructor(public payload: number) {
  }
}

export class EditStudent {
  readonly type = StudentsActions.EDIT_STUDENT;

  constructor( public payload: Student ) {
  }
}

export class DeleteStudent {
  readonly type = StudentsActions.DELETE_STUDENT;

  constructor( public payload: number) {
  }
}

export type StudentsUnion = LoadStudents
  | LoadStudentsSuccess
  | LoadStudentsError
  | AddNewStudent
  | SelectStudent
  | EditStudent
  | DeleteStudent;

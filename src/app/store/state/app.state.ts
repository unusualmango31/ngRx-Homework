import { createSelector } from "@ngrx/store";
import { Student } from "../../models/student";

export interface StudentsState {
  studentsList: Student[];
  studentId: number;
}

export interface AppState {
  students: StudentsState;
}
export const initialStudentsState: StudentsState = {
  studentsList: [],
  studentId: null
};
export const initialAppState: AppState = {
  students: initialStudentsState
};

export const selectAppState = (state: AppState) => state.students;
export const selectStudents = createSelector(selectAppState, (state) => state.studentsList);
export const selectId = createSelector(selectAppState, (state) => state.studentId);
export const selectStudentById = createSelector(selectId, selectStudents, (id, students) => {
  return {...students[id]};
});



import { Student } from "../../models/student";
import { StudentsActions, StudentsUnion } from "../actions/students.actions";
import { initialStudentsState } from "../state/app.state";

export const studentsReducer = (state = initialStudentsState, action: StudentsUnion ) => {
  switch (action.type) {
    case StudentsActions.LOAD_STUDENTS_SUCCESS: {
      return  {
        ...state,
        studentsList: action.payload
      };
    }
    case StudentsActions.LOAD_STUDENTS_ERROR: {
      return {
        ...state,
        studentsList: []
      };
    }
    case StudentsActions.ADD_NEW_STUDENT: {
      const newStudentList: Student[] = [];
      newStudentList.push(action.payload);
      return {
        ...state,
        studentsList: state.studentsList.concat(newStudentList)
      };
    }

    case StudentsActions.SELECT_STUDENT: {
      const id: number = action.payload;
      return {
        ...state,
        studentId: id
      };
    }

    case StudentsActions.EDIT_STUDENT: {
      const editedStudent: Student = action.payload;
      const newStudentsList = state.studentsList;
      return {
        ...state,
        studentsList: state.studentsList.map( student => student.id === editedStudent.id ? {
          ...student,
          surName: editedStudent.surName,
          name: editedStudent.name,
          middleName: editedStudent.middleName,
          birthday: editedStudent.birthday,
          averageRate: editedStudent.averageRate,
        } : student)
      };
    }

    case StudentsActions.DELETE_STUDENT: {
      const id: number = action.payload;
      return {
        ...state,
        studentsList: state.studentsList.filter( (student) => student.id !== id)
      };
    }
    default:
      return state;
  }
};

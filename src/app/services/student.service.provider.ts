import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { StudentDebugService } from "./student-debug.service";
import { StudentService } from "./student.service";

const studentServiceFactory = (studentDebugService: StudentDebugService, httpClient: HttpClient, activatedRoute: ActivatedRoute) => {
  const service = new StudentService(httpClient);
  activatedRoute.queryParams.subscribe( (params) => {
    if (params.debug === "true") {
      service.students = studentDebugService.students;
      return service;
    } else {
      service.students = service.fetchData();
    }
  });
  return service;
};

export let studentServiceProvider = {
  provide: StudentService,
  useFactory: studentServiceFactory,
  deps: [StudentDebugService, HttpClient, ActivatedRoute]
};

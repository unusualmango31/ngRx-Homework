import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsFormsComponent } from './students-forms.component';

describe('StudentsFormsComponent', () => {
  let component: StudentsFormsComponent;
  let fixture: ComponentFixture<StudentsFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentsFormsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

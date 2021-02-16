import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectMoodComponent } from './project-mood.component';

describe('ProjectMoodComponent', () => {
  let component: ProjectMoodComponent;
  let fixture: ComponentFixture<ProjectMoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectMoodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectMoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

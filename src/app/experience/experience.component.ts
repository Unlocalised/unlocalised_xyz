import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SkillDetailComponent } from './skill-detail/skill-detail.component';
import { Skill } from './skill.model';
import { SkillService } from './skill.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

  educationSkills: Skill[];

  constructor(public dialog: MatDialog, private skillService: SkillService) { }

  ngOnInit(): void {
    this.skillService.getSkills().subscribe(skills => {
      this.educationSkills = skills.filter(skill => skill.isWorkHistory === true);
    })
  }

  openDialog(num: number) {
    this.dialog.open(SkillDetailComponent, {panelClass: 'skill-detail-dialog', data: this.educationSkills[num - 1], maxHeight: '100vh'});
  }
}

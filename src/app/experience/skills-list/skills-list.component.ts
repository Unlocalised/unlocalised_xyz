import { Component, OnInit} from '@angular/core';
import { Skill } from '../skill.model';
import { SkillService } from '../skill.service';

@Component({
  selector: 'app-skills-list',
  templateUrl: './skills-list.component.html',
  styleUrls: ['./skills-list.component.css']
})
export class SkillsListComponent implements OnInit {

  skills: Skill[];

  constructor(private skillService: SkillService) { }

  ngOnInit(): void {
    // Only get the skills that aren't to do with work history
    this.skillService.getSkills().subscribe(skills => {
      this.skills = skills.filter(skill => skill.isWorkHistory === false);
    })
  }

}

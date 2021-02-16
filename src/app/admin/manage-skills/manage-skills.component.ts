import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Skill } from 'src/app/experience/skill.model';
import { SkillService } from 'src/app/experience/skill.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-manage-skills',
  templateUrl: './manage-skills.component.html',
  styleUrls: ['./manage-skills.component.css']
})
export class ManageSkillsComponent implements OnInit {

  // Reference to Skills/experience form
  skillForm: FormGroup;

  // Bools to control admin behaviour
  isAdding: boolean = false;
  isEditing: boolean = false;
  isDeleting: boolean = false;

  // Stores the current skill being actioned and list of all skills
  fetchedSkills: Skill[];
  actionedSkill: Skill;
  deletedSkill: Skill;

  constructor(private fb: FormBuilder, private authService: AuthService, private skillService: SkillService) { }

  // Getters for ease of access to form controls
  get skillAchievements(): FormArray { return this.skillForm.get('skillAchievements') as FormArray}
  get skillDetails(): FormArray { return this.skillForm.get('skillDetails') as FormArray }

  ngOnInit(): void {
    this.initialiseSkillForm();
  }

  onAddSkill(){
    if(this.authService.isLoggedIn()){
      this.isAdding = true;
      this.isEditing = false;
      this.isDeleting = false;
    }
  }

  onRemoveSkill(){
    if(this.authService.isLoggedIn()){
      this.isAdding = false;
      this.isEditing = false;
      this.isDeleting = true;

      this.skillService.getSkills().subscribe(skills => this.fetchedSkills = skills);
    }
  }

  onUpdateSkill(){
    if(this.authService.isLoggedIn()){
      this.isAdding = false;
      this.isEditing = true;
      this.isDeleting = false;

      this.skillService.getSkills().subscribe(skills => this.fetchedSkills = skills);
    }
  }

  populateSkillData(skill){
    // Reset the form to get rid of old data
    this.skillForm.reset();
    this.clearAllForms();

    this.actionedSkill = skill;

    // Populate form with data
    this.skillForm.controls['skillName'].setValue(this.actionedSkill.skillName);
    this.skillForm.controls['skillNumber'].setValue(this.actionedSkill.skillNumber);
    this.skillForm.controls['skillLevel'].setValue(this.actionedSkill.skillLevel);
    this.skillForm.controls['skillImagePath'].setValue(this.actionedSkill.skillImagePath);

    for(let i = 0; i < this.actionedSkill.skillAchievements.length; i++){
      this.addAchievement();
      this.skillAchievements.controls[i].get('title').setValue(this.actionedSkill.skillAchievements[i].title);
      this.skillAchievements.controls[i].get('info').setValue(this.actionedSkill.skillAchievements[i].info);
    }

    for(let i = 0; i < this.actionedSkill.skillDetails.length; i++){
      this.addSkillDetail();
      this.skillDetails.controls[i].get('title').setValue(this.actionedSkill.skillDetails[i].title);
      this.skillDetails.controls[i].get('info').setValue(this.actionedSkill.skillDetails[i].info);
    }

    this.skillForm.controls['isWorkHistory'].setValue(this.actionedSkill.isWorkHistory);

  }

  removeSkill(id){
    if(this.isDeleting){
      this.fetchedSkills = this.fetchedSkills.filter(skill => skill._id !== id);

      this.skillService.deleteSkill(id).subscribe(skill => {
          this.deletedSkill = skill;
          setTimeout(() => {
            this.deletedSkill = null;
          }, 4000);
      });
    }
  }

  initialiseSkillForm(){
    this.skillForm = this.fb.group({
      skillName: '',
      skillNumber: '',
      skillLevel: '',
      skillImagePath: '',
      skillAchievements: this.fb.array([]), // Array: [FG, FG, FG => { FC, FC }]
      skillDetails: this.fb.array([]),
      isWorkHistory: ''
    });

    // Initialise isWorkHistory to false;
    this.skillForm.controls['isWorkHistory'].setValue(false);
  }

  onSubmit(){
    // Hold onto the id when submitting
    let selectedSkillID;

    if(this.isEditing){
      selectedSkillID = this.actionedSkill._id;
    }

    if(this.isAdding || this.isEditing){
      this.actionedSkill = new Skill(
        this.skillForm.controls['skillName'].value,
        this.skillForm.controls['skillNumber'].value,
        this.skillForm.controls['skillLevel'].value,
        this.skillForm.controls['skillImagePath'].value,
        this.skillForm.controls['skillAchievements'].value,
        this.skillForm.controls['skillDetails'].value,
        this.skillForm.controls['isWorkHistory'].value,
      );

      if(this.isAdding){
        this.skillService.addSkill(this.actionedSkill).subscribe(skill => {
          this.actionedSkill = null;
        });

      }

      if(this.isEditing){
        this.skillService.updateSkill(this.actionedSkill, selectedSkillID).subscribe(skill => {
            this.actionedSkill = null;
        });
      }

      // Clean up for next use
      this.skillForm.reset();
      this.clearAllForms();
    }


  }

  addAchievement() {
    this.skillAchievements.push(this.fb.group({
        title: '',
        info: ''
    }));
  }

  removeAchievement() {
    this.skillAchievements.removeAt(this.skillAchievements.length - 1);
  }

  addSkillDetail() {
    this.skillDetails.push(this.fb.group({
        title: '',
        info: ''
    }));
  }

  removeSkillDetail() {
    this.skillDetails.removeAt(this.skillDetails.length - 1);
  }

  clearAllForms(){
    this.skillAchievements.clear();
    this.skillDetails.clear();
  }

}

import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Mood } from '../../projects/project-list/project-item/project-mood/mood.model';
import { Project } from '../../projects/project.model';
import { ProjectService } from '../../projects/project.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-project-edit',
  templateUrl: './manage-projects.component.html',
  styleUrls: ['./manage-projects.component.css']
})
export class ManageProjectsComponent implements OnInit {

    addProjectForm: FormGroup;
    submittedProject: Project;
    fetchedProjects: Project[];
    isAdding: boolean = false;
    isEditing:boolean = false;;
    isDeleting: boolean = false;
    deletedProject: Project;
    editingProject: Project;
    id: string;

    constructor(private formBuilder: FormBuilder, private projectService: ProjectService, private authService: AuthService) { }

    ngOnInit() {
        this.addProjectForm = this.formBuilder.group({
            proj_summary: new FormControl(''),
            summary_detail: new FormControl(''),
            summary_image : new FormControl(''),
            carousel_images: new FormArray([]),
            proj_quote : new FormControl(''),
            tech_used : new FormArray([]),
            proj_cite: new FormControl(''),
            testimonials : new FormArray([]),
            moods: new FormArray([]),
            proj_tools : new FormArray([]),
            source_code : new FormControl(''),
            blog_post: new FormControl(''),
            external_site: new FormControl(''),
            background: new FormControl(''),
            challenges: new FormControl(''),
            lessons: new FormControl(''),
            responsibilities: new FormControl('')
        });
    }

    // convenience getters for easy access to form fields
    get form() { return this.addProjectForm.controls}
    get carouselImages() { return this.form.carousel_images as FormArray}
    get techsUsed() { return this.form.tech_used as FormArray }
    get testimonials() { return this.form.testimonials as FormArray}
    get moods() { return this.form.moods as FormArray; } // this.addProjectForm.controls.moods
    get tools() { return this.form.proj_tools as FormArray}

    onBeginAdding(){
      this.isAdding = true;
      this.isEditing = false;
      this.isDeleting = false;
    }

    onBeginUpdate(){
      if(this.authService.isLoggedIn()){
        this.isEditing = true;
        this.isDeleting = false;
        this.isAdding = false;

        this.projectService.getProjects().subscribe(projects =>{
          this.fetchedProjects = projects;
        });
      }

    }

    onBeginRemoval(){
      this.isDeleting = true;
      this.isAdding = false;
      this.isEditing = false;

      this.projectService.getProjects().subscribe(projects =>{
        this.fetchedProjects = projects;
      });
    }

    onRemoveProject(id){
      if(this.isDeleting){
        this.fetchedProjects = this.fetchedProjects.filter(project => project._id !== id);
        // Delete project from database
        this.projectService.deleteProject(id).subscribe(project =>{
            this.deletedProject = project;
            setTimeout(() => {
              this.deletedProject = null;
            }, 4000);
        });
      }
    }

    onEditProject(project){

      this.addProjectForm.reset(this.addProjectForm.value);
      this.addProjectForm.reset();
      this.clearAllForms();

      // Store ID for use later
      this.id = project._id;

      if(this.isEditing){
        // Populate form data with what we're working with
        this.editingProject = project;

        this.addProjectForm.controls['proj_summary'].setValue(this.editingProject.summaryTitle);
        this.addProjectForm.controls['summary_detail'].setValue(this.editingProject.summaryDetail);
        this.addProjectForm.controls['summary_image'].setValue(this.editingProject.projectSummaryImagePath);
        for(let i = 0; i < this.editingProject.carouselImagePaths.length; i++){
          this.addCarouselImage();
          this.carouselImages.controls[i].setValue(this.editingProject.carouselImagePaths[i].replace('../../', ''));
        }
        this.addProjectForm.controls['proj_quote'].setValue(this.editingProject.projectQuote);
        for(let i = 0; i < this.editingProject.technologiesUsed.length; i++){
          this.addTechUsed();
          this.techsUsed.controls[i].setValue(this.editingProject.technologiesUsed[i]);
        }
        this.addProjectForm.controls['proj_cite'].setValue(this.editingProject.quoteCitation);
        for(let i = 0; i < this.editingProject.testimonials.length; i++){
          this.addTestimonial();
          this.testimonials.controls[i].setValue(this.editingProject.testimonials[i]);
        }
        for(let i = 0; i < this.editingProject.projectMoods.length; i++){
          this.addMood();
          (this.moods.controls[i] as FormArray).controls['moodDesc'].setValue(this.editingProject.projectMoods[i].moodDescription);
          (this.moods.controls[i] as FormArray).controls['moodVal'].setValue(this.editingProject.projectMoods[i].moodValue);
        }

        for(let i = 0; i < this.editingProject.toolsUsed.length; i++){
          this.addToolUsed();
          this.tools.controls[i].setValue(this.editingProject.toolsUsed[i]);
        }
        this.addProjectForm.controls['source_code'].setValue(this.editingProject.sourceCodeLink);
        this.addProjectForm.controls['blog_post'].setValue(this.editingProject.blogPostLink);
        this.addProjectForm.controls['external_site'].setValue(this.editingProject.demoSiteLink);
        this.addProjectForm.controls['background'].setValue(this.editingProject.backgroundMotivationText);
        this.addProjectForm.controls['challenges'].setValue(this.editingProject.challengesText);
        this.addProjectForm.controls['lessons'].setValue(this.editingProject.lessonsText);
        this.addProjectForm.controls['responsibilities'].setValue(this.editingProject.responsibilitiesText);

      }
    }


    addMood(){
      this.moods.push(this.formBuilder.group({
        moodDesc: new FormControl(''),
        moodVal: new FormControl('')
      }));
    }

    removeMood(){
      this.moods.removeAt(this.moods.length - 1);
    }

    addTestimonial(){
      this.testimonials.push(this.formBuilder.control(''));
    }

    removeTestimonial(){
      this.testimonials.removeAt(this.testimonials.length - 1);
    }

    addCarouselImage(){
      this.carouselImages.push(this.formBuilder.control(''));
    }

    removeCarouselImage(){
      this.carouselImages.removeAt(this.carouselImages.length - 1);
    }

    addTechUsed(){
      this.techsUsed.push(this.formBuilder.control(''));
    }

    removeTechUsed(){
      this.techsUsed.removeAt(this.techsUsed.length - 1);
    }

    addToolUsed(){
      this.tools.push(this.formBuilder.control(''));
    }

    removeToolUsed(){
      this.tools.removeAt(this.tools.length - 1);
    }

    onSubmit() {

      if(this.isAdding){
        // Add all moods to an array
        const collectedMoods: Mood[] = [];

        this.addProjectForm.value.moods.forEach(mood => {
            collectedMoods.push(new Mood(mood.moodDesc, mood.moodVal));
        });

        // Create an object with the new values
        this.submittedProject =  new Project(
          this.addProjectForm.value.proj_summary,
          this.addProjectForm.value.summary_detail,
          this.addProjectForm.value.proj_quote,
          this.addProjectForm.value.proj_cite,
          collectedMoods,
          this.addProjectForm.value.tech_used,
          this.addProjectForm.value.summary_image,
          this.addProjectForm.value.background,
          this.addProjectForm.value.challenges,
          this.addProjectForm.value.lessons,
          this.addProjectForm.value.responsibilities,
          this.addProjectForm.value.testimonials,
          this.addProjectForm.value.carousel_images,
          this.addProjectForm.value.proj_tools,
          this.addProjectForm.value.source_code || '',
          this.addProjectForm.value.blog_post || '',
          this.addProjectForm.value.external_site || ''
        );

        // Submit the project and clear the form
        this.projectService.addProject(this.submittedProject).subscribe(project => project);
        this.addProjectForm.reset(this.addProjectForm.value);
        this.addProjectForm.reset();
        this.clearAllForms();
        this.submittedProject = null;
      }
      else if(this.isEditing){
        // Call project service and submit
        // Add all moods to an array
        const collectedMoods: Mood[] = [];

        this.addProjectForm.value.moods.forEach(mood => {
            collectedMoods.push(new Mood(mood.moodDesc, mood.moodVal));
        });

        // Create an object with the new values
        this.submittedProject =  new Project(
          this.addProjectForm.value.proj_summary,
          this.addProjectForm.value.summary_detail,
          this.addProjectForm.value.proj_quote,
          this.addProjectForm.value.proj_cite,
          collectedMoods,
          this.addProjectForm.value.tech_used,
          this.addProjectForm.value.summary_image,
          this.addProjectForm.value.background,
          this.addProjectForm.value.challenges,
          this.addProjectForm.value.lessons,
          this.addProjectForm.value.responsibilities,
          this.addProjectForm.value.testimonials,
          this.addProjectForm.value.carousel_images,
          this.addProjectForm.value.proj_tools,
          this.addProjectForm.value.source_code,
          this.addProjectForm.value.blog_post,
          this.addProjectForm.value.external_site
        );

        // Submit the project and clear the form
        this.projectService.updateProject(this.submittedProject, this.id).subscribe(project => console.log(project));
        this.addProjectForm.reset(this.addProjectForm.value);
        this.addProjectForm.reset();
        this.clearAllForms();
        this.submittedProject = null;
        this.id = null;
      }
      else{
        // Initial state
      }


    }

    clearAllForms(){
      this.carouselImages.clear();
      this.techsUsed.clear();
      this.testimonials.clear();
      this.moods.clear();
      this.tools.clear();
    }



}

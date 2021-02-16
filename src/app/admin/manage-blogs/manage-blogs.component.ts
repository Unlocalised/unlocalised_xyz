import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { BlogPost } from 'src/app/blog/blog-post.model';
import { BlogService } from 'src/app/blog/blog.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-manage-blogs',
  templateUrl: './manage-blogs.component.html',
  styleUrls: ['./manage-blogs.component.css']
})
export class ManageBlogsComponent implements OnInit {

  // Reference to blog form
  blogForm: FormGroup;

  // Bools to control admin behaviour
  isAdding: boolean = false;
  isEditing: boolean = false;
  isDeleting: boolean = false;

  // Stores the current post being actioned and list of all posts
  fetchedPosts: BlogPost[];
  actionedPost: BlogPost;
  deletedPost: BlogPost;

  constructor(private fb: FormBuilder, private authService: AuthService, private blogService: BlogService) { }

  // Getters for ease of access to form controls
  get tags(): FormArray { return this.blogForm.get('tags') as FormArray}
  get sections(): FormArray { return this.blogForm.get('sections') as FormArray }
  get imagesForPost(): FormArray { return this.blogForm.get('imagesForPost') as FormArray}

  ngOnInit(): void {
    this.initialiseBlogForm();
  }

  onAddPost(){
    if(this.authService.isLoggedIn()){
      this.isAdding = true;
      this.isEditing = false;
      this.isDeleting = false;
    }
  }

  onRemovePost(){
    if(this.authService.isLoggedIn()){
      this.isAdding = false;
      this.isEditing = false;
      this.isDeleting = true;

      this.blogService.getPosts().subscribe(posts => this.fetchedPosts = posts);
    }
  }

  onUpdatePost(){
    if(this.authService.isLoggedIn()){
      this.isAdding = false;
      this.isEditing = true;
      this.isDeleting = false;

      this.blogService.getPosts().subscribe(posts => {this.fetchedPosts = posts; console.log("got em ", this.fetchedPosts)});
    }
  }

  populatePostData(post){

    // Clean up for next use
    this.blogForm.reset();
    this.clearAllForms();

    this.actionedPost = post;

    // Populate form with data
    this.blogForm.controls['title'].setValue(this.actionedPost.title);
    this.blogForm.controls['subtitle'].setValue(this.actionedPost.subtitle);
    this.blogForm.controls['excerpt'].setValue(this.actionedPost.excerpt);

    for(let i = 0; i < this.actionedPost.tags.length; i++){
      this.addTag();
      this.tags.controls[i].setValue(this.actionedPost.tags[i]);
    }

    this.blogForm.controls['headerImage'].setValue(this.actionedPost.mainBlogImagePath);
    this.blogForm.controls['bottomImage'].setValue(this.actionedPost.bottomImage);

    for(let i = 0; i < this.actionedPost.sections.length; i++){
      this.addSection();
      this.sections.controls[i].setValue(this.actionedPost.sections[i]);
    }

    for(let i = 0; i < this.actionedPost.postImages.length; i++){
      this.addImage();
      this.imagesForPost.controls[i].setValue(this.actionedPost.postImages[i]);
    }

    this.blogForm.controls['imagesPerParagraph'].setValue(this.actionedPost.imagesPerParagraph);

  }

  removePost(id){
    if(this.isDeleting){
      this.fetchedPosts = this.fetchedPosts.filter(post => post._id !== id);

      this.blogService.deletePost(id).subscribe(post => {
          this.deletedPost = post;
          setTimeout(() => {
            this.deletedPost = null;
          }, 4000);
      });
    }
  }

  initialiseBlogForm(){
    this.blogForm = this.fb.group({
      title: '',
      subtitle: '',
      excerpt: '',
      tags: this.fb.array([]),
      headerImage: '',
      bottomImage: '',
      sections: this.fb.array([]),
      imagesForPost: this.fb.array([]),
      imagesPerParagraph: ''
    });
  }

  onSubmit(){
    // Hold onto the id when submittingc
    let selectedPostID;
    if(this.isEditing){
      selectedPostID = this.actionedPost._id;
    }

    if(this.isAdding || this.isEditing){
      this.actionedPost = new BlogPost(
        this.blogForm.controls['title'].value,
        this.blogForm.controls['subtitle'].value,
        this.blogForm.controls['excerpt'].value,
        this.blogForm.controls['tags'].value,
        this.blogForm.controls['sections'].value,
        this.blogForm.controls['headerImage'].value,
        this.blogForm.controls['imagesForPost'].value,
        this.blogForm.controls['imagesPerParagraph'].value,
        this.blogForm.controls['bottomImage'].value
      );

      if(this.isAdding){
        this.blogService.addPost(this.actionedPost).subscribe(post => {
          this.actionedPost = null;
        });

      }

      if(this.isEditing){
        this.blogService.updatePost(this.actionedPost, selectedPostID).subscribe(post => {
            this.actionedPost = null;
        });
      }

      // Clean up for next use
      this.blogForm.reset();
      this.clearAllForms();
    }


  }

  addTag() { this.tags.push(this.fb.control('')); }
  removeTag() { this.tags.removeAt(this.sections.length - 1); }

  addSection() { this.sections.push(this.fb.control('')); }
  removeSection() { this.sections.removeAt(this.sections.length - 1); }

  addImage(){ this.imagesForPost.push(this.fb.control('')); }
  removeImage(){ this.imagesForPost.removeAt(this.imagesForPost.length - 1); }

  clearAllForms(){
    this.tags.clear();
    this.sections.clear();
    this.imagesForPost.clear();
  }

  addParagraph(index){
    this.sections.controls[index].setValue("?" + this.sections.controls[index].value);
  }

  addImagePath(index){
    this.sections.controls[index].setValue("^" + this.sections.controls[index].value);
  }

  addMeta(index){
    this.sections.controls[index].setValue("!" + this.sections.controls[index].value);
  }

  addHeading(index){
    this.sections.controls[index].setValue("*" + this.sections.controls[index].value);
  }






}

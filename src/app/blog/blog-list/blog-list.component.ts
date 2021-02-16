import { Component, OnInit, Input, OnChanges, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { BlogPost } from '../blog-post.model';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit, OnChanges {

  posts: BlogPost[];
  filteredPosts: BlogPost[] = [];
  blogIsloading: boolean = true;
  hasErrored: boolean = false;

  @Input() inclusionsLength: number;
  @Input() blogInclusions: string[] = [];

  constructor(private blogService: BlogService, private router: Router) { }

  ngOnInit(): void {
    this.blogService.getPosts().subscribe(posts => {
      this.posts = posts;
      this.inclusionsLength = this.blogInclusions.length;
      if(this.inclusionsLength === 0){
        this.filteredPosts = this.posts;
      }else{
        this.filteredPosts = this.posts.filter(post => post.tags.some(tag => this.blogInclusions.includes(tag)));
      }
      this.blogIsloading = false;
      this.hasErrored = false;
    },
    error =>{
      this.blogIsloading = false;
      this.hasErrored = true;
    });

  }

  ngOnChanges(){
      this.blogService.getPosts().subscribe(posts => {
        this.posts = posts;
        if(this.inclusionsLength === 0){
          this.filteredPosts = this.posts;
        }else{
          this.filteredPosts = this.posts.filter(post => post.tags.some(tag => this.blogInclusions.includes(tag)));
        }
      },
      error =>{
        this.blogIsloading = false;
        this.hasErrored = true;
      });


  }

  postsFiltered(){
    if(this.posts.length !== this.filteredPosts.length){
      return true;
    }
    else{
      return false;
    }
  }
  determineIndex(blogPost:BlogPost){
    return this.postsFiltered ? this.filteredPosts.indexOf(blogPost) : this.filteredPosts.indexOf(blogPost);
  }

}

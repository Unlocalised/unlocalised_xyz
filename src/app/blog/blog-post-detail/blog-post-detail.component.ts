import { Component, OnInit } from '@angular/core';
import { BlogPost } from '../blog-post.model';
import { BlogService } from '../blog.service';
import { Params, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-blog-post-detail',
  templateUrl: './blog-post-detail.component.html',
  styleUrls: ['./blog-post-detail.component.css']
})
export class BlogPostDetailComponent implements OnInit {

  shownBlog: BlogPost;
  blogPostIsloading: boolean = true;

  constructor(private blogService: BlogService, private activeRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // Active route is automatiacally unsubscribed
    this.activeRoute.params.subscribe(
      (params: Params) => {
        this.blogService.getPost(+params['id']).subscribe(post =>{
          this.shownBlog = post;
          this.blogPostIsloading = false;
        },
        error =>{
          this.blogPostIsloading = false;
          this.router.navigate(['/not-found']);
        });
      }
    )

  }


}

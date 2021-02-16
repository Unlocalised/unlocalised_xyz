import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { BlogPost } from './blog-post.model';

@Injectable({providedIn: 'root'})
export class BlogService {

  constructor(private http: HttpClient) {}

  getPosts(){
    return this.http.get<BlogPost[]>('/api/blog');
  }

  getPost(index: number){
    return this.http.get<BlogPost>(`/api/blog/${index}`);
  }

  addPost(payload){
    return this.http.post<BlogPost>(`/api/blog`, payload);
  }

  deletePost(id){
    return this.http.delete<BlogPost>(`/api/blog/${id}`);
  }

  updatePost(payload, id){
    return this.http.patch<BlogPost>(`/api/blog/${id}`, payload);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  options;
  domain = 'http://localhost:8080';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  createAuthenticationHeaders() {
    this.authService.loadToken();
    this.options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'authorization': this.authService.authToken
      })
    };
  }

  newBlog(blog) {
    this.createAuthenticationHeaders();
    return this.http.post(this.domain + '/blogs/newBlog', blog, this.options);
  }

    getAllBlogs() {
      this.createAuthenticationHeaders();
      return this.http.get(this.domain + '/blogs/allBlogs', this.options);
    }
  
    getSingleBlog(id) {
      this.createAuthenticationHeaders();
      return this.http.get(this.domain + '/blogs/singleBlog/' + id, this.options);
    }
  
    editBlog(blog) {
      this.createAuthenticationHeaders();
      return this.http.put(this.domain + '/blogs/updateBlog/', blog, this.options);
    }
  
    deleteBlog(id) {
      this.createAuthenticationHeaders();
      return this.http.delete(this.domain + '/blogs/deleteBlog/' + id, this.options);
    }
}

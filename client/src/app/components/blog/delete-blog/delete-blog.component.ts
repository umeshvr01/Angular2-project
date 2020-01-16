import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../../services/blog.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete-blog',
  templateUrl: './delete-blog.component.html',
  styleUrls: ['./delete-blog.component.css']
})
export class DeleteBlogComponent implements OnInit {

  message;
  messageClass;
  foundBlog = false;
  processing = false;
  blog;
  currentUrl;
  postData: any = {};


  constructor(
    private blogService: BlogService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  deleteBlog() {
    this.processing = true;
    this.blogService.deleteBlog(this.currentUrl.id).subscribe(data => {
      this.postData = data;
      if (!this.postData.success) {
        this.messageClass = 'alert alert-danger';
        this.message = this.postData.message;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = this.postData.message;
        setTimeout(() => {
          this.router.navigate(['/blog']);
        }, 2000);
      }
    });
  }

  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params;
    this.blogService.getSingleBlog(this.currentUrl.id).subscribe(data => {
      this.postData = data;
      if (!this.postData.success) {
        this.messageClass = 'alert alert-danger';
        this.message = this.postData.message;
      } else {
        this.blog = {
          title: this.postData.blog.title,
          body: this.postData.blog.body,
          createdBy: this.postData.blog.createdBy,
          createdAt: this.postData.blog.createdAt
        }
        this.foundBlog = true;
      }
    });
  }

}

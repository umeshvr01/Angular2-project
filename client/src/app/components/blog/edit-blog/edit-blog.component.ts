import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../../services/blog.service';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {


  message;
  messageClass;
  blog;
  processing = false;
  currentUrl;
  loading = true;
  postData: any = {};


  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private blogService: BlogService,
    private router: Router
  ) { }

  updateBlogSubmit() {
    this.processing = true;
    this.blogService.editBlog(this.blog).subscribe(data => {
      this.postData = data;
      if (!this.postData.success) {
        this.messageClass = 'alert alert-danger';
        this.message = this.postData.message;
        this.processing = false;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = this.postData.message;
        setTimeout(() => {
          this.router.navigate(['/blog']);
        }, 2000);
      }
    });
  }

  goBack() {
    this.location.back();
  }

  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params;
    this.blogService.getSingleBlog(this.currentUrl.id).subscribe(data => {
      this.postData = data;
      if (!this.postData.success) {
        this.messageClass = 'alert alert-danger';
        this.message = this.postData.message;
      } else {
        this.blog = this.postData.blog;
        this.loading = false;
      }
    });

  }

}
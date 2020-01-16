import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  form: FormGroup;
  messageClass;
  message;
  newPost = false;
  loadingBlogs = false;
  processing = false;
  username;
  blogPosts;
  profileData: any = {};
  postData: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private blogService: BlogService
  ) {
    this.createNewBlogForm();
   }

  createNewBlogForm() {
    this.form = this.formBuilder.group({
      title: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(5),
        this.alphaNumericValidation
      ])],
      body: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(500),
        Validators.minLength(5)
      ])]
    })
  }

  enableNewBlogForm() {
    this.form.get('title').enable();
    this.form.get('body').enable();
  }

  disableNewBlogForm() {
    this.form.get('title').disable();
    this.form.get('body').disable();
  }

  alphaNumericValidation(controls) {
    const regExp = new RegExp(/^[A-Za-z0-9 ]+$/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
        return { 'alphaNumericValidation': true }
    }
  }

  newBlogForm() {
    this.newPost = true;
  }
  
  reloadBlogs() {
    this.loadingBlogs = true;
    setTimeout(() => {
      this.loadingBlogs = false;
    }, 4000);
  }

  draftComment() {
    
  }

  onBlogSubmit() {
    this.processing = true;
    this.disableNewBlogForm();

    const blog = {
      title: this.form.get('title').value,
      body: this.form.get('body').value,
      createdBy: this.username
    }
     this.blogService.newBlog(blog).subscribe(data => {
       this.postData = data;
       if (!this.postData.success) {
        this.messageClass = "alert alert-danger";
        this.message = this.postData.message;
        this.processing = false;
        this.enableNewBlogForm();
    } else {
        this.messageClass = "alert alert-success";
        this.message = this.postData.message;
        this.getAllBlogs();
        setTimeout(() => {
          this.newPost = false;
          this.processing = false;
          this.message = false;
          this.form.reset();
          this.enableNewBlogForm();
        }, 2000);
    }

     });

  }

  goBack() {
    window.location.reload();
  }

  getAllBlogs() {
    this.blogService.getAllBlogs().subscribe(data => {
      this.postData = data;
      this.blogPosts = this.postData.blogs;
    })
  }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.profileData = profile;
      this.username = this.profileData.user.username;
    });

    this.getAllBlogs();
  }

}

import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { AppError } from '../common /validators/app-error';
import { NotFoundError } from '../common /validators/not-found-error';
import { BadInput } from '../common /validators/bad-input';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})

export class PostsComponent implements OnInit {

   posts: any[];

  constructor(private service: PostService) {

   }

   ngOnInit() {
    this.service.getPost()
    .subscribe(response => {
        this.posts = response.json();

    }, error => {
      alert('An unexpected error occured');
      console.log(error);
    });

   }

   createPost(input: HTMLInputElement) {
    const post = { title: input.value };
    input.value = '';

    this.service.createPost(post)
    .subscribe(response => {
      post['id'] = response.json().id;
      this.posts.splice(0, 0, post);

    },
    (error: AppError) => {
     if (error instanceof BadInput ) {
       //this.form.setErrors(error.originalError);
     } else {
      alert('An unexpected error occured');
      console.log(error);
     }
    });

   }

    updatePost(post) {
     this.service.updatePost(post)
     .subscribe(response => {
        console.log(response.json());
    },
    (error: Response) => {
      if(error.status === 400 ) {
        //this.form.setErrors(error.json());
      }
      else {
        alert('An unexpected error occured');
        console.log(error);
      }

    });

   }

   deletePost(post) {
    return this.service.deletePost(post.id)
    .subscribe(response => {
      const index = this.posts.indexOf(post);
      this.posts.splice(index, 1);
    },
    (error: AppError ) => {

      if (error instanceof NotFoundError) {
        alert('This post has already been deleted. Not found id');
      }
       elsе {
        alert('An unexpected error occured');
        console.log(error);
      }
    });
  }
}

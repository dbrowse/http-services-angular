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
    this.service.getAll()
    .subscribe(response => {
        this.posts = response.json();
    });
   }

   createPost(input: HTMLInputElement) {
    const post = { title: input.value };
    input.value = '';

    this.service.create(post)
    .subscribe(response => {
      post['id'] = response.json().id;
      this.posts.splice(0, 0, post);

    },
    (error: AppError) => {
     if (error instanceof BadInput ) {
       //this.form.setErrors(error.originalError);
     } else {
      throw error;
     }
    });

   }

    updatePost(post) {
     this.service.update(post)
     .subscribe(response => {
        console.log(response.json());
    });

   }

   deletePost(post) {
    return this.service.delete(post.id)
    .subscribe(response => {
      const index = this.posts.indexOf(post);
      this.posts.splice(index, 1);
    },
    (error: AppError ) => {

      if (error instanceof NotFoundError) {
        alert('This post has already been deleted. Not found id');
      } elsе {
         throw error;

      }
    });
  }
}

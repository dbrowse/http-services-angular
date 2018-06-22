import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { AppError } from '../common /validators/app-error';
import { Observable } from 'rxjs';
import { NotFoundError } from '../common /validators/not-found-error';
import { BadInput } from '../common /validators/bad-input';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private url = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: Http) {

   }

   getPost() {
   return this.http.get(this.url)
   .catch(this.handleError);

   }

   createPost(post) {
     return this.http.post(this.url, JSON.stringify(post))
     .catch(this.handleError);

   }

   updatePost(post) {
   return this.http.patch(this.url + '/' + post.id, JSON.stringify({ isRead: true }))
   .catch(this.handleError);
   }

   deletePost(id) {
    return this.http.delete(this.url + '/' + id)
    .catch(this.handleError);

  }

  private handleError(error: Response ) {
    if (error.status === 400) {
      return Observable.throw(new BadInput(error.json()));
    }

    if (error.status === 404) {
      return Observable.throw(new NotFoundError(error));
    }
   return Observable.throw(new AppError(error));
  }


}

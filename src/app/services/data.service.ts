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
export class DataService {

  constructor(private url: string, private http: Http) {

   }

   getAll() {
   return this.http.get(this.url)
   .catch(this.handleError);

   }

   create(resource) {
     return this.http.post(this.url, JSON.stringify(resource))
     .catch(this.handleError);

   }

   update(resource) {
   return this.http.patch(this.url + '/' + resource.id, JSON.stringify({ isRead: true }))
   .catch(this.handleError);
   }

   delete(id) {
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
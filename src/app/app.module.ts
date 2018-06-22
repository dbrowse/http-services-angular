import { HttpModule } from '@angular/http';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { PostService } from './services/post.service';
import { AppErrorHandler } from './common /validators/app-error-handler';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent

  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [
    PostService,
    { provide: ErrorHandler, useClass: AppErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

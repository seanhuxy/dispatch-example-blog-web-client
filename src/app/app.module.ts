import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from 'clarity-angular';
import { AppRoutingModule } from './app-routing.module';

import { APP_CONFIG, configFactory } from './app.config';
import { PostService } from './post.service';

import { AppComponent } from './app.component';
import { PostComponent } from './post/post.component';
import { HomeComponent } from './home/home.component';
import { EditorComponent } from './editor/editor.component';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    HomeComponent,
    EditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    NoopAnimationsModule,
    ClarityModule.forRoot(),
  ],
  providers: [
    { provide: APP_CONFIG, useFactory: configFactory },
    PostService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
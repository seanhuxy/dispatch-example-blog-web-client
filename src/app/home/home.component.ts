import { Component, OnInit } from '@angular/core';

import { PostService } from '../post.service';
import { Post } from '../post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor(private postService: PostService) { }

  posts: Post[]

  getPosts() {
    this.postService.getPosts().then(
      (posts) => {
        this.posts = posts
      }
    ).catch(err => {
      console.log(`error listing posts ${err}`)
    })
  }

  ngOnInit() {
    this.getPosts()
  }
}

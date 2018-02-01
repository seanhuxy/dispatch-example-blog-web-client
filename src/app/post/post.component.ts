import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})

export class PostComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private postService: PostService
  ) { }

  post: Post

  savePost() {
    console.log("save post content: " + this.post.content)
    this.postService.updatePost(this.post)
  }

  getPost() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.postService.getPost(id).then((post) => {
      this.post = post
    }).catch((err) => {
      console.log(`error getting post ${err}`)
    })
  }

  goBack() {
    this.location.back()
  }

  ngOnInit() {
    this.getPost()
  }
}

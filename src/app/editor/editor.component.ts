import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  constructor(
    private location: Location,
    private postService: PostService
  ) { }

  post: Post

  message: string
  modelOpen: boolean

  save(post) {
    // note: a simple way to keep id unique by using epoch time
    // however, don't use in production
    post.id = new Date().getTime().toString()
    this.postService.addPost(post).then((saved) => {
      if (saved) {
        this.message = "Post saved"
        this.modelOpen = true
      } else {
        this.message = "There's some error while saving your post"
        this.modelOpen = true
      }
    })
  }

  cancel() {
    this.location.back()
  }

  ngOnInit() {
    this.post = {
      id: "",
      title: "Untitled",
      content: ""
    }
  }
}

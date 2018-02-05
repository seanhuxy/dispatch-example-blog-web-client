import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';

import { Post } from './post'
import { environment } from '../environments/environment';

@Injectable()
export class PostService {

  constructor(private http: Http) { }

  getRequestOptions(): RequestOptions {
    let headers = new Headers();
    headers.append("accept", "application/json");
    headers.append("content-type", "application/json");
    return new RequestOptions({ headers: headers });
  }

  getHost() {
    let port = environment.port
    let host = environment.host
    // let port = 31841
    // let host = "https://api.dev.dispatch.vmware.com"
    return `${host}:${port}`;
  }

  getPosts(): Promise<Post[]> {

    let host = this.getHost();
    let url = `${host}/post/list?op=list`;
    return this.http.get(url, this.getRequestOptions()).toPromise()
      .then((response) => {
        let posts = response.json()["post"]
        console.log("getPosts response:" + JSON.stringify(posts))
        return posts as Post[]
      })
      .catch((err) => {
        console.error(`error listing posts ${err}`)
      })
  }

  getPost(id): Promise<Post> {
    let host = this.getHost();
    let url = `${host}/post/get?post=${id}&op=get`;
    return this.http.get(url, this.getRequestOptions()).toPromise()
      .then((response) => {
        let post = response.json()["post"]
        // console.log("getPosts response:" + JSON.stringify(post))
        return post as Post
      })
      .catch((err) => {
        console.error(`error getting post ${err}`)
      });
  }

  updatePost(post) {
    let url = `${this.getHost()}/post/update`;
    let body = JSON.stringify({
      "op": "update",
      "post": post
    })
    return this.http.patch(url, body, this.getRequestOptions()).toPromise()
      .then((response) => {
        console.log("update post response:" + response)
      })
      .catch((err) => {
        console.error(`error updating post ${err}`)
      });
  }

  addPost(post) {
    let url = `${this.getHost()}/post/add`;
    let body = JSON.stringify({
      "op": "add",
      "post": post
    })
    return this.http.post(url, body, this.getRequestOptions()).toPromise()
      .then((response) => {
        console.log("add post response:" + response)
      })
      .catch((err) => {
        console.error(`error adding post ${err}`)
      });
  }

  deletePost(post) {
    // TODO: this function haven't been tested yet
    let url = `${this.getHost()}/post/delete`;
    let body = JSON.stringify({
      "op": "delete",
      "post": post
    })
    return this.http.post(url, body, this.getRequestOptions()).toPromise()
      .then((response) => {
        console.log("delete post response:" + response.json())
      })
      .catch((err) => {
        console.error(`error deleting post ${err}`)
      });
  }
}

import { Injectable, Inject } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { Post } from './post'

import { APP_CONFIG, AppConfig } from './app.config';

@Injectable()
export class PostService {

  config: AppConfig

  constructor(
    @Inject(APP_CONFIG) config: AppConfig,
    private http: Http) {
    this.config = config
  }

  getRequestOptions(): RequestOptions {
    let headers = new Headers();
    headers.append("accept", "application/json");
    headers.append("content-type", "application/json");
    return new RequestOptions({ headers: headers });
  }

  getHost() {
    let port = this.config.port
    let host = this.config.host
    console.log("injection: port: " + port)
    return `${host}:${port}`;
  }

  getPosts(): Promise<Post[]> {

    let host = this.getHost();
    let url = `${host}/post/list?op=list`;
    return this.http.get(url, this.getRequestOptions()).toPromise()
      .then((response) => {
        let posts = response.json()["post"]
        // console.log("getPosts response:" + JSON.stringify(posts))
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

  updatePost(post): Promise<boolean> {
    let url = `${this.getHost()}/post/update`;
    let body = JSON.stringify({
      "op": "update",
      "post": post
    })
    return this.http.patch(url, body, this.getRequestOptions()).toPromise()
      .then((response) => {
        if (response.json()["error"] === undefined) {
          return true
        } else {
          return false
        }
      })
      .catch((err) => {
        console.error(`error updating post ${err}`)
        return false
      });
  }

  addPost(post): Promise<boolean> {
    let url = `${this.getHost()}/post/add`;
    let body = JSON.stringify({
      "op": "add",
      "post": post
    })
    return this.http.post(url, body, this.getRequestOptions()).toPromise()
      .then((response) => {
        if (response.json()["error"] === undefined) {
          return true
        } else {
          return false
        }
      })
      .catch((err) => {
        console.error(`error adding post ${err}`)
        return false
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

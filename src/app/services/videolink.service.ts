import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Video } from '../models/video';


@Injectable({
  providedIn: 'root'
})

export class VideolinkService {

  private videosUrl = 'https://vi-host.com/api/videos';

  constructor(private http: HttpClient) { }

  public getVideos(): Observable<any> {
    return this.http.get<Video[]>(this.videosUrl);
    // return this.http.get<videoItem[]>("http://185.143.145.43:9090/videos");
    //  .subscribe((response)=>{ this.listOfVideos = response; console.log(this.listOfVideos); })
  }

  // getHeroes(): Observable<Hero[]> {
  //   return this.http.get<Hero[]>(this.heroesUrl).pipe(
  //     tap(() => this.log(`fetched heroes`)),
  //     catchError(this.handleError('getHeroes', []))
  //   );
  }





  // Must have feature - add ts-linter in your code redactor. It is helps to improve code style
  // getVideosByCategory(cat: string){} ---> no space before curly brackets ----> getVideosByCategory(cat: string) {}

//   **************
//   getVideosByCategory(cat: string){
//     return this.http.get(this.apiUrl + '/?cat='+cat);
//   }
// ********************

  //  return this.http.get('url').pipe(map(res => res.data));
  //  return this.http.get('url').map(resp => resp.json());


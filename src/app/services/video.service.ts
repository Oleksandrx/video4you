import { Injectable } from '@angular/core';

import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Video } from '../models';
import { tap, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class VideoService {

  private getVideoUrl = 'https://vi-host.com/api/videos';
  private setVoteUrl = 'https://vi-host.com/api';

  constructor(private http: HttpClient) { }

  // getVideos() { return this.http.get(this.videosUrl); }

  private handleError<T>(operation = 'operation', result ?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  setVote(link: string) {
    this.http.get(this.setVoteUrl + link);
  }

  getVideos(): Observable<Video[]> {
    return this.http.get<Video[]>(this.getVideoUrl).pipe(
      tap(() => console.log('received all videos')),
      catchError(this.handleError('getVideos', []))
    );
  }

  getVideosByCategory(cat: string): Observable<Video[]> {
    return this.http.get<Video[]>(this.getVideoUrl + '/?cat=' + cat).pipe(
      tap(() => console.log(`received videos from category: ${cat}`)),
      catchError(this.handleError('getVideosByCategory', []))
    );
  }


}

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
  private apiUrl = 'https://vi-host.com/api';

  constructor(private http: HttpClient) { }

  // getVideos() { return this.http.get(this.videosUrl); }

  private handleError<T>(operation = 'operation', result ?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  setVote(link: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + link).pipe(
      tap(() => console.log(`${link.split('/')[1]} for video id = ${link.split('/')[2]}`)),
      catchError(this.handleError<Video>(`setVote id = ${link.split('/')[2]}`))
    );
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

  getVideo(id: string): Observable<Video> {
    const url = this.apiUrl + '/info/' + id;
    console.log(url);

    return this.http.get<Video>(url).pipe(
      tap(() => console.log(`fetched video id = ${id}`)),
      catchError(this.handleError<Video>(`getVideo id = ${id}`))
    );
  }

}

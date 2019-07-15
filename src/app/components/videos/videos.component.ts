import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { VideoService } from '../../services';
import { Video } from '../../models';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})

export class VideosComponent implements OnInit {

  videos: Video[];
  category: string;

  constructor(private videoService: VideoService, private route: ActivatedRoute) {

    this.route.queryParams.subscribe(params => {
      const category0 = params['cat'];
      if (this.category !== category0) {
          this.category = category0;
          console.log(`category changed. actual category: ${this.category}`);
          this.ngOnInit();
      }
    });

  }

  ngOnInit() {
    if (this.category) {
      this.getVideoByCategory();
    } else {
      this.geVideos();
    }
  }

  geVideos(): any {
    this.videoService.getVideos().subscribe( videos => {
      this.videos = videos ? videos : [];
      });
  }

  getVideoByCategory(): void {
    this.videoService.getVideosByCategory(this.category).pipe(
      first()).subscribe(videos => {
        this.videos = videos ? videos : [];
      });
  }

  // getItemsByCat(): void {
  //   this.apiService.getVideosByCategory(this.cat)
  //     .subscribe((data: Mediaitem[]) => this.items = data);
  // }

}

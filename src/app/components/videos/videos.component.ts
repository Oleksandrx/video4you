import { Component, OnInit, OnDestroy } from '@angular/core';

import { SubscriptionLike } from 'rxjs';

import { VideoService } from '../../services';
import { Video } from '../../models';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})

export class VideosComponent implements OnInit, OnDestroy {

  videos: Video[];
  subscription: SubscriptionLike;

  constructor(private videoService: VideoService) { }

  ngOnInit() {
    this.geVideos();
  }

  trackByFn(index, item) {
    return item.id;
  }

  geVideos(): any {
    this.subscription = this.videoService.getVideos().subscribe(videos => {
      this.videos = videos ? videos : [];
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }
}

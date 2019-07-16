import { Component, OnInit, OnDestroy } from '@angular/core';

import { SubscriptionLike } from 'rxjs';

import { VideoService } from '../../services';
import { Video } from '../../models';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['../videos/videos.component.scss']
})
export class MusicComponent implements OnInit, OnDestroy {

  music: Video[];
  subscription: SubscriptionLike;

  constructor(private videoService: VideoService) { }

  ngOnInit() {
    this.getMusic();
  }

  trackByFn(index, item) {
    return item.id;
  }

  getMusic() {
    this.subscription = this.videoService.getVideosByCategory('music').pipe(
      ).subscribe(music => {
        this.music = music ? music : [];
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }
}


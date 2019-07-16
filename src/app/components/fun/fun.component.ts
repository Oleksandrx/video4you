import { Component, OnInit, OnDestroy } from '@angular/core';

import { SubscriptionLike } from 'rxjs';

import { VideoService } from '../../services';
import { Video } from '../../models';

@Component({
  selector: 'app-fun',
  templateUrl: './fun.component.html',
  styleUrls: ['../videos/videos.component.scss']
})
export class FunComponent implements OnInit, OnDestroy {

  jokes: Video[];
  subscription: SubscriptionLike;

  constructor(private videoService: VideoService) { }

  ngOnInit() {
    this.getJokes();
  }

  trackByFn(index, item) {
    return item.id;
  }

  getJokes(): void {
    this.subscription = this.videoService.getVideosByCategory('fun').pipe(
      ).subscribe(jokes => {
        this.jokes = jokes ? jokes : [];
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }
}

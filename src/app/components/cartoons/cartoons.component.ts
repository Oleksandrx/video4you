import { Component, OnInit, OnDestroy } from '@angular/core';

import { SubscriptionLike } from 'rxjs';

import { VideoService } from '../../services';
import { Video } from '../../models';

@Component({
  selector: 'app-cartoons',
  templateUrl: './cartoons.component.html',
  styleUrls: ['../videos/videos.component.scss']
})
export class CartoonsComponent implements OnInit, OnDestroy {

  cartoons: Video[];
  subscription: SubscriptionLike;

  constructor(private videoService: VideoService) { }

  ngOnInit() {
    this.getCartoons();
  }

  trackByFn(index, item) {
    return item.id;
  }

  getCartoons(): void {
    this.subscription = this.videoService.getVideosByCategory('anim').pipe(
      ).subscribe(cartoons => {
        this.cartoons = cartoons ? cartoons : [];
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }
}

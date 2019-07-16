import { Component, Input, Inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Video } from '../../models';
import { VideoService } from '../../services';

export interface ModalData {
  video: Video;
  like: boolean;
  dislike: boolean;
}

@Component({
  selector: 'app-video-modal',
  templateUrl: './video-card.modal.component.html',
  styleUrls: ['./video-card.component.scss']
})
export class VideoCardModalComponent {

  constructor(public dialogRef: MatDialogRef<VideoCardModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ModalData,
              private videoService: VideoService) {}

  public iconLikeColor = '';
  public iconDislikeColor = '';

  public onLikeClick() {

    if (this.data.like) {
      this.data.like = !this.data.like;
      this.iconLikeColor = '';
      return;
    }

    if (this.data.dislike) {
      this.data.dislike = !this.data.dislike;
      this.iconDislikeColor = '';
    }
    this.iconLikeColor = 'accent';
    this.data.like = true;

    // this.videoService.setVote('/voteUp/' + this.data.video.link).subscribe( status => {
      // console.log(status);
    // });
  }

    public onDislikeClick() {

    if (this.data.dislike) {
      this.data.dislike = !this.data.dislike;
      this.iconDislikeColor = '';
      return;
    }

    if (this.data.like) {
      this.data.like = !this.data.like;
      this.iconLikeColor = '';
    }
    this.iconDislikeColor = 'primary';
    this.data.dislike = true;

  }

  closeModal(): void {
    if (this.data.like || this.data.dislike) {

      const voteUpDown = this.data.like ? '/voteUp/' : '/voteDown/';
      console.log(`link: ${voteUpDown + this.data.video.link}`);
      this.videoService.setVote(voteUpDown + this.data.video.link).subscribe( status => {
        // console.log(status);
      });
    }
  }

  // onNoClick(): void {
  //   this.dialogRef.close();
  // }

  // ngOnInit() {
  //   const widthModal = this.data.video.width + 50 + ' px';
  //   const heightModal = this.data.video.heigth + 50 + ' px';
  //   this.dialogRef.updateSize(widthModal, heightModal);
  // }
}

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss']
})
export class VideoCardComponent {

  @Input() Video: Video;
  public like = false;
  public dislike = false;

  constructor(public domSanitizer: DomSanitizer, public dialog: MatDialog, private videoService: VideoService) { }

    openDialog(): void {
      const dialogRef = this.dialog.open(VideoCardModalComponent, {
        data: {video: this.Video, like: this.like = false, dislike: this.dislike = false}
    });

      dialogRef.afterClosed().subscribe(data => {
      console.log(`like: ${data.like}`);
      console.log(`dislike: ${data.dislike}`);

      if (data.like || data.dislike) {
        this.videoService.getVideo(this.Video.link).subscribe( video => {
          this.Video.likes = video.likes;
          this.Video.dislikes = video.dislikes;
          this.Video.views = video.views;
        });
      }
    });
  }
}



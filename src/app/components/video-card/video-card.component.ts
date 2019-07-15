import { Component, OnInit, Input, Inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Video } from '../../models';
import { VideoService } from '../../services';

import { HttpClient } from '@angular/common/http';

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
export class VideoCardModalComponent implements OnInit {

  constructor(private http: HttpClient,
    public dialogRef: MatDialogRef<VideoCardModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalData, private videoService: VideoService) {}

  public likeIcon = 'favorite_border';
  public dislikeIcon = 'favorite_border';
  public iconLikeColor = 'accent';
  public iconDislikeColor = '';

  public onLikeClick() {
    if (this.data.dislike) return;
    this.likeIcon = 'favorite';
    this.iconLikeColor = 'accent';
    this.data.like = true;
    this.videoService.setVote('/voteUp/' + this.data.video.link);
  }

  public onDislikeClick() {
    if (this.data.like) return;
    this.dislikeIcon = 'favorite';
    this.data.dislike = true;
    this.videoService.setVote('/voteDown/' + this.data.video.link);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    // this.updateSize();
  }

  updateSize() {
    let widthModal = this.data.video.width + 50 + " px";
    let heightModal = this.data.video.heigth + 50 + " px";
    this.dialogRef.updateSize(widthModal, heightModal);
  }
}

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss']
})
export class VideoCardComponent {

  @Input() Video: Video;
  public like;
  public dislike;

  constructor(public domSanitizer: DomSanitizer, public dialog: MatDialog) { }

    openDialog(): void {
      const dialogRef = this.dialog.open(VideoCardModalComponent, {
        data: {video: this.Video, like: this.like = false, dislike: this.dislike = false}
    });

    dialogRef.afterClosed().subscribe(data => {
      console.log(`like: ${data.like}`);
      console.log(`dislike: ${data.dislike}`);
    });
  }
}



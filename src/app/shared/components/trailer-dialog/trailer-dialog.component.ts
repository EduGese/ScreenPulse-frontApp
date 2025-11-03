import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TrailerDialogData } from '../../models/trailerDialogData.model';

/**
 * Dialog component to display a YouTube trailer video embedded in an Angular Material dialog.
 * 
 * The video URL is sanitized and safely embedded using iframe to prevent security risks.
 * The dialog includes a close button that triggers closing the dialog through MatDialogRef.
 * 
 * This component expects to receive the video URL via MAT_DIALOG_DATA injection token.
 * 
 * No inputs or outputs are used because data is handled through DI and closing is handled internally.
 * 
 * Usage is typically via a dialog service that opens this component passing the necessary data.
 * 
 * @internal
 */
@Component({
  selector: 'app-trailer-dialog',
  templateUrl: './trailer-dialog.component.html',
  styleUrls: ['./trailer-dialog.component.scss']
})
export class TrailerDialogComponent implements OnInit {
  safeVideoUrl!: SafeResourceUrl;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: TrailerDialogData,
    private dialogRef: MatDialogRef<TrailerDialogComponent>,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const videoId = this.extractYouTubeId(this.data.videoUrl);
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&rel=0`;
    this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  /**
   * @ignore
   *    
   * */
  private extractYouTubeId(url: string): string {
    const regExp = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/;
    const match = url.match(regExp);
    return match && match[1] ? match[1] : '';
  }

  close(): void {
    this.dialogRef.close();
  }
}

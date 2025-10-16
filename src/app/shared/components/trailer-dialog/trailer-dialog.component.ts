import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TrailerDialogData } from '../../models/trailerDialogData.model';


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

  private extractYouTubeId(url: string): string {
    const regExp = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/;
    const match = url.match(regExp);
    return match && match[1] ? match[1] : '';
  }

  close(): void {
    this.dialogRef.close();
  }
}

import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { TrailerDialogComponent } from './trailer-dialog.component';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TrailerDialogData } from '../../models/trailerDialogData.model';

// ════════════════════════════════════════════════════════════
// MOCK DATA
// ════════════════════════════════════════════════════════════

const mockTrailerUrl = 'https://www.youtube.com/watch?v=fVQUcaO4AvE';

const mockTrailerData: TrailerDialogData = {
  videoUrl: mockTrailerUrl
};

const meta: Meta<TrailerDialogComponent> = {
  title: 'Shared/TrailerDialog',
  component: TrailerDialogComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule
      ],
      declarations: [TrailerDialogComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {
            close: () => console.log('✅ Dialog closed')
          }
        }
      ]
    })
  ],
  parameters: {
    controls: {
    hideNoControlsWarning: true
  },
    backgrounds: {
      default: 'dark background',
      values: [
        { name: 'dark background', value: '#fffdfdff' }
      ]
    },
    docs: {
      description: {
        component: `
Dialog component for displaying YouTube trailer videos embedded in an Angular Material dialog.

## Purpose

Displays a YouTube video in a secure, responsive iframe with fullscreen and autoplay capabilities.

## How It Works

1. **Data Injection**: Receives video URL via \`MAT_DIALOG_DATA\`
2. **URL Parsing**: Extracts YouTube video ID from multiple URL formats
3. **Sanitization**: Uses Angular's \`DomSanitizer\` to safely embed the iframe

## Supported URL Formats

| Format | Example |
|--------|---------|
| Standard watch URL | \`https://www.youtube.com/watch?v=YoHD_XwrzKw\` |
| Short URL | \`https://youtu.be/YoHD_XwrzKw\` |
| Embed URL | \`https://www.youtube.com/embed/YoHD_XwrzKw\` |

## Data Structure (TrailerDialogData)

\`\`\`typescript
{
  videoUrl: string  // YouTube URL (any format supported)
}
\`\`\`

## Button Behavior

| Button | Action |
|--------|--------|
| **Close** | Closes the dialog via MatDialogRef |

## Features

- **Controls**: YouTube player controls (play, pause, timeline, volume)
- **Responsive**: Fills entire dialog container
- **Full-screen**: Allows YouTube fullscreen expansion
- **Secure**: All URLs sanitized to prevent XSS attacks

## Security

- Uses \`DomSanitizer.bypassSecurityTrustResourceUrl()\` 
- Whitelisted \`encrypted-media\`, and \`fullscreen\` permissions
- Video ID extracted via regex to ensure only valid YouTube IDs are embedded

## Usage

Typically opened via \`DialogService.openTrailerDialog()\` from \`MediaItemDialogComponent\`:

\`\`\`typescript
this.dialogService.openTrailerDialog('https://www.youtube.com/watch?v=VIDEO_ID');
\`\`\`

## Dialog Configuration

- **Size**: Full-screen dialog (Material default)
- **Close**: Click button or ESC key
- **Animation**: Standard Material enter/exit
- **Backdrop**: Click to close (Material default)
        `
      }
    }
  },
argTypes: {
  data: {
    table: { disable: true }
  },
  safeVideoUrl: {
    table: { disable: true }
  },
  close: {
    table: { disable: true }
  },
  ngOnInit: {
    table: { disable: true }
  }
}

};

export default meta;
type Story = StoryObj<TrailerDialogComponent>;

export const StandardURL: Story = {
  decorators: [
    moduleMetadata({
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: mockTrailerData as TrailerDialogData
        }
      ]
    })
  ],
  parameters: {
    docs: {
      description: {
        story: `
YouTube trailer with standard watch URL format.

**URL Format**: \`https://www.youtube.com/watch?v=YoHD_XwrzKw\`

The component extracts the video ID \`YoHD_XwrzKw\` and converts it to embed format automatically.

**Features**:
- ✅ Autoplay enabled
- ✅ Full controls visible
- ✅ Fullscreen allowed
- ✅ Related videos disabled (\`rel=0\`)

**Use Case**: Video URL from OMDB API or user input.
        `
      }
    }
  }
};
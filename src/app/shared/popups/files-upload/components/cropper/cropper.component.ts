import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { dataURLtoFile } from '../../utils';

@Component({
  selector: 'app-cropper',
  template: `
    <div class="cropper">
      <div class="cropper__content">
        <image-cropper
          [imageFile]="imageFile"
          [maintainAspectRatio]="true"
          [aspectRatio]="1 / 1"
          format="png"
          (imageCropped)="imageCropped($event)"
        >
        </image-cropper>
      </div>
      <div class="cropper__actions">
        <button class="app-button" (click)="onCrop()">Crop</button>
      </div>
    </div>
  `,
  styles: [
    `
      @import 'src/styles/base/colors';

      .cropper {
        &__content {
          height: 260px;
        }

        &__actions {
          display: flex;
          justify-content: center;
        }
      }

      .button {
        color: $primary;
        &:hover {
          color: $primary-dark;
          cursor: pointer;
        }
      }
    `,
  ],
})
export class CropperComponent {
  @Input() imageFile!: File;
  @Output() changed;

  public croppedImage: string;

  constructor() {
    this.changed = new EventEmitter<File>();
    this.croppedImage = '';
  }

  public imageCropped(event: ImageCroppedEvent): void {
    this.croppedImage = event.base64 as string;
  }

  onCrop(): void {
    const file: File = dataURLtoFile(this.croppedImage, this.imageFile);

    this.changed.emit(file);
  }
}

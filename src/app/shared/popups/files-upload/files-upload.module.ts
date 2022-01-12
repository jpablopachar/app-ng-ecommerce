import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { ImageCropperModule } from 'ngx-image-cropper';
import { CropperComponent } from './components/cropper/cropper.component';
import { UploadComponent } from './components/upload/upload.component';
import { DropzoneDirective } from './directives/dropzone.directive';
import { FilesuploadDirective } from './directives/filesupload.directive';
import { FilesUploadComponent } from './pages/files-upload.component';
import { FilesizePipe } from './pipes/filesize.pipe';

@NgModule({
  declarations: [
    FilesUploadComponent,
    CropperComponent,
    UploadComponent,
    FilesizePipe,
    DropzoneDirective,
    FilesuploadDirective,
  ],
  imports: [CommonModule, MatDialogModule, ImageCropperModule],
  exports: [FilesuploadDirective],
})
export class FilesUploadModule {}

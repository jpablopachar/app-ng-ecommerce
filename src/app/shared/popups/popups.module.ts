import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FilesUploadModule } from './files-upload/files-upload.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, FilesUploadModule],
  exports: [FilesUploadModule],
})
export class PopupsModule {}

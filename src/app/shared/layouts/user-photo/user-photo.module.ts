import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UserPhotoComponent } from './components/user-photo.component';

@NgModule({
  declarations: [UserPhotoComponent],
  imports: [CommonModule],
  exports: [UserPhotoComponent],
})
export class UserPhotoModule {}

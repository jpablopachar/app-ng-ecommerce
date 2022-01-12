import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  multiple: boolean;
  crop: boolean;
}

@Component({
  selector: 'app-files-upload',
  templateUrl: './files-upload.component.html',
  styleUrls: ['./files-upload.component.scss'],
})
export class FilesUploadComponent {
  public isHovering?: boolean;
  public files: File[];
  public imageFile: File | null;
  public isError!: boolean;
  public filesURLs: string[];

  constructor(
    private readonly _dialogRef: MatDialogRef<FilesUploadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.files = [];
    this.imageFile = null;
    this.filesURLs = [];
  }

  public toggleHover(event: any): void {
    this.isHovering = event;
  }

  public onDrop(files: any): void {
    this.dropGeneral(files);
  }

  public onDropFile(event: FileList | any): void {
    this.dropGeneral(event.target.files);
  }

  public dropGeneral(files: FileList): void {
    this.isError = false;

    if (this.data.crop && files.length > 1) {
      this.isError = true;

      return;
    }

    if (
      this.data.crop &&
      files.length === 1 &&
      files.item(0)?.type.split('/')[0] === 'image'
    ) {
      this.imageFile = files.item(0) as File;

      return;
    }

    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i) as File);
    }
  }

  public onUploadComplete(url: string): void {
    this.filesURLs.push(url);
  }

  public onComplete(): void {
    const res: string | string[] = this.data.multiple
      ? this.filesURLs
      : this.filesURLs[0];

    this._dialogRef.close(res);
  }

  public onClose(): void {
    this._dialogRef.close();
  }

  public onCrop(file: File): void {
    this.imageFile = null;

    this.files.push(file);
  }
}

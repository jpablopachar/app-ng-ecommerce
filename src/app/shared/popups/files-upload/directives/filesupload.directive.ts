import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FilesUploadComponent } from '../pages/files-upload.component';

@Directive({
  selector: '[appFilesupload]',
})
export class FilesuploadDirective {
  @Input() multiple!: boolean;
  @Input() crop!: boolean;
  @Output() changed: EventEmitter<string | string[]>;

  constructor(private readonly _dialog: MatDialog) {
    this.changed = new EventEmitter<string | string[]>();
  }

  @HostListener('click', ['event']) onClick(): void {
    this.openDialog();
  }

  private openDialog(): void {
    const dialogRef: MatDialogRef<FilesUploadComponent, any> =
      this._dialog.open(FilesUploadComponent, {
        width: '550px',
        height: '500px',
        data: {
          multiple: this.multiple,
          crop: this.crop,
        },
      });

    dialogRef.afterClosed().subscribe((result: any): void => {
      this.changed.emit(result || null);
    });
  }
}

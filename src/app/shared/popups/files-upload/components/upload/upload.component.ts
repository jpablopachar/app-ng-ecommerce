import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask
} from '@angular/fire/compat/storage';
import firebase from 'firebase/compat';
import { lastValueFrom, Observable, Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit, OnDestroy {
  @Input() file!: File;
  @Output() completed: EventEmitter<string>;

  public task!: AngularFireUploadTask;
  public percentage$!: Observable<number | undefined>;
  public snapshot$!: Observable<
    firebase.storage.UploadTaskSnapshot | undefined
  >;
  public downloadURL: string;

  private _uploadSubj: Subject<void>;

  constructor(private readonly _storage: AngularFireStorage) {
    this.completed = new EventEmitter<string>();
    this.downloadURL = '';
    this._uploadSubj = new Subject<void>();
  }

  ngOnInit(): void {
    this.startUpload();
  }

  private startUpload(): void {
    const path: string = `${this.file.type.split('/')[0]}/${Date.now()}_${
      this.file.name
    }`;
    const storageRef: AngularFireStorageReference = this._storage.ref(path);

    this.task = this._storage.upload(path, this.file);
    this.percentage$ = this.task.percentageChanges() as Observable<number>;
    this.snapshot$ =
      this.task.snapshotChanges() as Observable<firebase.storage.UploadTaskSnapshot>;

    this.snapshot$.pipe(
      takeUntil(this._uploadSubj),
      finalize(async (): Promise<void> => {
        const storageRef$: Observable<any> = storageRef.getDownloadURL();

        this.downloadURL = await lastValueFrom(storageRef$);
        this.completed.next(this.downloadURL);
      })
    );
  }

  ngOnDestroy(): void {
    this._uploadSubj.next();
    this._uploadSubj.complete();
  }
}

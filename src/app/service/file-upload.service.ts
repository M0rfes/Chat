import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, switchMap, debounce, delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(private afStor: AngularFireStorage) {}

  upload(path: string, file: File) {
    return this.afStor
      .upload(path, file)
      .snapshotChanges()
      .pipe(
        finalize(() => {}),
        switchMap(() => this.afStor.ref(path).getDownloadURL()),
      );
  }
}

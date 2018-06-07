import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase';

import { UpFile } from '../../models/up-file.model';

@Injectable()
export class FilesService {

  public basePath;
  
    constructor(private db: AngularFireDatabase) { }
  
    pushFileToStorage(fileUpload: UpFile, progress: { percentage: number }) {
  
      return new Promise((resolve, reject) => {
      const storageRef = firebase.storage().ref();
      const uploadTask = storageRef.child(`${this.basePath}/${fileUpload.file.name}`).put(fileUpload.file);
  
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          // in progress , raise the progress bar
          const snap = snapshot as firebase.storage.UploadTaskSnapshot;
          progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
        },
        (error) => {
          // fail
          console.log(error);
        },
        () => {
          // success, finished upload , now the save the file
          fileUpload.url = uploadTask.snapshot.downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.saveFileData(fileUpload);
          resolve();
        }
      );
    });
    }
  
    private saveFileData(fileUpload: UpFile) {
      this.db.list(`${this.basePath}/`).push(fileUpload);
    }
  //========================================//
    getFileUploads(numberItems): AngularFireList<UpFile> {
      return this.db.list(this.basePath, ref =>
        ref.limitToLast(numberItems));
    }
  //================DELETE==================//
    public deleteFileUpload(fileUpload: UpFile) {
      this.deleteFileDatabase(fileUpload.key)
        .then(() => {
          this.deleteFileStorage(fileUpload.name);
        })
        .catch(error => console.log(error));
    }
  
    private deleteFileDatabase(key: string) {
      return this.db.list(`${this.basePath}/`).remove(key);
    }
  
    private deleteFileStorage(name: string) {
      const storageRef = firebase.storage().ref();
      storageRef.child(`${this.basePath}/${name}`).delete();
    }

}

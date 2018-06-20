/**https://material.angular.io/components/dialog/overview */

import { Component, OnInit, Inject, Input } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FilesService } from '../../services/files/files.service';
import { UpFile } from '../../models/up-file.model';
import { staff } from '../../models/staff.model';
import { resident } from '../../models/resident.model';
import { NameSelectService } from '../../services/nameSelect/name-select.service';

@Component({
  selector: 'app-dialog-fi',
  templateUrl: './dialog-fi.component.html',
  styleUrls: ['./dialog-fi.component.css']
})
export class DialogFiComponent implements OnInit {
  selectedFiles: FileList;
  currentFileUpload: UpFile;
  file_project_selected = false;
  progress: boolean=false;
  selected:staff|resident;

  constructor(
    private nameSel: NameSelectService,
    public uploadService: FilesService,
    private dialogRef: MatDialogRef<DialogFiComponent>,
    @Inject(MAT_DIALOG_DATA) data) {}
  ngOnInit() {
    this.nameSel.cm.subscribe(selected => this.selected = selected);
  }
  selectFile(event) {
    this.selectedFiles = event.target.files;
    this.file_project_selected = true;
  }

  cancelSelectFile() {
    this.selectedFiles = null;
    this.file_project_selected = false;
  }

  //Uploads the selected file to firebase storage
  upload() {
    this.uploadService.basePath = this.selected.firstName;
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;
    this.currentFileUpload = new UpFile(file);
    this.uploadService.pushFileToStorage(this.currentFileUpload, this.progress).then(() => {
      this.file_project_selected = false;
      this.currentFileUpload=null;
    });
  }
  save() {
      this.dialogRef.close();
  }

  close() {
      this.dialogRef.close();
  }
}

import { Component, OnInit } from '@angular/core';
import { FilesService } from '../../services/files/files.service';
import { UpFile } from '../../models/up-file.model';
@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {
  selectedFiles: FileList;
  currentFileUpload: UpFile;
  file_project_selected = false;
  progress: { percentage: number } = { percentage: 0 };
  constructor(public uploadService: FilesService) { }
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
    this.uploadService.basePath = 'files';
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;
    this.currentFileUpload = new UpFile(file);
    this.uploadService.pushFileToStorage(this.currentFileUpload, this.progress).then(() => {
      this.file_project_selected = false;
    });
  }
  ngOnInit() {
  }

}

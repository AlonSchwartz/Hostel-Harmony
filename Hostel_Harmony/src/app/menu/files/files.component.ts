/**http://javasampleapproach.com/frontend/angular/angular-5-firebase-upload-display-delete-files-storage */

import { Component, OnInit, Input } from '@angular/core';
import { FilesService } from '../../services/files/files.service';
import { UpFile } from '../../models/up-file.model';
import { NameSelectService } from '../../services/nameSelect/name-select.service';
import { resident } from '../../models/resident.model';
import { staff } from '../../models/staff.model';
@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {
  @Input()//for getting name wanted
  name:string;
  selected:staff|resident;
  fileUploads: any[];
  
   constructor(private uploadService: FilesService,private nameSel: NameSelectService) { }
  
   ngOnInit() {
    this.nameSel.cm.subscribe(selected => this.selected = selected);
    
     this.uploadService.getFileUploads(6).snapshotChanges().map(changes => {
       return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      }).subscribe(fileUploads => {
       this.fileUploads = fileUploads;
      });
   }
   deleteFileUpload(fileUpload) {
    this.uploadService.deleteFileUpload(fileUpload);
  }
}

/**http://javasampleapproach.com/frontend/angular/angular-5-firebase-upload-display-delete-files-storage */

import { Component, OnInit, Input, SimpleChange } from '@angular/core';
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
    this.viewFileList()
  }
  ngOnChanges(changes:{[propKey:string]:SimpleChange}){
    for(let na in changes){
      let rec=changes[na];
      let temp=JSON.stringify(rec.currentValue);
      if(!rec.isFirstChange()){
        this.viewFileList();
      }
    }
  }
  public viewFileList(){
    this.nameSel.cm.subscribe(selected => this.selected = selected);
    this.uploadService.basePath = this.selected.firstName;
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

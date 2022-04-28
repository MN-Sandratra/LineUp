import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { data } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { FileUploader } from 'ng2-file-upload';
import { ApiManagerService } from '../services/api-manager.service';
import { DragDropService } from '../services/drag-drop.service';
import axios from 'axios';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  
  fileArr:any[] = [];
  imgArr:any[] = [];
  fileObj:any[] = [];
  form: FormGroup;
  msg: string | undefined;
  progress: number = 0;

  constructor(
    public fb: FormBuilder,
    public api:ApiManagerService,
    private sanitizer: DomSanitizer,
    public dragdropService: DragDropService
  ) {
    this.form = this.fb.group({
      avatar: [null]
    })
  }
  file:any;
  fileName:any

  ngOnInit() { 
    this.file=document.getElementById("uploader");
  }

  saveFile(e:any){
    this.file=e.target.files[0];
    this.fileName=e.target.files[0].name;
  }
  async uploadFile(e:any){
    let formData=new FormData() 
    formData.append("file",this.file);
    formData.append("fileName",this.fileName);
    try{
      const res=await axios.post(
        environment.baseUpload+"/api/upload",
        formData,
        {
          onUploadProgress:(ProgressEvent:any):void =>{
            if(ProgressEvent.lengthComputable){
              this.progress=Math.round((ProgressEvent.loaded/ProgressEvent.total)*100);
            }
          }
        }
      )
      console.log(res);
    }catch(ex){
      console.log(ex);
    }
  }

  upload(e:any) {
    const fileListAsArray = Array.from(e);
    fileListAsArray.forEach((item, i) => {
      const file = (e as HTMLInputElement);
      const url = URL.createObjectURL(file[i]);
      this.imgArr.push(url);
      this.fileArr.push({ item, url: url });
    })

    this.fileArr.forEach((item) => {
      this.fileObj.push(item.item)
    })

    // Set files form control
    this.form.patchValue({
      avatar: this.fileObj
    })

    this.form.get('avatar')?.updateValueAndValidity()

    // Upload to server
    this.dragdropService.addFiles(this.form.value.avatar)
      .subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            console.log('Request has been made!');
            break;
          case HttpEventType.ResponseHeader:
            console.log('Response header has been received!');
            break;
          case HttpEventType.UploadProgress:
            try {
              let u=event.total;
              let denom=1;
              this.progress = Math.round(event.loaded / event.total * 100); 
            } catch (error) {
              console.log(error);
            }
            console.log(`Uploaded! ${this.progress}%`);
            break;
          case HttpEventType.Response:
            console.log('File uploaded successfully!', event.body);
            setTimeout(() => {
              this.progress = 0;
              this.fileArr = [];
              this.fileObj = [];
              this.msg = "File uploaded successfully!"
            }, 3000);
        }
      })
  }

  // Clean Url
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}

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
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { VideoplayerService } from '../services/videoplayer.service';
import { AffichageSocketService } from '../services/affichage-socket.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  FaDel = faTrash;

  fileArr: any[] = [];
  imgArr: any[] = [];
  fileObj: any[] = [];
  videos: any[] = [];
  socket: any;
  currentVideo: any = {
    name: ""
  };
  form: FormGroup;
  msg: string | undefined;
  progress: number = 0;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  dtElement: DataTableDirective | undefined;
  dtInstance: Promise<DataTables.Api>;

  constructor(
    public fb: FormBuilder,
    public api: ApiManagerService,
    private sanitizer: DomSanitizer,
    private tost:ToastrService,
    public dragdropService: DragDropService,
    public video: VideoplayerService,
    public apiSocket: AffichageSocketService,
  ) {
    this.form = this.fb.group({
      avatar: [null]
    })
  }
  file: any;
  fileName: any
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();

  }
  ngOnInit() {
    this.file = document.getElementById("uploader");
    this.socket = this.apiSocket.createSocket();
    this.socket.on(
      'refreshVideo',
      () => {
        this.getAllVideo();
      }
    )
    this.dtOptions = {
      language: {
        processing: "Traitement en cours...",
        search: "Rechercher&nbsp;:",
        lengthMenu: "Afficher _MENU_ &eacute;l&eacute;ments",
        info: "Affichage de l'&eacute;lement _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
        infoEmpty: "Affichage de l'&eacute;lement 0 &agrave; 0 sur 0 &eacute;l&eacute;ments",
        infoFiltered: "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
        infoPostFix: "",
        loadingRecords: "Chargement en cours...",
        zeroRecords: "Aucun &eacute;l&eacute;ment &agrave; afficher",
        emptyTable: "Aucune donnée disponible dans le tableau",
        paginate: {
          first: "Premier",
          previous: "Pr&eacute;c&eacute;dent",
          next: "Suivant",
          last: "Dernier"
        },
        aria: {
          sortAscending: ": activer pour trier la colonne par ordre croissant",
          sortDescending: ": activer pour trier la colonne par ordre décroissant"
        }
      },
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
    this.getAllVideo();
  }
  ngAfterViewInit(): void {
    setTimeout(() => this.dtTrigger.next(''), 200);
  }

  saveFile(e: any) {
    if (e.target.files[0]) {
      this.file = e.target.files[0];
      console.log(this.file);
      if (this.fileArr.length > 0) {
        this.fileArr = [];
      }
      this.fileArr.push(this.file);
      console.log(this.fileArr);
      this.fileName = e.target.files[0].name;
    }
  }
  async uploadFile(e: any) {
    let formData = new FormData()
    formData.append("file", this.file);
    formData.append("fileName", this.fileName);
    try {
      const res = await axios.post(
        environment.baseUpload + "/api/upload",
        formData,
        {
          onUploadProgress: (ProgressEvent: any): void => {
            if (ProgressEvent.lengthComputable) {
              this.progress = Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100);
              console.log(this.progress);
              if (this.progress == 100) {
                this.socket.emit(
                  'loadVideo'
                )
              }
            }
          }
        }
      )
      console.log(res);
    } catch (ex) {
      console.log(ex);
    }
  }
  rerender(): void {
    this.getAllVideo();
    this.dtTrigger.next(0);
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next('');
    });
  }
  getFile(e: any) {
    if (e) {
      let selectedFile = e.item(0)
      console.log(selectedFile);
      if(selectedFile.type=="video/mp4"){
        if (this.fileArr.length > 0) {
          this.fileArr = [];
        }
        this.fileArr.push(selectedFile)
        this.fileName = this.fileArr[0].name;
      }else{
        this.tost.error("Ce champ n'accepte que les video MP4")
      }
    }
  }

  getAllVideo() {
    this.video.getvideo().subscribe(
      data => {
        this.videos = data
      }, err => {
        console.log(err);
      }
    )
  }

  deleteVideo() {
    this.video.delVideo(this.currentVideo).subscribe(
      data => {
        this.getAllVideo();
        this.dtTrigger.next('')
      }, err => {
        console.log(err);
      }
    )
  }

  supprimerVideo(video: any) {
    this.currentVideo = video;
  }
  //code talou
  upload(e: any) {
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
              let u = event.total;
              let denom = 1;
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

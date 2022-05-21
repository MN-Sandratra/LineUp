import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { faAdd, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { ApiManagerService } from '../services/api-manager.service';
import { Annonce } from './annonce';

@Component({
  selector: 'app-annonce',
  templateUrl: './annonce.component.html',
  styleUrls: ['./annonce.component.scss']
})
export class AnnonceComponent implements OnInit {
  FaModif=faPencil;
  FaAdd=faAdd;
  FaDel=faTrash;
  myAnnonce:any[]=[];
  currentAnnonce:Annonce=new Annonce();
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  dtElement:DataTableDirective | undefined;
  formAnnonce = this.fb.group({
    annonce: ['', Validators.required],
  }
  );

  constructor(private api:ApiManagerService ,private fb:FormBuilder,private toast:ToastrService) { }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  currentAction:String="Ajouter"

  ngOnInit(): void {
    this.dtOptions = {
      language: {
        processing:     "Traitement en cours...",
        search:         "Rechercher&nbsp;:",
        lengthMenu:    "Afficher _MENU_ &eacute;l&eacute;ments",
        info:           "Affichage de l'&eacute;lement _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
        infoEmpty:      "Affichage de l'&eacute;lement 0 &agrave; 0 sur 0 &eacute;l&eacute;ments",
        infoFiltered:   "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
        infoPostFix:    "",
        loadingRecords: "Chargement en cours...",
        zeroRecords:    "Aucun &eacute;l&eacute;ment &agrave; afficher",
        emptyTable:     "Aucune donnée disponible dans le tableau",
        paginate: {
            first:      "Premier",
            previous:   "Pr&eacute;c&eacute;dent",
            next:       "Suivant",
            last:       "Dernier"
        },
        aria: {
            sortAscending:  ": activer pour trier la colonne par ordre croissant",
            sortDescending: ": activer pour trier la colonne par ordre décroissant"
        }
    },
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
    this.getAllAnnonce();
  }
  ngAfterViewInit(): void {
    setTimeout(()=>this.dtTrigger.next(''),200);
  }

  close(){
    this.formAnnonce.reset();
  }
  getAllAnnonce(){
    this.api.getAnnonce().subscribe(
      data=>{
        this.myAnnonce=data;
        console.log(data);
      },err=>{
        console.log(err);
      }
    )
  }

  getCategoryById(id:number){
    this.api.getCategoryById(id).subscribe(
      data=>{
        this.currentAnnonce=data;
        console.log(this.currentAnnonce);
      },err=>{
        console.error("Une erreur s'est produite");       
      }
    )
  }
  updateAnnonce(){
    if(this.formAnnonce.valid){
      this.currentAnnonce.txt=this.formAnnonce.get('annonce').value
      this.api.modifyAnnonce(this.currentAnnonce).subscribe(
      data=>{
        this.getAllAnnonce()
        this.toast.success("Enregistrement de l'annonce","réussi")
        console.log(data);
      },err=>{
        console.log(err);
      }
    )
  }else{
    this.toast.error("Remplisser le champ correctement","Attention")
  }
  }

  modifierAnnonce(annonce:any){
    this.currentAction="Modifier";
    this.currentAnnonce=annonce;
    this.formAnnonce.controls['annonce'].setValue(this.currentAnnonce.txt)
  }
  ajoutAnnonce(){
    this.currentAction="Ajouter";
    this.currentAnnonce=new Annonce();
  }

  initialistaion() {
    this.currentAnnonce=new Annonce();
  }
  supprimerAnnonce(cat:any){
    this.currentAnnonce=cat;
  }
  deleteAnnonce(){
    this.api.delAnnonce(this.currentAnnonce.id).subscribe(
      data=>{
        this.getAllAnnonce()
        console.log(data);
      },err=>{
        console.log(err);
      }
    )
  }

  addAnnonce(){
    if(this.formAnnonce.valid){
      this.currentAnnonce.txt=this.formAnnonce.get('annonce').value
      this.api.addAnnonce(this.currentAnnonce).subscribe(
        data=>{
          this.getAllAnnonce()
          this.toast.success("Enregistrement de l'annonce","réussi")
          console.log(data);
        },err=>{
          console.log(err);
        }
      )
    }else{
      this.toast.error("Remplisser le champ correctement","Attention")
    }
  }


}

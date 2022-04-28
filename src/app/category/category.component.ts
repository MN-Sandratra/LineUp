import { Component, OnInit } from '@angular/core';
import { faAdd, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Category } from '../category';
import { ApiManagerService } from '../services/api-manager.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  FaModif=faPencil;
  FaAdd=faAdd;
  FaDel=faTrash;
  myCategory:any[]=[];
  currentCategory:any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  dtElement:DataTableDirective | undefined;

  constructor(private api:ApiManagerService) { }
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
  }
  ngAfterViewInit(): void {
    setTimeout(()=>this.dtTrigger.next(''),200);
  }
  getCategoryById(id:number){
    this.api.getCathegoryById(id).subscribe(
      data=>{
        this.currentCategory=data;
      },err=>{
        console.error("Une erreur s'est produite");       
      }
    )
  }

  modifierCategory(client:any){
    this.currentAction="Modifier";
    this.getCategoryById(client.id);
  }
  ajoutCategory(){
    this.currentAction="Ajouter";
    this.currentCategory=new Category();
  }

  initialistaion() {
    this.currentCategory=new Category();
  }
  supprimerCategory(client:any){
    this.getCategoryById(client.id);
  }


}

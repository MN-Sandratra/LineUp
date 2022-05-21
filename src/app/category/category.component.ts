import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { faAdd, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Category } from '../category/category';
import { ApiManagerService } from '../services/api-manager.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  FaModif = faPencil;
  FaAdd = faAdd;
  FaDel = faTrash;
  myCategory: any[] = [];
  currentCategory: Category = new Category();
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  dtElement: DataTableDirective | undefined;
  formCategory = this.fb.group({
    identifiant: ['', Validators.required],
    category: ['', Validators.required]
  }
  );

  constructor(private api: ApiManagerService, private fb: FormBuilder, private toast: ToastrService) { }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  currentAction: String = "Ajouter"

  ngOnInit(): void {
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
    this.getAllCategory();
  }
  ngAfterViewInit(): void {
    setTimeout(() => this.dtTrigger.next(''), 200);
  }

  cancel() {
    this.formCategory.reset();
  }
  getAllCategory() {
    this.api.getCathegory().subscribe(
      data => {
        this.myCategory = data.content;
        console.log(data);
      }, err => {
        console.log(err);
      }
    )
  }

  getCategoryById(id: number) {
    this.api.getCategoryById(id).subscribe(
      data => {
        this.currentCategory = data;
        this.formCategory.controls['category'].setValue(this.currentCategory.category)
        this.formCategory.controls['identifiant'].setValue(this.currentCategory.id)
        console.log(this.currentCategory);
      }, err => {
        console.error("Une erreur s'est produite");
      }
    )
  }
  updateCategory() {
    if (this.formCategory.valid) {
      this.currentCategory.category = this.formCategory.get('category').value
      this.currentCategory.id = this.formCategory.get('identifiant').value
      this.api.modifCategory(this.currentCategory).subscribe(
        data => {
          this.getAllCategory()
          console.log(data);
          this.toast.success("Modification de la categorie", "réussi")
        }, err => {
          console.log(err);
        }
      )
    } else {
      this.toast.error("Veuillez remplir les champs correctement", "Attention")
    }
  }

  modifierCategory(category: any) {
    this.currentAction = "Modifier";
    this.getCategoryById(category.type);
  }
  ajoutCategory() {
    this.currentAction = "Ajouter";
    this.currentCategory = new Category();
  }

  initialistaion() {
    this.currentCategory = new Category();
  }
  supprimerCategory(cat: any) {
    this.getCategoryById(cat.type);
  }
  deleteCategory() {
    this.api.delCat(this.currentCategory.type).subscribe(
      data => {
        this.getAllCategory()
        console.log(data);
        this.toast.success("Suppression de la categorie", "réussi")
      }, err => {
        console.log(err);
      }
    )
  }

  addCategory() {
    if (this.formCategory.valid) {
      this.currentCategory.category = this.formCategory.get('category').value
      this.currentCategory.id = this.formCategory.get('identifiant').value
      this.api.addCategory(this.currentCategory).subscribe(
        data => {
          this.getAllCategory()
          this.toast.success("Ajout de la nouvelle categorie", "réussi")
          console.log(data);
        }, err => {
          console.log(err);
        }
      )
    } else {
      this.toast.error("Veuillez remplir les champs correctement", "Attention")
    }
  }

}

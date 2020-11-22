import { Component, OnInit } from '@angular/core';
import {CatalogueService} from "../services/catalogue.service";
import { CommonModule } from '@angular/common';
import {config, from} from "rxjs";
import {Router} from "@angular/router";
//import any = jasmine.any;

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {

  public produits:any;
  public size:number=5;
  public currentPage:number=0;
  // @ts-ignore
  public totalPages: number;
  // @ts-ignore
  public pages: Array<number>;
  private currentKeyword: String="";

  constructor(private catService:CatalogueService, private router:Router) { }

  ngOnInit(): void {

  }

  onGetProduits() {
    this.catService.getProducts(this.currentPage,this.size)
      .subscribe(data=>{
        // @ts-ignore
        this.totalPages=data["page"].totalPages;
        this.pages=new Array<number>(this.totalPages);
        this.produits=data;

      },err=>{
        console.log(err);
      });
  }

  onPageProduct(i:any) {
    this.currentPage=i;
    this.chercherProduits();

  }

  onChercher(form: any) {
    this.currentPage = 0;
    this.currentKeyword=form.keyword
    this.chercherProduits();
  }

  chercherProduits() {
    this.catService.getProductsByKeyword(this.currentKeyword,this.currentPage,this.size)
      .subscribe(data=>{
        // @ts-ignore
        this.totalPages=data["page"].totalPages;
        this.pages=new Array<number>(this.totalPages);
        this.produits=data;

      },err=>{
        console.log(err);
      });

  }

  onDeleteProduct(p: any) {
    let conf=confirm("Etes vous sure?");
    if (conf){
      this.catService.deleteResource(p._links.self.href)
        .subscribe(data=>{
          this.chercherProduits();
          },error => {
          console.log(error);

        })
    }

  }

  onEditProduct(p: any){
    let  url=p._links.self.href;

    this.router.navigateByUrl("/edit-product/"+btoa(url));

  }
}

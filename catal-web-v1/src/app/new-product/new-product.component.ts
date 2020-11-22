import { Component, OnInit } from '@angular/core';
import {CatalogueService} from "../services/catalogue.service";
import {Route, Router} from "@angular/router";
import {Product} from "../model/product.model";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  public currentProduct!: Product;
  public mode: number=1;


  constructor(private catSerrvice:CatalogueService, private router:Router ) { }

  ngOnInit(): void {
  }

  onSaveProduct(data: any) {
    this.catSerrvice.saveResource(this.catSerrvice.host+"/produits",data)
      .subscribe(res=>{
        //this.router.navigateByUrl("/products"); change de route
        this.currentProduct=res;
        this.mode=2;
        },err => {
        console.log(err);
        })
  }

  onNewProduct(){
    this.mode=1;
  }
}

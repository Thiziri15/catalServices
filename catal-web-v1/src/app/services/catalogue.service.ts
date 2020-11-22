import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  public host:string="http://localhost:8090";

  constructor(private httpClient:HttpClient) { }

  public getProducts(page:number, size:number){
    return this.httpClient.get(this.host+"/produits?page="+page+"&size="+size);
  }

  public getProductsByKeyword(mc:String,page:number, size:number){
    return this.httpClient.get(this.host+"/produits/search/byDesignationPage?mc="+mc+"&page="+page+"&size="+size);
  }

  public deleteResource(url:string){
    return this.httpClient.delete(url);
  }

  public saveResource(url:string,data:any):Observable<Product>{
    return this.httpClient.post<Product>(url,data);
  }

  public getResource(url:string):Observable<Product>{
    return this.httpClient.get<Product>(url);
  }

  public updateResource(url:string, data:any){
    return this.httpClient.put(url,data);
  }
}

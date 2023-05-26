import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  url ='http://localhost:4000'

  constructor(private http: HttpClient) { }

  get_invoices():Observable<any>{
    return this.http.get(`${this.url}invoice/get_all`);
  }

  get_clients():Observable<any>{
    return this.http.get(`${this.url}user/get_clients`);
  }

  get_products():Observable<any>{
    return this.http.get(`${this.url}product/get_all`);
  }
  set_invoice(datos:any):Observable<any>{
    return this.http.post(`${this.url}invoice/add`, datos);
  }
}




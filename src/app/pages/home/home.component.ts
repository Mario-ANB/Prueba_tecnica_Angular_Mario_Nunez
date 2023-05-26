import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InvoiceService } from 'src/app/services/invoice/invoice.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  form_invoice: FormGroup
  selectedOption: string = '';

  modalNewInvoice: boolean = false;

  openModal() {
    this.modalNewInvoice = true;
  }
  closeModal() {
    this.modalNewInvoice = false;
  }


  constructor(private router: Router, private s_invoice: InvoiceService,private fb: FormBuilder) {
    this.form_invoice = this.fb.group({
      id_client: ['', [Validators.required]],
      date: ['', [Validators.required]],
      subtotal: ['', [Validators.required]],
      discount: ['', [Validators.required]],
      total: ['', [Validators.required]]
    })
   }


  ngOnInit(): void {
    this.invoices();
    this.name_user();
    this.rol();
    this.products();
    this.clients();
  }

  datos={
    invoice:{
    id_client:1,
    date:null,
    subtotal:0,
    discount:0,
    total:0
    },
    products:[] as any[]

  }

  setInvoice(value:any){
    this.datos = {
      invoice:{
       id_client : value.id_client,
      date: value.date,
      subtotal: 0,
      discount: value.discount,
      total: 0,
      },
      products: [...this.products_list],
    }
    this.s_invoice.set_invoice(this.datos).subscribe(data => {
      Swal.fire({
        icon: 'success',
        title: 'Factura Generada',
        text: 'La factura se ha generado correctamente',
      });
    });
  }

  Logout() {
    Swal.fire({
      title: '¿Estas seguro de cerrar sesión?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Sesión finalizada',
          showConfirmButton: false,
          timer: 1500
        });
        sessionStorage.removeItem('rol');
        sessionStorage.removeItem('key');
        sessionStorage.removeItem('name');
        this.router.navigate(['/']);
      }
    })
  }

  products_list : any[] = [];
  product={
    product_name:'a',
    id_product: 45,
    quantity:1
  }

  add_product(event: Event, value:any){
    event.preventDefault();
    const selectedText = this.getSelectedOptionText();
    this.product ={
      product_name : selectedText,
      id_product : value.id_product,
      quantity : value.quantity
    }
    this.products_list.push(this.product);
  }

  getSelectedOptionText(): string {
    const selectedOption = document.querySelector('select option:checked');
    if (selectedOption !== null) {
      return selectedOption.textContent || ''; // Usar valor por defecto en caso de que textContent sea null
    }
    return '';
  }

  //Obtener todas las facturas
  invoice_list: any;
  invoices() {
    this.s_invoice.get_invoices().subscribe(datos => {
      this.invoice_list = datos;
    })
  };

  clients_list: any;
  clients() {
    this.s_invoice.get_clients().subscribe(datos => {
      this.clients_list = datos;
    })
  };
  products_all:any;
  products() {
    this.s_invoice.get_products().subscribe(datos => {
      this.products_all = datos;
    })
  };

  //Obtener nombre de usuario
  user_name: any;
  name_user() {
    this.user_name = JSON.parse(sessionStorage.getItem('name')!);
  }

  //Obtener rol de usuario
  rol_user: any;
  rol() {
    this.rol_user = JSON.parse(sessionStorage.getItem('rol')!);
  }

}

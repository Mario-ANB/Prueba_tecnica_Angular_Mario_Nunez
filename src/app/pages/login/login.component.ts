import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/services/login/login.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form_user: FormGroup

  constructor(
    private router: Router,
    private ulogin: LoginService,
    private fb: FormBuilder
  ) {
    this.form_user = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  newlogin = {
    email: null,
    password: null,
  }
  
  login(value: any) {
    this.newlogin = {
      email: value.email,
      password: value.password
    }
    this.ulogin.login(this.newlogin.email, this.newlogin.password).subscribe(data => {
      sessionStorage.setItem("key", data.token);
      sessionStorage.setItem("rol", data.rol);
      sessionStorage.setItem("name", data.name);
      Swal.fire({
        icon: 'success',
        title: 'Inicio de sesion exitoso',
        text: 'Bienvenido ' + localStorage.getItem('nombre') + ' ' + localStorage.getItem('apellido'),
      });

    }, (error: HttpErrorResponse) => {
      console.log(error.error.message);
      if (error.error.message) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error.message,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ha oucrrido un error inesperado',
        })
      }

    });

  }
}

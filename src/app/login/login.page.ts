import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonToast,
  IonText
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonInput,
    IonItem,
    IonLabel,
    IonToast,
    IonText
  ]
})
export class LoginPage {
  email: string = '';
  password: string = '';
  showToast = false;
  toastMessage = '';

  constructor(private router: Router, private authService: AuthService) {}

  async login(form: NgForm) {
    if (!form.valid) {
      this.toastMessage = 'Por favor llena todos los campos correctamente.';
      this.showToast = true;
      return;
    }

    try {
      await this.authService.login(this.email, this.password);
      this.toastMessage = 'Inicio de sesión exitoso';
      this.showToast = true;
      this.router.navigate(['/home']);
    } catch (error: any) {
      this.toastMessage = 'Error al iniciar sesión: ' + (error.message || error);
      this.showToast = true;
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}

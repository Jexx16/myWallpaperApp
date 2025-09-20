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
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
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
export class RegisterPage {
  email: string = '';
  password: string = '';
  showToast = false;
  toastMessage = '';

  constructor(private router: Router, private authService: AuthService) {}

  goToLogin() {
    this.router.navigate(['/login']);
  }

  async register(form: NgForm) {
    if (!form.valid) {
      this.toastMessage = 'Por favor llena todos los campos correctamente.';
      this.showToast = true;
      return;
    }

    try {
      await this.authService.register(this.email, this.password);
      this.toastMessage = 'Registro exitoso, por favor inicia sesión.';
      this.showToast = true;
      this.router.navigate(['/login']);
    } catch (error: any) {
      this.toastMessage = 'Error al registrar: ' + (error.message || error);
      this.showToast = true;
    }
  }
}

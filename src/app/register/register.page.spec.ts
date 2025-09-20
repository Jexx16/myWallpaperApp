import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonInput, IonItem, IonLabel, IonButton, IonToolbar, IonTitle, IonToast } from '@ionic/angular/standalone';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonInput, IonItem, IonLabel, IonButton, IonToolbar, IonTitle, CommonModule, FormsModule, IonToast]
})
export class RegisterPage {
  email: string = '';
  password: string = '';
  showToast = false;
  toastMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  async register() {
    try {
      await this.authService.register(this.email, this.password);
      this.toastMessage = 'Registro exitoso';
      this.showToast = true;
      this.router.navigate(['/login']);
    } catch (error: any) {
      this.toastMessage = error.message || 'Error en el registro';
      this.showToast = true;
    }
  }
}

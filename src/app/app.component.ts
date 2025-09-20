import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';  // Importa IonicModule
import { RouterModule } from '@angular/router';  // Para manejar las rutas

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    IonicModule,  // Asegúrate de importar IonicModule aquí
    RouterModule  // Importa RouterModule para manejar las rutas
  ],
})
export class AppComponent {}

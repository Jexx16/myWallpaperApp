// src/app/home/home.page.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel
} from '@ionic/angular/standalone';
import { WallpaperService } from '../services/wallpaper.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel
  ]
})
export class HomePage {
  wallpapers: any[] = [];

  constructor(private wallpaperService: WallpaperService) {}

  ngOnInit() {
    this.loadWallpapers();
  }

  loadWallpapers() {
    this.wallpaperService.getWallpapers().subscribe((data: any[]) => {
      this.wallpapers = data;
    });
  }

  async onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      await this.wallpaperService.uploadWallpaper(file);
      this.loadWallpapers(); // recargar lista tras subir
    }
  }

  getWallpaperUrl(wallpaper: any): string {
    return this.wallpaperService['supabase']
      .storage
      .from('wallpapers')
      .getPublicUrl(`${wallpaper.name}`).data.publicUrl;
  }
}

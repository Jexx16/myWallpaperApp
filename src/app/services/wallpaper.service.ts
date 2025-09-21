import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, query, where } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { Auth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WallpaperService {

  constructor(
    private firestore: Firestore,
    private storage: Storage,
    private auth: Auth
  ) {}

  // Obtener wallpapers solo del usuario actual
  getWallpapers(): Observable<any[]> {
    const user = this.auth.currentUser;
    if (!user) return new Observable<any[]>(); // Si no hay usuario autenticado, devolvemos vacío

    const wallpapersRef = collection(this.firestore, 'wallpapers');
    const q = query(wallpapersRef, where('uid', '==', user.uid));
    return collectionData(q, { idField: 'id' }) as Observable<any[]>;
  }

  // Subir wallpaper
  async uploadWallpaper(file: File): Promise<void> {
    const user = this.auth.currentUser;
    if (!user) throw new Error('Usuario no autenticado');

    const path = `wallpapers/${user.uid}/${Date.now()}_${file.name}`;
    const storageRef = ref(this.storage, path);

    // 1. Subir archivo a Firebase Storage
    await uploadBytes(storageRef, file);

    // 2. Obtener URL pública
    const url = await getDownloadURL(storageRef);

    // 3. Guardar metadata en Firestore
    const wallpapersRef = collection(this.firestore, 'wallpapers');
    await addDoc(wallpapersRef, {
      uid: user.uid,
      name: file.name,
      url: url,
      createdAt: new Date()
    });
  }
}

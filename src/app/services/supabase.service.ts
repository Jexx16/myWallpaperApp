import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'https://TU-PROJECT-URL.supabase.co', // 👈 Reemplaza con tu URL de Supabase
      'TU-API-KEY' // 👈 Reemplaza con tu anon key
    );
  }

  async uploadImage(file: File, userId: string): Promise<string> {
    const fileName = `${userId}/${Date.now()}_${file.name}`;

    const { data, error } = await this.supabase.storage
      .from('wallpapers') // 👈 asegúrate de tener un bucket llamado wallpapers
      .upload(fileName, file);

    if (error) throw error;

    // obtener URL pública
    const { data: publicUrl } = this.supabase.storage
      .from('wallpapers')
      .getPublicUrl(fileName);

    return publicUrl.publicUrl;
  }
}

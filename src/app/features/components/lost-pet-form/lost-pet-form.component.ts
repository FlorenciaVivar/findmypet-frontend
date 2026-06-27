import {Component, OnInit, inject, output, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InteractiveMapComponent } from '../interactive-map/interactive-map.component';
import { Pet } from '../../../core/models/pet.interfaces';

@Component({
  selector: 'app-lost-pet-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InteractiveMapComponent],
  templateUrl: './lost-pet-form.component.html'
})
export class LostPetFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  closeForm = output<void>();
  petCreated = output<Pet>();

  isSubmitting = signal<boolean>(false);
  showMap = signal<boolean>(false);
  imageUrl = signal<string>('');

  latitude = -34.59;
  longitude = -58.41;

  petForm!: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.petForm = this.fb.group({
      name: ['', Validators.required],
      species: ['perro', Validators.required],
      breed: ['', Validators.required],
      color: [''],
      description: [''],
      contactPhone: ['', Validators.required],
      lostDate: [new Date().toISOString().split('T')[0], Validators.required],
      locationName: ['', Validators.required],
      latitude: [this.latitude],
      longitude: [this.longitude],
      imageUrl: ['', Validators.required]
    });
  }

  handleImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      this.imageUrl.set(base64String);
      this.petForm.patchValue({ imageUrl: base64String });
      this.petForm.get('imageUrl')?.updateValueAndValidity();
    };
    reader.readAsDataURL(file);
  }

  removeImage(): void {
    this.imageUrl.set('');
    this.petForm.patchValue({ imageUrl: '' });
  }

  handleCoordinatesSelected(coords: { lat: number; lng: number }): void {
    this.latitude = coords.lat;
    this.longitude = coords.lng;
    this.petForm.patchValue({
      latitude: coords.lat,
      longitude: coords.lng
    });
  }

  toggleMap(): void {
    this.showMap.update(state => !state);
  }

  handleSubmit(): void {
    if (this.petForm.invalid) {
      alert('Por favor completa los campos obligatorios: Nombre, Raza, Contacto, Zona y Foto.');
      return;
    }

    this.isSubmitting.set(true);

    const token = localStorage.getItem('auth_token') || '';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    this.http.post<Pet>('/api/pets', this.petForm.value, { headers }).subscribe({
      next: (createdPet) => {
        this.petCreated.emit(createdPet);
        this.closeForm.emit();
      },
      error: (err) => {
        alert(err.error?.error || 'No se pudo crear la publicación');
        this.isSubmitting.set(false);
      },
      complete: () => this.isSubmitting.set(false)
    });
  }
}

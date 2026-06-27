import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InteractiveMapComponent } from '../../components/interactive-map/interactive-map.component';
import { Pet } from '../../../core/models/pet.interfaces';

@Component({
  selector: 'app-report-pet',
  standalone: true,
  imports: [CommonModule, FormsModule, InteractiveMapComponent],
  templateUrl: './report-pet.component.html',
  styleUrl: './report-pet.component.css'
})
export class ReportPetComponent implements OnInit {

  name: string = '';
  species: 'perro' | 'gato' | 'otro' = 'perro';
  breed: string = '';
  color: string = '';
  lostDate: string = '';
  contactPhone: string = '';
  locationName: string = '';
  description: string = '';
  imageUrl: string = '';


  latitude: number = 41.3851;
  longitude: number = 2.1734;


  showMap: boolean = false;
  isSubmitting: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {

    this.lostDate = new Date().toISOString().split('T')[0];
  }


  onClose(): void {
    this.router.navigate(['/mascotas']);
  }


  handleImageChange(event: any): void {
    const element = event.target as HTMLInputElement | null;

    if (element && element.files && element.files.length > 0) {
      const file = element.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.imageUrl = reader.result as string;
      };

      reader.readAsDataURL(file);
    }
  }

  handleCoordinatesSelected(coords: [number, number]): void {
    this.latitude = coords[0];
    this.longitude = coords[1];
  }


  handleSubmit(): void {

    if (!this.name || !this.breed || !this.lostDate || !this.contactPhone || !this.locationName) {
      alert('Por favor, completá los campos obligatorios.');
      return;
    }

    this.isSubmitting = true;

    const newLostPet: Pet = {
      name: this.name,
      species: this.species,
      breed: this.breed,
      contactPhone: this.contactPhone,
      lostDate: this.lostDate,
      locationName: this.locationName,
      latitude: this.latitude,
      longitude: this.longitude,
      imageUrl: this.imageUrl || 'assets/images/default-pet.png',
      status: 'perdido',

      ...(this.color.trim() && { color: this.color }),
      ...(this.description.trim() && { description: this.description })
    };

    console.log('Nueva mascota registrada para búsqueda:', newLostPet);

    setTimeout(() => {
      this.isSubmitting = false;
      this.router.navigate(['/mascotas']);
    }, 1500);
  }
}

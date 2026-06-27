import {Component, computed, inject, signal} from '@angular/core';
import {Router} from '@angular/router';

interface PetAlert {
  id: string;
  name: string;
  type: 'perro' | 'gato';
  breed: string;
  locationName: string;
  lostDate: string;
  imageUrl: string;
  sightings: number;
}

@Component({
  selector: 'app-lost-pets-dashboard',
  standalone: true,
  templateUrl: './lost-pets-dashboard.component.html',
})
export class LostPetsDashboardComponent {

  private router = inject(Router);
  currentTab = signal<string>('alerts');
  currentFilter = signal<'all' | 'perro' | 'gato'>('all');
  searchQuery = signal<string>('');

  // Mock inicial de mascotas
  pets = signal<PetAlert[]>([
    {
      id: 'fmp-001',
      name: 'Rocco',
      type: 'perro',
      breed: 'Bulldog Francés',
      locationName: 'Eixample, Barcelona',
      lostDate: '24/06/2026',
      imageUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500',
      sightings: 2
    },
    {
      id: 'fmp-002',
      name: 'Luna',
      type: 'gato',
      breed: 'Siamés',
      locationName: 'Poblenou, Barcelona',
      lostDate: '25/06/2026',
      imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500',
      sightings: 1
    }
  ]);

  filteredPets = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const filter = this.currentFilter();

    return this.pets().filter(pet => {
      const matchesFilter = filter === 'all' || pet.type === filter;
      const matchesSearch = !query ||
        pet.name.toLowerCase().includes(query) ||
        pet.breed.toLowerCase().includes(query) ||
        pet.locationName.toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });
  });

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }

  onChangeFilter(filter: 'all' | 'perro' | 'gato'): void {
    this.currentFilter.set(filter);
  }

  onSelectPet(pet: PetAlert): void {
    this.router.navigate(['/pet', pet.id]);
  }

  onPublishAlert(): void {
    this.router.navigate(['/mascotas/reportar'])
  }

  onLogin(): void {
    this.router.navigate(['/login'])
  }

  onNavigate(tab: string): void {
    this.currentTab.set(tab);
    this.currentTab.set(tab);
    if (tab === 'map') {
      this.router.navigate(['/mapa']);
    } else if (tab === 'scanner') {
      this.router.navigate(['/scanner']);
    } else if (tab === 'alerts') {
      this.router.navigate(['/']);
    }
  }
}

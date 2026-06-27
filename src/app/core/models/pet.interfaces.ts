export interface Pet {
  id?: string;
  name: string;
  species: 'perro' | 'gato' | 'otro';
  breed: string;
  color?: string;
  description?: string;
  contactPhone: string;
  lostDate: string;
  locationName: string;
  latitude: number;
  longitude: number;
  imageUrl: string;
  userId?: string;
  createdAt?: string;
  status: 'perdido' | 'encontrado';
}

export interface Sighting {
  id?: string;
  petId: string;
  latitude: number;
  longitude: number;
  imageUrl?: string;
  description: string;
  reporterName: string;
  contactPhone: string;
  sightingDate: string;
  createdAt?: string;
}

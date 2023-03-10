export interface Businesses {
    id: string;
    name: string;
    image_url: string;
    is_closed: boolean;
    url: string;
    categories: Array<{
      title: string
    }>;
    coordinates: {
      latitude: number;
      longitude: number;
    };
    rating: number;
    price: string;
    photos: string[];
    location: {
      address1: string;
      address2: string;
      address3: string;
      city: string;
      zip_code: string;
      country: string;
      state: string;
      display_address: string[];
    };
    phone: string;
    display_phone: string;
    distance: number;
}

export interface Review {
  id: string;
  url: string;
  text: string;
  rating: number;
  time_created: string;
  user: {
    id: string;
    image_url: string;
    name: string;
  }
}

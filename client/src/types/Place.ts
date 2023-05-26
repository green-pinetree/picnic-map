export interface Place {
  id: number;
  type: { code: number; msg: string };
  name: string;
  content: string | null;
  lng: number;
  lat: number;
  image: string[];
  detail: Detail;
  near: number | null;
}

export interface Detail {
  area: string | null;
  mainEquip: string | null;
  mainPlants: string | null;
  directions: string | null;
  address: string | null;
  tel: string | null;
  distance: string | null;
  leadTime: string | null;
  relateSubway: string | null;
  path: string | null;
  homepage: string | null;
}

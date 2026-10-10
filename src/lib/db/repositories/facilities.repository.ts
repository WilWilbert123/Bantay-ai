import { getDb } from '../connection';

export interface Facility {
  id: string;
  name: string;
  facility_type: string;
  address: string;
  latitude: number;
  longitude: number;
  phone_number?: string;
  accessibility_notes?: string;
}

export const facilitiesRepository = {
  getAllFacilities(): Facility[] {
    const db = getDb();
    return db.prepare('SELECT * FROM emergency_facilities ORDER BY name ASC').all() as Facility[];
  }
};

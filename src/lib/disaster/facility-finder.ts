import { facilitiesRepository, Facility } from '../db/repositories/facilities.repository';

export interface DistanceFacility extends Facility {
  distanceKm?: number;
  formattedDistance?: string;
  isVerified: boolean;
}

// Calculate approximate Haversine distance in kilometers
export function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function searchOfflineFacilities(
  query: string, 
  userLat?: number, 
  userLng?: number,
  facilityCategory?: string
): DistanceFacility[] {
  const allFacilities = facilitiesRepository.getAllFacilities();
  const cleanQuery = query.toLowerCase().trim();

  // Filter facilities matching query or category
  let filtered = allFacilities.filter(f => {
    const nameMatch = f.name.toLowerCase().includes(cleanQuery);
    const addressMatch = f.address.toLowerCase().includes(cleanQuery);
    const typeMatch = f.facility_type.toLowerCase().includes(cleanQuery);

    if (facilityCategory) {
      const catMatch = f.facility_type.toUpperCase() === facilityCategory.toUpperCase();
      return catMatch && (nameMatch || addressMatch || typeMatch || cleanQuery === '');
    }

    return nameMatch || addressMatch || typeMatch;
  });

  // If query was empty or category search had no matches, fallback to all filtered by type if provided
  if (filtered.length === 0 && facilityCategory) {
    filtered = allFacilities.filter(f => f.facility_type.toUpperCase() === facilityCategory.toUpperCase());
  } else if (filtered.length === 0) {
    filtered = allFacilities;
  }

  // Calculate distance if coordinates provided
  const results: DistanceFacility[] = filtered.map(f => {
    let distanceKm: number | undefined = undefined;
    let formattedDistance: string | undefined = undefined;

    if (userLat !== undefined && userLng !== undefined && f.latitude && f.longitude) {
      distanceKm = calculateDistanceKm(userLat, userLng, f.latitude, f.longitude);
      formattedDistance = distanceKm < 1 ? `${Math.round(distanceKm * 1000)} meters` : `${distanceKm.toFixed(1)} km`;
    }

    return {
      ...f,
      distanceKm,
      formattedDistance,
      isVerified: true
    };
  });

  // Sort by distance if available, otherwise by name
  if (userLat !== undefined && userLng !== undefined) {
    results.sort((a, b) => (a.distanceKm ?? 9999) - (b.distanceKm ?? 9999));
  }

  return results;
}

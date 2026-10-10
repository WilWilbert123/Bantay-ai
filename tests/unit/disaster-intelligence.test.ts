import { describe, it, expect } from 'vitest';
import { classifySafetyQuery } from '@/lib/disaster/safety-engine';
import { calculateDistanceKm } from '@/lib/disaster/facility-finder';

describe('Bantay AI Local Disaster Intelligence Engine', () => {
  it('correctly classifies urgent flood emergency in Tagalog', () => {
    const result = classifySafetyQuery('Nalulunod ako sa baha tulong');
    expect(result.intent).toBe('ACTIVE_EMERGENCY');
    expect(result.isUrgent).toBe(true);
    expect(result.hazardType).toBe('FLOOD');
    expect(result.immediateActionText).toContain('IMMEDIATE EMERGENCY');
  });

  it('correctly classifies earthquake gas leak active threat', () => {
    const result = classifySafetyQuery('I smell gas after an earthquake');
    expect(result.intent).toBe('ACTIVE_EMERGENCY');
    expect(result.isUrgent).toBe(true);
    expect(result.hazardType).toBe('EARTHQUAKE');
  });

  it('correctly classifies general typhoon preparedness query', () => {
    const result = classifySafetyQuery('Ano ang dapat gawin bago ang bagyo?');
    expect(result.intent).toBe('GENERAL_PREPAREDNESS');
    expect(result.isUrgent).toBe(false);
    expect(result.hazardType).toBe('TYPHOON');
  });

  it('calculates Haversine distance between two coordinates accurately', () => {
    // Distance between BGC Taguig (14.5515, 121.0510) and Makati Med (14.5592, 121.0146) ~ 4.0 km
    const dist = calculateDistanceKm(14.5515, 121.0510, 14.5592, 121.0146);
    expect(dist).toBeGreaterThan(3.5);
    expect(dist).toBeLessThan(4.5);
  });
});

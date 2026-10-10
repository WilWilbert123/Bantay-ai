'use server';

import { revalidatePath } from 'next/cache';
import { sensorsRepository } from '@/lib/db/repositories/sensors.repository';

export async function registerSensorAction(formData: FormData) {
  const device_name = formData.get('device_name') as string;
  const device_type = formData.get('device_type') as string;
  const location_name = formData.get('location_name') as string;
  const latitude = parseFloat(formData.get('latitude') as string) || 14.5547;
  const longitude = parseFloat(formData.get('longitude') as string) || 121.0244;
  const measurement_unit = formData.get('measurement_unit') as string;

  if (!device_name || !device_type || !location_name || !measurement_unit) {
    throw new Error('All fields are required.');
  }

  sensorsRepository.registerDevice({
    device_name,
    device_type,
    location_name,
    latitude,
    longitude,
    measurement_unit,
  });

  revalidatePath('/admin/sensors');
  revalidatePath('/dashboard');
  revalidatePath('/map');
}

export async function pushReadingAction(sensorId: string, value: number, unit: string, type: string) {
  sensorsRepository.addReading(sensorId, type, value, unit);

  revalidatePath('/admin/sensors');
  revalidatePath('/dashboard');
  revalidatePath('/map');
}

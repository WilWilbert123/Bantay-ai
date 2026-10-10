import Link from 'next/link';
import { sensorsRepository } from '@/lib/db/repositories/sensors.repository';
import SensorManagementView from './sensor-management-view';

export const revalidate = 0;

export default async function AdminSensorsPage() {
  const sensors = sensorsRepository.getAllDevicesWithLatestReading();

  return <SensorManagementView initialSensors={sensors} />;
}

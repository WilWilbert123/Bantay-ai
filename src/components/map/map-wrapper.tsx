'use client';

import dynamic from 'next/dynamic';
import { Alert } from '@/types/disaster';
import { Facility } from '@/lib/db/repositories/facilities.repository';

import { SensorDevice } from '@/types/sensors';

// Dynamically import the Leaflet map component with SSR disabled
const OfflineMap = dynamic(() => import('./offline-map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full rounded-2xl bg-slate-900 animate-pulse flex flex-col items-center justify-center border border-slate-800 shadow-sm min-h-[180px]">
      <div className="w-8 h-8 border-3 border-blue-800 border-t-blue-500 rounded-full animate-spin mb-2"></div>
      <p className="text-slate-400 font-medium text-xs">Initializing Local Map...</p>
    </div>
  )
});

interface MapWrapperProps {
  alerts?: any[];
  facilities?: Facility[];
  sensors?: SensorDevice[];
}

export default function MapWrapper({ alerts = [], facilities = [], sensors = [] }: MapWrapperProps) {
  return <OfflineMap alerts={alerts} facilities={facilities} sensors={sensors} />;
}

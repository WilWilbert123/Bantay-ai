export type SensorType = 'WATER_LEVEL' | 'RAINFALL' | 'SEISMIC' | 'WIND_SPEED' | 'AIR_QUALITY' | 'POWER_STATUS';
export type SensorStatus = 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE';
export type QualityStatus = 'GOOD' | 'SUSPECT' | 'BAD';

export interface SensorDevice {
  id: string;
  device_name: string;
  device_type: SensorType;
  location_name: string;
  latitude: number;
  longitude: number;
  measurement_unit: string;
  configuration_json: string;
  device_key_hash: string;
  status: SensorStatus;
  last_seen_at: string | null;
  created_at: string;
}

export interface SensorReading {
  id: string;
  sensor_id: string;
  measurement_type: string;
  value: number;
  unit: string;
  measured_at: string;
  received_at: string;
  quality_status: QualityStatus;
  sequence_number: number | null;
}

export interface SensorRule {
  id: string;
  sensor_id: string;
  rule_name: string;
  condition_operator: '>' | '<' | '=' | '>=' | '<=';
  threshold_value: number;
  duration_minutes: number;
  action_type: 'ALERT' | 'NOTIFY';
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  is_active: 1 | 0;
  created_at: string;
}

export type EmergencyType = 'TYPHOON' | 'FLOOD' | 'EARTHQUAKE' | 'VOLCANO' | 'POWER_OUTAGE' | 'OTHER';
export type AlertSeverity = 'CRITICAL' | 'WARNING' | 'INFO';
export type AlertStatus = 'ACTIVE' | 'ACKNOWLEDGED' | 'RESOLVED' | 'EXPIRED';

export interface Alert {
  id: string;
  incident_id: string | null;
  alert_type: string;
  severity: AlertSeverity;
  status: AlertStatus;
  title: string;
  description: string;
  trigger_source: string;
  trigger_value: number | null;
  threshold_value: number | null;
  issued_at: string;
  last_evidence_at: string | null;
  expires_at: string | null;
  acknowledged_at: string | null;
}

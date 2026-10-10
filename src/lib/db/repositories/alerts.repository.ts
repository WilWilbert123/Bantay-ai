import { getDb } from '../connection';
import { Alert, EmergencyType, AlertSeverity } from '../../../types/disaster';
import { generateId } from '../../utils/ids';

export const alertsRepository = {
  create(alert: Omit<Alert, 'id' | 'issued_at'>): Alert {
    const db = getDb();
    const id = generateId();
    const issued_at = new Date().toISOString();
    
    const stmt = db.prepare(`
      INSERT INTO alerts (
        id, incident_id, alert_type, severity, status, title, description, 
        trigger_source, trigger_value, threshold_value, issued_at, expires_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      RETURNING *
    `);
    
    return stmt.get(
      id, 
      alert.incident_id || null, 
      alert.alert_type, 
      alert.severity, 
      alert.status, 
      alert.title, 
      alert.description, 
      alert.trigger_source, 
      alert.trigger_value || null, 
      alert.threshold_value || null, 
      issued_at, 
      alert.expires_at || null
    ) as Alert;
  },

  getActiveAlerts(): (Alert & { latitude?: number; longitude?: number })[] {
    const db = getDb();
    return db.prepare(`
      SELECT a.*, e.latitude, e.longitude 
      FROM alerts a
      LEFT JOIN emergency_incidents e ON a.incident_id = e.id
      WHERE a.status = 'ACTIVE' 
      ORDER BY a.issued_at DESC
    `).all() as (Alert & { latitude?: number; longitude?: number })[];
  }
};

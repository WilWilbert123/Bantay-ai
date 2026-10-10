import { getDb } from '../connection';
import { SensorDevice, SensorReading, SensorRule } from '../../../types/sensors';
import { generateId } from '../../utils/ids';

export interface SensorDeviceWithReading extends SensorDevice {
  latest_value?: number;
  latest_unit?: string;
  latest_measured_at?: string;
}

export const sensorsRepository = {
  getAllDevices(): SensorDevice[] {
    const db = getDb();
    return db.prepare('SELECT * FROM sensor_devices ORDER BY device_name ASC').all() as SensorDevice[];
  },

  getAllDevicesWithLatestReading(): SensorDeviceWithReading[] {
    const db = getDb();
    const devices = db.prepare('SELECT * FROM sensor_devices ORDER BY device_name ASC').all() as SensorDevice[];
    
    return devices.map((dev) => {
      const latest = db
        .prepare('SELECT value, unit, measured_at FROM sensor_readings WHERE sensor_id = ? ORDER BY measured_at DESC LIMIT 1')
        .get(dev.id) as { value: number; unit: string; measured_at: string } | undefined;

      return {
        ...dev,
        latest_value: latest?.value,
        latest_unit: latest?.unit || dev.measurement_unit,
        latest_measured_at: latest?.measured_at || dev.last_seen_at || undefined,
      };
    });
  },

  getDeviceById(id: string): SensorDevice | undefined {
    const db = getDb();
    return db.prepare('SELECT * FROM sensor_devices WHERE id = ?').get(id) as SensorDevice | undefined;
  },

  registerDevice(device: {
    device_name: string;
    device_type: string;
    location_name: string;
    latitude: number;
    longitude: number;
    measurement_unit: string;
  }): SensorDevice {
    const db = getDb();
    const id = generateId();
    const device_key_hash = `hash_${id.substring(0, 8)}`;
    const now = new Date().toISOString();

    const stmt = db.prepare(`
      INSERT INTO sensor_devices (
        id, device_name, device_type, location_name, latitude, longitude,
        measurement_unit, configuration_json, device_key_hash, status, last_seen_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      RETURNING *
    `);

    return stmt.get(
      id,
      device.device_name,
      device.device_type,
      device.location_name,
      device.latitude,
      device.longitude,
      device.measurement_unit,
      '{}',
      device_key_hash,
      'ACTIVE',
      now
    ) as SensorDevice;
  },

  addReading(sensorId: string, measurementType: string, value: number, unit: string, recordedAt: string = new Date().toISOString()): SensorReading {
    const db = getDb();
    const id = generateId();

    const execute = db.transaction(() => {
      // Update last seen
      db.prepare("UPDATE sensor_devices SET last_seen_at = ?, status = 'ACTIVE' WHERE id = ?").run(recordedAt, sensorId);

      // Insert reading
      const stmt = db.prepare(`
        INSERT INTO sensor_readings (id, sensor_id, measurement_type, value, unit, measured_at, quality_status)
        VALUES (?, ?, ?, ?, ?, ?, 'GOOD')
        RETURNING *
      `);
      const reading = stmt.get(id, sensorId, measurementType, value, unit, recordedAt) as SensorReading;

      // Evaluate active warning rules
      try {
        const activeRules = db
          .prepare('SELECT * FROM sensor_rules WHERE sensor_id = ? AND is_active = 1')
          .all(sensorId) as SensorRule[];

        for (const rule of activeRules) {
          let triggered = false;
          if (rule.condition_operator === '>' && value > rule.threshold_value) triggered = true;
          if (rule.condition_operator === '>=' && value >= rule.threshold_value) triggered = true;
          if (rule.condition_operator === '<' && value < rule.threshold_value) triggered = true;
          if (rule.condition_operator === '<=' && value <= rule.threshold_value) triggered = true;
          if (rule.condition_operator === '=' && value === rule.threshold_value) triggered = true;

          if (triggered) {
            const alertId = generateId();
            const device = db.prepare('SELECT * FROM sensor_devices WHERE id = ?').get(sensorId) as SensorDevice | undefined;
            const deviceName = device ? device.device_name : 'Local Sensor';

            db.prepare(`
              INSERT INTO alerts (
                id, incident_id, alert_type, severity, status, title, description,
                trigger_source, trigger_value, threshold_value, issued_at
              ) VALUES (?, null, ?, ?, 'ACTIVE', ?, ?, ?, ?, ?, datetime('now'))
            `).run(
              alertId,
              rule.action_type || 'SENSOR_THRESHOLD',
              rule.severity || 'WARNING',
              `Rule Triggered: ${rule.rule_name}`,
              `${deviceName} reported ${value} ${unit} (exceeding threshold of ${rule.threshold_value} ${unit}).`,
              deviceName,
              value,
              rule.threshold_value
            );
          }
        }
      } catch (err) {
        console.warn('Sensor threshold rule evaluation warning:', err);
      }

      return reading;
    });

    return execute();
  },

  getRecentReadings(sensorId: string, limit: number = 100): SensorReading[] {
    const db = getDb();
    return db.prepare('SELECT * FROM sensor_readings WHERE sensor_id = ? ORDER BY measured_at DESC LIMIT ?')
      .all(sensorId, limit) as SensorReading[];
  },

  // Rule Management
  getRules(): SensorRule[] {
    const db = getDb();
    return db.prepare('SELECT * FROM sensor_rules ORDER BY created_at DESC').all() as SensorRule[];
  },

  addRule(rule: Omit<SensorRule, 'id' | 'created_at'>): SensorRule {
    const db = getDb();
    const id = generateId();
    const stmt = db.prepare(`
      INSERT INTO sensor_rules (id, sensor_id, rule_name, condition_operator, threshold_value, duration_minutes, action_type, severity, is_active)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      RETURNING *
    `);
    return stmt.get(
      id,
      rule.sensor_id,
      rule.rule_name,
      rule.condition_operator,
      rule.threshold_value,
      rule.duration_minutes,
      rule.action_type,
      rule.severity,
      rule.is_active
    ) as SensorRule;
  },

  deleteRule(id: string): void {
    const db = getDb();
    db.prepare('DELETE FROM sensor_rules WHERE id = ?').run(id);
  },

  toggleRule(id: string, isActive: 1 | 0): void {
    const db = getDb();
    db.prepare('UPDATE sensor_rules SET is_active = ? WHERE id = ?').run(isActive, id);
  }
};

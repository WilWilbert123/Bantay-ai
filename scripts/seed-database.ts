import { getDb } from '../src/lib/db/connection';
import crypto from 'crypto';

function generateId(): string {
  return crypto.randomUUID();
}

function seedDatabase() {
  const db = getDb();
  console.log('Seeding database with clean, real-time 2026 disaster scenarios...');

  try {
    db.exec('PRAGMA foreign_keys = OFF;');
    db.prepare(`DELETE FROM alerts`).run();
    db.prepare(`DELETE FROM emergency_incidents`).run();
    db.prepare(`DELETE FROM sensor_devices`).run();
    db.prepare(`DELETE FROM emergency_facilities`).run();
    try { db.prepare(`DELETE FROM document_chunks`).run(); } catch (e) {}
    try { db.prepare(`DELETE FROM knowledge_documents`).run(); } catch (e) {}
    try { db.prepare(`DELETE FROM knowledge_sources`).run(); } catch (e) {}
    db.exec('PRAGMA foreign_keys = ON;');

    db.transaction(() => {

      // 1. Create Flood Incident & Alert
      const floodIncidentId = generateId();
      db.prepare(`
        INSERT INTO emergency_incidents (
          id, incident_type, title, description, latitude, longitude, 
          location_accuracy_m, source_type, verification_status, started_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now', '-45 minutes'))
      `).run(
        floodIncidentId,
        'FLOOD',
        'Severe Flooding in Marikina River System',
        'Continuous heavy rainfall has raised Marikina River water levels to 14.5m. Preemptive evacuation advised for low-lying barangays.',
        14.6293,
        121.0956,
        500,
        'SENSOR_NETWORK',
        'VERIFIED'
      );

      const floodAlertId = generateId();
      db.prepare(`
        INSERT INTO alerts (
          id, incident_id, alert_type, severity, status, title, description, 
          trigger_source, trigger_value, threshold_value, issued_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now', '-30 minutes'))
      `).run(
        floodAlertId,
        floodIncidentId,
        'FLOOD_WARNING',
        'CRITICAL',
        'ACTIVE',
        'Marikina River Flood Level 3 Warning',
        'Marikina River approaching critical levels. Evacuation protocols are highly recommended. Sensor node #459 reports 14.5m water level.',
        'Marikina River Sensor Network',
        14.5,
        14.0
      );

      // 2. Create Earthquake Incident & Alert
      const quakeIncidentId = generateId();
      db.prepare(`
        INSERT INTO emergency_incidents (
          id, incident_type, title, description, latitude, longitude, 
          location_accuracy_m, source_type, verification_status, started_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now', '-15 minutes'))
      `).run(
        quakeIncidentId,
        'EARTHQUAKE',
        'Magnitude 5.2 Offshore Batangas Earthquake',
        'A moderate earthquake struck offshore Batangas, felt at Intensity IV in Metro Manila and Tagaytay.',
        13.75,
        120.95,
        1000,
        'OFFICIAL_API',
        'VERIFIED'
      );

      const quakeAlertId = generateId();
      db.prepare(`
        INSERT INTO alerts (
          id, incident_id, alert_type, severity, status, title, description, 
          trigger_source, trigger_value, threshold_value, issued_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now', '-10 minutes'))
      `).run(
        quakeAlertId,
        quakeIncidentId,
        'EARTHQUAKE_ADVISORY',
        'WARNING',
        'ACTIVE',
        'Magnitude 5.2 Earthquake Advisory',
        'Magnitude 5.2 earthquake detected offshore Batangas. Intensity IV felt in Metro Manila and Tagaytay. Expect minor aftershocks.',
        'PHIVOLCS Seismic Network',
        5.2,
        5.0
      );

      // 3. Create Volcanic Eruption Incident & Alert (Taal Volcano)
      const volcanoIncidentId = generateId();
      db.prepare(`
        INSERT INTO emergency_incidents (
          id, incident_type, title, description, latitude, longitude, 
          location_accuracy_m, source_type, verification_status, started_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now', '-2 hours'))
      `).run(
        volcanoIncidentId,
        'VOLCANO',
        'Taal Volcano Alert Level 3 Unrest',
        'Phreatomagmatic eruption observed at Main Crater with 1,500m steam-rich plume. Ashfall reported in Laurel and Agoncillo.',
        14.0021,
        120.9934,
        2000,
        'OFFICIAL_API',
        'VERIFIED'
      );

      const volcanoAlertId = generateId();
      db.prepare(`
        INSERT INTO alerts (
          id, incident_id, alert_type, severity, status, title, description, 
          trigger_source, trigger_value, threshold_value, issued_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now', '-1 hour'))
      `).run(
        volcanoAlertId,
        volcanoIncidentId,
        'VOLCANO',
        'CRITICAL',
        'ACTIVE',
        'Taal Volcanic Eruption Warning',
        'Alert Level 3 raised over Taal Volcano. Immediate evacuation of High Risk TVI Island & Agoncillo/Laurel 7km danger zone enforced.',
        'PHIVOLCS Main Observatory',
        3.0,
        2.0
      );

      // 4. Create Typhoon Warning Incident & Alert
      const typhoonIncidentId = generateId();
      db.prepare(`
        INSERT INTO emergency_incidents (
          id, incident_type, title, description, latitude, longitude, 
          location_accuracy_m, source_type, verification_status, started_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now', '-3 hours'))
      `).run(
        typhoonIncidentId,
        'TYPHOON',
        'Typhoon Advisory Signal No. 3',
        'Severe Tropical Cyclone approaching Eastern Luzon with max sustained winds of 175 km/h.',
        15.12,
        121.55,
        5000,
        'OFFICIAL_API',
        'VERIFIED'
      );

      const typhoonAlertId = generateId();
      db.prepare(`
        INSERT INTO alerts (
          id, incident_id, alert_type, severity, status, title, description, 
          trigger_source, trigger_value, threshold_value, issued_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now', '-2 hours'))
      `).run(
        typhoonAlertId,
        typhoonIncidentId,
        'TYPHOON',
        'CRITICAL',
        'ACTIVE',
        'Typhoon Warning Signal No. 3',
        'Tropical Cyclone Wind Signal No. 3 active over Metro Manila, Bulacan, and Aurora. Expect storm surge up to 3 meters in coastal zones.',
        'PAGASA Weather Division',
        175.0,
        120.0
      );
      
      // 5. Create active sensor devices
      const sensor1Id = generateId();
      db.prepare(`
        INSERT INTO sensor_devices (
          id, device_name, device_type, location_name, latitude, longitude, 
          measurement_unit, configuration_json, device_key_hash, status, last_seen_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now', '-2 minutes'))
      `).run(
        sensor1Id,
        'Marikina River Telemetry Sensor #459',
        'WATER_LEVEL',
        'Marikina Bridge Station',
        14.6293,
        121.0956,
        'meters',
        '{}',
        'hash_marikina_459',
        'ACTIVE'
      );
      
      const sensor2Id = generateId();
      db.prepare(`
        INSERT INTO sensor_devices (
          id, device_name, device_type, location_name, latitude, longitude, 
          measurement_unit, configuration_json, device_key_hash, status, last_seen_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now', '-1 minute'))
      `).run(
        sensor2Id,
        'QC Rain Gauge Monitor',
        'RAINFALL',
        'Quezon City Hall Complex',
        14.6488,
        121.0509,
        'mm/h',
        '{}',
        'hash_qc_rain',
        'ACTIVE'
      );

      // Seed Initial Readings for Telemetry Display
      db.prepare(`
        INSERT INTO sensor_readings (id, sensor_id, measurement_type, value, unit, measured_at, quality_status)
        VALUES (?, ?, 'WATER_LEVEL', 14.5, 'meters', datetime('now', '-2 minutes'), 'GOOD')
      `).run(generateId(), sensor1Id);

      db.prepare(`
        INSERT INTO sensor_readings (id, sensor_id, measurement_type, value, unit, measured_at, quality_status)
        VALUES (?, ?, 'RAINFALL', 45.0, 'mm/h', datetime('now', '-1 minute'), 'GOOD')
      `).run(generateId(), sensor2Id);

      // 6. Create Knowledge Sources & 2026 Documents
      const sourceId = generateId();
      db.prepare(`
        INSERT INTO knowledge_sources (
          id, name, publisher, authority_level, status
        ) VALUES (?, ?, ?, ?, ?)
      `).run(sourceId, 'NDRRMC Official Portal 2026', 'NDRRMC', 'NATIONAL', 'ACTIVE');

      const doc1Id = generateId();
      db.prepare(`
        INSERT INTO knowledge_documents (
          id, source_id, title, document_type, content_sha256, status, published_at
        ) VALUES (?, ?, ?, ?, ?, ?, datetime('now', '-10 days'))
      `).run(doc1Id, sourceId, 'Typhoon Evacuation Protocol 2026', 'Official Guidelines', 'hash_doc_2026_1', 'ACTIVE');

      const doc2Id = generateId();
      db.prepare(`
        INSERT INTO knowledge_documents (
          id, source_id, title, document_type, content_sha256, status, published_at
        ) VALUES (?, ?, ?, ?, ?, ?, datetime('now', '-5 days'))
      `).run(doc2Id, sourceId, '2026 National First Aid & Disaster Manual', 'First Aid Manuals', 'hash_doc_2026_2', 'ACTIVE');

      // Create document chunks for search
      db.prepare(`
        INSERT INTO document_chunks (
          id, document_id, chunk_index, content, section_title, content_sha256
        ) VALUES (?, ?, ?, ?, ?, ?)
      `).run(
        generateId(), doc1Id, 0,
        'When a Typhoon Signal No. 3 is raised, preemptive evacuation is mandatory in low-lying and flood-prone areas. Prepare your 72-hour survival kit.',
        'Evacuation Phase 1', 'chunkhash1'
      );

      db.prepare(`
        INSERT INTO document_chunks (
          id, document_id, chunk_index, content, section_title, content_sha256
        ) VALUES (?, ?, ?, ?, ?, ?)
      `).run(
        generateId(), doc2Id, 0,
        'Basic First Aid for Disaster Responders', 'First Aid Manual', 'chunkhash2'
      );

      // 7. Create Emergency Facilities
      const facilitiesList = [
        { name: 'Watsons Pharmacy - Bonifacio High Street', type: 'PHARMACY', address: 'BGC High Street, Taguig, Metro Manila', lat: 14.5515, lng: 121.0510 },
        { name: 'Mercury Drug - Kalayaan Avenue', type: 'PHARMACY', address: 'Kalayaan Ave cor. EDSA, Makati City', lat: 14.5601, lng: 121.0425 },
        { name: 'Watsons Pharmacy - Market Market', type: 'PHARMACY', address: 'Market Market Mall, Taguig City', lat: 14.5501, lng: 121.0556 },
        { name: "St. Luke's Medical Center - Global City", type: 'HOSPITAL', address: '32nd St. cor 5th Ave, BGC, Taguig', lat: 14.5552, lng: 121.0483 },
        { name: 'Makati Medical Center', type: 'HOSPITAL', address: 'Amorsolo St, Legazpi Village, Makati City', lat: 14.5592, lng: 121.0146 },
        { name: 'Ospital ng Makati (OsMak)', type: 'HOSPITAL', address: 'Sampaguita St, Pembo, Makati City', lat: 14.5441, lng: 121.0601 },
        { name: 'Rizal Medical Center', type: 'HOSPITAL', address: 'Pasig Blvd, Pasig City', lat: 14.5623, lng: 121.0698 },
        { name: 'San Andres Sports Complex Evacuation Center', type: 'EVACUATION', address: 'San Andres, Manila', lat: 14.5744, lng: 120.9942 },
        { name: 'Rizal High School Evacuation Grounds', type: 'EVACUATION', address: 'Caniogan, Pasig City', lat: 14.5600, lng: 121.0700 },
        { name: 'Quezon City Memorial Circle Evacuation Area', type: 'EVACUATION', address: 'Diliman, Quezon City', lat: 14.6514, lng: 121.0493 },
        { name: 'Pembo Elementary School Evacuation Hub', type: 'EVACUATION', address: 'Pembo, Makati City', lat: 14.5420, lng: 121.0590 },
        { name: 'Barangay Pitogo Hall & Emergency Post', type: 'BARANGAY', address: 'D.V. Laurilla St, Brgy. Pitogo, Taguig/Makati', lat: 14.5578, lng: 121.0502 },
        { name: 'Barangay South Cembo Hall', type: 'BARANGAY', address: 'General Ricarte St, South Cembo', lat: 14.5590, lng: 121.0540 },
        { name: 'Makati City Hall & Disaster Risk Command', type: 'LGU', address: 'JP Rizal St, Poblacion, Makati City', lat: 14.5705, lng: 121.0244 },
        { name: 'Taguig City Municipal Hall', type: 'LGU', address: 'Gen. Luna St, Tuktukan, Taguig City', lat: 14.5262, lng: 121.0583 },
        { name: 'BFP Fire Station - Sub Station Pitogo/Pinagkaisahan', type: 'POLICE_FIRE', address: 'Kalayaan Ave, Makati City', lat: 14.5585, lng: 121.0450 },
        { name: 'Makati Police Sub-Station 1', type: 'POLICE_FIRE', address: 'Buendia Ave, Makati City', lat: 14.5560, lng: 121.0280 }
      ];

      for (const fac of facilitiesList) {
        db.prepare(`
          INSERT INTO emergency_facilities (
            id, name, facility_type, address, latitude, longitude, updated_at
          ) VALUES (?, ?, ?, ?, ?, ?, datetime('now'))
        `).run(generateId(), fac.name, fac.type, fac.address, fac.lat, fac.lng);
      }
    })();

    console.log('Successfully re-seeded database with clean real-time 2026 emergency records.');
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
}

if (require.main === module) {
  seedDatabase();
}


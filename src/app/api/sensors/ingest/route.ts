import { NextRequest, NextResponse } from 'next/server';
import { sensorsRepository } from '@/lib/db/repositories/sensors.repository';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sensor_id, value, unit, measurement_type, measured_at } = body;

    if (!sensor_id || typeof value !== 'number') {
      return NextResponse.json(
        { error: 'Invalid payload. Required fields: sensor_id (string), value (number)' },
        { status: 400 }
      );
    }

    const device = sensorsRepository.getDeviceById(sensor_id);
    if (!device) {
      return NextResponse.json(
        { error: `Sensor device '${sensor_id}' not found` },
        { status: 404 }
      );
    }

    const mType = measurement_type || device.device_type;
    const mUnit = unit || device.measurement_unit;

    const reading = sensorsRepository.addReading(
      sensor_id,
      mType,
      value,
      mUnit,
      measured_at || new Date().toISOString()
    );

    return NextResponse.json({
      success: true,
      status: 'INGESTED',
      reading,
    });
  } catch (err: any) {
    console.error('Error in POST /api/sensors/ingest:', err);
    return NextResponse.json({ error: 'Internal server error', details: err.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'ACTIVE',
    endpoint: '/api/sensors/ingest',
    message: 'Send POST requests with JSON payload: { sensor_id: string, value: number, unit?: string }',
  });
}

'use server';

import { sensorsRepository } from '@/lib/db/repositories/sensors.repository';
import { revalidatePath } from 'next/cache';
import { SensorRule } from '@/types/sensors';

export async function addSensorRule(formData: FormData) {
  const sensor_id = formData.get('sensor_id') as string;
  const rule_name = formData.get('rule_name') as string;
  const condition_operator = formData.get('condition_operator') as any;
  const threshold_value = parseFloat(formData.get('threshold_value') as string);
  const duration_minutes = parseInt(formData.get('duration_minutes') as string, 10);
  const action_type = formData.get('action_type') as any;
  const severity = formData.get('severity') as any;

  sensorsRepository.addRule({
    sensor_id,
    rule_name,
    condition_operator,
    threshold_value,
    duration_minutes,
    action_type,
    severity,
    is_active: 1
  });

  revalidatePath('/admin/sensors/rules');
}

export async function deleteSensorRule(id: string) {
  sensorsRepository.deleteRule(id);
  revalidatePath('/admin/sensors/rules');
}

export async function toggleSensorRule(id: string, isActive: 1 | 0) {
  sensorsRepository.toggleRule(id, isActive);
  revalidatePath('/admin/sensors/rules');
}

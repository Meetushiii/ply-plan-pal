
import { supabase } from '@/lib/supabase';
import { PlywoodSheet, formatDate } from '@/lib/data-models';

export async function fetchPlywoodInventory(): Promise<PlywoodSheet[]> {
  const { data, error } = await supabase
    .from('plywood_sheets')
    .select('*');
  
  if (error) {
    console.error('Error fetching plywood inventory:', error);
    throw error;
  }
  
  return data || [];
}

export async function addPlywoodSheet(plywood: Omit<PlywoodSheet, 'id'>): Promise<PlywoodSheet> {
  const { data, error } = await supabase
    .from('plywood_sheets')
    .insert(plywood)
    .select('*')
    .single();
  
  if (error) {
    console.error('Error adding plywood sheet:', error);
    throw error;
  }
  
  return data;
}

export async function updatePlywoodSheet(id: string, updates: Partial<PlywoodSheet>): Promise<PlywoodSheet> {
  const { data, error } = await supabase
    .from('plywood_sheets')
    .update(updates)
    .eq('id', id)
    .select('*')
    .single();
  
  if (error) {
    console.error('Error updating plywood sheet:', error);
    throw error;
  }
  
  return data;
}

export async function deletePlywoodSheet(id: string): Promise<void> {
  const { error } = await supabase
    .from('plywood_sheets')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting plywood sheet:', error);
    throw error;
  }
}

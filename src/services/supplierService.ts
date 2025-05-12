
import { supabase } from '@/lib/supabase';
import { Supplier } from '@/lib/data-models';

export async function fetchSuppliers(): Promise<Supplier[]> {
  const { data, error } = await supabase
    .from('suppliers')
    .select('*');
  
  if (error) {
    console.error('Error fetching suppliers:', error);
    throw error;
  }
  
  return data || [];
}

export async function addSupplier(supplier: Omit<Supplier, 'id'>): Promise<Supplier> {
  const { data, error } = await supabase
    .from('suppliers')
    .insert(supplier)
    .select('*')
    .single();
  
  if (error) {
    console.error('Error adding supplier:', error);
    throw error;
  }
  
  return data;
}

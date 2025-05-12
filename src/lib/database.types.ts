
export interface Database {
  public: {
    Tables: {
      plywood_sheets: {
        Row: {
          id: string;
          type: string;
          grade: string;
          thickness: number;
          width: number;
          length: number;
          quantity: number;
          location: string;
          purchase_date: string;
          purchase_price: number;
          supplier: string;
          notes: string | null;
          last_updated: string;
          updated_by: string;
        };
        Insert: {
          id?: string;
          type: string;
          grade: string;
          thickness: number;
          width: number;
          length: number;
          quantity: number;
          location: string;
          purchase_date: string;
          purchase_price: number;
          supplier: string;
          notes?: string | null;
          last_updated: string;
          updated_by: string;
        };
        Update: {
          id?: string;
          type?: string;
          grade?: string;
          thickness?: number;
          width?: number;
          length?: number;
          quantity?: number;
          location?: string;
          purchase_date?: string;
          purchase_price?: number;
          supplier?: string;
          notes?: string | null;
          last_updated?: string;
          updated_by?: string;
        };
      };
      suppliers: {
        Row: {
          id: string;
          name: string;
          contact_person: string;
          email: string;
          phone: string;
          address: string;
        };
        Insert: {
          id?: string;
          name: string;
          contact_person: string;
          email: string;
          phone: string;
          address: string;
        };
        Update: {
          id?: string;
          name?: string;
          contact_person?: string;
          email?: string;
          phone?: string;
          address?: string;
        };
      };
      transactions: {
        Row: {
          id: string;
          type: 'addition' | 'removal';
          plywood_id: string;
          quantity: number;
          date: string;
          performed_by: string;
          reason: string;
          notes: string | null;
        };
        Insert: {
          id?: string;
          type: 'addition' | 'removal';
          plywood_id: string;
          quantity: number;
          date: string;
          performed_by: string;
          reason: string;
          notes?: string | null;
        };
        Update: {
          id?: string;
          type?: 'addition' | 'removal';
          plywood_id?: string;
          quantity?: number;
          date?: string;
          performed_by?: string;
          reason?: string;
          notes?: string | null;
        };
      };
    };
  };
}

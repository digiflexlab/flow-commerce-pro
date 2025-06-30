export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          nom: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          nom: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          nom?: string
          updated_at?: string
        }
        Relationships: []
      }
      clients: {
        Row: {
          adresse: string | null
          created_at: string
          email: string | null
          id: string
          nom: string
          telephone: string | null
          updated_at: string
        }
        Insert: {
          adresse?: string | null
          created_at?: string
          email?: string | null
          id?: string
          nom: string
          telephone?: string | null
          updated_at?: string
        }
        Update: {
          adresse?: string | null
          created_at?: string
          email?: string | null
          id?: string
          nom?: string
          telephone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      fournisseurs: {
        Row: {
          adresse: string | null
          contact: string | null
          created_at: string
          email: string | null
          id: string
          nom: string
          telephone: string | null
          updated_at: string
        }
        Insert: {
          adresse?: string | null
          contact?: string | null
          created_at?: string
          email?: string | null
          id?: string
          nom: string
          telephone?: string | null
          updated_at?: string
        }
        Update: {
          adresse?: string | null
          contact?: string | null
          created_at?: string
          email?: string | null
          id?: string
          nom?: string
          telephone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      magasins: {
        Row: {
          adresse: string | null
          created_at: string
          email: string | null
          id: string
          nom: string
          telephone: string | null
          updated_at: string
        }
        Insert: {
          adresse?: string | null
          created_at?: string
          email?: string | null
          id?: string
          nom: string
          telephone?: string | null
          updated_at?: string
        }
        Update: {
          adresse?: string | null
          created_at?: string
          email?: string | null
          id?: string
          nom?: string
          telephone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      produits: {
        Row: {
          categorie_id: string | null
          created_at: string
          date_expiration: string | null
          description: string | null
          fournisseur_id: string | null
          id: string
          nom: string
          prix_achat: number
          prix_courant: number
          prix_min_vente: number
          sku: string
          updated_at: string
        }
        Insert: {
          categorie_id?: string | null
          created_at?: string
          date_expiration?: string | null
          description?: string | null
          fournisseur_id?: string | null
          id?: string
          nom: string
          prix_achat: number
          prix_courant: number
          prix_min_vente: number
          sku: string
          updated_at?: string
        }
        Update: {
          categorie_id?: string | null
          created_at?: string
          date_expiration?: string | null
          description?: string | null
          fournisseur_id?: string | null
          id?: string
          nom?: string
          prix_achat?: number
          prix_courant?: number
          prix_min_vente?: number
          sku?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "produits_categorie_id_fkey"
            columns: ["categorie_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "produits_fournisseur_id_fkey"
            columns: ["fournisseur_id"]
            isOneToOne: false
            referencedRelation: "fournisseurs"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          id: string
          nom: string
          role: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id: string
          nom: string
          role: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          nom?: string
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      stocks: {
        Row: {
          created_at: string
          id: string
          magasin_id: string
          produit_id: string
          quantite: number
          seuil_alerte: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          magasin_id: string
          produit_id: string
          quantite?: number
          seuil_alerte?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          magasin_id?: string
          produit_id?: string
          quantite?: number
          seuil_alerte?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "stocks_magasin_id_fkey"
            columns: ["magasin_id"]
            isOneToOne: false
            referencedRelation: "magasins"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stocks_produit_id_fkey"
            columns: ["produit_id"]
            isOneToOne: false
            referencedRelation: "produits"
            referencedColumns: ["id"]
          },
        ]
      }
      system_settings: {
        Row: {
          description: string | null
          key: string
          updated_at: string
          updated_by: string | null
          value: string
        }
        Insert: {
          description?: string | null
          key: string
          updated_at?: string
          updated_by?: string | null
          value: string
        }
        Update: {
          description?: string | null
          key?: string
          updated_at?: string
          updated_by?: string | null
          value?: string
        }
        Relationships: [
          {
            foreignKeyName: "system_settings_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      vente_produits: {
        Row: {
          created_at: string
          id: string
          prix_unitaire: number
          produit_id: string
          quantite: number
          total_ligne: number
          vente_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          prix_unitaire: number
          produit_id: string
          quantite: number
          total_ligne: number
          vente_id: string
        }
        Update: {
          created_at?: string
          id?: string
          prix_unitaire?: number
          produit_id?: string
          quantite?: number
          total_ligne?: number
          vente_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vente_produits_produit_id_fkey"
            columns: ["produit_id"]
            isOneToOne: false
            referencedRelation: "produits"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vente_produits_vente_id_fkey"
            columns: ["vente_id"]
            isOneToOne: false
            referencedRelation: "ventes"
            referencedColumns: ["id"]
          },
        ]
      }
      ventes: {
        Row: {
          client_id: string | null
          created_at: string
          id: string
          magasin_id: string
          mode_paiement: string
          numero_vente: string
          remise: number | null
          statut: string
          total: number
          vendeur_id: string
        }
        Insert: {
          client_id?: string | null
          created_at?: string
          id?: string
          magasin_id: string
          mode_paiement: string
          numero_vente: string
          remise?: number | null
          statut?: string
          total: number
          vendeur_id: string
        }
        Update: {
          client_id?: string | null
          created_at?: string
          id?: string
          magasin_id?: string
          mode_paiement?: string
          numero_vente?: string
          remise?: number | null
          statut?: string
          total?: number
          vendeur_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ventes_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ventes_magasin_id_fkey"
            columns: ["magasin_id"]
            isOneToOne: false
            referencedRelation: "magasins"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ventes_vendeur_id_fkey"
            columns: ["vendeur_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

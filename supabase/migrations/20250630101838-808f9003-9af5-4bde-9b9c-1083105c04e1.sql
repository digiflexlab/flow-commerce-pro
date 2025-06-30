
-- Création des tables de base pour GestioFlow Pro

-- Table des profils utilisateurs (liée à auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  nom TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'manager', 'vendeur')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table des magasins
CREATE TABLE public.magasins (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nom TEXT NOT NULL UNIQUE,
  adresse TEXT,
  telephone TEXT,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table des fournisseurs
CREATE TABLE public.fournisseurs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nom TEXT NOT NULL UNIQUE,
  contact TEXT,
  email TEXT,
  telephone TEXT,
  adresse TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table des catégories
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nom TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table des produits
CREATE TABLE public.produits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nom TEXT NOT NULL,
  sku TEXT NOT NULL UNIQUE,
  categorie_id UUID REFERENCES public.categories,
  fournisseur_id UUID REFERENCES public.fournisseurs,
  prix_achat DECIMAL(10,2) NOT NULL,
  prix_min_vente DECIMAL(10,2) NOT NULL,
  prix_courant DECIMAL(10,2) NOT NULL,
  description TEXT,
  date_expiration DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table des stocks par magasin
CREATE TABLE public.stocks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  produit_id UUID REFERENCES public.produits NOT NULL,
  magasin_id UUID REFERENCES public.magasins NOT NULL,
  quantite INTEGER NOT NULL DEFAULT 0,
  seuil_alerte INTEGER NOT NULL DEFAULT 10,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(produit_id, magasin_id)
);

-- Table des clients
CREATE TABLE public.clients (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nom TEXT NOT NULL,
  email TEXT,
  telephone TEXT,
  adresse TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table des ventes
CREATE TABLE public.ventes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  numero_vente TEXT NOT NULL UNIQUE,
  client_id UUID REFERENCES public.clients,
  vendeur_id UUID REFERENCES public.profiles NOT NULL,
  magasin_id UUID REFERENCES public.magasins NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  remise DECIMAL(10,2) DEFAULT 0,
  mode_paiement TEXT NOT NULL CHECK (mode_paiement IN ('espece', 'carte', 'mobile_money', 'cheque', 'avoir')),
  statut TEXT NOT NULL DEFAULT 'termine' CHECK (statut IN ('en_cours', 'termine', 'annule')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table des détails de vente
CREATE TABLE public.vente_produits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  vente_id UUID REFERENCES public.ventes NOT NULL,
  produit_id UUID REFERENCES public.produits NOT NULL,
  quantite INTEGER NOT NULL,
  prix_unitaire DECIMAL(10,2) NOT NULL,
  total_ligne DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table des paramètres système
CREATE TABLE public.system_settings (
  key TEXT NOT NULL PRIMARY KEY,
  value TEXT NOT NULL,
  description TEXT,
  updated_by UUID REFERENCES public.profiles,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insertion des paramètres de base
INSERT INTO public.system_settings (key, value, description) VALUES
('nom_entreprise', 'GestioFlow Pro', 'Nom de l''entreprise'),
('devise_principale', 'EUR', 'Devise principale'),
('taux_tva_defaut', '20', 'Taux de TVA par défaut (%)'),
('fuseau_horaire_defaut', 'Europe/Paris', 'Fuseau horaire par défaut'),
('langue_defaut', 'fr', 'Langue par défaut');

-- Activation de RLS (Row Level Security)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.magasins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fournisseurs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.produits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ventes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vente_produits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;

-- Politiques RLS pour les profils
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Politiques RLS pour les autres tables (accès basique pour tous les utilisateurs authentifiés)
CREATE POLICY "Authenticated users can view magasins" ON public.magasins FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can modify magasins" ON public.magasins FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can view fournisseurs" ON public.fournisseurs FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can modify fournisseurs" ON public.fournisseurs FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can view categories" ON public.categories FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can modify categories" ON public.categories FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can view produits" ON public.produits FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can modify produits" ON public.produits FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can view stocks" ON public.stocks FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can modify stocks" ON public.stocks FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can view clients" ON public.clients FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can modify clients" ON public.clients FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can view ventes" ON public.ventes FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can modify ventes" ON public.ventes FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can view vente_produits" ON public.vente_produits FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can modify vente_produits" ON public.vente_produits FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can view system_settings" ON public.system_settings FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can modify system_settings" ON public.system_settings FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- Fonction pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers pour mettre à jour updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_magasins_updated_at BEFORE UPDATE ON public.magasins FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_fournisseurs_updated_at BEFORE UPDATE ON public.fournisseurs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_produits_updated_at BEFORE UPDATE ON public.produits FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_stocks_updated_at BEFORE UPDATE ON public.stocks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON public.clients FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

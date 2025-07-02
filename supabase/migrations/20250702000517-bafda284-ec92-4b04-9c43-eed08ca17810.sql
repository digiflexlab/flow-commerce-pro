
-- Correction des politiques RLS pour utiliser auth.uid() au lieu de auth.role()
DROP POLICY IF EXISTS "Authenticated users can view magasins" ON public.magasins;
DROP POLICY IF EXISTS "Authenticated users can modify magasins" ON public.magasins;
DROP POLICY IF EXISTS "Authenticated users can view fournisseurs" ON public.fournisseurs;
DROP POLICY IF EXISTS "Authenticated users can modify fournisseurs" ON public.fournisseurs;
DROP POLICY IF EXISTS "Authenticated users can view categories" ON public.categories;
DROP POLICY IF EXISTS "Authenticated users can modify categories" ON public.categories;
DROP POLICY IF EXISTS "Authenticated users can view produits" ON public.produits;
DROP POLICY IF EXISTS "Authenticated users can modify produits" ON public.produits;
DROP POLICY IF EXISTS "Authenticated users can view stocks" ON public.stocks;
DROP POLICY IF EXISTS "Authenticated users can modify stocks" ON public.stocks;
DROP POLICY IF EXISTS "Authenticated users can view clients" ON public.clients;
DROP POLICY IF EXISTS "Authenticated users can modify clients" ON public.clients;
DROP POLICY IF EXISTS "Authenticated users can view ventes" ON public.ventes;
DROP POLICY IF EXISTS "Authenticated users can modify ventes" ON public.ventes;
DROP POLICY IF EXISTS "Authenticated users can view vente_produits" ON public.vente_produits;
DROP POLICY IF EXISTS "Authenticated users can modify vente_produits" ON public.vente_produits;
DROP POLICY IF EXISTS "Authenticated users can view system_settings" ON public.system_settings;

-- Nouvelles politiques RLS corrigées
CREATE POLICY "Authenticated users can view magasins" ON public.magasins FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can modify magasins" ON public.magasins FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can view fournisseurs" ON public.fournisseurs FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can modify fournisseurs" ON public.fournisseurs FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can view categories" ON public.categories FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can modify categories" ON public.categories FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can view produits" ON public.produits FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can modify produits" ON public.produits FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can view stocks" ON public.stocks FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can modify stocks" ON public.stocks FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can view clients" ON public.clients FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can modify clients" ON public.clients FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can view ventes" ON public.ventes FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can modify ventes" ON public.ventes FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can view vente_produits" ON public.vente_produits FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can modify vente_produits" ON public.vente_produits FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can view system_settings" ON public.system_settings FOR SELECT USING (auth.uid() IS NOT NULL);

-- Fonction pour créer automatiquement un profil lors de l'inscription
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, nom, role)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'nom', 'Utilisateur'), 'vendeur');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger pour créer automatiquement un profil
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insertion de données de test réalistes
INSERT INTO public.categories (nom, description) VALUES
('Électronique', 'Appareils électroniques et accessoires'),
('Vêtements', 'Vêtements pour hommes, femmes et enfants'),
('Alimentation', 'Produits alimentaires et boissons'),
('Maison & Jardin', 'Articles pour la maison et le jardin'),
('Beauté & Santé', 'Produits de beauté et de santé')
ON CONFLICT (nom) DO NOTHING;

INSERT INTO public.fournisseurs (nom, contact, email, telephone, adresse) VALUES
('Tech Distributeur SARL', 'Jean Kouassi', 'contact@techdist.ci', '+225 01 23 45 67', 'Abidjan, Plateau'),
('Mode Africa', 'Marie Traoré', 'info@modeafrica.com', '+225 07 89 12 34', 'Abidjan, Cocody'),
('Agro Import-Export', 'Ibrahim Sanogo', 'vente@agroimport.ci', '+225 05 67 89 01', 'Bouaké'),
('Maison Plus', 'Fatou Diabaté', 'contact@maisonplus.ci', '+225 02 34 56 78', 'Abidjan, Marcory')
ON CONFLICT (nom) DO NOTHING;

INSERT INTO public.magasins (nom, adresse, telephone, email) VALUES
('Magasin Centre-Ville', 'Plateau, Rue du Commerce', '+225 27 20 12 34', 'centreville@gestioflow.ci'),
('Magasin Cocody', 'Cocody, Riviera M', '+225 27 22 56 78', 'cocody@gestioflow.ci'),
('Magasin Yopougon', 'Yopougon, Marché', '+225 27 23 90 12', 'yopougon@gestioflow.ci')
ON CONFLICT (nom) DO NOTHING;

-- Créer un utilisateur admin dans auth.users (ceci sera fait via l'interface Supabase)
-- Email: admin@gestioflow.ci
-- Mot de passe: GestioFlow2024!

-- Insertion du profil admin (l'ID sera mis à jour après création du compte)
-- Ceci sera fait automatiquement par le trigger handle_new_user

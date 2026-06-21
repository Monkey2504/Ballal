
import React from 'react';
import { Lock, FileText, ArrowLeft, AlertCircle, ShieldAlert } from 'lucide-react';
import { LanguageCode } from '../types.ts';
import { translations } from '../utils/translations.ts';

interface LegalDocSectionProps {
  language: LanguageCode;
  mode: 'privacy' | 'terms';
}

const LegalDocSection: React.FC<LegalDocSectionProps> = ({ language, mode }) => {
  const t = translations[language] || translations['fr'];

  const content = mode === 'privacy' ? (
    <div className="space-y-8 text-ink-muted leading-relaxed">
        <div>
            <h1 className="font-serif font-black text-3xl md:text-4xl text-ink mb-6 tracking-tight">{t.footer_privacy || "Politique de confidentialité"}</h1>
            <p className="text-body-sm text-ink-muted bg-paper p-4 rounded-[4px] border border-border-subtle">
                <strong className="text-ink">{t.privacy_updated}</strong> {new Date().toLocaleDateString()} <br/>
                <strong className="text-ink">{t.privacy_controller}</strong> BALLAL ASBL
            </p>
        </div>

        <section>
            <h2 className="font-serif font-black text-xl text-ink mb-4 flex items-center gap-3">
                <span className="dateline text-[11px] bg-ink text-ivory w-8 h-8 rounded-[4px] flex items-center justify-center">1</span>
                {t.privacy_sec1_title}
            </h2>
            <p className="mb-4">
                {t.privacy_sec1_desc}
            </p>
            <ul className="list-disc pl-6 space-y-2 bg-paper p-4 rounded-[4px] border border-border-subtle">
                <li><strong className="text-ink">{t.privacy_address}</strong> Place Masui 9 Boîte 3, 1030 BRUXELLES, Belgique</li>
                <li><strong className="text-ink">BCE :</strong> 1016.925.333</li>
                <li><strong className="text-ink">{t.privacy_email}</strong> admin@ballal.be</li>
                <li><strong className="text-ink">{t.privacy_phone}</strong> 0493 43 43 83</li>
            </ul>
        </section>

        {/* NOUVELLE SECTION : DONNÉES SENSIBLES */}
        <section className="bg-guinea-red/5 p-6 rounded-[4px] border-l-4 border-guinea-red">
            <h2 className="font-serif font-black text-xl text-guinea-red mb-4 flex items-center gap-2">
                <ShieldAlert className="h-6 w-6" />
                {t.privacy_sensitive_title}
            </h2>
            <p className="text-body-sm font-medium">
                {t.privacy_sensitive_desc}
            </p>
        </section>

        <section>
            <h2 className="font-serif font-black text-xl text-ink mb-4 flex items-center gap-3">
                <span className="dateline text-[11px] bg-ink text-ivory w-8 h-8 rounded-[4px] flex items-center justify-center">2</span>
                {t.privacy_sec2_title}
            </h2>
            <p className="mb-4">
                {t.privacy_sec2_desc}
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-4">
                <div className="bg-white border border-border-subtle p-5 rounded-[4px]">
                    <h3 className="font-black text-ink mb-2">{t.privacy_form_contact}</h3>
                    <p className="text-body-sm">
                        <strong className="text-ink">{t.privacy_data_types}</strong> Nom, prénom, adresse email, numéro de téléphone, objet de la demande.
                        <br/><br/>
                        <strong className="text-ink">{t.privacy_purpose}</strong> Répondre à vos demandes d'information, gérer les adhésions, coordonner l'aide alimentaire ou juridique.
                    </p>
                </div>
                <div className="bg-white border border-border-subtle p-5 rounded-[4px]">
                    <h3 className="font-black text-ink mb-2">{t.privacy_newsletter}</h3>
                    <p className="text-body-sm">
                        <strong className="text-ink">{t.privacy_data_types}</strong> Adresse email.
                        <br/><br/>
                        <strong className="text-ink">{t.privacy_purpose}</strong> Vous envoyer des informations sur nos activités et appels à la solidarité.
                    </p>
                </div>
            </div>
        </section>

        {/* NOUVELLE SECTION : SECRET PROFESSIONNEL */}
        <section className="bg-guinea-green/5 p-6 rounded-[4px] border-l-4 border-guinea-green">
            <h2 className="font-serif font-black text-xl text-guinea-green mb-4 flex items-center gap-2">
                <Lock className="h-6 w-6" />
                {t.privacy_legal_secrecy}
            </h2>
            <p className="text-body-sm font-medium italic">
                {t.privacy_legal_secrecy_desc}
            </p>
        </section>

        <section>
            <h2 className="font-serif font-black text-xl text-ink mb-4 flex items-center gap-3">
                <span className="dateline text-[11px] bg-ink text-ivory w-8 h-8 rounded-[4px] flex items-center justify-center">3</span>
                {t.privacy_sec3_title}
            </h2>
            <p className="mb-4">
                {t.privacy_sec3_desc}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-body-sm">
                <li>Avec nos avocats partenaires (sous secret professionnel strict).</li>
                <li>Avec les autorités compétentes UNIQUEMENT si une obligation légale impérieuse nous y contraint.</li>
                <li>Avec nos fournisseurs techniques sécurisés respectant le RGPD.</li>
            </ul>
        </section>

        <section>
            <h2 className="font-serif font-black text-xl text-ink mb-4 flex items-center gap-3">
                <span className="dateline text-[11px] bg-ink text-ivory w-8 h-8 rounded-[4px] flex items-center justify-center">4</span>
                {t.privacy_sec4_title}
            </h2>
            <p className="mb-4">
                {t.privacy_sec4_desc}
            </p>
            <p className="text-body-sm bg-paper p-4 rounded-[4px] border border-border-subtle text-ink-muted">
                Nous n'utilisons <strong className="text-ink">pas de cookies tiers publicitaires</strong>.
            </p>
        </section>

        <section>
            <h2 className="font-serif font-black text-xl text-ink mb-4 flex items-center gap-3">
                <span className="dateline text-[11px] bg-ink text-ivory w-8 h-8 rounded-[4px] flex items-center justify-center">5</span>
                {t.privacy_sec5_title}
            </h2>
            <p className="mb-4 font-bold text-guinea-red italic">
                {t.privacy_simplified_rights}
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
                <li><strong className="text-ink">Droit d'accès et rectification :</strong> Savoir et corriger ce que nous avons sur vous.</li>
                <li><strong className="text-ink">Droit à l'effacement :</strong> Demander la suppression immédiate de vos données.</li>
            </ul>
            <div className="bg-ink text-ivory p-6 rounded-[4px] text-center">
                <p className="mb-4 font-medium">{t.privacy_contact_rights}</p>
                <a href="mailto:admin@ballal.be" className="inline-block bg-ivory text-ink px-6 py-3 rounded-[3px] font-mono text-[12px] font-bold uppercase tracking-[0.08em] hover:bg-guinea-red hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-guinea-red/50 focus-visible:ring-offset-2 focus-visible:ring-offset-ink">
                    admin@ballal.be
                </a>
            </div>
        </section>
    </div>
  ) : (
    <div className="space-y-6">
        <h1 className="font-serif font-black text-3xl text-ink mb-6 tracking-tight">{t.footer_terms || "Conditions d'utilisation"}</h1>

        <section className="bg-guinea-yellow/15 border-l-4 border-guinea-yellow p-6 rounded-[4px] flex items-start gap-4 mb-8">
            <AlertCircle className="h-8 w-8 text-ink flex-shrink-0" />
            <p className="dateline text-[11px] text-ink leading-relaxed">
                {t.terms_legal_warning_bold}
            </p>
        </section>

        <section>
            <h2 className="font-serif font-black text-xl text-ink mb-3">1. Objet</h2>
            <p className="text-ink-muted mb-4 leading-relaxed">
                Les présentes conditions régissent l'utilisation de l'application web de l'ASBL Ballal.
                En accédant à ce site, vous acceptez ces conditions sans réserve.
            </p>
        </section>

        <section>
            <h2 className="font-serif font-black text-xl text-ink mb-3">2. Propriété intellectuelle</h2>
            <p className="text-ink-muted mb-4 leading-relaxed">
                L'ensemble du contenu (textes, logos, images) est la propriété exclusive de l'ASBL Ballal ou de ses partenaires.
                Toute reproduction est interdite sans autorisation.
            </p>
        </section>

        <section>
            <h2 className="font-serif font-black text-xl text-ink mb-3">3. Responsabilité</h2>
            <p className="text-ink-muted mb-4 italic leading-relaxed">
                L'ASBL Ballal s'efforce de fournir des informations juridiques et sociales exactes mais ne saurait être tenue responsable
                des erreurs ou omissions. Les informations juridiques (section Droits) sont fournies à titre informatif et ne remplacent pas l'avis d'un avocat.
            </p>
        </section>
    </div>
  );

  return (
    <div className="min-h-screen bg-ivory paper-grain py-12" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white rounded-[4px] shadow-soft-lg p-8 md:p-12 border border-border-subtle">
            <div className="flag-line mb-8" aria-hidden="true"><span /><span /><span /></div>
            <div className="flex items-center justify-center mb-8">
                <div className="p-4 bg-paper rounded-[4px]">
                    {mode === 'privacy' ? <Lock className="h-8 w-8 text-ink" /> : <FileText className="h-8 w-8 text-ink" />}
                </div>
            </div>

            {content}

            <div className="mt-12 pt-8 border-t border-border-subtle text-center">
                <button
                    onClick={() => window.history.back()}
                    className="inline-flex items-center font-mono text-[12px] font-bold uppercase tracking-[0.08em] text-ink hover:text-guinea-red transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-guinea-red/40 rounded px-1"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Retour
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LegalDocSection;

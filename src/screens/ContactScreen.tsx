import React from 'react';
import { motion } from 'framer-motion';
import BlurText from '../components/ui/BlurText';
import GlassCard from '../components/ui/GlassCard';
import ContactForm from '../components/features/ContactForm';
import { MailIcon, PhoneIcon, ClockIcon } from '../components/ui/Icon';

const ContactScreen: React.FC = () => {
  const openPhone = async () => {
    const url = 'tel:+919811797407';
    try {
      const { Browser } = await import('@capacitor/browser');
      await Browser.open({ url });
    } catch { window.open(url); }
  };

  const openEmail = async () => {
    const url = `mailto:shivskukreja@gmail.com?subject=${encodeURIComponent('Tech@Work Inquiry from App')}`;
    try {
      const { Browser } = await import('@capacitor/browser');
      await Browser.open({ url });
    } catch { window.open(url); }
  };

  const openWhatsApp = async () => {
    const url = `https://api.whatsapp.com/send/?phone=919811797407&text=${encodeURIComponent('Hi Tech@Work! I\'d like to discuss a project.')}&type=phone_number&app_absent=0`;
    try {
      const { Browser } = await import('@capacitor/browser');
      await Browser.open({ url });
    } catch { window.open(url, '_blank'); }
  };

  return (
    <div style={{ background: '#131313', minHeight: '100vh' }}>
      {/* Ambient glow */}
      <div className="gradient-blob" style={{ width: '400px', height: '400px', background: 'rgba(255,175,214,0.07)', top: '0', left: '50%', transform: 'translateX(-50%)' }} />

      {/* HEADER */}
      <div className="px-6 pt-10 pb-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Contact</span>
          <BlurText
            text="Let's Talk Business"
            className="text-4xl font-headline font-black text-white mt-3 mb-3"
            delay={80}
            as="h1"
          />
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(214,193,201,0.7)' }}>
            Fill out the form below or reach us directly. We respond within 24 hours.
          </p>
        </motion.div>
      </div>

      {/* QUICK CONTACT BUTTONS */}
      <div className="px-6 mb-6 relative z-10">
        <div className="grid grid-cols-3 gap-3">
          <motion.button
            id="contact-whatsapp-direct"
            onClick={openWhatsApp}
            className="flex flex-col items-center gap-2 py-4 rounded-2xl"
            style={{ background: 'rgba(37,211,102,0.12)', border: '1px solid rgba(37,211,102,0.25)', position: 'relative', overflow: 'hidden', boxShadow: '0 0 0 1px rgba(37,211,102,0.25)' }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: '#25D366', borderRadius: '20px 20px 0 0' }} />
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(37,211,102,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="#25D366">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <span className="text-xs font-semibold" style={{ color: '#25D366' }}>WhatsApp</span>
          </motion.button>

          <motion.button
            id="contact-email-direct"
            onClick={openEmail}
            className="flex flex-col items-center gap-2 py-4 rounded-2xl"
            style={{ background: 'rgba(255,175,214,0.1)', border: '1px solid rgba(255,175,214,0.2)', position: 'relative', overflow: 'hidden', boxShadow: '0 0 0 1px rgba(255,175,214,0.25)' }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: '#ffafd6', borderRadius: '20px 20px 0 0' }} />
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(255,175,214,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MailIcon size={28} color="#ffafd6" />
            </div>
            <span className="text-xs font-semibold" style={{ color: '#ffafd6' }}>Email</span>
          </motion.button>

          <motion.button
            id="contact-phone-direct"
            onClick={openPhone}
            className="flex flex-col items-center gap-2 py-4 rounded-2xl"
            style={{ background: 'rgba(190,204,154,0.1)', border: '1px solid rgba(190,204,154,0.2)', position: 'relative', overflow: 'hidden', boxShadow: '0 0 0 1px rgba(37,211,102,0.25)' }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: '#25D366', borderRadius: '20px 20px 0 0' }} />
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(37,211,102,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <PhoneIcon size={28} color="#becc9a" />
            </div>
            <span className="text-xs font-semibold" style={{ color: '#becc9a' }}>Call</span>
          </motion.button>
        </div>
      </div>

      {/* CONTACT INFO */}
      <div className="px-6 mb-6">
        <GlassCard className="p-4">
          <div className="flex flex-col gap-3" style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '21px', top: '16px', bottom: '16px', width: '1px', borderLeft: '1px dashed rgba(255,175,214,0.1)' }} />
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(37,211,102,0.15)' }}>
                <PhoneIcon size={16} color="#25D366" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: 'rgba(214,193,201,0.5)' }}>Phone / WhatsApp</div>
                <div className="text-sm font-semibold text-white">+91 98117 97407</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(255,175,214,0.15)' }}>
                <MailIcon size={16} color="#ffafd6" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: 'rgba(214,193,201,0.5)' }}>Email</div>
                <div className="text-sm font-semibold text-white">shivskukreja@gmail.com</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(190,204,154,0.15)' }}>
                <ClockIcon size={16} color="#becc9a" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: 'rgba(214,193,201,0.5)' }}>Response Time</div>
                <div className="text-sm font-semibold text-white">Within 24 hours</div>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* CONTACT FORM */}
      <div className="px-6 pb-10">
        <div className="mb-4">
          <h2 className="text-xl font-headline font-bold text-white">Send a Message</h2>
          <p className="text-sm mt-1" style={{ color: 'rgba(214,193,201,0.6)' }}>Choose WhatsApp for faster replies.</p>
        </div>
        <GlassCard className="p-5">
          <ContactForm />
        </GlassCard>
      </div>
    </div>
  );
};

export default ContactScreen;

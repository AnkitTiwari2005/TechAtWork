import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FormInput from '../ui/FormInput';
import { submitContact } from '../../lib/api';
import { hapticMedium, hapticSuccess } from '../../lib/haptics';
import { useAppStore, Lead } from '../../store/useAppStore';

const WHATSAPP_NUMBER = '919811797407';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

interface ContactFormProps {
  onSuccess?: () => void;
  compact?: boolean;
}

const validate = (data: FormData): FormErrors => {
  const errors: FormErrors = {};
  if (!data.name || data.name.trim().length < 2) errors.name = 'Name must be at least 2 characters';
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Enter a valid email address';
  if (data.phone && !/^[+\d\s\-()]{7,20}$/.test(data.phone)) errors.phone = 'Enter a valid phone number';
  if (!data.message || data.message.trim().length < 10) errors.message = 'Please describe your needs (min 10 chars)';
  return errors;
};

const ContactForm: React.FC<ContactFormProps> = ({ onSuccess, compact = false }) => {
  const { prefillName, prefillEmail, addLead } = useAppStore();
  const [form, setForm] = useState<FormData>({
    name: prefillName,
    email: prefillEmail,
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitMode, setSubmitMode] = useState<'whatsapp' | 'email'>('whatsapp');

  const handleChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (mode: 'whatsapp' | 'email') => {
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      await hapticMedium();
      return;
    }

    setIsLoading(true);
    setSubmitMode(mode);

    try {
      // Save lead locally
      const lead: Lead = {
        id: `lead_${Date.now()}`,
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
        submittedAt: new Date().toISOString(),
        method: mode,
      };
      await addLead(lead);

      if (mode === 'whatsapp') {
        const msg = encodeURIComponent(
          `Hi Tech@Work! 👋\n\nI'm reaching out from your app.\n\n*Name:* ${form.name}\n*Email:* ${form.email}\n*Phone:* ${form.phone || 'Not provided'}\n*Message:* ${form.message}`
        );
        const url = `https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}&text=${msg}&type=phone_number&app_absent=0`;
        try {
          const { Browser } = await import('@capacitor/browser');
          await Browser.open({ url });
        } catch {
          window.open(url, '_blank');
        }
      } else {
        // Try API email submit
        try {
          await submitContact({
            name: form.name,
            email: form.email,
            phone: form.phone,
            concern: form.message,
          });
        } catch {
          // Fallback: Gmail compose link
          const subject = encodeURIComponent('Tech@Work Inquiry from App');
          const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nMessage: ${form.message}`);
          const url = `mailto:shivskukreja@gmail.com?subject=${subject}&body=${body}`;
          window.open(url, '_blank');
        }
      }

      await hapticSuccess();
      setShowSuccess(true);
      setForm({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => {
        setShowSuccess(false);
        onSuccess?.();
      }, 3000);
    } catch (err) {
      console.error('Submit error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-2xl"
            style={{ background: 'rgba(19,19,19,0.97)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="success-circle mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <motion.path
                  d="M20 6L9 17l-5-5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
              </svg>
            </motion.div>
            <h3 className="text-xl font-headline font-bold text-white mb-2">Message Sent!</h3>
            <p className="text-sm text-center" style={{ color: 'rgba(214,193,201,0.7)' }}>
              {submitMode === 'whatsapp'
                ? 'WhatsApp is opening...'
                : "We'll reply within 24 hours."}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col gap-4">
        <FormInput
          label="Full Name *"
          id="contact-name"
          type="text"
          placeholder="Your name"
          value={form.name}
          onChange={handleChange('name')}
          error={errors.name}
          autoComplete="name"
        />
        <FormInput
          label="Email Address *"
          id="contact-email"
          type="email"
          placeholder="you@company.com"
          value={form.email}
          onChange={handleChange('email')}
          error={errors.email}
          autoComplete="email"
        />
        <FormInput
          label="Phone Number"
          id="contact-phone"
          type="tel"
          placeholder="+91 98765 43210"
          value={form.phone}
          onChange={handleChange('phone')}
          error={errors.phone}
          autoComplete="tel"
        />
        <FormInput
          label="How can we help? *"
          id="contact-message"
          multiline
          rows={compact ? 3 : 5}
          placeholder="Tell us about your project or challenge..."
          value={form.message}
          onChange={handleChange('message')}
          error={errors.message}
        />

        {/* Submit Buttons */}
        <div className="flex flex-col gap-3 pt-2">
          <motion.button
            id="submit-whatsapp"
            onClick={() => handleSubmit('whatsapp')}
            disabled={isLoading}
            className="w-full py-4 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2"
            style={{
              background: '#25D366',
              color: 'white',
              opacity: isLoading ? 0.7 : 1,
            }}
            whileTap={{ scale: 0.97 }}
          >
            {isLoading && submitMode === 'whatsapp' ? (
              <span>Opening WhatsApp...</span>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Send via WhatsApp
              </>
            )}
          </motion.button>

          <motion.button
            id="submit-email"
            onClick={() => handleSubmit('email')}
            disabled={isLoading}
            className="w-full py-3.5 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2"
            style={{
              background: 'rgba(255,175,214,0.1)',
              color: '#ffafd6',
              border: '1px solid rgba(255,175,214,0.25)',
              opacity: isLoading ? 0.7 : 1,
            }}
            whileTap={{ scale: 0.97 }}
          >
            {isLoading && submitMode === 'email' ? (
              'Sending...'
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                Send via Email
              </>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;

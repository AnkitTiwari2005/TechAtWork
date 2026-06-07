import React from 'react';
import { motion } from 'framer-motion';
import ServiceCard from '../components/features/ServiceCard';
import VideoBackground from '../components/features/VideoBackground';
import GlassCard from '../components/ui/GlassCard';
import BlurText from '../components/ui/BlurText';
import WhatsAppFAB from '../components/features/WhatsAppFAB';

const SERVICES = [
  {
    icon: '🌐',
    iconBg: 'rgba(255,175,214,0.12)',
    title: 'Build Scalable Web Platforms',
    subtitle: 'Web Development',
    description: 'AI-integrated websites and enterprise-grade digital products.',
    features: [
      'AI-Integrated Websites',
      'Enterprise Dashboards',
      'SaaS Platforms',
    ],
  },
  {
    icon: '🤖',
    iconBg: 'rgba(190,204,154,0.12)',
    title: 'Automate with AI Agents',
    subtitle: 'AI Automation',
    description: 'Deploy intelligent automation that works 24/7 for your business.',
    features: [
      'Local LLM Deployment',
      'AI Agents & Workflows',
      'Business Process Automation',
    ],
  },
  {
    icon: '📊',
    iconBg: 'rgba(227,140,184,0.12)',
    title: 'Predict Market Trends Faster',
    subtitle: 'Market Intelligence',
    description: 'AI-powered business intelligence and competitor tracking.',
    features: [
      'Competitor Analysis',
      'Predictive Insights',
      'Data Reporting & Dashboards',
    ],
  },
  {
    icon: '📣',
    iconBg: 'rgba(255,175,214,0.10)',
    title: 'Growth Through AI Marketing',
    subtitle: 'Performance Marketing',
    description: 'Data-driven campaigns that maximize ROI across channels.',
    features: [
      'AI-Powered Ad Campaigns',
      'Targeting & Optimization',
      'Campaign Analytics',
    ],
  },
  {
    icon: '🎯',
    iconBg: 'rgba(190,204,154,0.10)',
    title: 'Strategic Digital Consulting',
    subtitle: 'Strategic Consulting',
    description: 'Expert guidance for digital transformation and AI strategy.',
    features: [
      'Digital Transformation',
      'AI Strategy & Roadmaps',
      'Scaling Systems Architecture',
    ],
  },
];

const AI_FEATURES = [
  { icon: '🏢', title: 'On-Prem AI', desc: 'Models running on your servers.' },
  { icon: '🔒', title: 'Private Inference', desc: 'Zero data leaves your network.' },
  { icon: '⚡', title: 'GPU Acceleration', desc: 'CUDA & TensorRT optimized.' },
  { icon: '🧠', title: 'Local LLMs', desc: 'Ollama, vLLM, custom models.' },
];

const openWhatsApp = async () => {
  const url = `https://api.whatsapp.com/send/?phone=919811797407&text=${encodeURIComponent('Hi Tech@Work! I\'d like to book a consultation about your services.')}&type=phone_number&app_absent=0`;
  try {
    const { Browser } = await import('@capacitor/browser');
    await Browser.open({ url });
  } catch { window.open(url, '_blank'); }
};

const ServicesScreen: React.FC = () => {
  return (
    <div style={{ background: '#131313' }}>
      {/* HERO */}
      <div className="page-hero" style={{ minHeight: '220px' }}>
        <VideoBackground src="/assets/gears-video.mp4" opacity={0.22} />
        <div className="hero-overlay" />
        <div className="relative z-10">
          <span className="section-label">⚡ Our Services</span>
          <BlurText
            text="Capabilities & Infrastructure"
            className="text-4xl font-headline font-black text-white mt-2"
            delay={80}
            as="h1"
          />
          <p className="text-sm mt-2" style={{ color: 'rgba(214,193,201,0.7)' }}>
            Comprehensive digital solutions covering custom platform development, AI automation, market intelligence, and on-premise infrastructure.
          </p>
        </div>
      </div>

      {/* SERVICES LIST */}
      <section className="px-5 py-8">
        <div className="flex flex-col gap-4">
          {SERVICES.map((service, i) => (
            <ServiceCard
              key={service.title}
              {...service}
              index={i}
              onCta={openWhatsApp}
            />
          ))}
        </div>
      </section>

      {/* AI INFRASTRUCTURE */}
      <section className="px-5 py-8">
        <div className="mb-6">
          <span className="section-label">🔐 AI Infrastructure</span>
          <BlurText
            text="Private AI. Your Data. Your Control."
            className="text-2xl font-headline font-bold text-white mt-2"
            delay={60}
          />
          <p className="text-sm mt-2 leading-relaxed" style={{ color: 'rgba(214,193,201,0.7)' }}>
            We deploy AI models directly on your infrastructure. No cloud dependency. Full data privacy. Enterprise-grade performance with GPU acceleration.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {AI_FEATURES.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <GlassCard className="p-4 h-full">
                <div className="text-2xl mb-2">{feat.icon}</div>
                <h4 className="text-sm font-headline font-bold text-white mb-1">{feat.title}</h4>
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(214,193,201,0.65)' }}>{feat.desc}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="px-5 pb-6">
        <motion.button
          id="services-book-cta"
          onClick={openWhatsApp}
          className="w-full py-4 rounded-2xl font-bold text-sm"
          style={{ background: 'linear-gradient(135deg, #ffafd6, #e38cb8)', color: '#57173e' }}
          whileTap={{ scale: 0.97 }}
        >
          Explore Solution →
        </motion.button>
      </div>

      <WhatsAppFAB />
    </div>
  );
};

export default ServicesScreen;

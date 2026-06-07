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
    title: 'Web Development',
    description: 'AI-integrated websites and enterprise-grade SaaS platforms engineered for speed and scale.',
    features: [
      'AI-Integrated Websites & Dashboards',
      'Enterprise SaaS Platforms',
      'Headless CMS & E-Commerce',
      'Real-time Data Visualization',
    ],
  },
  {
    icon: '🤖',
    iconBg: 'rgba(190,204,154,0.12)',
    title: 'AI Automation',
    description: 'Deploy local LLMs and intelligent agents that automate your most complex business workflows.',
    features: [
      'Local LLM Deployment (Ollama, vLLM)',
      'AI Agents & Multi-Step Workflows',
      'Business Process Automation',
      'Custom Model Fine-Tuning',
    ],
  },
  {
    icon: '📊',
    iconBg: 'rgba(227,140,184,0.12)',
    title: 'Market Intelligence',
    description: 'Turn raw market data into competitive advantage with AI-powered analytics and predictions.',
    features: [
      'Competitor Analysis & Benchmarking',
      'Predictive Market Insights',
      'Custom Data Reporting Dashboards',
      'Real-time Trend Monitoring',
    ],
  },
  {
    icon: '📣',
    iconBg: 'rgba(255,175,214,0.10)',
    title: 'Performance Marketing',
    description: 'AI-powered campaigns that find your ideal customers and maximize ROI automatically.',
    features: [
      'AI-Powered Ad Campaign Management',
      'Precision Targeting & Optimization',
      'Campaign Analytics & Attribution',
      'A/B Testing at Scale',
    ],
  },
  {
    icon: '🎯',
    iconBg: 'rgba(190,204,154,0.10)',
    title: 'Strategic Consulting',
    description: 'End-to-end digital transformation strategies with clear roadmaps and measurable outcomes.',
    features: [
      'Digital Transformation Roadmaps',
      'AI Strategy & Implementation Plans',
      'Scaling Systems Architecture',
      'Technology Stack Evaluation',
    ],
  },
];

const AI_FEATURES = [
  { icon: '🏢', title: 'On-Prem AI', desc: 'Full infrastructure control. Your servers, your rules.' },
  { icon: '🔒', title: 'Private Inference', desc: 'Zero data leaves your network. Complete privacy by design.' },
  { icon: '⚡', title: 'GPU Acceleration', desc: 'CUDA & TensorRT optimized for maximum throughput.' },
  { icon: '🧠', title: 'Local LLMs', desc: 'Ollama, vLLM, and custom fine-tuned models.' },
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
          <span className="section-label">⚡ What We Do</span>
          <BlurText
            text="Our Services"
            className="text-4xl font-headline font-black text-white mt-2"
            delay={80}
            as="h1"
          />
          <p className="text-sm mt-2" style={{ color: 'rgba(214,193,201,0.7)' }}>
            End-to-end digital solutions powered by artificial intelligence.
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
          <span className="section-label">🔐 Enterprise AI</span>
          <BlurText
            text="Private AI. Your Data. Your Control."
            className="text-2xl font-headline font-bold text-white mt-2"
            delay={60}
          />
          <p className="text-sm mt-2 leading-relaxed" style={{ color: 'rgba(214,193,201,0.7)' }}>
            We deploy AI infrastructure on your own servers — no third-party data exposure.
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

      {/* STICKY CTA BAR */}
      <div className="px-5 pb-6">
        <motion.button
          id="services-book-cta"
          onClick={openWhatsApp}
          className="w-full py-4 rounded-2xl font-bold text-sm"
          style={{ background: 'linear-gradient(135deg, #ffafd6, #e38cb8)', color: '#57173e' }}
          whileTap={{ scale: 0.97 }}
        >
          Book a Free Consultation →
        </motion.button>
      </div>

      <WhatsAppFAB />
    </div>
  );
};

export default ServicesScreen;

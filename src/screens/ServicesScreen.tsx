import React from 'react';
import { motion } from 'framer-motion';
import ServiceCard from '../components/features/ServiceCard';
import VideoBackground from '../components/features/VideoBackground';
import GlassCard from '../components/ui/GlassCard';
import BlurText from '../components/ui/BlurText';
import WhatsAppFAB from '../components/features/WhatsAppFAB';
import {
  GlobeIcon,
  BrainIcon,
  ChartIcon,
  MegaphoneIcon,
  TargetIcon,
  BuildingIcon,
  LockIcon,
  CpuIcon,
} from '../components/ui/Icon';
import {
  staggerContainerVariants,
  staggerItemVariants,
} from '../hooks/useScrollReveal';

const SERVICES = [
  {
    icon: <GlobeIcon size={22} color="#ffafd6" />,
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
    icon: <BrainIcon size={22} color="#becc9a" />,
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
    icon: <ChartIcon size={22} color="#e38cb8" />,
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
    icon: <MegaphoneIcon size={22} color="#ffafd6" />,
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
    icon: <TargetIcon size={22} color="#becc9a" />,
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
  {
    icon: <BuildingIcon size={22} color="#ffafd6" />,
    title: 'On-Prem AI',
    desc: 'Models running on your servers.',
  },
  {
    icon: <LockIcon size={22} color="#becc9a" />,
    title: 'Private Inference',
    desc: 'Zero data leaves your network.',
  },
  {
    icon: <CpuIcon size={22} color="#e38cb8" />,
    title: 'GPU Acceleration',
    desc: 'CUDA & TensorRT optimized.',
  },
  {
    icon: <BrainIcon size={22} color="#becc9a" />,
    title: 'Local LLMs',
    desc: 'Ollama, vLLM, custom models.',
  },
];

let _Browser: typeof import('@capacitor/browser').Browser | null = null;
async function openUrl(url: string) {
  if (!_Browser) {
    try { _Browser = (await import('@capacitor/browser')).Browser; } catch {}
  }
  if (_Browser) await _Browser.open({ url });
  else window.open(url, '_blank');
}

const openWhatsApp = async () => {
  const url = `https://api.whatsapp.com/send/?phone=919811797407&text=${encodeURIComponent('Hi Tech@Work! I\'d like to book a consultation about your services.')}&type=phone_number&app_absent=0`;
  await openUrl(url);
};

const ServicesScreen: React.FC = () => {
  return (
    <div style={{ background: '#131313' }}>
      {/* HERO */}
      <div className="page-hero" style={{ minHeight: '220px' }}>
        <VideoBackground src="/assets/gears-video.mp4" opacity={0.22} />
        <div className="hero-overlay" />
        {/* Additional radial gradient overlay: transparent center → semi-dark edges */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at center, rgba(19,19,19,0) 30%, rgba(19,19,19,0.4) 100%)',
            pointerEvents: 'none',
          }}
        />
        <div className="relative z-10">
          <span className="section-label">Our Services</span>
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

      {/* SERVICES LIST — stagger animation */}
      <section className="px-5 py-8">
        <motion.div
          className="flex flex-col gap-4"
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-30px' }}
        >
          {SERVICES.map((service, i) => (
            <motion.div key={service.title} variants={staggerItemVariants}>
              <ServiceCard
                {...service}
                index={i}
                onCta={openWhatsApp}
              />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* AI INFRASTRUCTURE */}
      <section className="px-5 py-8">
        <div className="mb-6">
          <span className="section-label">AI Infrastructure</span>
          <BlurText
            text="Private AI. Your Data. Your Control."
            className="text-2xl font-headline font-bold text-white mt-2"
            delay={60}
          />
          <p className="text-sm mt-2 leading-relaxed" style={{ color: 'rgba(214,193,201,0.7)' }}>
            We deploy AI models directly on your infrastructure. No cloud dependency. Full data privacy. Enterprise-grade performance with GPU acceleration.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3" style={{ position: 'relative' }}>
          {/* Decorative crossing dashed lines behind the grid */}
          <svg
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}
            viewBox="0 0 200 200"
            preserveAspectRatio="none"
            fill="none"
          >
            {/* tile 1 (top-left) center to tile 4 (bottom-right) center */}
            <line x1="50" y1="50" x2="150" y2="150" stroke="rgba(255,175,214,0.08)" strokeWidth="1" strokeDasharray="4 6" />
            {/* tile 2 (top-right) center to tile 3 (bottom-left) center */}
            <line x1="150" y1="50" x2="50" y2="150" stroke="rgba(255,175,214,0.08)" strokeWidth="1" strokeDasharray="4 6" />
          </svg>
          {AI_FEATURES.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              style={{ zIndex: 1 }}
            >
              <GlassCard className="p-4 h-full">
                <div className="mb-2">{feat.icon}</div>
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
          className="w-full py-4 rounded-2xl font-bold text-sm btn-glow"
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

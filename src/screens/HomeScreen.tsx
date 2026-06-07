import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import BlurText from '../components/ui/BlurText';
import TrustPill from '../components/ui/TrustPill';
import StatCounter from '../components/ui/StatCounter';
import InfiniteMarquee from '../components/ui/InfiniteMarquee';
import MethodologyStep from '../components/features/MethodologyStep';
import CaseStudyCard from '../components/features/CaseStudyCard';
import WhatsAppFAB from '../components/features/WhatsAppFAB';
import VideoBackground from '../components/features/VideoBackground';
import GlassCard from '../components/ui/GlassCard';

const TRUST_PILLS = [
  { icon: '🤖', label: 'AI Automation' },
  { icon: '🌐', label: 'Custom Websites' },
  { icon: '📊', label: 'Market Intelligence' },
  { icon: '📣', label: 'Performance Marketing' },
  { icon: '🎯', label: 'Business Consulting' },
];

const STATS = [
  { target: 50, suffix: '+', label: 'Projects Delivered', icon: '🚀', color: '#ffafd6' },
  { target: 20, suffix: '+', label: 'Industries Served', icon: '🏭', color: '#becc9a' },
  { target: 95, suffix: '%', label: 'Client Retention', icon: '❤️', color: '#e38cb8' },
];

const METHODOLOGY_STEPS = [
  { number: '01', title: 'Discovery', description: 'Understanding goals and bottlenecks in your current operations.', icon: '🔍', color: '#ffafd6' },
  { number: '02', title: 'Strategy', description: 'Designing AI + digital infrastructure tailored to your needs.', icon: '🎯', color: '#becc9a' },
  { number: '03', title: 'Execution', description: 'Development, deployment, and optimization.', icon: '⚡', color: '#e38cb8' },
  { number: '04', title: 'Scale', description: 'Analytics, growth systems, and ongoing optimization.', icon: '📈', color: '#d6c1c9' },
];

const MARQUEE_ROW1 = ['Technology', 'Healthcare', 'Financial Services', 'Energy & Utilities', 'Consumer & Retail', 'Manufacturing'];
const MARQUEE_ROW2 = ['E-Commerce', 'Real Estate', 'Education', 'Automotive', 'Logistics', 'SaaS & Startups'];

const CASE_STUDIES = [
  {
    image: '/assets/houserve.png',
    company: 'Houserve',
    category: 'AI Automation',
    tagColor: '#ffafd6',
    description: 'Advanced platform featuring robust background removal, generative fill capabilities, and precise object removal tools tailored for high-end real estate and architectural visualization.',
    stats: [{ value: '85%', label: 'Less Editing Time' }, { value: '~0', label: 'Downtime' }],
    tags: ['AI/ML', 'SaaS', 'Real Estate'],
    challenge: 'Real estate agencies faced high costs and slow turnaround times for property photo editing. We architected a scalable SaaS infrastructure leveraging custom ML models.',
    impact: 'The resulting platform reduced editing time by 85% and significantly lowered operational costs for our clients, processing thousands of images daily with near-zero downtime.',
  },
  {
    image: '/assets/shuddham.png',
    company: 'Shuddham',
    category: 'Web Dev',
    tagColor: '#becc9a',
    description: 'A comprehensive AI SaaS platform built on a robust Next.js and TypeScript stack. Features advanced AI Image Processing capabilities and seamless Stripe integration for credit management.',
    stats: [{ value: 'Concurrent', label: 'Processing' }, { value: 'High', label: 'Margin Revenue' }],
    tags: ['Next.js', 'MongoDB', 'Stripe', 'Auth'],
    challenge: 'The client needed a robust, production-ready system to monetize AI image processing tools. We engineered a full-stack Next.js application, integrating secure authentication and Stripe-based credit billing.',
    impact: 'The platform successfully scaled to handle concurrent processing requests efficiently, establishing a stable, high-margin revenue stream.',
  },
  {
    image: '/assets/onemint.png',
    company: 'OneMint',
    category: 'Performance',
    tagColor: '#e38cb8',
    description: 'A premier digital intelligence platform delivering wealth building guides and cutting-edge technology insights. Engineered for scale, serving 500,000+ readers.',
    stats: [{ value: '60%', label: 'Faster Load' }, { value: '45%', label: 'Organic Traffic ↑' }],
    tags: ['Headless CMS', 'Performance', 'SEO'],
    challenge: 'As traffic surged, the legacy monolithic architecture struggled with load times and SEO optimization, resulting in high bounce rates and stagnant user growth. The publishing workflow was also bottlenecked by an outdated CMS.',
    impact: 'We decoupled the frontend using a modern headless architecture and optimized caching strategies. This resulted in a 60% improvement in page load speeds, a 45% increase in organic search traffic, and a highly streamlined content pipeline.',
  },
];

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const caseScrollRef = useRef<HTMLDivElement>(null);

  const openWhatsApp = async () => {
    const url = `https://api.whatsapp.com/send/?phone=919811797407&text=${encodeURIComponent('Hi Tech@Work! I\'d like to book a consultation.')}&type=phone_number&app_absent=0`;
    try {
      const { Browser } = await import('@capacitor/browser');
      await Browser.open({ url });
    } catch { window.open(url, '_blank'); }
  };

  const shareCase = async (company: string) => {
    try {
      const { Share } = await import('@capacitor/share');
      await Share.share({
        title: `${company} — Tech@Work Case Study`,
        text: `Check out how Tech@Work transformed ${company} with AI. Download the app for the full story.`,
        url: 'https://tech-work-mu.vercel.app',
      });
    } catch { /* share not available */ }
  };

  return (
    <div style={{ background: '#131313' }}>
      {/* ============ HERO ============ */}
      <section className="relative" style={{ minHeight: '85vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        <VideoBackground src="/assets/hero-video.mp4" />
        
        {/* Gradient overlays */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(19,19,19,0.2) 0%, rgba(19,19,19,0.6) 50%, rgba(19,19,19,1) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(19,19,19,0.4) 0%, transparent 50%)' }} />
        
        {/* Ambient glow */}
        <div className="gradient-blob" style={{ width: '400px', height: '400px', background: 'rgba(255,175,214,0.08)', top: '10%', left: '50%', transform: 'translateX(-50%)' }} />

        <div className="relative z-10 px-6 pb-8">
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4"
          >
            <span className="section-label">🤖 AI-Powered Consultancy</span>
          </motion.div>

          {/* Headline */}
          <BlurText
            text="AI-Powered Digital Solutions for Modern Businesses"
            className="text-4xl font-headline font-black text-white mb-5 leading-tight"
            delay={80}
            as="h1"
          />

          {/* Description */}
          <motion.p
            className="text-sm leading-relaxed mb-6 readable"
            style={{ color: 'rgba(214,193,201,0.8)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            From AI-integrated websites to market intelligence and growth automation, Tech@Work helps businesses scale with intelligent digital infrastructure.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex gap-3 mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <button
              id="hero-cta-consult"
              onClick={openWhatsApp}
              className="flex-1 py-3.5 rounded-2xl font-semibold text-sm"
              style={{ background: 'linear-gradient(135deg, #ffafd6, #e38cb8)', color: '#57173e' }}
            >
              Book Consultation
            </button>
            <button
              id="hero-cta-services"
              onClick={() => navigate('/services')}
              className="flex-1 py-3.5 rounded-2xl font-semibold text-sm"
              style={{ background: 'rgba(255,175,214,0.1)', color: '#ffafd6', border: '1px solid rgba(255,175,214,0.25)' }}
            >
              Our Services
            </button>
          </motion.div>

          {/* Trust Pills */}
          <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {TRUST_PILLS.map((pill, i) => (
              <motion.div
                key={pill.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 + i * 0.07 }}
                className="flex-shrink-0"
              >
                <TrustPill icon={pill.icon} label={pill.label} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ STATS ============ */}
      <section className="px-6 py-10">
        <div className="mb-4">
          <span className="section-label">📊 Our Impact</span>
        </div>
        <div className="grid grid-cols-3 gap-3 mb-3">
          {STATS.map((stat) => (
            <StatCounter
              key={stat.label}
              target={stat.target}
              suffix={stat.suffix}
              label={stat.label}
              icon={stat.icon}
              color={stat.color}
            />
          ))}
        </div>
        <GlassCard className="p-4 flex gap-3 items-center">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: 'rgba(190,204,154,0.15)', border: '1px solid rgba(190,204,154,0.3)' }}>⏱</div>
          <div>
            <div className="text-3xl font-headline font-black tracking-tighter" style={{ color: '#becc9a', lineHeight: 1 }}>&lt;2wk</div>
            <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'rgba(214,193,201,0.6)' }}>Avg. Deployment</div>
          </div>
        </GlassCard>
      </section>

      {/* ============ METHODOLOGY ============ */}
      <section className="px-6 py-10">
        <div className="mb-6">
          <span className="section-label">🔄 How We Work</span>
          <BlurText
            text="Our Proven Process"
            className="text-3xl font-headline font-bold text-white mt-2"
            delay={60}
          />
        </div>
        <div>
          {METHODOLOGY_STEPS.map((step, i) => (
            <MethodologyStep
              key={step.number}
              {...step}
              isLast={i === METHODOLOGY_STEPS.length - 1}
            />
          ))}
        </div>
      </section>

      {/* ============ INDUSTRIES MARQUEE ============ */}
      <section className="py-8">
        <div className="px-6 mb-4">
          <span className="section-label">🏢 Industries We Serve</span>
        </div>
        <InfiniteMarquee items={MARQUEE_ROW1} direction="forward" />
        <div className="my-2" />
        <InfiniteMarquee items={MARQUEE_ROW2} direction="reverse" />
      </section>

      {/* ============ CASE STUDIES ============ */}
      <section className="py-10">
        <div className="px-6 mb-6">
          <span className="section-label">💼 Case Studies</span>
          <BlurText
            text="Real Results. Real Clients."
            className="text-3xl font-headline font-bold text-white mt-2 mb-1"
            delay={60}
          />
          <p className="text-sm" style={{ color: 'rgba(214,193,201,0.6)' }}>Swipe to explore our work</p>
        </div>

        {/* Horizontal swipe carousel */}
        <div
          ref={caseScrollRef}
          className="flex gap-4 overflow-x-auto px-6 pb-4"
          style={{ scrollbarWidth: 'none', scrollSnapType: 'x mandatory' }}
        >
          {CASE_STUDIES.map((cs, i) => (
            <div key={cs.company} style={{ minWidth: '80vw', scrollSnapAlign: 'start' }}>
              <CaseStudyCard
                {...cs}
                index={i}
                onClick={() => navigate('/cases')}
                onShare={() => shareCase(cs.company)}
              />
            </div>
          ))}
        </div>

        <div className="px-6 mt-4">
          <button
            id="view-all-cases"
            onClick={() => navigate('/cases')}
            className="w-full py-3.5 rounded-2xl font-semibold text-sm"
            style={{ background: 'rgba(255,175,214,0.08)', color: '#ffafd6', border: '1px solid rgba(255,175,214,0.2)' }}
          >
            View All Case Studies →
          </button>
        </div>
      </section>

      {/* ============ CONTACT CTA ============ */}
      <section className="px-6 py-12">
        <GlassCard className="p-6 text-center relative overflow-hidden">
          <div className="gradient-blob" style={{ width: '200px', height: '200px', background: 'rgba(255,175,214,0.12)', top: '-50px', left: '50%', transform: 'translateX(-50%)' }} />
          <div className="relative z-10">
            <div className="text-4xl mb-3">🚀</div>
            <h2 className="text-2xl font-headline font-black text-white mb-2">Ready to Build Something Intelligent?</h2>
            <p className="text-sm mb-6" style={{ color: 'rgba(214,193,201,0.7)' }}>
              Tell us about your business challenges. We'll craft a strategy tailored to your goals — from AI automation to full-scale digital transformation.
            </p>
            <button
              id="home-book-consult"
              onClick={openWhatsApp}
              className="w-full py-4 rounded-2xl font-bold text-sm"
              style={{ background: 'linear-gradient(135deg, #ffafd6, #e38cb8)', color: '#57173e' }}
            >
              Book Free Consultation →
            </button>
          </div>
        </GlassCard>
      </section>

      {/* WhatsApp FAB */}
      <WhatsAppFAB />
    </div>
  );
};

export default HomeScreen;

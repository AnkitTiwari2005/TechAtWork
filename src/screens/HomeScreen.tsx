import React, { useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BlurText from '../components/ui/BlurText';
import StatCounter from '../components/ui/StatCounter';
import GlassCard from '../components/ui/GlassCard';
import TrustPill from '../components/ui/TrustPill';
import BottomSheet from '../components/ui/BottomSheet';
import VideoBackground from '../components/features/VideoBackground';
import WhatsAppFAB from '../components/features/WhatsAppFAB';
import MethodologyStep from '../components/features/MethodologyStep';
import CaseStudyCard from '../components/features/CaseStudyCard';
import { BrainIcon, GlobeIcon, ChartIcon, MegaphoneIcon, TargetIcon, RocketIcon, BuildingIcon, HeartIcon, SparkleIcon, SearchIcon, LightningIcon } from '../components/ui/Icon';
import { staggerContainerVariants, staggerItemVariants } from '../hooks/useScrollReveal';

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
    challenge: 'As traffic surged, the legacy monolithic architecture struggled with load times and SEO optimization, resulting in high bounce rates and stagnant user growth.',
    impact: 'We decoupled the frontend using a modern headless architecture and optimized caching strategies. This resulted in a 60% improvement in page load speeds, a 45% increase in organic search traffic, and a highly streamlined content pipeline.',
  },
];

const METHODOLOGY = [
  { icon: <SearchIcon size={22} color="#ffafd6" />, step: '01', color: '#ffafd6', title: 'Discovery', description: 'Deep-dive into your business model, market position, and technical infrastructure to identify high-leverage opportunities.' },
  { icon: <TargetIcon size={22} color="#becc9a" />, step: '02', color: '#becc9a', title: 'Strategy', description: 'Data-driven roadmap aligned to your commercial goals. Every decision is tied to measurable business outcomes.' },
  { icon: <LightningIcon size={22} color="#e38cb8" />, step: '03', color: '#e38cb8', title: 'Execution', description: 'Rapid, iterative build cycles with continuous deployment. From prototype to production in weeks, not months.' },
  { icon: <RocketIcon size={22} color="#ffafd6" />, step: '04', color: '#ffafd6', title: 'Scale', description: 'Ongoing optimisation, monitoring, and strategic expansion to ensure sustained growth and maximum ROI.' },
];

const PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 2 + Math.random() * 2,
  duration: 3 + Math.random() * 4,
  delay: Math.random() * 3,
}));

const openWhatsApp = async () => {
  const url = `https://api.whatsapp.com/send/?phone=919811797407&text=${encodeURIComponent('Hi Tech@Work! I found you via your app and would like to discuss my project.')}&type=phone_number&app_absent=0`;
  try {
    const { Browser } = await import('@capacitor/browser');
    await Browser.open({ url });
  } catch { window.open(url, '_blank'); }
};

const HomeScreen: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<(typeof CASE_STUDIES)[0] | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);

  const handleCarouselScroll = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    const scrollLeft = el.scrollLeft;
    const cardWidth = el.scrollWidth / CASE_STUDIES.length;
    setActiveDot(Math.round(scrollLeft / cardWidth));
  }, []);

  return (
    <div style={{ background: '#131313', minHeight: '100vh' }}>
      {/* HERO */}
      <section className="page-hero" style={{ minHeight: '60vh', position: 'relative', overflow: 'hidden' }}>
        <VideoBackground src="/assets/hero-video.mp4" opacity={0.18} />
        <div className="hero-overlay" />

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
          {PARTICLES.map((p) => (
            <motion.div
              key={p.id}
              style={{
                position: 'absolute',
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                borderRadius: '50%',
                background: 'rgba(255,175,214,0.4)',
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        <div className="relative z-10">
          {/* Section label with pulsing dot */}
          <motion.div
            className="flex items-center gap-2 mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              style={{
                width: '6px', height: '6px', borderRadius: '50%',
                background: '#ffafd6',
                boxShadow: '0 0 8px rgba(255,175,214,0.8)',
              }}
              animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#ffafd6' }}>
              AI-Powered Consultancy
            </span>
          </motion.div>

          <BlurText
            text="We Build Intelligent Systems That Drive Real Results"
            className="text-4xl font-headline font-black text-white leading-tight"
            delay={80}
            as="h1"
          />
          <motion.p
            className="text-sm leading-relaxed mt-3 readable"
            style={{ color: 'rgba(214,193,201,0.75)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            From AI automation to enterprise web platforms — we engineer precision-built digital solutions that give businesses a measurable competitive edge.
          </motion.p>

          {/* Trust Pills */}
          <motion.div
            className="flex flex-wrap gap-2 mt-5"
            variants={staggerContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {[
              { icon: <BrainIcon size={14} />, label: 'AI Automation' },
              { icon: <GlobeIcon size={14} />, label: 'Custom Websites' },
              { icon: <ChartIcon size={14} />, label: 'Market Intelligence' },
              { icon: <MegaphoneIcon size={14} />, label: 'Performance Marketing' },
              { icon: <TargetIcon size={14} />, label: 'Consulting' },
            ].map((pill, i) => (
              <motion.div key={pill.label} variants={staggerItemVariants}>
                <TrustPill icon={pill.icon} label={pill.label} index={i} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="px-5 py-10">
        <motion.div
          className="grid grid-cols-2 gap-3"
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-30px' }}
        >
          <motion.div variants={staggerItemVariants}>
            <StatCounter target={50} suffix="+" label="Projects Delivered" icon={<RocketIcon size={18} />} color="#ffafd6" />
          </motion.div>
          <motion.div variants={staggerItemVariants}>
            <StatCounter target={20} suffix="+" label="Industries Served" icon={<BuildingIcon size={18} />} color="#becc9a" />
          </motion.div>
          <motion.div variants={staggerItemVariants}>
            <StatCounter target={95} suffix="%" label="Client Retention" icon={<HeartIcon size={18} />} color="#e38cb8" />
          </motion.div>
          <motion.div variants={staggerItemVariants}>
            <GlassCard className="p-4 flex flex-col gap-2" style={{ position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: '#becc9a', borderRadius: '20px 20px 0 0', opacity: 0.6 }} />
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(190,204,154,0.15)', border: '1px solid rgba(190,204,154,0.3)' }}>
                <span style={{ fontSize: '20px', color: '#becc9a', display: 'flex' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#becc9a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><polyline points="12,6 12,12 16,14" />
                  </svg>
                </span>
              </div>
              <div className="text-3xl font-headline font-black stat-value" style={{ color: '#becc9a', lineHeight: 1 }}>&lt;2wk</div>
              <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'rgba(214,193,201,0.6)' }}>Avg. Deployment</div>
            </GlassCard>
          </motion.div>
        </motion.div>
      </section>

      {/* CASE STUDIES */}
      <section className="py-8">
        <div className="px-5 mb-4">
          <span className="section-label">Case Studies</span>
          <h2 className="text-2xl font-headline font-bold text-white mt-2">Real Work. Real Results.</h2>
        </div>
        <div
          ref={carouselRef}
          onScroll={handleCarouselScroll}
          className="flex gap-4 overflow-x-auto px-5 pb-2"
          style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {CASE_STUDIES.map((cs, i) => (
            <div key={cs.company} style={{ scrollSnapAlign: 'start', flexShrink: 0, width: 'calc(85vw)' }}>
              <CaseStudyCard
                {...cs}
                onClick={() => setSelectedCase(cs)}
              />
            </div>
          ))}
        </div>
        {/* Scroll dots */}
        <div className="flex justify-center gap-2 mt-4">
          {CASE_STUDIES.map((_, i) => (
            <motion.div
              key={i}
              animate={{
                width: activeDot === i ? '12px' : '6px',
                background: activeDot === i ? '#ffffff' : 'rgba(214,193,201,0.3)',
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              style={{ height: '6px', borderRadius: '99px' }}
            />
          ))}
        </div>
      </section>

      {/* METHODOLOGY */}
      <section className="px-5 py-10">
        <div className="mb-8">
          <span className="section-label">Our Process</span>
          <BlurText text="How We Work" className="text-2xl font-headline font-bold text-white mt-2" delay={60} />
        </div>
        <div className="flex flex-col">
          {METHODOLOGY.map((step, i) => (
            <div key={step.step} className="relative">
              <MethodologyStep
                icon={step.icon}
                number={step.step}
                color={step.color}
                title={step.title}
                description={step.description}
                isLast={i === METHODOLOGY.length - 1}
              />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 pb-6">
        <GlassCard className="p-6 text-center relative overflow-hidden" variant="elevated">
          <div className="gradient-blob" style={{ width: '200px', height: '200px', background: 'rgba(255,175,214,0.12)', top: '-50px', left: '50%', transform: 'translateX(-50%)' }} />
          <div className="relative z-10">
            {/* Animated sparkle instead of emoji */}
            <motion.div
              className="flex justify-center mb-3"
              animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <SparkleIcon size={36} color="#ffafd6" />
            </motion.div>
            <h2 className="text-2xl font-headline font-black text-white mb-2">Ready to Build Something Intelligent?</h2>
            <p className="text-sm mb-6" style={{ color: 'rgba(214,193,201,0.7)' }}>
              Tell us about your business challenges. We'll craft a strategy tailored to your goals — from AI automation to full-scale digital transformation.
            </p>
            <div style={{ borderRadius: '16px', padding: '1px', background: 'linear-gradient(135deg, rgba(255,175,214,0.6), rgba(227,140,184,0.3))', display: 'block', width: '100%' }}>
              <motion.button
                id="home-book-consult"
                onClick={openWhatsApp}
                className="w-full py-4 rounded-[14px] font-bold text-sm btn-primary-glow"
                style={{ background: 'linear-gradient(135deg, #ffafd6, #e38cb8)', color: '#57173e', borderRadius: '14px' }}
                whileTap={{ scale: 0.97 }}
              >
                Book Free Consultancy Call
              </motion.button>
            </div>
            <p className="text-xs mt-3" style={{ color: 'rgba(214,193,201,0.4)' }}>No commitment. 30-minute call.</p>
          </div>
        </GlassCard>
      </section>

      <WhatsAppFAB />

      {/* Case Study Bottom Sheet */}
      <BottomSheet
        isOpen={!!selectedCase}
        onClose={() => setSelectedCase(null)}
        title={selectedCase?.company}
        subtitle={selectedCase?.category}
      >
        {selectedCase && (
          <div className="flex flex-col gap-5">
            <div className="flex gap-3">
              {selectedCase.stats.map((stat) => (
                <GlassCard key={stat.label} className="flex-1 p-4 text-center">
                  <div className="text-2xl font-headline font-black text-gradient">{stat.value}</div>
                  <div className="text-xs mt-1" style={{ color: 'rgba(214,193,201,0.6)' }}>{stat.label}</div>
                </GlassCard>
              ))}
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#ffafd6' }}>Challenge</p>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(214,193,201,0.8)' }}>{selectedCase.challenge}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#becc9a' }}>Impact</p>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(214,193,201,0.8)' }}>{selectedCase.impact}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedCase.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: 'rgba(255,175,214,0.08)', border: '0.5px solid rgba(255,175,214,0.2)', color: 'rgba(214,193,201,0.7)' }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </BottomSheet>
    </div>
  );
};

export default HomeScreen;

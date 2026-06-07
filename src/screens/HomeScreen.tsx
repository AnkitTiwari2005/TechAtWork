import React, { useRef, useState, useCallback, useMemo } from 'react';
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
import {
  BrainIcon, GlobeIcon, ChartIcon, MegaphoneIcon, TargetIcon,
  RocketIcon, BuildingIcon, HeartIcon, SparkleIcon, SearchIcon,
  LightningIcon, ClockIcon, CheckCircleIcon, ArrowRightIcon,
} from '../components/ui/Icon';
import { staggerContainerVariants, staggerItemVariants } from '../hooks/useScrollReveal';

let _Browser: typeof import('@capacitor/browser').Browser | null = null;
async function openUrl(url: string) {
  if (!_Browser) {
    try { _Browser = (await import('@capacitor/browser')).Browser; } catch {}
  }
  if (_Browser) await _Browser.open({ url });
  else window.open(url, '_blank');
}

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
    stats: [{ value: '60%', label: 'Faster Load' }, { value: '45%', label: 'Organic Traffic' }],
    tags: ['Headless CMS', 'Performance', 'SEO'],
    challenge: 'As traffic surged, the legacy monolithic architecture struggled with load times and SEO optimization, resulting in high bounce rates and stagnant user growth.',
    impact: 'We decoupled the frontend using a modern headless architecture and optimized caching strategies. This resulted in a 60% improvement in page load speeds, a 45% increase in organic search traffic, and a highly streamlined content pipeline.',
  },
];

const METHODOLOGY = [
  { icon: <SearchIcon size={22} color="#ffafd6" />, step: '01', color: '#ffafd6', title: 'Discovery', description: 'Understanding goals and bottlenecks in your current operations.' },
  { icon: <TargetIcon size={22} color="#becc9a" />, step: '02', color: '#becc9a', title: 'Strategy', description: 'Designing AI + digital infrastructure tailored to your needs.' },
  { icon: <LightningIcon size={22} color="#e38cb8" />, step: '03', color: '#e38cb8', title: 'Execution', description: 'Development, deployment, and optimization.' },
  { icon: <RocketIcon size={22} color="#ffafd6" />, step: '04', color: '#ffafd6', title: 'Scale', description: 'Analytics, growth systems, and ongoing optimization.' },
];

const STATS = [
  { target: 50, suffix: '+', label: 'Projects Delivered', icon: <RocketIcon size={18} />, color: '#ffafd6' },
  { target: 20, suffix: '+', label: 'Industries Served', icon: <BuildingIcon size={18} />, color: '#becc9a' },
  { target: 95, suffix: '%', label: 'Client Retention', icon: <HeartIcon size={18} />, color: '#e38cb8' },
];

const HomeScreen: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<(typeof CASE_STUDIES)[0] | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);

  const PARTICLES = useMemo(() => Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: [8, 18, 32, 48, 62, 74, 85, 93][i],
    y: [15, 55, 25, 70, 40, 80, 20, 60][i],
    size: [2, 3, 2, 3, 2, 3, 2, 3][i],
    duration: [4, 5, 6, 4.5, 5.5, 3.5, 6, 4][i],
    delay: [0, 0.8, 1.6, 0.4, 1.2, 2.0, 0.6, 1.8][i],
  })), []);

  const handleCarouselScroll = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    const firstCard = el.firstElementChild as HTMLElement;
    if (!firstCard) return;
    const cardWidth = firstCard.offsetWidth + 16;
    const dot = Math.round(el.scrollLeft / cardWidth);
    setActiveDot(Math.min(dot, CASE_STUDIES.length - 1));
  }, []);

  const openWhatsApp = useCallback(async () => {
    const url = `https://api.whatsapp.com/send/?phone=919811797407&text=${encodeURIComponent('Hi Tech@Work! I found you via your app and would like to discuss my project.')}&type=phone_number&app_absent=0`;
    await openUrl(url);
  }, []);

  return (
    <div style={{ background: '#131313', minHeight: '100vh' }}>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', overflow: 'hidden', minHeight: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '32px 20px' }}>
        <VideoBackground src="/assets/hero-video.mp4" opacity={0.15} />
        <div className="hero-overlay" />
        {/* Pink vignette bottom-left */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 50% at 0% 100%, rgba(255,175,214,0.06) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 1 }} />

        {/* Particles */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2 }}>
          {PARTICLES.map((p) => (
            <motion.div key={p.id}
              style={{ position: 'absolute', left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, borderRadius: '50%', background: 'rgba(255,175,214,0.35)' }}
              animate={{ y: [0, -18, 0], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
        </div>

        <div style={{ position: 'relative', zIndex: 10 }}>
          {/* Section label — bar + text */}
          <motion.div className="flex items-center gap-2 mb-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div style={{ width: '3px', height: '12px', background: '#ffafd6', boxShadow: '0 0 8px rgba(255,175,214,0.6)', borderRadius: '2px', flexShrink: 0 }} />
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,175,214,0.9)' }}>AI-Powered Consultancy</span>
          </motion.div>

          <BlurText
            text="AI-Powered Digital Solutions for Modern Businesses"
            className="text-4xl font-headline font-black text-white"
            delay={75}
            as="h1"
          />

          {/* Hero stat row */}
          <motion.div className="flex items-center gap-3 mt-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#f0f0f0' }}>50+ Projects</span>
            <div style={{ width: '1px', height: '14px', background: 'rgba(255,175,214,0.15)' }} />
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#f0f0f0' }}>20+ Industries</span>
            <div style={{ width: '1px', height: '14px', background: 'rgba(255,175,214,0.15)' }} />
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#f0f0f0' }}>95% Retention</span>
          </motion.div>

          <motion.p style={{ fontSize: '14px', lineHeight: 1.65, color: 'rgba(214,193,201,0.7)', marginTop: '12px', maxWidth: '320px' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
            From AI-integrated websites to market intelligence and growth automation — Tech@Work helps businesses scale with intelligent digital infrastructure.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div className="flex gap-3 mt-5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
            <div style={{ flex: 1, borderRadius: '14px', padding: '1px', background: 'linear-gradient(135deg, rgba(255,175,214,0.6), rgba(227,140,184,0.3))' }}>
              <motion.button id="home-cta-primary" onClick={openWhatsApp}
                style={{ width: '100%', height: '52px', borderRadius: '13px', background: 'linear-gradient(135deg, #ffafd6, #e38cb8)', color: '#57173e', fontWeight: 700, fontSize: '13px', border: 'none', cursor: 'pointer' }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary-glow"
              >Get Free Strategy Call</motion.button>
            </div>
            <motion.button id="home-cta-secondary"
              onClick={() => { const el = document.getElementById('cases-section'); el?.scrollIntoView({ behavior: 'smooth' }); }}
              style={{ flex: 1, height: '52px', borderRadius: '13px', background: 'transparent', border: '1px solid rgba(255,175,214,0.2)', color: 'rgba(214,193,201,0.8)', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}
              whileTap={{ scale: 0.97 }}
            >View Our Work</motion.button>
          </motion.div>

          {/* Trust Pills — horizontal scroll */}
          <motion.div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar" style={{ paddingBottom: '4px' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
            {[
              { icon: <BrainIcon size={12} />, label: 'AI Automation' },
              { icon: <GlobeIcon size={12} />, label: 'Custom Websites' },
              { icon: <ChartIcon size={12} />, label: 'Market Intelligence' },
              { icon: <MegaphoneIcon size={12} />, label: 'Performance Marketing' },
              { icon: <TargetIcon size={12} />, label: 'Consulting' },
            ].map((pill) => (
              <TrustPill key={pill.label} icon={pill.icon} label={pill.label} index={0} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── STATS — horizontal scroll row ── */}
      <section style={{ paddingTop: '48px', paddingBottom: '8px' }}>
        <div style={{ paddingLeft: '20px', paddingRight: '20px', marginBottom: '16px' }}>
          <div className="section-label-bar"><span className="section-label">Our Impact</span></div>
          <h2 style={{ fontSize: '24px', fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, color: '#f0f0f0', margin: 0, letterSpacing: '-0.035em' }}>Numbers That Matter</h2>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar" style={{ paddingLeft: '20px', paddingRight: '20px', paddingBottom: '8px' }}>
          {STATS.map((stat, i) => (
            <motion.div key={stat.label}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              style={{ width: '130px', flexShrink: 0 }}
            >
              <div style={{ background: 'rgba(28,28,28,0.7)', backdropFilter: 'blur(20px)', border: '0.5px solid rgba(255,175,214,0.1)', borderRadius: '16px', padding: '16px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: `${stat.color}18`, border: `0.5px solid ${stat.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: stat.color, marginBottom: '10px' }}>
                  {stat.icon}
                </div>
                <StatCounter target={stat.target} suffix={stat.suffix} label={stat.label} icon={stat.icon} color={stat.color} />
                {/* Bottom accent bar */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: stat.color, opacity: 0.4, borderRadius: '0 0 16px 16px' }} />
              </div>
            </motion.div>
          ))}
          {/* <2wk card */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-20px' }} transition={{ duration: 0.4, delay: 0.24 }} style={{ width: '130px', flexShrink: 0 }}>
            <div style={{ background: 'rgba(28,28,28,0.7)', backdropFilter: 'blur(20px)', border: '0.5px solid rgba(255,175,214,0.1)', borderRadius: '16px', padding: '16px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'rgba(190,204,154,0.12)', border: '0.5px solid rgba(190,204,154,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#becc9a', marginBottom: '10px' }}>
                <ClockIcon size={16} color="#becc9a" />
              </div>
              <div style={{ fontSize: '28px', fontFamily: '"Space Grotesk", sans-serif', fontWeight: 900, color: '#becc9a', lineHeight: 1 }}>&lt;2wk</div>
              <div style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(214,193,201,0.5)', marginTop: '4px' }}>Avg Deployment</div>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: '#becc9a', opacity: 0.4, borderRadius: '0 0 16px 16px' }} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CASE STUDIES ── */}
      <section id="cases-section" style={{ paddingTop: '48px', paddingBottom: '8px' }}>
        <div style={{ paddingLeft: '20px', paddingRight: '20px', marginBottom: '16px' }}>
          <div className="section-label-bar"><span className="section-label">Case Studies</span></div>
          <h2 style={{ fontSize: '24px', fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, color: '#f0f0f0', margin: 0, letterSpacing: '-0.035em' }}>Real Work. Real Results.</h2>
        </div>
        <div ref={carouselRef} onScroll={handleCarouselScroll}
          className="flex gap-4 overflow-x-auto no-scrollbar"
          style={{ scrollSnapType: 'x mandatory', paddingLeft: '20px', paddingRight: '20px', paddingBottom: '8px' }}
        >
          {CASE_STUDIES.map((cs, i) => (
            <div key={cs.company} style={{ scrollSnapAlign: 'start', flexShrink: 0, width: 'calc(88vw)', maxWidth: '340px' }}>
              {/* Gradient border wrapper */}
              <div style={{ padding: '1px', borderRadius: '21px', background: 'linear-gradient(135deg, rgba(255,175,214,0.15), rgba(255,175,214,0.03))' }}>
                <CaseStudyCard {...cs} onClick={() => setSelectedCase(cs)} index={i} />
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-2 mt-4">
          {CASE_STUDIES.map((_, i) => (
            <motion.div key={i}
              animate={{ width: activeDot === i ? '12px' : '6px', background: activeDot === i ? '#ffffff' : 'rgba(214,193,201,0.3)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              style={{ height: '6px', borderRadius: '99px' }}
            />
          ))}
        </div>
      </section>

      {/* ── METHODOLOGY ── */}
      <section style={{ padding: '48px 20px 0' }}>
        <div style={{ marginBottom: '32px' }}>
          <div className="section-label-bar"><span className="section-label">Our Process</span></div>
          <BlurText text="From Discovery to Scale" className="text-2xl font-headline font-bold text-white mt-2" delay={60} />
        </div>
        <motion.div className="flex flex-col" variants={staggerContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {METHODOLOGY.map((step, i) => (
            <MethodologyStep
              key={step.step}
              icon={step.icon}
              number={step.step}
              color={step.color}
              title={step.title}
              description={step.description}
              isLast={i === METHODOLOGY.length - 1}
              index={i}
            />
          ))}
        </motion.div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '48px 20px 24px' }}>
        <GlassCard className="p-6 text-center relative overflow-hidden glass-card-elevated">
          <div style={{ position: 'relative', zIndex: 10 }}>
            {/* SparkleIcon in circle */}
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(255,175,214,0.15), rgba(227,140,184,0.1))', border: '1px solid rgba(255,175,214,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <motion.div animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
                <SparkleIcon size={28} color="#ffafd6" />
              </motion.div>
            </div>
            <h2 style={{ fontSize: '22px', fontFamily: '"Space Grotesk", sans-serif', fontWeight: 900, color: '#fff', marginBottom: '8px', letterSpacing: '-0.03em' }}>Ready to Build Something Intelligent?</h2>
            <p style={{ fontSize: '13px', color: 'rgba(214,193,201,0.7)', marginBottom: '20px', lineHeight: 1.65 }}>Tell us about your challenges. We craft precision strategies tied to your goals.</p>
            <div style={{ borderRadius: '16px', padding: '1px', background: 'linear-gradient(135deg, rgba(255,175,214,0.6), rgba(227,140,184,0.3))', display: 'block', width: '100%', marginBottom: '12px' }}>
              <motion.button id="home-book-consult" onClick={openWhatsApp}
                style={{ width: '100%', height: '52px', borderRadius: '14px', background: 'linear-gradient(135deg, #ffafd6, #e38cb8)', color: '#57173e', fontWeight: 700, fontSize: '14px', border: 'none', cursor: 'pointer' }}
                whileTap={{ scale: 0.97 }} className="btn-primary-glow"
              >Book Free Consultancy Call</motion.button>
            </div>
            {/* Trust items row */}
            <div className="flex items-center justify-center gap-2">
              <CheckCircleIcon size={12} color="#becc9a" />
              <span style={{ fontSize: '11px', color: 'rgba(214,193,201,0.5)' }}>No commitment</span>
              <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'rgba(214,193,201,0.3)' }} />
              <span style={{ fontSize: '11px', color: 'rgba(214,193,201,0.5)' }}>30-min call</span>
              <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'rgba(214,193,201,0.3)' }} />
              <span style={{ fontSize: '11px', color: 'rgba(214,193,201,0.5)' }}>Reply in 24h</span>
            </div>
          </div>
        </GlassCard>
      </section>

      <WhatsAppFAB />

      {/* Case Study Bottom Sheet */}
      <BottomSheet isOpen={!!selectedCase} onClose={() => setSelectedCase(null)} title={selectedCase?.company} subtitle={selectedCase?.category}>
        {selectedCase && (
          <div className="flex flex-col gap-5">
            <div className="flex gap-3">
              {selectedCase.stats.map((stat) => (
                <GlassCard key={stat.label} className="flex-1 p-4 text-center">
                  <div className="text-2xl font-headline font-black text-gradient-static stat-highlight">{stat.value}</div>
                  <div className="text-xs mt-1" style={{ color: 'rgba(214,193,201,0.6)' }}>{stat.label}</div>
                </GlassCard>
              ))}
            </div>
            <div style={{ borderLeft: '2px solid rgba(255,175,214,0.4)', paddingLeft: '12px' }}>
              <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#ffafd6' }}>Challenge</p>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(214,193,201,0.8)' }}>{selectedCase.challenge}</p>
            </div>
            <div style={{ borderLeft: '2px solid rgba(190,204,154,0.4)', paddingLeft: '12px' }}>
              <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#becc9a' }}>Impact</p>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(214,193,201,0.8)' }}>{selectedCase.impact}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedCase.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: 'rgba(255,175,214,0.08)', border: '0.5px solid rgba(255,175,214,0.2)', color: 'rgba(214,193,201,0.7)' }}>{tag}</span>
              ))}
            </div>
            <motion.button
              onClick={async () => {
                const cs = selectedCase;
                if (!cs) return;
                const url = `https://api.whatsapp.com/send/?phone=919811797407&text=${encodeURIComponent(`Hi Tech@Work! I saw the ${cs.company} case study on your app and would like to discuss something similar for my business.`)}&type=phone_number&app_absent=0`;
                await openUrl(url);
                setSelectedCase(null);
              }}
              style={{ width: '100%', height: '52px', borderRadius: '14px', background: 'linear-gradient(135deg, #ffafd6, #e38cb8)', color: '#57173e', fontWeight: 700, fontSize: '14px', border: 'none', cursor: 'pointer' }}
              whileTap={{ scale: 0.97 }}
            >Build Something Similar</motion.button>
          </div>
        )}
      </BottomSheet>
    </div>
  );
};

export default HomeScreen;

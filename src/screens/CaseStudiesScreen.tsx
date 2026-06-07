import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FilterChips from '../components/ui/FilterChips';
import CaseStudyCard from '../components/features/CaseStudyCard';
import BottomSheet from '../components/ui/BottomSheet';
import BlurText from '../components/ui/BlurText';
import GlassCard from '../components/ui/GlassCard';
import { XIcon } from '../components/ui/Icon';

const ALL_CASES = [
  {
    image: '/assets/houserve.png',
    company: 'Houserve',
    category: 'AI Automation',
    tagColor: '#ffafd6',
    description: 'Advanced platform featuring robust background removal, generative fill capabilities, and precise object removal tools tailored for high-end real estate and architectural visualization.',
    stats: [{ value: '85%', label: 'Less Editing Time' }, { value: '~0', label: 'Downtime' }],
    tags: ['AI/ML', 'SaaS Infrastructure', 'Real Estate', 'Computer Vision'],
    challenge: 'Real estate agencies faced high costs and slow turnaround times for property photo editing. We architected a scalable SaaS infrastructure leveraging custom ML models to handle the processing demands at scale.',
    impact: 'The resulting platform reduced editing time by 85% and significantly lowered operational costs for our clients, processing thousands of images daily with near-zero downtime.',
    type: 'AI Automation',
    url: 'https://houserve.in',
    techStack: ['Custom ML Models', 'SaaS Infrastructure', 'Background Removal AI', 'Generative Fill'],
  },
  {
    image: '/assets/shuddham.png',
    company: 'Shuddham',
    category: 'Web Dev',
    tagColor: '#becc9a',
    description: 'A comprehensive AI SaaS platform built on a robust Next.js and TypeScript stack. Features advanced AI Image Processing capabilities and seamless Stripe integration for credit management.',
    stats: [{ value: 'Concurrent', label: 'Processing Scale' }, { value: 'High', label: 'Margin Revenue' }],
    tags: ['Next.js', 'TypeScript', 'MongoDB', 'Stripe', 'Auth'],
    challenge: 'The client needed a robust, production-ready system to monetize AI image processing tools. We engineered a full-stack Next.js application, integrating secure authentication and Stripe-based credit billing.',
    impact: 'The platform successfully scaled to handle concurrent processing requests efficiently, establishing a stable, high-margin revenue stream.',
    type: 'Web Dev',
    url: 'https://shuddham.in',
    techStack: ['Next.js', 'TypeScript', 'MongoDB', 'Stripe', 'Secure Auth'],
  },
  {
    image: '/assets/onemint.png',
    company: 'OneMint',
    category: 'Performance',
    tagColor: '#e38cb8',
    description: 'A premier digital intelligence platform delivering wealth building guides and cutting-edge technology insights. Engineered for scale, currently serving a high-engagement audience of over 500,000+ readers.',
    stats: [{ value: '60%', label: 'Faster Page Load' }, { value: '45%', label: 'Organic Traffic ↑' }],
    tags: ['Headless Architecture', 'SEO', 'Performance', 'CDN', 'Content Platform'],
    challenge: 'As traffic surged, the legacy monolithic architecture struggled with load times and SEO optimization, resulting in high bounce rates and stagnant user growth. The publishing workflow was also bottlenecked by an outdated CMS.',
    impact: 'We decoupled the frontend using a modern headless architecture and optimized caching strategies. This resulted in a 60% improvement in page load speeds, a 45% increase in organic search traffic, and a highly streamlined content pipeline that accelerated publishing cadence.',
    type: 'Performance',
    url: 'https://onemint.in',
    techStack: ['Headless CMS', 'CDN Optimization', 'SEO Architecture', 'Caching Strategies'],
    extraStat: '500,000+ readers served',
  },
];

const FILTER_CHIPS = ['All', 'AI Automation', 'Web Dev', 'Performance'];

/** Extract a numeric percentage from a stat value string, or null if not applicable */
function parsePercent(value: string): number | null {
  const match = value.match(/^(\d+)%$/);
  return match ? parseInt(match[1], 10) : null;
}

const CaseStudiesScreen: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedCase, setSelectedCase] = useState<typeof ALL_CASES[0] | null>(null);

  const filtered = activeFilter === 'All'
    ? ALL_CASES
    : ALL_CASES.filter(c => c.type === activeFilter);

  const shareCase = async (company: string) => {
    try {
      const { Share } = await import('@capacitor/share');
      await Share.share({
        title: `${company} — Tech@Work Case Study`,
        text: `Discover how Tech@Work transformed ${company} using AI and technology.`,
        url: 'https://tech-work-mu.vercel.app',
        dialogTitle: `Share ${company} case study`,
      });
    } catch { /* share not available */ }
  };

  const openUrl = async (url: string) => {
    try {
      const { Browser } = await import('@capacitor/browser');
      await Browser.open({ url });
    } catch { window.open(url, '_blank'); }
  };

  return (
    <div style={{ background: '#131313', minHeight: '100vh' }}>
      {/* HEADER */}
      <div className="px-6 pt-8 pb-6">
        <span className="section-label">Portfolio</span>
        <BlurText
          text="Engineering Impact"
          className="text-4xl font-headline font-black text-white mt-2 mb-2"
          delay={80}
          as="h1"
        />
        <p className="text-sm leading-relaxed mb-2" style={{ color: 'rgba(214,193,201,0.7)' }}>
          A curated selection of our highest-performance digital infrastructure projects. Precision-engineered solutions for modern enterprises.
        </p>
        <p className="text-xs mb-5" style={{ color: 'rgba(214,193,201,0.45)' }}>
          © 2026 Tech@Work. Precision Engineering for the Digital Age.
        </p>
        <FilterChips
          chips={FILTER_CHIPS}
          active={activeFilter}
          onChange={setActiveFilter}
        />
      </div>

      {/* CASE STUDY CARDS */}
      <div className="px-5 pb-4 flex flex-col gap-4">
        {filtered.map((cs, i) => (
          <CaseStudyCard
            key={cs.company}
            {...cs}
            index={i}
            onClick={() => setSelectedCase(cs)}
            onShare={() => shareCase(cs.company)}
          />
        ))}
      </div>

      {/* CTA */}
      <div className="px-5 py-6">
        <GlassCard className="p-5 text-center">
          <p className="text-sm font-semibold text-white mb-1">Want similar results?</p>
          <p className="text-xs mb-4" style={{ color: 'rgba(214,193,201,0.65)' }}>
            Let's discuss your project.
          </p>
          <button
            id="cases-consult-cta"
            onClick={async () => {
              const url = `https://api.whatsapp.com/send/?phone=919811797407&text=${encodeURIComponent('Hi! I saw your case studies and would like to discuss a similar project.')}&type=phone_number&app_absent=0`;
              try {
                const { Browser } = await import('@capacitor/browser');
                await Browser.open({ url });
              } catch { window.open(url, '_blank'); }
            }}
            className="w-full py-3 rounded-xl font-semibold text-sm"
            style={{ background: 'linear-gradient(135deg, #ffafd6, #e38cb8)', color: '#57173e' }}
          >
            Start Your Project →
          </button>
        </GlassCard>
      </div>

      {/* BOTTOM SHEET — Case Study Detail */}
      <BottomSheet
        isOpen={!!selectedCase}
        onClose={() => setSelectedCase(null)}
        title={selectedCase?.company}
      >
        {selectedCase && (
          <div>
            {/* X close button */}
            <div className="flex justify-end mb-3">
              <button
                id={`sheet-close-${selectedCase.company.toLowerCase()}`}
                onClick={() => setSelectedCase(null)}
                style={{
                  background: 'rgba(255,175,214,0.08)',
                  border: '0.5px solid rgba(255,175,214,0.2)',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <XIcon size={14} color="rgba(214,193,201,0.7)" />
              </button>
            </div>

            <img
              src={selectedCase.image}
              alt={selectedCase.company}
              className="w-full rounded-xl mb-5"
              style={{ height: '180px', objectFit: 'cover' }}
            />

            {/* Category + Tags */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                style={{ background: selectedCase.tagColor, color: '#131313' }}>
                {selectedCase.category}
              </span>
              {selectedCase.tags.map(tag => (
                <span key={tag} className="text-xs font-medium px-2.5 py-1 rounded-full"
                  style={{ background: 'rgba(81,67,73,0.4)', color: 'rgba(214,193,201,0.8)' }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Description */}
            <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(214,193,201,0.85)' }}>
              {selectedCase.description}
            </p>

            {/* Stats with gradient text + animated progress bars for % values */}
            <div className="flex gap-3 mb-4">
              {selectedCase.stats.map(stat => (
                <div key={stat.label} className="flex-1 py-3 rounded-xl text-center"
                  style={{ background: 'rgba(255,175,214,0.08)' }}>
                  <div className="text-xl font-headline font-black text-gradient">{stat.value}</div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider mt-0.5"
                    style={{ color: 'rgba(214,193,201,0.6)' }}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Animated progress meter bars for % stats */}
            {selectedCase.stats.some(s => parsePercent(s.value) !== null) && (
              <div className="flex flex-col gap-3 mb-5">
                {selectedCase.stats.filter(s => parsePercent(s.value) !== null).map(stat => {
                  const pct = parsePercent(stat.value)!;
                  return (
                    <div key={stat.label}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-semibold" style={{ color: 'rgba(214,193,201,0.7)' }}>{stat.label}</span>
                        <span className="text-xs font-bold" style={{ color: '#ffafd6' }}>{stat.value}</span>
                      </div>
                      <div style={{ height: '4px', background: 'rgba(255,175,214,0.1)', borderRadius: '99px', overflow: 'hidden' }}>
                        <motion.div
                          style={{ height: '100%', borderRadius: '99px', background: 'linear-gradient(90deg, #ffafd6, #e38cb8)' }}
                          initial={{ width: '0%' }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Tech Stack */}
            <div className="mb-5">
              <h4 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'rgba(214,193,201,0.5)' }}>
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedCase.techStack.map(tech => (
                  <span key={tech} className="text-xs font-medium px-2 py-1 rounded-lg"
                    style={{ background: 'rgba(190,204,154,0.12)', color: '#becc9a', border: '1px solid rgba(190,204,154,0.2)' }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Challenge */}
            <div className="mb-5">
              <h4 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: '#ffafd6' }}>
                The Challenge
              </h4>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(214,193,201,0.8)' }}>
                {selectedCase.challenge}
              </p>
            </div>

            {/* Impact */}
            <div className="mb-6">
              <h4 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: '#becc9a' }}>
                The Impact
              </h4>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(214,193,201,0.8)' }}>
                {selectedCase.impact}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                id={`sheet-share-${selectedCase.company.toLowerCase()}`}
                onClick={() => shareCase(selectedCase.company)}
                className="flex-1 py-3 rounded-xl font-semibold text-sm"
                style={{ background: 'rgba(255,175,214,0.1)', color: '#ffafd6', border: '1px solid rgba(255,175,214,0.25)' }}
              >
                Share
              </button>
              <button
                id={`sheet-visit-${selectedCase.company.toLowerCase()}`}
                onClick={() => openUrl(selectedCase.url)}
                className="flex-1 py-3 rounded-xl font-semibold text-sm"
                style={{ background: 'rgba(190,204,154,0.1)', color: '#becc9a', border: '1px solid rgba(190,204,154,0.25)' }}
              >
                Visit Site ↗
              </button>
              <button
                id={`sheet-discuss-${selectedCase.company.toLowerCase()}`}
                onClick={async () => {
                  const url = `https://api.whatsapp.com/send/?phone=919811797407&text=${encodeURIComponent(`Hi! I saw the ${selectedCase.company} case study and would like something similar.`)}&type=phone_number&app_absent=0`;
                  try {
                    const { Browser } = await import('@capacitor/browser');
                    await Browser.open({ url });
                  } catch { window.open(url, '_blank'); }
                  setSelectedCase(null);
                }}
                className="flex-1 py-3 rounded-xl font-bold text-sm"
                style={{ background: 'linear-gradient(135deg, #ffafd6, #e38cb8)', color: '#57173e' }}
              >
                Build Similar
              </button>
            </div>
          </div>
        )}
      </BottomSheet>
    </div>
  );
};

export default CaseStudiesScreen;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FilterChips from '../components/ui/FilterChips';
import CaseStudyCard from '../components/features/CaseStudyCard';
import BottomSheet from '../components/ui/BottomSheet';
import BlurText from '../components/ui/BlurText';
import GlassCard from '../components/ui/GlassCard';

const ALL_CASES = [
  {
    image: '/assets/houserve.png',
    company: 'Houserve',
    category: 'AI Automation',
    tagColor: '#ffafd6',
    description: 'AI-powered real estate photo editing platform with background removal, generative fill, and object removal at scale.',
    stats: [{ value: '85%', label: 'Less Editing Time' }, { value: '1000s', label: 'Daily Images' }],
    tags: ['AI/ML', 'SaaS', 'Real Estate', 'Computer Vision'],
    challenge: 'Houserve needed to dramatically reduce the time estate agents spent manually editing property photos. The existing manual workflow was costing hours per day and creating a bottleneck that prevented agents from scaling their listings business.',
    impact: '85% reduction in editing time. The platform now processes thousands of images daily with AI-powered background removal, generative fill, and object removal — entirely automated and available 24/7.',
    type: 'AI Automation',
  },
  {
    image: '/assets/shuddham.png',
    company: 'Shuddham',
    category: 'Web Dev',
    tagColor: '#becc9a',
    description: 'Full-stack AI SaaS platform built on Next.js & MongoDB with Stripe credit billing and enterprise-grade security.',
    stats: [{ value: 'Concurrent', label: 'Processing' }, { value: 'High', label: 'Margin Revenue' }],
    tags: ['Next.js', 'MongoDB', 'Stripe', 'Auth.js', 'SaaS'],
    challenge: 'Building a robust AI image processing platform that could handle concurrent users while maintaining a profitable credit-based billing model. The client needed a complete go-to-market product in minimal time.',
    impact: 'Scaled to support concurrent AI processing with a stable, high-margin revenue stream. Full Stripe integration for credit management, secure authentication, and real-time processing pipelines.',
    type: 'Web Dev',
  },
  {
    image: '/assets/onemint.png',
    company: 'OneMint',
    category: 'Performance',
    tagColor: '#e38cb8',
    description: 'Digital intelligence platform for 500,000+ readers — headless architecture migration with advanced caching optimization.',
    stats: [{ value: '60%', label: 'Faster Load Speed' }, { value: '45%', label: 'Organic Traffic' }],
    tags: ['Headless CMS', 'Performance', 'SEO', 'CDN', 'Architecture'],
    challenge: 'OneMint was serving over 500,000 monthly readers on a legacy monolithic CMS. Page load speeds were degrading user experience and causing significant SEO penalties and revenue loss.',
    impact: '60% improvement in page load speeds and 45% increase in organic search traffic after migrating to a headless architecture with advanced edge caching and CDN optimization.',
    type: 'Performance',
  },
];

const FILTER_CHIPS = ['All', 'AI Automation', 'Web Dev', 'Performance'];

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

  return (
    <div style={{ background: '#131313', minHeight: '100vh' }}>
      {/* HEADER */}
      <div className="px-6 pt-8 pb-6">
        <span className="section-label">💼 Portfolio</span>
        <BlurText
          text="Our Work"
          className="text-4xl font-headline font-black text-white mt-2 mb-2"
          delay={80}
          as="h1"
        />
        <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(214,193,201,0.7)' }}>
          Real projects. Measurable outcomes. From AI automation to full-stack platforms.
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
            <img
              src={selectedCase.image}
              alt={selectedCase.company}
              className="w-full rounded-xl mb-5"
              style={{ height: '180px', objectFit: 'cover' }}
            />

            {/* Category + Tags */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full" style={{ background: selectedCase.tagColor, color: '#131313' }}>
                {selectedCase.category}
              </span>
              {selectedCase.tags.map(tag => (
                <span key={tag} className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: 'rgba(81,67,73,0.4)', color: 'rgba(214,193,201,0.8)' }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="flex gap-3 mb-6">
              {selectedCase.stats.map(stat => (
                <div key={stat.label} className="flex-1 py-3 rounded-xl text-center" style={{ background: 'rgba(255,175,214,0.08)' }}>
                  <div className="text-xl font-headline font-black" style={{ color: '#ffafd6' }}>{stat.value}</div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider mt-0.5" style={{ color: 'rgba(214,193,201,0.6)' }}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Challenge */}
            <div className="mb-5">
              <h4 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: '#ffafd6' }}>The Challenge</h4>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(214,193,201,0.8)' }}>{selectedCase.challenge}</p>
            </div>

            {/* Impact */}
            <div className="mb-6">
              <h4 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: '#becc9a' }}>The Impact</h4>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(214,193,201,0.8)' }}>{selectedCase.impact}</p>
            </div>

            {/* Share */}
            <div className="flex gap-3">
              <button
                id={`sheet-share-${selectedCase.company.toLowerCase()}`}
                onClick={() => shareCase(selectedCase.company)}
                className="flex-1 py-3 rounded-xl font-semibold text-sm"
                style={{ background: 'rgba(255,175,214,0.1)', color: '#ffafd6', border: '1px solid rgba(255,175,214,0.25)' }}
              >
                Share Case Study
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
                Build Similar →
              </button>
            </div>
          </div>
        )}
      </BottomSheet>
    </div>
  );
};

export default CaseStudiesScreen;

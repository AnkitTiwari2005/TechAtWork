import React from 'react';
import { motion } from 'framer-motion';
import BlurText from '../components/ui/BlurText';
import StatCounter from '../components/ui/StatCounter';
import GlassCard from '../components/ui/GlassCard';
import InfiniteMarquee from '../components/ui/InfiniteMarquee';

const CORE_VALUES = [
  {
    icon: '💼',
    title: 'Business-First',
    description: 'Every technical decision serves a business outcome. We speak ROI, not jargon.',
    color: '#ffafd6',
  },
  {
    icon: '📊',
    title: 'Data-Driven',
    description: 'Decisions backed by real data. We measure, analyze, and optimize continuously.',
    color: '#becc9a',
  },
  {
    icon: '🤖',
    title: 'AI-Powered',
    description: 'We embed AI at the core of every solution, not as an afterthought.',
    color: '#e38cb8',
  },
];

const EXPERTISE = ['AI Engineering', 'Data Science', 'Web Architecture', 'Performance Marketing', 'Business Strategy', 'LLM Deployment', 'Cloud Infrastructure', 'Product Design'];

const openWhatsApp = async () => {
  const url = `https://api.whatsapp.com/send/?phone=919811797407&text=${encodeURIComponent('Hi Tech@Work! I\'d like to book a consultation call.')}&type=phone_number&app_absent=0`;
  try {
    const { Browser } = await import('@capacitor/browser');
    await Browser.open({ url });
  } catch { window.open(url, '_blank'); }
};

const AboutScreen: React.FC = () => {
  return (
    <div style={{ background: '#131313', minHeight: '100vh' }}>
      {/* HERO */}
      <div className="relative px-6 pt-10 pb-8 overflow-hidden">
        <div className="gradient-blob" style={{ width: '300px', height: '300px', background: 'rgba(255,175,214,0.1)', top: '-80px', right: '-80px' }} />
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">◎ About Us</span>
            <BlurText
              text="We Build What AI Enables"
              className="text-4xl font-headline font-black text-white mt-3 mb-4"
              delay={80}
              as="h1"
            />
            <p className="text-sm leading-relaxed readable" style={{ color: 'rgba(214,193,201,0.8)' }}>
              Tech@Work is a B2B technology consultancy specializing in AI-driven digital transformation. We partner with businesses to build intelligent systems that work — from local LLM deployment to full-scale SaaS platforms.
            </p>
          </motion.div>
        </div>
      </div>

      {/* STATS */}
      <section className="px-6 pb-10">
        <div className="grid grid-cols-2 gap-3 mb-3">
          <StatCounter target={50} suffix="+" label="Projects Delivered" icon="🚀" color="#ffafd6" />
          <StatCounter target={20} suffix="+" label="Industries Served" icon="🏭" color="#becc9a" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <StatCounter target={95} suffix="%" label="Client Retention" icon="❤️" color="#e38cb8" />
          <GlassCard className="p-4 flex flex-col gap-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: 'rgba(190,204,154,0.15)', border: '1px solid rgba(190,204,154,0.3)' }}>⏱</div>
            <div className="text-3xl font-headline font-black" style={{ color: '#becc9a', lineHeight: 1 }}>&lt;2wk</div>
            <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'rgba(214,193,201,0.6)' }}>Avg. Deployment</div>
          </GlassCard>
        </div>
      </section>

      {/* MISSION */}
      <section className="px-6 py-8">
        <GlassCard className="p-6 relative overflow-hidden">
          <div className="gradient-blob" style={{ width: '150px', height: '150px', background: 'rgba(255,175,214,0.1)', bottom: '-30px', right: '-30px' }} />
          <div className="relative z-10">
            <span className="section-label">🎯 Our Mission</span>
            <p className="text-base font-medium leading-relaxed mt-3" style={{ color: '#e2e2e2' }}>
              "To democratize enterprise-grade AI — giving businesses of every size the tools, strategy, and execution they need to compete in the intelligence economy."
            </p>
          </div>
        </GlassCard>
      </section>

      {/* CORE VALUES */}
      <section className="px-6 py-8">
        <div className="mb-6">
          <span className="section-label">✨ Core Values</span>
          <BlurText
            text="How We Operate"
            className="text-2xl font-headline font-bold text-white mt-2"
            delay={60}
          />
        </div>
        <div className="flex flex-col gap-4">
          {CORE_VALUES.map((val, i) => (
            <motion.div
              key={val.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <GlassCard className="p-5 flex gap-4 items-start">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: `${val.color}15`, border: `1px solid ${val.color}30` }}
                >
                  {val.icon}
                </div>
                <div>
                  <h3 className="text-base font-headline font-bold text-white mb-1">{val.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(214,193,201,0.7)' }}>{val.description}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* EXPERTISE MARQUEE */}
      <section className="py-8">
        <div className="px-6 mb-4">
          <span className="section-label">🧠 Our Expertise</span>
        </div>
        <InfiniteMarquee items={EXPERTISE} direction="forward" />
        <div className="mt-2" />
        <InfiniteMarquee items={[...EXPERTISE].reverse()} direction="reverse" />
      </section>

      {/* TEAM PLACEHOLDER */}
      <section className="px-6 py-8">
        <div className="mb-4">
          <span className="section-label">👥 Our Team</span>
          <h2 className="text-2xl font-headline font-bold text-white mt-2">The People Behind The Work</h2>
        </div>
        <GlassCard className="p-6 text-center">
          <div className="text-4xl mb-3">🚀</div>
          <p className="text-sm" style={{ color: 'rgba(214,193,201,0.7)' }}>
            A lean, elite team of AI engineers, product designers, and growth strategists — all senior-level, all remote-first.
          </p>
        </GlassCard>
      </section>

      {/* CTA */}
      <section className="px-6 py-8 pb-10">
        <GlassCard className="p-6 text-center relative overflow-hidden">
          <div className="gradient-blob" style={{ width: '200px', height: '200px', background: 'rgba(255,175,214,0.1)', top: '-50px', left: '50%', transform: 'translateX(-50%)' }} />
          <div className="relative z-10">
            <h3 className="text-xl font-headline font-bold text-white mb-2">Ready to Work Together?</h3>
            <p className="text-sm mb-5" style={{ color: 'rgba(214,193,201,0.7)' }}>
              Book a free 30-minute strategy call. No pressure, just value.
            </p>
            <motion.button
              id="about-book-call"
              onClick={openWhatsApp}
              className="w-full py-4 rounded-2xl font-bold text-sm"
              style={{ background: 'linear-gradient(135deg, #ffafd6, #e38cb8)', color: '#57173e' }}
              whileTap={{ scale: 0.97 }}
            >
              Book a Call →
            </motion.button>
          </div>
        </GlassCard>
      </section>
    </div>
  );
};

export default AboutScreen;

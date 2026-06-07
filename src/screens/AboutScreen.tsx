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
    description: 'Every decision, line of code, and architectural choice is tied directly to commercial outcomes and business growth.',
    color: '#ffafd6',
  },
  {
    icon: '📊',
    title: 'Data-Driven',
    description: 'We let numbers guide strategy, not assumptions. Rigorous analytics form the foundation of our execution.',
    color: '#becc9a',
  },
  {
    icon: '🤖',
    title: 'AI-Powered',
    description: 'We integrate cutting-edge artificial intelligence into every solution, ensuring you stay ahead of the technology curve.',
    color: '#e38cb8',
  },
];

const EXPERTISE = ['AI Engineering', 'Data Science', 'Web Architecture', 'Performance Marketing', 'Business Strategy', 'LLM Deployment', 'Cloud Infrastructure', 'Product Design'];

const openWhatsApp = async () => {
  const url = `https://api.whatsapp.com/send/?phone=919811797407&text=${encodeURIComponent('Hi Tech@Work! I\'d like to book a free consultancy call.')}&type=phone_number&app_absent=0`;
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
              text="Precision-Engineered Digital Solutions"
              className="text-4xl font-headline font-black text-white mt-3 mb-4"
              delay={80}
              as="h1"
            />
            <p className="text-sm leading-relaxed readable" style={{ color: 'rgba(214,193,201,0.8)' }}>
              We are Tech@Work — a technology consultancy built for businesses that want to move faster, think smarter, and scale with intention.
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
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
              style={{ background: 'rgba(190,204,154,0.15)', border: '1px solid rgba(190,204,154,0.3)' }}>⏱</div>
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
            <h2 className="text-lg font-headline font-bold text-white mt-3 mb-3">
              We build intelligent systems that drive measurable outcomes.
            </h2>
            <p className="text-sm leading-relaxed mb-3" style={{ color: 'rgba(214,193,201,0.75)' }}>
              In a landscape flooded with generic tools and theoretical advice, we focus on execution. Our mission is to bridge the gap between complex technology and tangible business growth.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(214,193,201,0.75)' }}>
              Whether it's deploying private AI models that protect your data, building enterprise-grade platforms, or engineering data-driven marketing campaigns, every solution we deliver is designed with precision and purpose.
            </p>
          </div>
        </GlassCard>
      </section>

      {/* CORE VALUES */}
      <section className="px-6 py-8">
        <div className="mb-6">
          <span className="section-label">✨ Our DNA</span>
          <BlurText
            text="Core Values"
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

      {/* TEAM */}
      <section className="px-6 py-8">
        <div className="mb-4">
          <span className="section-label">👥 Our Team</span>
          <h2 className="text-2xl font-headline font-bold text-white mt-2">The People Behind The Work</h2>
        </div>
        <GlassCard className="p-6">
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(214,193,201,0.75)' }}>
            Our team combines deep technical expertise in artificial intelligence, web engineering, and data science with strategic business acumen to deliver solutions that actually work.
          </p>
        </GlassCard>
      </section>

      {/* CTA */}
      <section className="px-6 py-8 pb-10">
        <GlassCard className="p-6 text-center relative overflow-hidden">
          <div className="gradient-blob" style={{ width: '200px', height: '200px', background: 'rgba(255,175,214,0.1)', top: '-50px', left: '50%', transform: 'translateX(-50%)' }} />
          <div className="relative z-10">
            <h3 className="text-xl font-headline font-bold text-white mb-2">Ready to Transform Your Business?</h3>
            <p className="text-sm mb-5" style={{ color: 'rgba(214,193,201,0.7)' }}>
              Book a free strategy call to discuss your business challenges and explore how our intelligent digital solutions can drive your growth.
            </p>
            <motion.button
              id="about-book-call"
              onClick={openWhatsApp}
              className="w-full py-4 rounded-2xl font-bold text-sm mb-3"
              style={{ background: 'linear-gradient(135deg, #ffafd6, #e38cb8)', color: '#57173e' }}
              whileTap={{ scale: 0.97 }}
            >
              Book Free Consultancy Call →
            </motion.button>
          </div>
        </GlassCard>
      </section>
    </div>
  );
};

export default AboutScreen;

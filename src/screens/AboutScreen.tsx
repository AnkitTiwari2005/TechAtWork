import React from 'react';
import { motion } from 'framer-motion';
import BlurText from '../components/ui/BlurText';
import StatCounter from '../components/ui/StatCounter';
import GlassCard from '../components/ui/GlassCard';
import InfiniteMarquee from '../components/ui/InfiniteMarquee';
import { BriefcaseIcon, ChartIcon, BrainIcon, RocketIcon, BuildingIcon, HeartIcon, ClockIcon } from '../components/ui/Icon';
import { staggerContainerVariants, staggerItemVariants } from '../hooks/useScrollReveal';

const CORE_VALUES = [
  {
    Icon: BriefcaseIcon,
    title: 'Business-First',
    description: 'Every decision, line of code, and architectural choice is tied directly to commercial outcomes and business growth.',
    color: '#ffafd6',
  },
  {
    Icon: ChartIcon,
    title: 'Data-Driven',
    description: 'We let numbers guide strategy, not assumptions. Rigorous analytics form the foundation of our execution.',
    color: '#becc9a',
  },
  {
    Icon: BrainIcon,
    title: 'AI-Powered',
    description: 'We integrate cutting-edge artificial intelligence into every solution, ensuring you stay ahead of the technology curve.',
    color: '#e38cb8',
  },
];

const TEAM = [
  { initials: 'SW', name: 'Shiv W.', role: 'AI & Strategy' },
  { initials: 'AT', name: 'Ankit T.', role: 'Web Engineering' },
  { initials: 'MK', name: 'Manan K.', role: 'Performance Marketing' },
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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="section-label">About Us</span>
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
        <motion.div
          className="grid grid-cols-2 gap-3 mb-3"
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
        </motion.div>
        <motion.div
          className="grid grid-cols-2 gap-3"
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-30px' }}
        >
          <motion.div variants={staggerItemVariants}>
            <StatCounter target={95} suffix="%" label="Client Retention" icon={<HeartIcon size={18} />} color="#e38cb8" />
          </motion.div>
          <motion.div variants={staggerItemVariants}>
            <GlassCard className="p-4 flex flex-col gap-2">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(190,204,154,0.15)', border: '1px solid rgba(190,204,154,0.3)' }}>
                <ClockIcon size={18} color="#becc9a" />
              </div>
              <div className="text-3xl font-headline font-black" style={{ color: '#becc9a', lineHeight: 1 }}>&lt;2wk</div>
              <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'rgba(214,193,201,0.6)' }}>Avg. Deployment</div>
            </GlassCard>
          </motion.div>
        </motion.div>
      </section>

      {/* MISSION */}
      <section className="px-6 py-8">
        <GlassCard className="p-6 relative overflow-hidden" variant="elevated">
          <div className="gradient-blob" style={{ width: '150px', height: '150px', background: 'rgba(255,175,214,0.1)', bottom: '-30px', right: '-30px' }} />
          <div className="relative z-10">
            <span className="section-label">Our Mission</span>
            {/* SVG quotation mark */}
            <div style={{ color: 'rgba(255,175,214,0.15)', fontSize: '60px', lineHeight: 0.8, fontFamily: 'Georgia, serif', marginTop: '12px' }}>&ldquo;</div>
            <h2 className="text-lg font-headline font-bold text-white mt-1 mb-3">
              We build intelligent systems that drive measurable outcomes.
            </h2>
            <p className="text-sm leading-relaxed mb-3" style={{ color: 'rgba(214,193,201,0.75)' }}>
              In a landscape flooded with generic tools and theoretical advice, we focus on execution. Our mission is to bridge the gap between complex technology and tangible business growth.
            </p>
            <p className="text-sm leading-relaxed mb-2" style={{ color: 'rgba(214,193,201,0.75)' }}>
              Whether it's deploying private AI models that protect your data, building enterprise-grade platforms, or engineering data-driven marketing campaigns, every solution we deliver is designed with precision and purpose.
            </p>
            <div style={{ color: 'rgba(255,175,214,0.15)', fontSize: '60px', lineHeight: 0.8, fontFamily: 'Georgia, serif', textAlign: 'right' }}>&rdquo;</div>
          </div>
        </GlassCard>
      </section>

      {/* CORE VALUES */}
      <section className="px-6 py-8">
        <div className="mb-6">
          <span className="section-label">Our DNA</span>
          <BlurText text="Core Values" className="text-2xl font-headline font-bold text-white mt-2" delay={60} />
        </div>
        <motion.div
          className="flex flex-col gap-4"
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-30px' }}
        >
          {CORE_VALUES.map(({ Icon, title, description, color }, i) => (
            <motion.div key={title} variants={staggerItemVariants}>
              <GlassCard className="p-5 flex gap-4 items-start">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${color}15`, border: `0.5px solid ${color}25` }}
                >
                  <Icon size={22} color={color} />
                </div>
                <div>
                  <h3 className="text-base font-headline font-bold text-white mb-1">{title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(214,193,201,0.7)' }}>{description}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* EXPERTISE MARQUEE */}
      <section className="py-8">
        <div className="px-6 mb-4">
          <span className="section-label">Expertise</span>
        </div>
        <InfiniteMarquee items={EXPERTISE} direction="forward" />
        <div className="mt-2" />
        <InfiniteMarquee items={[...EXPERTISE].reverse()} direction="reverse" />
      </section>

      {/* TEAM */}
      <section className="px-6 py-8">
        <div className="mb-6">
          <span className="section-label">Our Team</span>
          <h2 className="text-2xl font-headline font-bold text-white mt-2">The People Behind The Work</h2>
        </div>
        <div className="flex gap-4 mb-5">
          {TEAM.map((member, i) => (
            <motion.div
              key={member.initials}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex-1"
            >
              <GlassCard className="p-4 flex flex-col items-center gap-3 text-center">
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(255,175,214,0.2), rgba(227,140,184,0.2))',
                    border: '0.5px solid rgba(255,175,214,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    fontWeight: 700,
                    color: '#ffafd6',
                    fontFamily: '"Space Grotesk", sans-serif',
                  }}
                >
                  {member.initials}
                </div>
                <div>
                  <p className="text-xs font-bold text-white">{member.name}</p>
                  <p className="text-[10px] mt-0.5" style={{ color: 'rgba(214,193,201,0.55)' }}>{member.role}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
        <GlassCard className="p-5">
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(214,193,201,0.75)' }}>
            Our team combines deep technical expertise in artificial intelligence, web engineering, and data science with strategic business acumen to deliver solutions that actually work.
          </p>
        </GlassCard>
      </section>

      {/* CTA */}
      <section className="px-6 py-8 pb-10">
        <GlassCard className="p-6 text-center relative overflow-hidden" variant="elevated">
          <div className="gradient-blob" style={{ width: '200px', height: '200px', background: 'rgba(255,175,214,0.1)', top: '-50px', left: '50%', transform: 'translateX(-50%)' }} />
          <div className="relative z-10">
            <h3 className="text-xl font-headline font-bold text-white mb-2">Ready to Transform Your Business?</h3>
            <p className="text-sm mb-5" style={{ color: 'rgba(214,193,201,0.7)' }}>
              Book a free strategy call to discuss your business challenges and explore how our intelligent digital solutions can drive your growth.
            </p>
            <motion.button
              id="about-book-call"
              onClick={openWhatsApp}
              className="w-full py-4 rounded-2xl font-bold text-sm btn-glow"
              style={{ background: 'linear-gradient(135deg, #ffafd6, #e38cb8)', color: '#57173e' }}
              whileTap={{ scale: 0.97 }}
            >
              Book Free Consultancy Call
            </motion.button>
          </div>
        </GlassCard>
      </section>
    </div>
  );
};

export default AboutScreen;

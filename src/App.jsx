import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Mail, 
  ExternalLink, 
  ArrowRight, 
  Code2, 
  Cpu, 
  Brain, 
  Activity, 
  Layers, 
  Terminal,
  MousePointer2,
  Trophy,
  Calendar,
  ChevronRight
} from 'lucide-react';

const GithubIcon = ({ size = 24, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

gsap.registerPlugin(ScrollTrigger);

/**
 * PROJECT DATA
 * Update these to reflect your latest work.
 * Schema: { title, description, tech, github, demo }
 */
const PROJECTS = [
  {
    title: "aEye",
    description: "An AI-powered PWA designed to empower visually impaired individuals through real-time environment analysis and auditory feedback.",
    tech: ["TensorFlow.js", "React", "Web Speech API", "PWA"],
    github: "https://github.com/Matthew-Lam0704/aEye",
    demo: "#" // TODO: Add demo link if available
  },
  {
    title: "AceStudy",
    description: "A comprehensive revision ecosystem for A-Level students, featuring intelligent flashcards, mock exam generation, and progress tracking.",
    tech: ["Supabase", "React", "GSAP", "Tailwind CSS"],
    github: "https://github.com/Matthew-Lam0704/AceStudy",
    demo: "#"
  },
  {
    title: "Portfolio v2",
    description: "A cinematic digital instrument built with React and WebGL, showcasing advanced animation techniques and generative art.",
    tech: ["React 19", "GSAP", "Three.js", "Tailwind"],
    github: "https://github.com/Matthew-Lam0704/Portfolio",
    demo: "https://matthew-lam.com" // TODO: Replace with actual domain
  }
];

// --- Sub-components for Section C (Signal Strip) ---

const SkillShuffler = () => {
  const [skills, setSkills] = useState([
    { category: "Languages", items: "Python, C++, TypeScript, Rust" },
    { category: "ML/Systems", items: "PyTorch, JAX, CUDA, scikit-learn" },
    { category: "Tools/Dev", items: "Git, Docker, Linux, LaTeX, Vite" }
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSkills(prev => {
        const next = [...prev];
        const last = next.pop();
        next.unshift(last);
        return next;
      });
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-48 w-full perspective-1000">
      {skills.map((skill, idx) => (
        <div 
          key={skill.category}
          className="absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] bg-background border border-dark/10 rounded-[1.5rem] p-6 shadow-sm"
          style={{
            transform: `translateY(${idx * 12}px) translateZ(${-idx * 20}px) scale(${1 - idx * 0.05})`,
            zIndex: 10 - idx,
            opacity: 1 - idx * 0.3
          }}
        >
          <div className="font-mono text-[10px] uppercase tracking-wider text-accent mb-2">// {skill.category}</div>
          <div className="font-heading font-bold text-lg leading-tight">{skill.items}</div>
        </div>
      ))}
    </div>
  );
};

const ActivityTelemetry = () => {
  const [text, setText] = useState("");
  const messages = [
    "> solving codeforces div2 round 891...",
    "> reading: Attention Is All You Need",
    "> shipping: personal compiler in rust",
    "> optimizing: CUDA kernels for neural nets"
  ];
  const [msgIdx, setMsgIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    if (charIdx < messages[msgIdx].length) {
      const timer = setTimeout(() => setCharIdx(prev => prev + 1), 50);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setCharIdx(0);
        setMsgIdx(prev => (prev + 1) % messages.length);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [charIdx, msgIdx]);

  return (
    <div className="bg-dark/5 rounded-[1.5rem] p-6 h-48 border border-dark/10 font-mono text-sm overflow-hidden relative">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        <span className="text-[10px] uppercase tracking-widest text-dark/60 font-bold">Live Feed</span>
      </div>
      <div className="text-dark/90 leading-relaxed">
        {messages[msgIdx].substring(0, charIdx)}
        <span className="inline-block w-2 h-4 bg-accent/40 animate-pulse ml-1 align-middle" />
      </div>
    </div>
  );
};

const AchievementsScheduler = () => {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const [activeDay, setActiveDay] = useState(2);
  const achievements = [
    "Hackathon Winner (AI Hack)",
    "USACO Gold Division",
    "Physics Olympiad Top 5%",
    "Shipped aEye PWA",
    "Completed MIT OCW 6.001",
    "Started ML Research Intern",
    "AWS Certified Architect"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveDay(prev => (prev + 1) % 7);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-background border border-dark/10 rounded-[1.5rem] p-6 h-48 relative overflow-hidden flex flex-col justify-between">
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, idx) => (
          <div 
            key={idx}
            className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${activeDay === idx ? 'bg-accent text-background scale-110 shadow-lg shadow-accent/20' : 'bg-dark/5 text-dark/40'}`}
          >
            {day}
          </div>
        ))}
      </div>
      <div className="mt-4">
        <div className="font-mono text-[10px] uppercase tracking-widest text-dark/40 mb-1">Achievement Log</div>
        <div className="font-heading font-bold text-sm text-dark truncate">
          {achievements[activeDay]}
        </div>
      </div>
      <div className="absolute top-10 left-1/2 -translate-x-1/2 pointer-events-none opacity-20">
        <MousePointer2 className="text-accent animate-bounce" size={24} />
      </div>
    </div>
  );
};

// --- Main Application ---

const App = () => {
  const mainRef = useRef(null);
  const heroRef = useRef(null);
  const navbarRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Navbar Morphing
      ScrollTrigger.create({
        start: 'top -80px',
        onUpdate: (self) => {
          if (self.direction === 1) {
            gsap.to(navbarRef.current, { 
              y: -10, 
              scale: 0.98, 
              backgroundColor: 'rgba(242, 240, 233, 0.8)',
              borderColor: 'rgba(26, 26, 26, 0.1)',
              duration: 0.4 
            });
          } else {
            gsap.to(navbarRef.current, { 
              y: 0, 
              scale: 1, 
              backgroundColor: 'rgba(242, 240, 233, 0)',
              borderColor: 'rgba(26, 26, 26, 0)',
              duration: 0.4 
            });
          }
        }
      });

      // Hero Animation
      gsap.from('.hero-content > *', {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: 'power3.out'
      });

      // Philosophy Reveal
      gsap.from('.phi-text', {
        scrollTrigger: {
          trigger: '.phi-section',
          start: 'top 70%',
        },
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: 'power2.out'
      });

      // Project Cards Stagger
      gsap.from('.project-card', {
        scrollTrigger: {
          trigger: '.projects-section',
          start: 'top 60%',
        },
        y: 100,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out'
      });

      // Protocol Stacking Logic
      const protocolCards = gsap.utils.toArray('.protocol-card');
      protocolCards.forEach((card, i) => {
        if (i === protocolCards.length - 1) return;
        
        ScrollTrigger.create({
          trigger: card,
          start: 'top top',
          pin: true,
          pinSpacing: false,
          end: 'bottom top',
          onEnter: () => {
             gsap.to(card, { scale: 0.9, filter: 'blur(20px)', opacity: 0.5, duration: 0.6 });
          },
          onLeaveBack: () => {
             gsap.to(card, { scale: 1, filter: 'blur(0px)', opacity: 1, duration: 0.6 });
          }
        });
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="relative selection:bg-accent selection:text-background">
      
      {/* NAVBAR */}
      <nav 
        ref={navbarRef}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-4xl px-8 py-4 flex items-center justify-between rounded-full border border-transparent transition-all duration-500 backdrop-blur-md"
      >
        <div className="font-heading font-black tracking-tighter text-2xl text-primary">ML</div>
        
        <div className="hidden md:flex items-center gap-8 font-heading text-sm font-semibold text-dark/70">
          <a href="#about" className="hover-lift hover:text-primary transition-colors uppercase tracking-widest text-[10px]">About</a>
          <a href="#projects" className="hover-lift hover:text-primary transition-colors uppercase tracking-widest text-[10px]">Projects</a>
          <a href="#protocol" className="hover-lift hover:text-primary transition-colors uppercase tracking-widest text-[10px]">Process</a>
          <a href="#contact" className="hover-lift hover:text-primary transition-colors uppercase tracking-widest text-[10px]">Contact</a>
        </div>

        <button className="magnetic-button group bg-primary px-6 py-2 rounded-full overflow-hidden">
          <span className="btn-slide-bg" />
          <span className="relative z-10 font-heading text-[10px] font-bold uppercase tracking-widest text-background">Email Me</span>
        </button>
      </nav>

      {/* HERO SECTION */}
      <section className="relative h-[100dvh] flex items-end overflow-hidden p-8 md:p-16">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center grayscale contrast-[1.1]" 
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=2070&auto=format&fit=crop')` }}
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-dark via-dark/40 to-transparent" />
        
        <div className="relative z-20 hero-content text-background max-w-5xl">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-6">
            // 11TH GRADE · CS APPLICANT · CLASS OF 2026
          </div>
          <h1 className="font-heading font-extrabold text-7xl md:text-[10rem] leading-[0.85] tracking-tighter mb-8">
            Vibe coder who <br />
            <span className="font-drama italic font-light text-accent ml-[10vw]">builds.</span>
          </h1>
          <button className="magnetic-button group bg-accent px-10 py-4 rounded-full mt-8">
            <span className="btn-slide-bg bg-primary" />
            <span className="relative z-10 font-heading text-sm font-bold uppercase tracking-widest">Explore Systems</span>
          </button>
        </div>
      </section>

      {/* SIGNAL STRIP (ABOUT) */}
      <section id="about" className="py-24 px-8 md:px-24 bg-background">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
          <div className="flex flex-col gap-4">
            <h3 className="font-heading font-bold text-2xl tracking-tight">Skill Shuffler</h3>
            <p className="text-dark/60 text-sm mb-4">A high-frequency rotation of my current technical stack and expertise domains.</p>
            <SkillShuffler />
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="font-heading font-bold text-2xl tracking-tight">Activity Telemetry</h3>
            <p className="text-dark/60 text-sm mb-4">Real-time status updates from my local development environment and study logs.</p>
            <ActivityTelemetry />
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="font-heading font-bold text-2xl tracking-tight">Achievements</h3>
            <p className="text-dark/60 text-sm mb-4">A weekly scheduler mapping milestones and accomplishments across my CS journey.</p>
            <AchievementsScheduler />
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="phi-section relative py-48 px-8 md:px-24 bg-dark text-background overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20 parallax z-0"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1974&auto=format&fit=crop')`,
            backgroundSize: 'cover'
          }}
        />
        <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center text-center">
          <div className="phi-text font-heading text-xl md:text-2xl text-dark/40 mb-4 tracking-tight uppercase">
            Most students learn to code.
          </div>
          <div className="phi-text font-drama italic text-5xl md:text-9xl leading-tight">
            I build things <span className="text-accent">people use.</span>
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="projects-section py-32 px-8 md:px-24 bg-background border-t border-dark/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent mb-4">// SELECTED WORK</div>
              <h2 className="text-7xl font-heading font-black tracking-tighter">Projects.</h2>
            </div>
            <div className="font-mono text-sm text-dark/40 tracking-tighter uppercase">
              // 0{PROJECTS.length} SHIPPED · 2024 - 2026
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
            {PROJECTS.map((project, idx) => (
              <div 
                key={project.title} 
                className={`project-card group relative ${idx % 2 !== 0 ? 'md:translate-y-20' : ''}`}
              >
                <div className="aspect-video w-full bg-dark/5 rounded-[2.5rem] mb-8 overflow-hidden relative border border-dark/5 shadow-sm group-hover:border-accent/30 transition-colors">
                  {/* Procedural Visual (Simplified for MVP, would use Canvas in production) */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-40 mix-blend-multiply transition-transform duration-700 group-hover:scale-110">
                    {idx % 3 === 0 && <Cpu className="text-primary" size={120} />}
                    {idx % 3 === 1 && <Brain className="text-accent" size={120} />}
                    {idx % 3 === 2 && <Layers className="text-dark" size={120} />}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                <div className="flex items-start justify-between gap-4 mb-4">
                  <span className="font-mono text-[10px] text-accent tracking-widest">// 0{idx + 1}</span>
                  <div className="flex gap-2">
                    {project.tech.map(t => (
                      <span key={t} className="font-mono text-[9px] uppercase border border-dark/10 px-2 py-1 rounded-full text-dark/50">{t}</span>
                    ))}
                  </div>
                </div>
                
                <h3 className="font-heading font-black text-4xl mb-4 group-hover:text-accent transition-colors">{project.title}</h3>
                <p className="text-dark/60 leading-relaxed mb-8 max-w-lg">{project.description}</p>
                
                <div className="flex gap-6">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-heading font-bold text-xs uppercase tracking-widest hover:text-accent transition-colors">
                    <GithubIcon size={14} /> Github
                  </a>
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-heading font-bold text-xs uppercase tracking-widest hover:text-accent transition-colors">
                    <ExternalLink size={14} /> Demo
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROTOCOL (STACKING) */}
      <section id="protocol" className="relative py-0 bg-dark">
        <div className="protocol-card min-h-screen w-full bg-primary flex items-center justify-center p-8 md:p-24 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-7xl mx-auto items-center">
            <div className="text-background">
              <span className="font-mono text-xs uppercase tracking-widest text-accent mb-4 block">01 — Phase One</span>
              <h2 className="text-6xl font-heading font-black mb-8 leading-[0.9]">Research Deeply.</h2>
              <p className="text-background/60 text-lg max-w-md">I believe in first principles thinking. Before touching a single line of code, I immerse myself in documentation, papers, and system design.</p>
            </div>
            <div className="aspect-square bg-background/5 rounded-full border border-background/10 flex items-center justify-center animate-pulse">
               <Activity className="text-accent" size={200} />
            </div>
          </div>
        </div>
        
        <div className="protocol-card min-h-screen w-full bg-[#1e2a23] flex items-center justify-center p-8 md:p-24 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-7xl mx-auto items-center">
            <div className="text-background">
              <span className="font-mono text-xs uppercase tracking-widest text-accent mb-4 block">02 — Phase Two</span>
              <h2 className="text-6xl font-heading font-black mb-8 leading-[0.9]">Prototype Fast.</h2>
              <p className="text-background/60 text-lg max-w-md">Speed is a signal of intent. I build functional skeletons rapidly to test constraints and discover unexpected edge cases.</p>
            </div>
            <div className="aspect-square bg-background/5 rounded-full border border-background/10 flex items-center justify-center">
               <Terminal className="text-accent animate-pulse" size={200} />
            </div>
          </div>
        </div>

        <div className="protocol-card min-h-screen w-full bg-dark flex items-center justify-center p-8 md:p-24 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-7xl mx-auto items-center">
            <div className="text-background">
              <span className="font-mono text-xs uppercase tracking-widest text-accent mb-4 block">03 — Phase Three</span>
              <h2 className="text-6xl font-heading font-black mb-8 leading-[0.9]">Ship and Iterate.</h2>
              <p className="text-background/60 text-lg max-w-md">A system is never truly finished. I deploy early and use real-world telemetry to polish performance and refine the experience.</p>
            </div>
            <div className="aspect-square bg-background/5 rounded-full border border-background/10 flex items-center justify-center">
               <Code2 className="text-accent" size={200} />
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="py-24 px-8 md:px-24 bg-background">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-background border border-dark/10 p-10 rounded-[2rem] flex flex-col items-center justify-center text-center">
            <span className="font-mono text-[10px] text-dark/40 uppercase tracking-widest mb-2">GPA (Unweighted)</span>
            <div className="text-5xl font-heading font-black">4.0</div>
          </div>
          <div className="bg-background border border-dark/10 p-10 rounded-[2rem] flex flex-col items-center justify-center text-center">
            <span className="font-mono text-[10px] text-dark/40 uppercase tracking-widest mb-2">SAT / ACT</span>
            <div className="text-5xl font-heading font-black">1550</div>
          </div>
          <div className="bg-background border border-dark/10 p-10 rounded-[2rem] flex flex-col items-center justify-center text-center">
            <span className="font-mono text-[10px] text-dark/40 uppercase tracking-widest mb-2">Projects Shipped</span>
            <div className="text-5xl font-heading font-black">08</div>
          </div>
          <div className="bg-background border border-dark/10 p-10 rounded-[2rem] flex flex-col items-center justify-center text-center">
            <span className="font-mono text-[10px] text-dark/40 uppercase tracking-widest mb-2">Languages</span>
            <div className="text-5xl font-heading font-black">06</div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-48 px-8 md:px-24 bg-background text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-drama italic text-7xl md:text-[9rem] leading-none mb-12">Let's talk.</h2>
          <a 
            href="mailto:matt@example.com" 
            className="magnetic-button group bg-primary px-16 py-8 rounded-full mb-16 inline-block"
          >
            <span className="btn-slide-bg bg-accent" />
            <span className="relative z-10 font-heading text-2xl font-bold uppercase tracking-[0.2em] text-background">Email Me</span>
          </a>
          
          <div className="flex justify-center gap-12 font-mono text-[10px] uppercase tracking-widest text-dark/40">
            <a href="https://github.com/Matthew-Lam0704" className="hover-lift hover:text-accent transition-colors">GitHub</a>
            <a href="#" className="hover-lift hover:text-accent transition-colors">LinkedIn</a>
            <a href="#" className="hover-lift hover:text-accent transition-colors">Twitter / X</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-dark text-background rounded-t-[4rem] px-8 md:px-24 pt-32 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 mb-32">
            <div>
              <div className="font-heading font-black text-4xl mb-4">Matthew Lam</div>
              <p className="text-background/40 max-w-xs font-mono text-xs uppercase tracking-widest leading-loose">
                Passionate vibe coder building websites and projects. Aiming for MIT / Stanford Class of 2030.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-12 font-mono text-[10px] uppercase tracking-[0.2em]">
              <div className="flex flex-col gap-6">
                <div className="text-accent mb-2 tracking-[0.5em]">Navigation</div>
                <a href="#about" className="hover:text-accent transition-colors">About</a>
                <a href="#projects" className="hover:text-accent transition-colors">Projects</a>
                <a href="#protocol" className="hover:text-accent transition-colors">Protocol</a>
              </div>
              <div className="flex flex-col gap-6">
                <div className="text-accent mb-2 tracking-[0.5em]">Resources</div>
                <a href="#" className="hover:text-accent transition-colors">Resume</a>
                <a href="#" className="hover:text-accent transition-colors">Transcript</a>
                <a href="#" className="hover:text-accent transition-colors">Writing</a>
              </div>
            </div>
          </div>
          
          <div className="pt-16 border-t border-background/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-[#00FF00] animate-pulse shadow-[0_0_10px_#00FF00]" />
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-background/40">
                // System Operational · Available for Internships · Summer 2026
              </span>
            </div>
            <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-background/20">
              &copy; 2026 Matthew Lam · Built with Vibe
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

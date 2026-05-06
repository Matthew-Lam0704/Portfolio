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
        
        <div className="relative z-20 hero-content text-background w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-3xl">
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-6">
              // SHREWSBURY SCHOOL · CLASS OF 2027
            </div>
            <h1 className="font-heading font-extrabold text-7xl md:text-[8rem] leading-[0.85] tracking-tighter mb-8">
              Hi, I am <br />
              <span className="font-drama italic font-light text-accent ml-[5vw]">Matthew Lam.</span>
            </h1>
          </div>
          <div className="w-full md:w-1/3 aspect-[3/4] rounded-[2.5rem] overflow-hidden border border-background/20 relative shrink-0">
             <img src="/matthew.jpg" alt="Matthew Lam" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>



      {/* EDUCATION */}
      <section id="education" className="phi-section relative py-32 px-8 md:px-24 bg-dark text-background overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent mb-16">// EDUCATION</div>
          
          <div className="flex flex-col gap-24">
            {/* School 1 */}
            <div className="phi-text flex flex-col md:flex-row items-center gap-12 group">
              <div className="w-full md:w-5/12 aspect-video rounded-[2rem] overflow-hidden border border-background/10">
                <img src="/po-leung-kuk.jpg" alt="Po Leung Kuk Choi Kai Yau School" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
              </div>
              <div className="w-full md:w-7/12 flex flex-col">
                <h3 className="font-heading font-black text-4xl md:text-5xl mb-2">Po Leung Kuk Choi Kai Yau School</h3>
                <div className="font-mono text-xs uppercase tracking-widest text-accent mb-6">Sep. 2015 — Jun. 2025 · Hong Kong</div>
                <div className="text-background/70 text-lg leading-relaxed mb-6 space-y-4">
                  <p><strong>CIE IGCSEs:</strong></p>
                  <ul className="list-none space-y-2">
                    <li className="flex items-start gap-4"><span className="text-accent font-bold min-w-[2ch]">A*</span> <span>Chemistry, Economics, International Mathematics, Additional Mathematics</span></li>
                    <li className="flex items-start gap-4"><span className="text-accent font-bold min-w-[2ch]">A</span> <span>English, Global Perspectives, Physics, Biology, Geography</span></li>
                    <li className="flex items-start gap-4"><span className="text-accent font-bold min-w-[2ch]">B</span> <span>Chinese</span></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* School 2 */}
            <div className="phi-text flex flex-col md:flex-row items-center gap-12 group">
              <div className="w-full md:w-5/12 aspect-video rounded-[2rem] overflow-hidden border border-background/10">
                <img src="/shrewsbury.jpg" alt="Shrewsbury School" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
              </div>
              <div className="w-full md:w-7/12 flex flex-col">
                <h3 className="font-heading font-black text-4xl md:text-5xl mb-2">Shrewsbury School</h3>
                <div className="font-mono text-xs uppercase tracking-widest text-accent mb-6">Aug. 2025 — Jun. 2027 · Shrewsbury, UK</div>
                <p className="text-background/70 text-lg leading-relaxed">
                  Currently pursuing A-Levels. Predicted grades pending.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* PROJECTS (STACKING) */}
      <section id="projects" className="relative py-0 bg-dark">
        {PROJECTS.map((project, idx) => {
          const bgColors = ['bg-primary', 'bg-[#1e2a23]', 'bg-dark'];
          const Icons = [Cpu, Brain, Layers];
          const Icon = Icons[idx % Icons.length];
          
          return (
            <div 
              key={project.title}
              className={`protocol-card min-h-screen w-full ${bgColors[idx % bgColors.length]} flex items-center justify-center p-8 md:p-24 overflow-hidden border-t border-background/5`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-7xl mx-auto items-center">
                <div className="text-background">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="font-mono text-xs uppercase tracking-widest text-accent">Project 0{idx + 1}</span>
                    <div className="flex gap-2">
                      {project.tech.map(t => (
                        <span key={t} className="font-mono text-[8px] uppercase border border-background/20 px-2 py-0.5 rounded-full text-background/40">{t}</span>
                      ))}
                    </div>
                  </div>
                  
                  <h2 className="text-6xl md:text-8xl font-heading font-black mb-8 leading-[0.9] tracking-tighter">
                    {project.title}.
                  </h2>
                  
                  <p className="text-background/60 text-lg md:text-xl max-w-md mb-12 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex gap-8">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="group/link flex items-center gap-3 font-heading font-bold text-xs uppercase tracking-[0.2em] text-accent hover:text-background transition-colors">
                      <GithubIcon size={18} /> 
                      <span className="border-b border-accent/30 group-hover/link:border-background transition-colors pb-1">Source Code</span>
                    </a>
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="group/link flex items-center gap-3 font-heading font-bold text-xs uppercase tracking-[0.2em] text-accent hover:text-background transition-colors">
                      <ExternalLink size={18} /> 
                      <span className="border-b border-accent/30 group-hover/link:border-background transition-colors pb-1">Live Demo</span>
                    </a>
                  </div>
                </div>
                
                <div className="relative aspect-square bg-background/5 rounded-[3rem] border border-background/10 flex items-center justify-center group overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                   <Icon className="text-accent/20 group-hover:text-accent/40 transition-all duration-700 group-hover:scale-110 group-hover:rotate-12" size={240} />
                   
                   {/* Decorative elements */}
                   <div className="absolute top-8 right-8 font-mono text-[10px] text-background/20 uppercase tracking-[0.3em] vertical-text">
                     // SYSTEM DATA 0{idx + 1}
                   </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* STATS STRIP */}
      <section className="py-24 px-8 md:px-24 bg-background">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-background border border-dark/10 p-10 rounded-[2rem] flex flex-col items-center justify-center text-center">
            <span className="font-mono text-[10px] text-dark/40 uppercase tracking-widest mb-2">A-Levels</span>
            <div className="text-5xl font-heading font-black">TBD</div>
          </div>
          <div className="bg-background border border-dark/10 p-10 rounded-[2rem] flex flex-col items-center justify-center text-center">
            <span className="font-mono text-[10px] text-dark/40 uppercase tracking-widest mb-2">SAT Score</span>
            <div className="text-5xl font-heading font-black">1440</div>
          </div>
          <div className="bg-background border border-dark/10 p-10 rounded-[2rem] flex flex-col items-center justify-center text-center">
            <span className="font-mono text-[10px] text-dark/40 uppercase tracking-widest mb-2">Projects Shipped</span>
            <div className="text-5xl font-heading font-black">00</div>
          </div>
          <div className="bg-background border border-dark/10 p-10 rounded-[2rem] flex flex-col items-center justify-center text-center">
            <span className="font-mono text-[10px] text-dark/40 uppercase tracking-widest mb-2">Languages</span>
            <div className="text-5xl font-heading font-black">03</div>
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
                Passionate vibe coder building websites and projects. Shrewsbury School Class of 2027.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-12 font-mono text-[10px] uppercase tracking-[0.2em]">
              <div className="flex flex-col gap-6">
                <div className="text-accent mb-2 tracking-[0.5em]">Navigation</div>
                <a href="#about" className="hover:text-accent transition-colors">About</a>
                <a href="#projects" className="hover:text-accent transition-colors">Projects</a>
                <a href="#contact" className="hover:text-accent transition-colors">Contact</a>
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

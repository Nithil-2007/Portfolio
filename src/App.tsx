import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, ExternalLink, Instagram, Linkedin, Palette, Zap, Layout, Sparkles, X, MapPin, Calendar, User } from 'lucide-react';
import { useState, useEffect } from 'react';

const works = [
  {
    id: 1,
    title: "Adobe Illustrator Workshop",
    category: "Event Poster",
    description: "Official workshop identity for Rajalakshmi Engineering College x Designix. 'Step in curious, walk out smarter.'",
    image: "/workshop.png", 
    span: "col-span-1",
    details: {
      date: "9th May, 2025",
      location: "Idea Factory",
      client: "REC x Designix"
    }
  },
  {
    id: 2,
    title: "GYM Launch",
    category: "Commercial Poster",
    description: "Launch campaign for the new Rajalakshmi Engineering College gym facility.",
    image: "/gym.png", 
    span: "col-span-1",
    details: {
      date: "20th April, 2026",
      client: "Rajalakshmi Engineering College"
    }
  }
];

function CreativeSpark() {
  const [tip, setTip] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getTip = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/inspire');
      const data = await res.json();
      setTip(data.tip);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTip();
  }, []);

  return (
    <div className="p-8 border border-zinc-800 rounded-3xl bg-zinc-950/50 backdrop-blur-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-orange-600 rounded-lg">
          <Sparkles size={20} className="text-white" />
        </div>
        <h4 className="font-display font-bold text-xl uppercase tracking-tight">AI CREATIVE SPARK</h4>
      </div>
      <div className="min-h-[80px]">
        {loading ? (
          <div className="animate-pulse flex space-y-4 flex-col">
            <div className="h-4 bg-zinc-800 rounded w-full"></div>
            <div className="h-4 bg-zinc-800 rounded w-3/4"></div>
          </div>
        ) : (
          <p className="text-zinc-400 italic text-lg leading-relaxed">{tip || "The best design is the one that solves the problem simplest."}</p>
        )}
      </div>
      <button 
        onClick={getTip}
        disabled={loading}
        className="mt-8 text-xs font-mono uppercase tracking-widest text-orange-500 hover:text-white transition-colors flex items-center gap-2 group"
      >
        REGENERATE {loading ? "..." : <Zap size={10} className="group-hover:animate-bounce" />}
      </button>
    </div>
  );
}

export default function App() {
  const [selectedWork, setSelectedWork] = useState<typeof works[0] | null>(null);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (selectedWork) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedWork]);

  return (
    <div className="min-h-screen selection:bg-white selection:text-black">
      {/* Modal */}
      <AnimatePresence>
        {selectedWork && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedWork(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-6xl max-h-full overflow-hidden bg-zinc-950 border border-zinc-800 rounded-3xl grid grid-cols-1 lg:grid-cols-2"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedWork(null)}
                className="absolute top-6 right-6 z-10 p-2 bg-black/50 hover:bg-white hover:text-black transition-all rounded-full"
              >
                <X size={24} />
              </button>

              <div className="h-[40vh] lg:h-full bg-zinc-900 overflow-hidden">
                <img 
                  src={selectedWork.image} 
                  alt={selectedWork.title}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://placehold.co/800x1200/1a1a1a/orange?text=' + encodeURIComponent(selectedWork.title);
                  }}
                />
              </div>

              <div className="p-8 md:p-16 overflow-y-auto">
                <span className="font-mono text-xs text-orange-500 uppercase tracking-widest mb-4 inline-block">
                  {selectedWork.category}
                </span>
                <h2 className="text-4xl md:text-6xl font-display font-bold leading-tight mb-8">
                  {selectedWork.title}
                </h2>
                
                <p className="text-xl text-zinc-400 mb-12 leading-relaxed italic">
                  {selectedWork.description}
                </p>

                <div className="space-y-6 pt-12 border-t border-zinc-800">
                   <div className="flex items-center gap-4 text-sm font-mono uppercase tracking-widest text-zinc-500">
                     <Calendar size={16} className="text-orange-500" />
                     <span>Date: {selectedWork.details.date}</span>
                   </div>
                   <div className="flex items-center gap-4 text-sm font-mono uppercase tracking-widest text-zinc-500">
                     <User size={16} className="text-orange-500" />
                     <span>Client: {selectedWork.details.client}</span>
                   </div>
                   {selectedWork.details.location && (
                     <div className="flex items-center gap-4 text-sm font-mono uppercase tracking-widest text-zinc-500">
                       <MapPin size={16} className="text-orange-500" />
                       <span>Location: {selectedWork.details.location}</span>
                     </div>
                   )}
                </div>

                <div className="mt-12">
                   {selectedWork.id !== 2 && (
                     <button className="px-10 py-5 bg-orange-600 hover:bg-orange-700 text-white rounded-full font-bold transition-all flex items-center gap-3">
                       Launch Project <ExternalLink size={18} />
                     </button>
                   )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 p-6 flex justify-between items-center mix-blend-difference">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-display font-bold tracking-tighter"
        >
          Nithil Matthew
        </motion.div>
        <div className="flex gap-8 text-xs uppercase tracking-widest font-medium text-white">
          <a href="#works" className="hover:opacity-50 transition-opacity">Works</a>
          <a href="#about" className="hover:opacity-50 transition-opacity">About</a>
          <a href="#contact" className="hover:opacity-50 transition-opacity">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center px-6 lg:px-24 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
           <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-600 rounded-full blur-[120px] animate-pulse" />
           <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[120px] animate-pulse delay-700" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10"
        >
          <h2 className="font-mono text-sm uppercase tracking-[0.3em] text-orange-500 mb-4 flex items-center gap-3">
            <Zap size={14} /> Multi-Disciplinary Graphic Designer
          </h2>
          <h1 className="text-[12vw] lg:text-[10vw] font-display font-bold leading-[0.85] tracking-tighter mb-8 italic">
            CRAFTING <br />
            <span className="text-stroke text-stroke-hover">VISUAL</span> <br />
            EXPERIENCE.
          </h1>
          <p className="max-w-md font-sans text-gray-400 text-lg leading-relaxed">
            Specializing in high-impact posters, logos, and identity systems that bridge the gap between art and utility.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 flex gap-4"
        >
          <a href="#works" className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300">
            View My Work
          </a>
        </motion.div>
      </section>

      {/* Works Gallery */}
      <section id="works" className="py-24 px-6 lg:px-24">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h3 className="text-5xl font-display font-bold tracking-tight mb-2">SELECTED WORKS</h3>
            <p className="font-mono text-xs uppercase tracking-widest text-gray-500">2023 — PRES</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl">
          {works.map((work, index) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedWork(work)}
              className={`relative group overflow-hidden rounded-2xl bg-zinc-900 cursor-pointer ${work.span}`}
            >
              <img 
                src={work.image} 
                alt={work.title} 
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://placehold.co/800x1200/1a1a1a/orange?text=' + encodeURIComponent(work.title + '\n(Please upload ' + work.image.split("/").pop() + ')');
                }}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8 text-white">
                <span className="font-mono text-xs text-orange-500 uppercase tracking-widest mb-2">{work.category}</span>
                <h4 className="text-2xl font-display font-bold">{work.title}</h4>
                <div className="mt-4 flex items-center gap-2 text-xs font-semibold uppercase opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  View Project <ExternalLink size={12} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 lg:px-24 bg-zinc-950 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative">
             <div className="aspect-[4/5] bg-zinc-900 rounded-3xl overflow-hidden">
                <img 
                  src="https://picsum.photos/seed/nithil/800/1000" 
                  alt="Nithil Matthew" 
                  className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
             </div>
             <div className="absolute -bottom-8 -right-8 p-12 bg-orange-600 rounded-full font-display font-bold text-4xl -rotate-12">
               CREATIVE
             </div>
          </div>
          <div>
            <h3 className="text-6xl font-display font-bold tracking-tight mb-8">HELLO. I'M NITHIL.</h3>
            <p className="text-xl text-zinc-400 mb-8 leading-relaxed">
              Based at Rajalakshmi Engineering College, I focus on creating visual identities that speak louder than words. My work is a blend of precision and chaos, aiming to capture attention in today's fast-paced digital world.
            </p>
            <div className="grid grid-cols-2 gap-8 mb-12">
              <div>
                <div className="flex items-center gap-2 font-bold mb-4 text-orange-500">
                  <Layout size={18} /> SERVICES
                </div>
                <ul className="space-y-2 text-zinc-300 font-mono text-sm uppercase">
                  <li>Poster Design</li>
                  <li>Logo & Branding</li>
                  <li>UI/UX Design</li>
                  <li>Identity Systems</li>
                </ul>
              </div>
              <div>
                <div className="flex items-center gap-2 font-bold mb-4 text-blue-500">
                  <Zap size={18} /> TOOLS
                </div>
                <ul className="space-y-2 text-zinc-300 font-mono text-sm uppercase">
                  <li>Adobe Illustrator</li>
                  <li>Adobe Photoshop</li>
                </ul>
              </div>
            </div>
            <CreativeSpark />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 lg:px-24 border-t border-zinc-900 text-white">
        <div className="text-center mb-16">
          <h3 className="text-7xl lg:text-9xl font-display font-bold tracking-tighter mb-8 italic">LET'S WORK.</h3>
          <p className="text-zinc-400 max-w-xl mx-auto italic">
            Currently accepting new projects and remote collaborations. 
            Reach out if you want to build something extraordinary.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.a 
            whileHover={{ scale: 1.02 }}
            href="mailto:nithilmatthew49@gmail.com" 
            className="p-12 bg-zinc-900 rounded-3xl flex flex-col justify-between group hover:bg-orange-600 transition-colors duration-500"
          >
            <Mail size={40} className="mb-12 group-hover:text-white text-orange-600 transition-colors" />
            <div>
              <p className="font-mono text-xs uppercase tracking-widest mb-2 text-zinc-500 group-hover:text-white/70">Email me at</p>
              <h4 className="text-2xl md:text-3xl font-display font-medium break-all">nithilmatthew49@gmail.com</h4>
            </div>
          </motion.a>
          
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="p-12 bg-zinc-900 rounded-3xl flex flex-col justify-between group hover:bg-blue-600 transition-colors duration-500 relative"
          >
            <Phone size={40} className="mb-12 group-hover:text-white text-blue-600 transition-colors" />
            <div>
              <p className="font-mono text-xs uppercase tracking-widest mb-2 text-zinc-500 group-hover:text-white/70">Call me at</p>
              <h4 className="text-2xl md:text-3xl font-display font-medium">+91 8610355471</h4>
            </div>
            <a 
              href="tel:8610355471" 
              className="absolute inset-0 z-0"
              aria-label="Call Nithil"
            />
          </motion.div>
        </div>

        <div className="mt-24 pt-8 border-t border-zinc-900 flex flex-col md:flex-row gap-8 justify-between items-center text-xs text-zinc-600 font-mono uppercase tracking-[0.2em]">
          <div>© 2024 NITHIL MATTHEW. ALL RIGHTS RESERVED.</div>
          <div className="flex gap-8">
            <a href="https://www.instagram.com/n.i.t.h.i.l_07/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
            <a href="https://www.linkedin.com/in/nithil-matthew-26a44b3b0/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </section>
    </div>
  );
}

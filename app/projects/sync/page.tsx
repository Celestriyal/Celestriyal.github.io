'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import SectionContainer from '@/components/SectionContainer';

// --- Utility Components ---

// 1. 3D Tilt Card
function TiltCard({ children, className, onClick, layoutId }: any) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }: any) => {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left - width / 2);
    mouseY.set(clientY - top - height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [4, -4]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-4, 4]), { stiffness: 100, damping: 30 });
  const scale = useSpring(useTransform(mouseX, [-300, 300], [1, 1.02]), { stiffness: 100, damping: 30 });

  return (
    <motion.div
      className={`relative perspective-1000 cursor-zoom-in ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      layoutId={layoutId}
      whileHover={{ zIndex: 20 }}
    >
      <motion.div
        style={{ rotateX, rotateY, scale, transformStyle: "preserve-3d" }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

// 2. Background Grid Pattern
function BackgroundGrid() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute inset-0 bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_70%)]" />
      
      {/* Added more background elements */}
      <div className="absolute top-1/4 left-10 w-px h-32 bg-gradient-to-b from-transparent via-[#50C878]/30 to-transparent" />
      <div className="absolute bottom-1/3 right-20 w-32 h-px bg-gradient-to-r from-transparent via-[#50C878]/30 to-transparent" />
      <div className="absolute top-10 right-1/4 w-2 h-2 rounded-full bg-[#50C878]/20 animate-pulse" />
    </div>
  );
}

// 3. Floating Notification (Darker Theme)
function FloatingNotification({ text, icon, delay = 0, x = 0, y = 0 }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.8, type: "spring" }}
      className="absolute z-20 flex items-center gap-3 px-4 py-3 bg-[#121212]/90 backdrop-blur-xl border border-[#50C878]/20 rounded-2xl shadow-2xl"
      style={{ left: x, top: y }}
    >
      <div className="w-8 h-8 rounded-full bg-[#50C878]/10 flex items-center justify-center text-[#50C878]">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-xs text-zinc-200 font-medium">{text}</span>
        <span className="text-[10px] text-zinc-500">Just now</span>
      </div>
    </motion.div>
  );
}

// 4. Code Snippet
function CodeSnippet({ className }: any) {
    return (
        <div className={`absolute p-4 rounded-xl bg-[#0F0F0F] border border-white/5 font-mono text-[10px] leading-relaxed text-zinc-500 shadow-2xl ${className}`}>
            <div className="flex gap-1.5 mb-2">
                <div className="w-2 h-2 rounded-full bg-red-500/20" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/20" />
                <div className="w-2 h-2 rounded-full bg-green-500/20" />
            </div>
            <p><span className="text-purple-400">data</span> class <span className="text-yellow-200">User</span>(</p>
            <p className="pl-2"><span className="text-blue-400">val</span> uid: <span className="text-[#50C878]">String</span>,</p>
            <p className="pl-2"><span className="text-blue-400">val</span> role: <span className="text-[#50C878]">Role</span> = <span className="text-orange-400">STUDENT</span></p>
            <p>)</p>
        </div>
    )
}

// 5. Infinite Tech Marquee
function InfiniteMarquee() {
    const techs = ["Kotlin", "Firebase", "Room DB", "Coroutines", "Flow", "Hilt", "Retrofit", "Jetpack", "Material You", "Git"];
    return (
        <div className="relative w-full overflow-hidden py-10 bg-[#0A0A0A] border-y border-white/5 backdrop-blur-sm">
            <motion.div 
                className="flex gap-16 whitespace-nowrap"
                animate={{ x: [0, -1000] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
                {[...techs, ...techs, ...techs].map((tech, i) => (
                    <span key={i} className="text-2xl md:text-4xl font-bold text-zinc-800 uppercase tracking-widest hover:text-[#50C878] transition-colors cursor-default">
                        {tech}
                    </span>
                ))}
            </motion.div>
        </div>
    );
}

// 6. Interactive Performance Mode Demo (Darker Theme)
function PerformanceDemo() {
    const [isPerformanceMode, setIsPerformanceMode] = useState(false);

    return (
        <div className="w-full p-8 rounded-3xl border border-white/10 bg-[#080808] relative overflow-hidden group">
            {/* Darker, subtler background */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay" />
            
            <div className="relative z-10 flex flex-col items-center justify-center min-h-[400px] gap-8">
                
                {/* Background Content to show off blur */}
                <div className="absolute inset-0 flex flex-col gap-4 p-8 pt-20 opacity-50 select-none pointer-events-none">
                    <div className="flex justify-start"><div className="bg-[#1A1A1A] p-3 rounded-xl rounded-tl-none max-w-xs text-xs text-zinc-500">Hey, is the server down?</div></div>
                    <div className="flex justify-end"><div className="bg-[#50C878]/20 p-3 rounded-xl rounded-tr-none max-w-xs text-xs text-[#50C878]">No, just maintenance. Check the announcements.</div></div>
                    <div className="flex justify-start"><div className="bg-[#1A1A1A] p-3 rounded-xl rounded-tl-none max-w-xs text-xs text-zinc-500">Oh cool. Will do.</div></div>
                    <div className="space-y-2 mt-4">
                        <div className="h-2 w-3/4 bg-white/5 rounded-full" />
                        <div className="h-2 w-1/2 bg-white/5 rounded-full" />
                        <div className="h-2 w-full bg-white/5 rounded-full" />
                    </div>
                </div>

                {/* The UI Card changing based on mode */}
                <motion.div 
                    animate={{ 
                        backdropFilter: isPerformanceMode ? "blur(0px)" : "blur(12px)",
                        backgroundColor: isPerformanceMode ? "#111" : "rgba(20, 20, 20, 0.6)",
                        borderColor: isPerformanceMode ? "#333" : "rgba(80, 200, 120, 0.2)"
                    }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-sm p-6 rounded-2xl border shadow-2xl"
                >
                    <div className="h-4 w-1/3 bg-white/10 rounded-full mb-4" />
                    <div className="space-y-3">
                        <div className="h-2 w-full bg-white/5 rounded-full" />
                        <div className="h-2 w-5/6 bg-white/5 rounded-full" />
                    </div>
                    <div className="mt-6 flex justify-between items-center">
                        <div className="h-8 w-8 rounded-full bg-[#50C878]/10" />
                        <div className="px-4 py-1.5 rounded-full bg-white/5 text-[10px] text-zinc-500 border border-white/5">
                            {isPerformanceMode ? "Solid Surface" : "Glassmorphism"}
                        </div>
                    </div>
                </motion.div>

                {/* Toggle Control */}
                <div className="flex flex-col items-center gap-3">
                    <button 
                        onClick={() => setIsPerformanceMode(!isPerformanceMode)}
                        className={`relative w-16 h-8 rounded-full transition-colors duration-300 ${isPerformanceMode ? 'bg-[#50C878]' : 'bg-zinc-800'}`}
                    >
                        <motion.div 
                            animate={{ x: isPerformanceMode ? 32 : 4 }}
                            className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-md"
                        />
                    </button>
                    <p className="text-sm font-mono text-zinc-500">
                        PERFORMANCE MODE: <span className={isPerformanceMode ? "text-[#50C878]" : "text-zinc-300"}>{isPerformanceMode ? "ON" : "OFF"}</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

// 7. Simulated Chat Feed
function SimulatedChat() {
    const messages = [
        { id: 1, text: "Hey! Did you check the new timetable?", sender: "them", delay: 0 },
        { id: 2, text: "Yeah, looking good. We have a free slot on Friday!", sender: "me", delay: 1.5 },
        { id: 3, text: "Awesome. Btw, uploaded the assignment?", sender: "them", delay: 3 },
        { id: 4, text: "Just did. Syncing is super fast now 🚀", sender: "me", delay: 4.5 },
    ];

    return (
        <div className="w-full max-w-md mx-auto space-y-4 font-sans">
            {messages.map((msg) => (
                <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: msg.delay, duration: 0.5 }}
                    viewport={{ once: true }}
                    className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                >
                    <div className={`max-w-[80%] px-5 py-3 rounded-2xl text-sm leading-relaxed shadow-lg ${
                        msg.sender === "me" 
                            ? "bg-[#50C878] text-black rounded-tr-none" 
                            : "bg-[#1A1A1A] border border-white/10 text-zinc-300 rounded-tl-none"
                    }`}>
                        {msg.text}
                    </div>
                </motion.div>
            ))}
            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 6 }}
                viewport={{ once: true }}
                className="flex gap-2 items-center text-xs text-zinc-500 pl-4"
            >
                <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                Typing...
            </motion.div>
        </div>
    )
}

// 8. Random Glows
function RandomGlows() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-[#50C878]/5 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '7s' }} />
            <div className="absolute top-[40%] right-[10%] w-[300px] h-[300px] bg-[#50C878]/5 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
            <div className="absolute bottom-[10%] left-[15%] w-[500px] h-[500px] bg-[#50C878]/5 rounded-full blur-[150px] animate-pulse" style={{ animationDuration: '8s', animationDelay: '1s' }} />
        </div>
    );
}

// Main Page Component
export default function SyncProjectPage() {
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({ target: containerRef });
  const yHero = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const smoothEntry = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } }
  };

  return (
    <div ref={containerRef} className="bg-black min-h-screen text-[#EAEAEA] selection:bg-[#50C878] selection:text-black overflow-x-hidden relative">
      
      <BackgroundGrid />
      <RandomGlows />

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              layoutId={selectedImage.layoutId}
              className="relative w-auto h-auto max-w-[95vw] max-h-[95vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                width={1920}
                height={1080}
                className="object-contain w-full h-full rounded-lg shadow-2xl"
              />
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white/50 hover:text-white transition-colors"
              >
                CLOSE
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className="fixed top-6 left-6 z-40">
        <Link 
          href="/#projects" 
          className="group flex items-center gap-3 px-4 py-2 rounded-full bg-[#121212]/90 backdrop-blur-md border border-[#50C878]/20 hover:border-[#50C878]/50 transition-all hover:scale-105 active:scale-95"
        >
          <div className="p-1.5 rounded-full bg-[#50C878]/10 group-hover:bg-[#50C878] transition-colors">
            <svg className="w-4 h-4 text-white group-hover:text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </div>
          <span className="text-sm font-medium text-white/80 group-hover:text-white">Back</span>
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-4">
        
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-[#50C878]/10 rounded-full blur-[120px] animate-pulse pointer-events-none" />

        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          
          <motion.div 
            style={{ y: yHero, opacity: opacityHero }}
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="space-y-8 text-center lg:text-left"
          >
            <motion.div variants={smoothEntry} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#50C878]/10 border border-[#50C878]/20 text-[#50C878] text-xs font-mono tracking-wider">
               <span className="w-2 h-2 rounded-full bg-[#50C878] animate-pulse" />
               V1.0.2 RELEASE
            </motion.div>

            <motion.h1 variants={smoothEntry} className="text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter leading-[0.9] text-white">
              Sync
            </motion.h1>
            
            <motion.p variants={smoothEntry} className="text-xl md:text-2xl text-zinc-400 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
              The <span className="text-white font-normal">ultimate campus companion</span>. <br/>
              Built with Kotlin for speed, Firebase for scale, and glassmorphism for style.
            </motion.p>
            
            <motion.div variants={smoothEntry} className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4">
               <button onClick={() => document.getElementById('chat-section')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-3 rounded-full bg-[#50C878] text-black font-bold hover:bg-[#40b068] transition-colors shadow-[0_0_30px_rgba(80,200,120,0.3)]">
                 Explore Features
               </button>
               {/* TECH SHEET BUTTON */}
               <Link href="/projects/sync/tech-sheet">
                   <button className="px-8 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#50C878]/50 transition-all flex items-center gap-2 group">
                     Tech Sheet
                     <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                     </svg>
                   </button>
               </Link>
            </motion.div>
          </motion.div>

          <motion.div 
             initial={{ opacity: 0, x: 100 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 1.2, ease: "circOut" }}
             className="relative flex justify-center lg:justify-end h-[600px] items-center"
          >
             <div className="relative z-10">
                 <TiltCard layoutId="hero-dashboard" onClick={() => setSelectedImage({ src: "/projects/sync/home-page.png", layoutId: "hero-dashboard", alt: "Home" })} className="w-[320px] md:w-[380px]">
                    <Image 
                        src="/projects/sync/home-page.png" 
                        alt="Sync Dashboard" 
                        width={400} 
                        height={800}
                        priority
                        className="w-full h-auto rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] border border-white/10"
                    />
                 </TiltCard>
                 
                 <FloatingNotification 
                   text="New Assignment Added"
                   icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
                   x="-20%" y="20%" delay={0.5} 
                 />
                 <FloatingNotification 
                   text="Group Chat Active"
                   icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
                   x="80%" y="60%" delay={0.8} 
                 />
             </div>
             
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-[#50C878]/20 to-blue-500/20 rounded-full blur-[100px] -z-10" />
             <CodeSnippet className="top-20 -left-10 z-0 opacity-60 hidden lg:block" />
          </motion.div>
        </div>
      </section>

      {/* Infinite Marquee */}
      <InfiniteMarquee />

      {/* Feature Sections */}
      <div className="space-y-48 py-32" id="chat-section">
        
        {/* 1. CHAT & REAL-TIME DEMO */}
        <section className="container mx-auto px-4">
           <div className="flex flex-col lg:flex-row items-center gap-20">
              <motion.div 
                 initial="hidden"
                 whileInView="visible"
                 viewport={{ once: true, margin: "-20%" }}
                 variants={stagger}
                 className="lg:w-1/2 space-y-8"
              >
                  <motion.h2 variants={smoothEntry} className="text-5xl font-bold">
                    Real-time <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#50C878] to-emerald-200">Conversations</span>
                  </motion.h2>
                  <motion.p variants={smoothEntry} className="text-xl text-zinc-400 font-light leading-relaxed">
                    A messaging experience that feels alive. Sync uses <span className="text-white">Firestore</span> listeners to push updates instantly. Watch the messages flow in real-time.
                  </motion.p>
                  
                  {/* Simulated Chat Feed */}
                  <motion.div variants={smoothEntry} className="p-6 rounded-3xl bg-[#1A1A1A]/70 border border-[#50C878]/20 backdrop-blur-sm">
                      <SimulatedChat />
                  </motion.div>
              </motion.div>

              <div className="lg:w-1/2 relative">
                  <div className="grid grid-cols-2 gap-6">
                      <TiltCard layoutId="chat1" onClick={() => setSelectedImage({ src: "/projects/sync/chats.png", layoutId: "chat1", alt: "Chat List" })} className="translate-y-12">
                          <Image src="/projects/sync/chats.png" alt="Chat" width={400} height={800} className="rounded-2xl shadow-2xl" />
                      </TiltCard>
                      <TiltCard layoutId="chat2" onClick={() => setSelectedImage({ src: "/projects/sync/group-chat-inside-1.png", layoutId: "chat2", alt: "Group Chat" })}>
                          <Image src="/projects/sync/group-chat-inside-1.png" alt="Group" width={400} height={800} className="rounded-2xl shadow-2xl" />
                      </TiltCard>
                  </div>
              </div>
           </div>
        </section>

        {/* 2. PERFORMANCE MODE INTERACTIVE */}
        <section className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center mb-12 space-y-4">
                <h2 className="text-5xl font-bold">Performance <span className="text-white/40">Mode</span></h2>
                <p className="text-zinc-400 max-w-xl">
                    Sync adapts to your device. Toggle the mode below to see how we optimize rendering by disabling expensive blur effects on lower-end devices.
                </p>
            </div>
            <div className="max-w-4xl mx-auto">
                <PerformanceDemo />
            </div>
        </section>

        {/* 3. ACADEMIC */}
        <section className="container mx-auto px-4">
           <div className="flex flex-col-reverse lg:flex-row items-center gap-20">
              <div className="lg:w-1/2 relative flex justify-center">
                  <TiltCard layoutId="academic" onClick={() => setSelectedImage({ src: "/projects/sync/timetable.png", layoutId: "academic", alt: "Timetable" })} className="w-full max-w-md z-10">
                      <Image src="/projects/sync/timetable.png" alt="Timetable" width={400} height={800} className="w-full rounded-2xl shadow-2xl" />
                  </TiltCard>
                  <TiltCard layoutId="hw" onClick={() => setSelectedImage({ src: "/projects/sync/hw-check.png", layoutId: "hw", alt: "Homework" })} className="absolute top-10 -right-10 w-2/3 opacity-80 z-0 grayscale-[30%] hover:grayscale-0 transition-all">
                      <Image src="/projects/sync/hw-check.png" alt="Homework" width={400} height={800} className="w-full rounded-2xl shadow-xl" />
                  </TiltCard>
              </div>

              <motion.div 
                 initial="hidden"
                 whileInView="visible"
                 viewport={{ once: true, margin: "-20%" }}
                 variants={stagger}
                 className="lg:w-1/2 space-y-8"
              >
                  <motion.h2 variants={smoothEntry} className="text-5xl font-bold">
                    Offline <br />
                    <span className="text-blue-400">Intelligence</span>
                  </motion.h2>
                  <motion.p variants={smoothEntry} className="text-xl text-zinc-400 font-light leading-relaxed">
                    No internet? No problem. Sync caches your entire academic life using <span className="text-white font-medium">Room Database</span>. Timetables, dues, and homework are always instantly available.
                  </motion.p>
              </motion.div>
           </div>
        </section>

        {/* 4. ADMIN & SETTINGS GRID */}
        <section className="container mx-auto px-4">
            <motion.div 
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               variants={stagger}
               className="text-center mb-16 space-y-4"
            >
                <motion.h2 variants={smoothEntry} className="text-5xl font-bold">Control Center</motion.h2>
                <motion.p variants={smoothEntry} className="text-zinc-400 max-w-2xl mx-auto">
                    Role-based access ensures students, teachers, and admins see exactly what they need.
                </motion.p>
            </motion.div>

            {/* Constraint Grid Width to prevent "Too Big" look */}
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { src: "/projects/sync/settings.png", label: "Settings", id: "s1" },
                    { src: "/projects/sync/user-list.png", label: "Directory", id: "s2" },
                    { src: "/projects/sync/chat-privacy.png", label: "Privacy", id: "s3" }
                ].map((item, i) => (
                    <TiltCard key={item.id} layoutId={item.id} onClick={() => setSelectedImage({ src: item.src, layoutId: item.id, alt: item.label })}>
                        <div className="relative group">
                            <Image src={item.src} alt={item.label} width={400} height={800} className="w-full rounded-xl shadow-lg border border-white/5" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
                                <span className="text-white font-medium tracking-wide uppercase text-sm border border-white/30 px-4 py-2 rounded-full backdrop-blur-md">View {item.label}</span>
                            </div>
                        </div>
                    </TiltCard>
                ))}
            </div>
        </section>

      </div>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(80,200,120,0.1),transparent_70%)] pointer-events-none" />
          <SectionContainer id="footer">
             <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                              <motion.div 
                                  initial={{ opacity: 0, x: -20 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.5 }}
                                  className="text-2xl font-bold tracking-tight"
                              >
                                  Sync<span className="text-[#50C878]">.</span>
                              </motion.div>
                              <div className="flex gap-8 text-sm text-zinc-500 font-mono uppercase tracking-widest">
                                  <motion.span 
                                      initial={{ opacity: 0, y: 10 }}
                                      whileInView={{ opacity: 1, y: 0 }}
                                      transition={{ duration: 0.5, delay: 0.2 }}
                                  >
                                      Built 2024
                                  </motion.span>
                                  <motion.span 
                                      initial={{ opacity: 0, y: 10 }}
                                      whileInView={{ opacity: 1, y: 0 }}
                                      transition={{ duration: 0.5, delay: 0.3 }}
                                  >
                                      v1.0.2
                                  </motion.span>
                                  <motion.span 
                                      initial={{ opacity: 0, y: 10 }}
                                      whileInView={{ opacity: 1, y: 0 }}
                                      transition={{ duration: 0.5, delay: 0.4 }}
                                  >
                                      Android
                                  </motion.span>
                              </div>             </div>
          </SectionContainer>
      </footer>

    </div>
  );
}

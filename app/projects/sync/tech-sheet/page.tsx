'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import SectionContainer from '@/components/SectionContainer';

// Background Glow Component
function RandomGlows() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Top Left */}
            <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-[#50C878]/5 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '7s' }} />
            {/* Middle Right */}
            <div className="absolute top-[40%] right-[10%] w-[300px] h-[300px] bg-[#50C878]/5 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
            {/* Bottom Left */}
            <div className="absolute bottom-[10%] left-[15%] w-[500px] h-[500px] bg-[#50C878]/5 rounded-full blur-[150px] animate-pulse" style={{ animationDuration: '8s', animationDelay: '1s' }} />
        </div>
    );
}

export default function TechSheetPage() {
  return (
    <div className="bg-black min-h-screen text-[#EAEAEA] selection:bg-[#50C878] selection:text-black font-sans relative">
      
      <RandomGlows />

      {/* Navigation */}
      <nav className="fixed top-6 left-6 z-50">
        <Link 
          href="/projects/sync" 
          className="group flex items-center gap-3 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10 hover:border-[#50C878]/50 transition-colors"
        >
          <div className="p-1.5 rounded-full bg-white/5 group-hover:bg-[#50C878] transition-colors">
            <svg className="w-4 h-4 text-white group-hover:text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </div>
          <span className="text-sm font-medium text-white/80 group-hover:text-white">Back to Showcase</span>
        </Link>
      </nav>

      <div className="pt-32 pb-20 relative z-10">
        <SectionContainer id="tech-sheet">
            
            {/* Header */}
            <div className="mb-20 text-center space-y-4">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-block px-4 py-1.5 rounded-full bg-[#50C878]/10 text-[#50C878] text-sm font-mono tracking-widest uppercase mb-4"
                >
                    Technical Documentation
                </motion.div>
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-5xl md:text-7xl font-bold tracking-tight text-white"
                >
                    System <span className="text-[#50C878]">Architecture</span>
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-zinc-400 max-w-2xl mx-auto"
                >
                    A deep dive into the logic, data flow, and security mechanisms powering Sync.
                </motion.p>
            </div>

            {/* Architecture Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                
                {/* Module 1: Offline-First Data */}
                <ArchitectureCard 
                    title="Offline-First Data Synchronization" 
                    icon={<DatabaseIcon />}
                    delay={0.3}
                >
                    <p className="text-zinc-400 leading-relaxed mb-4">
                        The core philosophy of Sync is "Local First." The app does not rely on a constant internet connection for read operations.
                    </p>
                    <ul className="space-y-3 text-sm text-zinc-300">
                        <li className="flex gap-3">
                            <span className="text-[#50C878] font-mono">01.</span>
                            <span>All academic data (Timetable, Dues, Homework) is stored locally in a relational <strong>Room Database</strong>.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-[#50C878] font-mono">02.</span>
                            <span>When the app launches, it immediately serves content from the local cache, ensuring <span className="text-white">zero loading time</span> for the user.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-[#50C878] font-mono">03.</span>
                            <span>A background worker silently queries <strong>Firestore</strong> for updates. If the server timestamp &gt; local timestamp, new data is fetched, the local DB is updated, and the UI refreshes automatically via <strong>Flow/LiveData</strong> observers.</span>
                        </li>
                    </ul>
                </ArchitectureCard>

                {/* Module 2: Real-time Communication */}
                <ArchitectureCard 
                    title="Real-time Messaging Engine" 
                    icon={<ChatIcon />}
                    delay={0.4}
                >
                    <p className="text-zinc-400 leading-relaxed mb-4">
                        Chat functionality bypasses the local database for speed, utilizing Firestore's snapshot listeners for instant message delivery.
                    </p>
                    <ul className="space-y-3 text-sm text-zinc-300">
                        <li className="flex gap-3">
                            <span className="text-[#50C878] font-mono">01.</span>
                            <span><strong>Optimistic UI:</strong> When a user sends a message, it is immediately appended to the local chat view list as "Sending..." before the network request completes.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-[#50C878] font-mono">02.</span>
                            <span><strong>Group Chat Architecture:</strong> Group metadata (members, admins) is stored in a separate `groups` collection. Messages are sub-collections, allowing scalable pagination and queries.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-[#50C878] font-mono">03.</span>
                            <span><strong>Presence System:</strong> Users' online status is tracked via Realtime Database triggers (onDisconnect) to handle abrupt connection losses reliably.</span>
                        </li>
                    </ul>
                </ArchitectureCard>

                {/* Module 3: Security & RBAC */}
                <ArchitectureCard 
                    title="Security & Access Control" 
                    icon={<ShieldIcon />}
                    delay={0.5}
                >
                    <p className="text-zinc-400 leading-relaxed mb-4">
                        Access is strictly governed by a Role-Based Access Control (RBAC) system embedded in both the client logic and server rules.
                    </p>
                    <ul className="space-y-3 text-sm text-zinc-300">
                        <li className="flex gap-3">
                            <span className="text-[#50C878] font-mono">01.</span>
                            <span><strong>Registration Validation:</strong> Student registration requires a valid Roll Number pattern (e.g., "25AM..."). This is validated against a pre-approved list before account creation.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-[#50C878] font-mono">02.</span>
                            <span><strong>Firestore Security Rules:</strong> Database reads/writes are protected by rules that check the `request.auth.uid` and the user's `role` field. For example, only users with `role: 'admin'` can write to the `announcements` collection.</span>
                        </li>
                    </ul>
                </ArchitectureCard>

                {/* Module 4: Custom Update Engine */}
                <ArchitectureCard 
                    title="In-App Update Mechanism" 
                    icon={<UpdateIcon />}
                    delay={0.6}
                >
                    <p className="text-zinc-400 leading-relaxed mb-4">
                        To bypass Play Store delays, Sync implements a self-hosted update system.
                    </p>
                    <ul className="space-y-3 text-sm text-zinc-300">
                        <li className="flex gap-3">
                            <span className="text-[#50C878] font-mono">01.</span>
                            <span><strong>Version Check:</strong> On startup, the app fetches a metadata document from Firestore containing the latest `versionCode` and `apkUrl`.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-[#50C878] font-mono">02.</span>
                            <span><strong>Download Manager:</strong> If a new version is detected, Android's native DownloadManager is invoked to fetch the APK in the background.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-[#50C878] font-mono">03.</span>
                            <span><strong>Package Installer:</strong> Once downloaded, a FileProvider intent triggers the native Android package installer to seamlessly update the app while preserving user data.</span>
                        </li>
                    </ul>
                </ArchitectureCard>

                {/* Module 5: Privacy & User Safety (NEW) */}
                <ArchitectureCard 
                    title="Privacy & Safety Protocols" 
                    icon={<LockIcon />}
                    delay={0.7}
                >
                    <p className="text-zinc-400 leading-relaxed mb-4">
                        User safety is paramount in a social-educational environment. Sync implements strict blocking and data privacy measures.
                    </p>
                    <ul className="space-y-3 text-sm text-zinc-300">
                        <li className="flex gap-3">
                            <span className="text-[#50C878] font-mono">01.</span>
                            <span><strong>Block Logic:</strong> Blocking a user creates a document in a `blocked_users` sub-collection. Firestore queries filter messages from blocked users at the database level, ensuring they are never even fetched to the device.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-[#50C878] font-mono">02.</span>
                            <span><strong>Unfriend Mechanism:</strong> Unfriending triggers a cloud function or atomic batch write that removes the user ID from both users' `friends` array, instantly revoking private chat access.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-[#50C878] font-mono">03.</span>
                            <span><strong>Data Wipe:</strong> On logout, a specialized `RoomDatabase.clearAllTables()` command is executed to wipe all cached local data, protecting shared devices.</span>
                        </li>
                    </ul>
                </ArchitectureCard>

                {/* Module 6: Advanced Academic Features (NEW) */}
                <ArchitectureCard 
                    title="Academic Modules" 
                    icon={<CalendarIcon />}
                    delay={0.8}
                >
                    <p className="text-zinc-400 leading-relaxed mb-4">
                        Specialized modules designed for the student workflow, integrated deeply with the core data layer.
                    </p>
                    <ul className="space-y-3 text-sm text-zinc-300">
                        <li className="flex gap-3">
                            <span className="text-[#50C878] font-mono">01.</span>
                            <span><strong>Dynamic Timetable:</strong> Timetables are JSON structures stored in Firestore. The app parses this JSON to render a dynamic grid UI. Changes by admins reflect instantly for all students in that class.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-[#50C878] font-mono">02.</span>
                            <span><strong>Dues & Homework:</strong> These collections are indexed by `classId`. Students automatically subscribe to their specific class's homework topic via Firebase Cloud Messaging (FCM) for push notifications.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-[#50C878] font-mono">03.</span>
                            <span><strong>Settings Management:</strong> App preferences (Performance Mode, Theme, Notifications) are persisted in `SharedPreferences` and applied instantly via Kotlin's `StateFlow` to update the UI theme dynamically.</span>
                        </li>
                    </ul>
                </ArchitectureCard>

            </div>

        </SectionContainer>
      </div>
    </div>
  );
}

function ArchitectureCard({ title, icon, children, delay }: any) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            className="group relative p-8 rounded-3xl border border-white/10 bg-[#111] hover:border-[#50C878]/30 transition-colors"
        >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                {icon}
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#50C878]/10 flex items-center justify-center text-[#50C878] mb-6 group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
            {children}
        </motion.div>
    )
}

// Icons
const DatabaseIcon = () => <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>;
const ChatIcon = () => <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>;
const ShieldIcon = () => <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>;
const UpdateIcon = () => <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>;
const LockIcon = () => <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>;
const CalendarIcon = () => <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
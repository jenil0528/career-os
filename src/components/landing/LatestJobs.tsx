"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Briefcase, MapPin, DollarSign, TrendingUp, Cpu, CheckCircle, Search, ExternalLink } from "lucide-react";

interface Job {
  id: string;
  company: string;
  role: string;
  url?: string;
  location: string;
  work_mode: string;
  salary_range: string;
  description: string;
  required_skills: string[];
}

export default function LatestJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await fetch("/api/jobs");
        const data = await res.json();
        if (data.jobs) {
          setJobs(data.jobs);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job => 
    job.role.toLowerCase().includes(searchQuery.toLowerCase()) || 
    job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.required_skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  ).slice(0, 4); // Take top 4 for landing page

  return (
    <section id="latest-jobs" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-400 mb-6"
          >
            <Cpu className="h-4 w-4" />
            Live from Remotive API
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-bold tracking-tight font-[family-name:var(--font-space-grotesk)] sm:text-4xl md:text-5xl"
          >
            Real Opportunities, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Auto-Curated</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-slate-400"
          >
            Browse the latest remote tech jobs below and apply directly. Search by role, company, or skill.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 relative max-w-xl mx-auto"
          >
            <div className="relative flex items-center w-full h-12 rounded-2xl focus-within:shadow-lg bg-surface-container border border-outline-variant overflow-hidden">
              <div className="grid place-items-center h-full w-12 text-slate-400">
                <Search className="h-5 w-5" />
              </div>
              <input
                className="peer h-full w-full outline-none text-sm text-on-surface bg-transparent pr-4"
                type="text"
                id="search"
                placeholder="Search jobs by title, skill, or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </motion.div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-colors backdrop-blur-sm flex flex-col h-full"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg">
                      <Briefcase className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        {job.role}
                      </h3>
                      <div className="mt-1 flex items-center gap-3 text-sm text-slate-400">
                        <span>{job.company}</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          {job.location}
                        </span>
                      </div>
                    </div>
                  </div>
                  {job.url ? (
                    <a 
                      href={job.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="shrink-0 flex items-center gap-2 text-xs font-bold text-on-primary bg-primary hover:bg-primary/90 px-4 py-2 rounded-xl transition-all shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5"
                    >
                      Apply <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  ) : (
                    <div className="shrink-0 flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-full border border-emerald-400/20">
                      <CheckCircle className="h-3.5 w-3.5" />
                      AI Match
                    </div>
                  )}
                </div>

                <p className="mt-4 text-sm text-slate-400 line-clamp-3">
                  {job.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2 flex-grow">
                  {job.required_skills.slice(0, 4).map((skill, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center rounded-md bg-white/5 px-2.5 py-1 text-xs font-medium text-slate-300 border border-white/10"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-6">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="h-4 w-4 text-emerald-400" />
                      <span className="font-medium text-white">{job.salary_range}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <TrendingUp className="h-4 w-4 text-blue-400" />
                      <span className="font-medium text-white">{job.work_mode}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

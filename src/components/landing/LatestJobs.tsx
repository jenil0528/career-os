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
    <section id="latest-jobs" className="relative py-24 sm:py-32 overflow-hidden bg-background">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6"
          >
            <Cpu className="h-4 w-4" />
            Live from Remotive API
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-bold tracking-tight font-[family-name:var(--font-space-grotesk)] sm:text-4xl md:text-5xl text-on-surface"
          >
            Real Opportunities, <span className="text-primary font-black">Auto-Curated</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-on-surface-variant"
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
            <div className="relative flex items-center w-full h-12 rounded-2xl focus-within:shadow-lg bg-surface-container-high border border-outline-variant overflow-hidden">
              <div className="grid place-items-center h-full w-12 text-on-surface-variant">
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
                className="group relative rounded-2xl border border-outline-variant bg-surface p-6 hover:shadow-md transition-shadow flex flex-col h-full"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-container text-primary">
                      <Briefcase className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-on-surface group-hover:text-primary transition-colors">
                        {job.role}
                      </h3>
                      <div className="mt-1 flex items-center gap-3 text-sm text-on-surface-variant font-medium">
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
                    <div className="shrink-0 flex items-center gap-2 text-xs font-semibold text-green-600 bg-green-500/10 px-3 py-1.5 rounded-full border border-green-500/20">
                      <CheckCircle className="h-3.5 w-3.5" />
                      AI Match
                    </div>
                  )}
                </div>

                <p className="mt-4 text-sm text-on-surface-variant line-clamp-3 leading-relaxed">
                  {job.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2 flex-grow">
                  {job.required_skills.slice(0, 4).map((skill, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center rounded-md bg-surface-variant px-2.5 py-1 text-xs font-medium text-on-surface-variant border border-outline-variant"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-outline-variant pt-6">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span className="text-on-surface">{job.salary_range}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      <span className="text-on-surface">{job.work_mode}</span>
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

"use client";

import { useState } from "react";
import { useUserCompat as useUser } from "@/lib/auth-shim";
import { Loader2, Play, Search } from "lucide-react";
import type { CareerRoadmap, RoadmapPhase } from "@/types";

export default function RoadmapPage() {
  const { isLoaded } = useUser();
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [roadmap, setRoadmap] = useState<CareerRoadmap | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!role.trim()) {
      setError("Please enter a target role or skill.");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/generate-roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate roadmap");
      setRoadmap(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  // Setup View
  if (!roadmap) {
    return (
      <div className="flex flex-1 items-center justify-center bg-surface-container w-full h-full p-8">
        <div className="bg-surface border border-outline-variant max-w-2xl w-full p-12 flex flex-col gap-8 shadow-sm">
          <div>
            <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight border-b border-outline-variant pb-4">
              Initialize Skill Roadmap
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant mt-4">
              Enter your target executive role or a specific competency you wish to master. The AI will generate a structured timeline and competency matrix.
            </p>
          </div>

          {error && (
            <div className="bg-error-container/20 border border-error p-4 text-error font-body-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">error</span>
              {error}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label className="font-label-md text-label-md text-on-surface uppercase tracking-wider">
              Target Role / Objective
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
              <input 
                type="text"
                placeholder="e.g. Principal Architect, Chief Technology Officer, Staff Engineer..."
                value={role}
                onChange={(e) => setRole(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleGenerate(); }}
                className="w-full bg-surface-container-lowest border border-outline-variant py-4 pl-10 pr-4 font-mono-label text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
              />
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isLoading || !role.trim()}
            className="mt-4 bg-primary text-on-primary py-4 px-6 font-label-lg uppercase tracking-widest hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                GENERATING TRAJECTORY...
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-current" />
                EXECUTE ROADMAP
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  // Analysis View
  return (
    <div className="p-container-margin flex flex-col gap-container-margin overflow-y-auto">
      {/* Page Header */}
      <div className="flex justify-between items-end border-b border-outline-variant pb-density-regular sticky top-0 bg-background z-20 pt-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight">{roadmap.role}</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">Estimated Duration: {roadmap.estimatedDuration}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setRoadmap(null)} className="px-4 py-2 border border-outline-variant text-on-surface font-label-md text-label-md hover:bg-surface-container-lowest transition-colors bg-surface-container-low flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]">sync</span> Reprocess
          </button>
          <button className="px-4 py-2 bg-primary text-on-primary font-label-md text-label-md hover:opacity-90 transition-opacity">Schedule Review</button>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-gutter items-start">
        {/* Left Column (Matrix & Timeline) */}
        <div className="xl:col-span-8 flex flex-col gap-gutter">
          
          {/* Competency Matrix */}
          <section className="bg-surface border border-outline-variant">
            <div className="p-density-spacious border-b border-outline-variant flex justify-between items-center bg-surface-container-lowest">
              <h3 className="font-headline-sm text-headline-sm text-primary">Competency Matrix</h3>
              <span className="font-mono-label text-mono-label text-on-surface-variant bg-surface-container px-2 py-1 uppercase border border-outline-variant">EVALUATION</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-surface-container-low border-b border-outline-variant">
                    <th className="p-density-regular font-label-md text-label-md text-on-surface-variant border-r border-outline-variant w-1/3">Skill Domain</th>
                    <th className="p-density-regular font-label-md text-label-md text-on-surface-variant border-r border-outline-variant text-center">L1</th>
                    <th className="p-density-regular font-label-md text-label-md text-on-surface-variant border-r border-outline-variant text-center">L2</th>
                    <th className="p-density-regular font-label-md text-label-md text-on-surface-variant border-r border-outline-variant text-center">L3</th>
                    <th className="p-density-regular font-label-md text-label-md text-on-surface-variant border-r border-outline-variant text-center">L4</th>
                    <th className="p-density-regular font-label-md text-label-md text-on-surface-variant text-center">L5</th>
                  </tr>
                </thead>
                <tbody className="font-body-sm text-body-sm text-on-surface">
                  {roadmap.phases.slice(0, 5).map((phase, idx) => (
                    <tr key={idx} className="border-b border-outline-variant hover:bg-surface-container-lowest transition-colors">
                      <td className="p-density-regular border-r border-outline-variant font-medium">{phase.title}</td>
                      <td className="p-density-regular border-r border-outline-variant text-center bg-surface-container-highest"></td>
                      <td className="p-density-regular border-r border-outline-variant text-center bg-surface-container-highest"></td>
                      <td className="p-density-regular border-r border-outline-variant text-center bg-surface-container-highest"></td>
                      <td className={`p-density-regular border-r border-outline-variant text-center ${idx % 2 === 0 ? "bg-primary text-on-primary" : "text-outline"}`}>{idx % 2 === 0 ? "Current" : "Target"}</td>
                      <td className={`p-density-regular text-center ${idx % 2 !== 0 ? "bg-secondary text-on-secondary" : ""}`}>{idx % 2 !== 0 ? "Mastered" : ""}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Trajectory Timeline */}
          <section className="bg-surface border border-outline-variant">
            <div className="p-density-spacious border-b border-outline-variant bg-surface-container-lowest">
              <h3 className="font-headline-sm text-headline-sm text-primary">Trajectory Timeline</h3>
            </div>
            <div className="p-container-margin">
              <div className="relative pl-6 border-l border-outline-variant ml-2 flex flex-col gap-8">
                {roadmap.phases.map((phase, idx) => (
                  <div key={idx} className="relative">
                    <div className={`absolute -left-[33px] top-1 w-4 h-4 ${idx === 0 ? "bg-primary" : "bg-surface border border-outline-variant"} rounded-none`}></div>
                    <div className={`flex flex-col gap-1 ${idx === 0 ? "border border-outline-variant p-density-spacious bg-surface-container-lowest" : "opacity-70 mt-2"}`}>
                      <div className="flex justify-between items-center">
                        <span className="font-mono-label text-mono-label text-outline uppercase tracking-wider">{phase.duration}</span>
                        {idx === 0 && <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-2 py-1">CURRENT PHASE</span>}
                      </div>
                      <h4 className={`font-headline-sm text-headline-sm ${idx === 0 ? "text-primary" : "text-on-surface"} mt-1`}>{phase.title}</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant max-w-lg mt-1">{phase.description}</p>
                      
                      {idx === 0 && phase.skills && phase.skills.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {phase.skills.map((skill, sIdx) => (
                            <span key={sIdx} className="border border-outline-variant px-2 py-1 font-label-sm text-label-sm text-on-surface">
                              {skill.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Right Column (Learning Modules) */}
        <div className="xl:col-span-4 flex flex-col gap-gutter">
          <section className="bg-surface border border-outline-variant h-full flex flex-col">
            <div className="p-density-spacious border-b border-outline-variant bg-surface-container-lowest flex justify-between items-center">
              <h3 className="font-headline-sm text-headline-sm text-primary">Learning Modules</h3>
              <span className="material-symbols-outlined text-outline" style={{ fontSize: "20px" }}>school</span>
            </div>
            <div className="flex flex-col flex-1">
              {roadmap.phases.flatMap(p => p.resources || []).slice(0, 5).map((resource, idx) => (
                <div key={idx} className="flex gap-3 p-density-spacious border-b border-outline-variant hover:bg-surface-container-lowest transition-colors group cursor-pointer">
                  <div className="w-16 h-16 bg-surface-container-high border border-outline-variant flex-shrink-0 flex items-center justify-center relative overflow-hidden">
                    <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors z-10">
                      {resource.type === "video" ? "play_circle" : resource.type === "book" ? "menu_book" : "article"}
                    </span>
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="font-mono-label text-mono-label text-outline uppercase mb-1">{resource.platform || resource.type}</span>
                    <h4 className="font-label-md text-label-md text-primary leading-tight line-clamp-2">{resource.title}</h4>
                  </div>
                </div>
              ))}
              
              <div className="mt-auto p-density-spacious border-t border-outline-variant bg-surface-container-lowest">
                <button className="w-full py-2 border border-outline-variant text-on-surface font-label-md text-label-md hover:bg-surface-container-low transition-colors flex items-center justify-center gap-2">
                  View Full Catalog
                  <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>arrow_forward</span>
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

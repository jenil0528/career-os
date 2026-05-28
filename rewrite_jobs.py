import re

with open("src/app/dashboard/jobs/page.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update filteredJobs
old_filter = """  // Filter and sort jobs
  const filteredJobs = result?.matchedJobs
    .filter(j => filterWorkMode === "all" || j.workMode === filterWorkMode)
    .filter(j => 
      searchQuery === "" || 
      j.role.toLowerCase().includes(searchQuery.toLowerCase()) || 
      j.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ((j.requiredSkills && j.requiredSkills.some((s: string) => s.toLowerCase().includes(searchQuery.toLowerCase()))) ||
       (j.required_skills && j.required_skills.some((s: string) => s.toLowerCase().includes(searchQuery.toLowerCase()))))
    )
    .sort((a, b) => {
      if (sortBy === "match") return b.matchPercentage - a.matchPercentage;
      if (sortBy === "readiness") return b.interviewReadiness - a.interviewReadiness;
      return 0;
    }) || [];"""

new_filter = """  // Filter and sort jobs
  const sourceJobs = result ? result.matchedJobs : availableJobs;
  const filteredJobs = sourceJobs
    .filter(j => filterWorkMode === "all" || j.workMode === filterWorkMode)
    .filter(j => 
      searchQuery === "" || 
      (j.role && j.role.toLowerCase().includes(searchQuery.toLowerCase())) || 
      (j.company && j.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
      ((j.requiredSkills && j.requiredSkills.some((s: string) => s.toLowerCase().includes(searchQuery.toLowerCase()))) ||
       (j.required_skills && j.required_skills.some((s: string) => s.toLowerCase().includes(searchQuery.toLowerCase()))))
    )
    .sort((a, b) => {
      if (sortBy === "match") return (b.matchPercentage || 0) - (a.matchPercentage || 0);
      if (sortBy === "readiness") return (b.interviewReadiness || 0) - (a.interviewReadiness || 0);
      return 0;
    }) || [];"""

content = content.replace(old_filter, new_filter)

# 2. Extract Search Bar & Filters UI
# Let's replace the whole render section from {/* Upload or Results */} to the end of <AnimatePresence mode="wait">

old_ui_regex = re.compile(r"\{\/\* Upload or Results \*\/\}.*?\{\/\* ===== RADAR CHART TAB ===== \*\/\}", re.DOTALL)

new_ui = """{/* Upload or Results */}
        
        {/* Always show Search & Filters */}
        <div className="flex flex-col gap-4 mb-6">
          <div className="relative flex items-center w-full h-12 rounded-2xl focus-within:shadow-lg bg-surface-container border border-outline-variant overflow-hidden">
            <div className="grid place-items-center h-full w-12 text-on-surface-variant">
              <Search className="h-5 w-5" />
            </div>
            <input
              className="peer h-full w-full outline-none text-sm text-on-surface bg-transparent pr-4"
              type="text"
              placeholder="Search jobs by title, company, or skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-on-surface-variant">
              <Filter className="h-4 w-4" /> Filter:
            </div>
            {["all", "Remote", "Hybrid", "Onsite"].map((mode) => (
              <button
                key={mode}
                onClick={() => setFilterWorkMode(mode)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                  filterWorkMode === mode
                    ? "bg-primary/10 text-primary border border-primary/30"
                    : "bg-surface-variant text-on-surface-variant border border-outline-variant hover:bg-surface-container hover:text-on-surface"
                )}
              >
                {mode === "all" ? "All Modes" : mode}
              </button>
            ))}
            <div className="ml-auto flex items-center gap-2 text-sm text-on-surface-variant">
              Sort:
              {(["match", "readiness"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSortBy(s)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer capitalize",
                    sortBy === s
                      ? "bg-primary/10 text-primary border border-primary/30"
                      : "bg-surface-variant text-on-surface-variant border border-outline-variant hover:bg-surface-container hover:text-on-surface"
                  )}
                >
                  {s === "match" ? "Match %" : "Interview Ready"}
                </button>
              ))}
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!result && !isLoading && (
            <motion.div key="upload" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full mb-8">
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={cn(
                  "bg-surface-container border border-outline-variant rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-300 cursor-pointer group hover:border-primary/50",
                  isDragging ? "border-primary bg-primary/5 scale-[1.02]" : ""
                )}
                onClick={() => document.getElementById("job-resume-input")?.click()}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/10 flex items-center justify-center border border-blue-500/20 group-hover:scale-110 transition-transform">
                    <Upload className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-bold text-on-surface font-[family-name:var(--font-space-grotesk)]">
                      Unlock AI Match Scores
                    </h3>
                    <p className="text-on-surface-variant text-sm max-w-md">
                      Upload your resume to instantly see personalized match percentages and skill gap analysis.
                    </p>
                  </div>
                </div>
                <div className="inline-flex items-center gap-2 btn-primary rounded-xl px-6 py-3 text-sm font-semibold shrink-0">
                  <FileText className="h-4 w-4" />
                  Choose PDF
                </div>
                <input
                  id="job-resume-input"
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={handleFileInput}
                />
              </div>
              {error && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-sm text-center mt-2">
                  {error}
                </motion.p>
              )}
            </motion.div>
          )}

          {isLoading && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-2xl mx-auto text-center py-20">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/10 mx-auto mb-6 flex items-center justify-center animate-pulse-glow">
                <Sparkles className="w-10 h-10 text-blue-400 animate-spin" style={{ animationDuration: "3s" }} />
              </div>
              <h3 className="text-2xl font-bold text-on-surface mb-3 font-[family-name:var(--font-space-grotesk)]">
                Analyzing Your Career DNA...
              </h3>
              <p className="text-on-surface-variant text-sm mb-8">Extracting skills • Matching with 7+ roles • Building recommendations</p>
              <div className="space-y-3 max-w-md mx-auto">
                {["Parsing resume content", "Extracting skills & technologies", "Matching against job roles", "Calculating skill gaps", "Generating AI recommendations"].map((step, i) => (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.4 }}
                    className="flex items-center gap-3 text-sm text-on-surface-variant"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.4 + 0.2 }}
                      className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-blue-400" />
                    </motion.div>
                    {step}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {result && !isLoading && (
            <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* Personalized Message Banner */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-surface-container border border-outline-variant rounded-2xl p-6 mb-8 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-primary/5" />
                <div className="relative z-10 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-on-surface text-lg mb-1 font-[family-name:var(--font-space-grotesk)]">AI Career Insight</h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed">{result.recommendations.personalizedMessage}</p>
                  </div>
                </div>
              </motion.div>

              {/* Tabs */}
              <div className="flex flex-wrap gap-2 mb-8 justify-center">
                {tabs.map((tab) => {
                  const TabIcon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer",
                        activeTab === tab.id
                          ? "bg-primary/10 text-primary border border-primary/30"
                          : "bg-surface-variant text-on-surface-variant border border-outline-variant hover:bg-surface-container hover:text-on-surface"
                      )}
                    >
                      <TabIcon className="h-4 w-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                {/* ===== JOB MATCHES TAB ===== */}
                {activeTab === "matches" && (
                  <motion.div key="matches" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                      {filteredJobs.map((job, i) => (
                        <JobCard key={job.id} job={job} index={i} />
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* ===== RADAR CHART TAB ===== */}"""

content = old_ui_regex.sub(new_ui, content)

# 3. There is a {(!result || activeTab === "matches") && !isLoading && } block needed for the Jobs when there's NO result!
# Wait, if there's no result, the Jobs should be shown!
# In the above, I put the job grid INSIDE activeTab === "matches", which is inside result && !isLoading!
# So if !result, no jobs are shown! Let's fix that in Python.

fix_regex = re.compile(r"\{\/\* ===== JOB MATCHES TAB ===== \*\/\}.*?\{\/\* ===== RADAR CHART TAB ===== \*\/\}", re.DOTALL)

fix_ui = """{/* ===== JOB MATCHES TAB ===== */}
                {activeTab === "matches" && (
                  <motion.div key="matches" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                      {filteredJobs.map((job, i) => (
                        <JobCard key={job.id} job={job} index={i} />
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* ===== RADAR CHART TAB ===== */}"""

# But wait, if !result, we don't enter `result && !isLoading` at all!
# We need to put the Job Grid OUTSIDE the `result && !isLoading` block for it to be visible when !result.

new_ui2 = """{/* Upload or Results */}
        
        {/* Always show Search & Filters */}
        <div className="flex flex-col gap-4 mb-6">
          <div className="relative flex items-center w-full h-12 rounded-2xl focus-within:shadow-lg bg-surface-container border border-outline-variant overflow-hidden">
            <div className="grid place-items-center h-full w-12 text-on-surface-variant">
              <Search className="h-5 w-5" />
            </div>
            <input
              className="peer h-full w-full outline-none text-sm text-on-surface bg-transparent pr-4"
              type="text"
              placeholder="Search jobs by title, company, or skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-on-surface-variant">
              <Filter className="h-4 w-4" /> Filter:
            </div>
            {["all", "Remote", "Hybrid", "Onsite"].map((mode) => (
              <button
                key={mode}
                onClick={() => setFilterWorkMode(mode)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                  filterWorkMode === mode
                    ? "bg-primary/10 text-primary border border-primary/30"
                    : "bg-surface-variant text-on-surface-variant border border-outline-variant hover:bg-surface-container hover:text-on-surface"
                )}
              >
                {mode === "all" ? "All Modes" : mode}
              </button>
            ))}
            <div className="ml-auto flex items-center gap-2 text-sm text-on-surface-variant">
              Sort:
              {(["match", "readiness"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSortBy(s)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer capitalize",
                    sortBy === s
                      ? "bg-primary/10 text-primary border border-primary/30"
                      : "bg-surface-variant text-on-surface-variant border border-outline-variant hover:bg-surface-container hover:text-on-surface"
                  )}
                >
                  {s === "match" ? "Match %" : "Interview Ready"}
                </button>
              ))}
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!result && !isLoading && (
            <motion.div key="upload" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full mb-8">
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={cn(
                  "bg-surface-container border border-outline-variant rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-300 cursor-pointer group hover:border-primary/50",
                  isDragging ? "border-primary bg-primary/5 scale-[1.02]" : ""
                )}
                onClick={() => document.getElementById("job-resume-input")?.click()}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/10 flex items-center justify-center border border-blue-500/20 group-hover:scale-110 transition-transform">
                    <Upload className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-bold text-on-surface font-[family-name:var(--font-space-grotesk)]">
                      Unlock AI Match Scores
                    </h3>
                    <p className="text-on-surface-variant text-sm max-w-md">
                      Upload your resume to instantly see personalized match percentages and skill gap analysis.
                    </p>
                  </div>
                </div>
                <div className="inline-flex items-center gap-2 btn-primary rounded-xl px-6 py-3 text-sm font-semibold shrink-0">
                  <FileText className="h-4 w-4" />
                  Choose PDF
                </div>
                <input
                  id="job-resume-input"
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={handleFileInput}
                />
              </div>
              {error && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-sm text-center mt-2">
                  {error}
                </motion.p>
              )}
            </motion.div>
          )}

          {isLoading && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-2xl mx-auto text-center py-20">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/10 mx-auto mb-6 flex items-center justify-center animate-pulse-glow">
                <Sparkles className="w-10 h-10 text-blue-400 animate-spin" style={{ animationDuration: "3s" }} />
              </div>
              <h3 className="text-2xl font-bold text-on-surface mb-3 font-[family-name:var(--font-space-grotesk)]">
                Analyzing Your Career DNA...
              </h3>
              <p className="text-on-surface-variant text-sm mb-8">Extracting skills • Matching with 7+ roles • Building recommendations</p>
              <div className="space-y-3 max-w-md mx-auto">
                {["Parsing resume content", "Extracting skills & technologies", "Matching against job roles", "Calculating skill gaps", "Generating AI recommendations"].map((step, i) => (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.4 }}
                    className="flex items-center gap-3 text-sm text-on-surface-variant"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.4 + 0.2 }}
                      className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-blue-400" />
                    </motion.div>
                    {step}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {result && !isLoading && (
            <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* Personalized Message Banner */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-surface-container border border-outline-variant rounded-2xl p-6 mb-8 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-primary/5" />
                <div className="relative z-10 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-on-surface text-lg mb-1 font-[family-name:var(--font-space-grotesk)]">AI Career Insight</h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed">{result.recommendations.personalizedMessage}</p>
                  </div>
                </div>
              </motion.div>

              {/* Tabs */}
              <div className="flex flex-wrap gap-2 mb-8 justify-center">
                {tabs.map((tab) => {
                  const TabIcon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer",
                        activeTab === tab.id
                          ? "bg-primary/10 text-primary border border-primary/30"
                          : "bg-surface-variant text-on-surface-variant border border-outline-variant hover:bg-surface-container hover:text-on-surface"
                      )}
                    >
                      <TabIcon className="h-4 w-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                {/* ===== RADAR CHART TAB ===== */}"""

content = old_ui_regex.sub(new_ui2, content)

# Now we need to append the Job Grid!
# Where does it go? Right after the `AnimatePresence` that wraps `result && !isLoading` ends.
# Wait, the `AnimatePresence mode="wait"` wraps `{!result...} {isLoading...} {result...}`!
# Let's close the `AnimatePresence` for `result` and the outer `AnimatePresence`.

# Let's find the end of `</AnimatePresence>\n        </div>\n      </div>\n    </div>`
end_regex = re.compile(r"\{\/\* ===== TRENDING JOBS TAB ===== \*\/\}.*?<\/motion\.div>\n                \)\}\n              <\/AnimatePresence>\n            <\/motion\.div>\n          \)\}\n        <\/AnimatePresence>\n      <\/div>\n    <\/div>\n  \);\n\}", re.DOTALL)

with open("temp.log", "w") as f:
    f.write(content)

# We will just append the Job List right before `</AnimatePresence>\n      </div>\n    </div>\n  );`
# The outer AnimatePresence ends at line 768. We want to insert the jobs outside of it.

outer_end = r"          )}\n        </AnimatePresence>"
insert_jobs = r"""          )}\n        </AnimatePresence>\n\n        {/* ALWAYS SHOW JOB MATCHES IF NOT LOADING AND (NO RESULT OR ACTIVE TAB IS MATCHES) */}\n        {(!isLoading && (!result || activeTab === "matches")) && (\n          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8">\n            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">\n              {filteredJobs.map((job, i) => (\n                <JobCard key={job.id} job={job} index={i} />\n              ))}\n            </div>\n          </motion.div>\n        )}"""

content = content.replace(outer_end, insert_jobs)

with open("src/app/dashboard/jobs/page.tsx", "w", encoding="utf-8") as f:
    f.write(content)

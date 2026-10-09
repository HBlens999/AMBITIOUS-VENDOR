import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { PortfolioProject } from '../types';
import { ArrowUpRight, X, ExternalLink } from 'lucide-react';

export const PortfolioGrid: React.FC = () => {
  const { portfolio } = useData();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  const categories = ['All', 'Graphic Design', 'Website Development', 'Video Editing', 'Perfume Vendor'];

  const filteredProjects = portfolio
    .filter((p) => p.published)
    .filter((p) => (activeCategory === 'All' ? true : p.category === activeCategory));

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#1766A5]/20">
      {/* Header and Category Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#72DFFF] block mb-3">
            Selected Works
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Curated Creative Portfolio
          </h2>
        </div>

        {/* Category Filter Controls */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#092A61]/70 border border-[#1766A5]/30 rounded-xl">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-[#F5C542] text-[#061C46] shadow-md shadow-[#F5C542]/20'
                  : 'text-slate-300 hover:text-white hover:bg-[#1766A5]/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Modern Bento Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
        {filteredProjects.map((project, idx) => {
          // Dynamic asymmetric spans for visual interest
          const colSpan = idx % 3 === 0 ? 'lg:col-span-8' : 'lg:col-span-4';

          return (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className={`${colSpan} group relative rounded-2xl overflow-hidden bg-[#092A61]/40 border border-[#1766A5]/30 hover:border-[#72DFFF]/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#092A61]/60 cursor-pointer min-h-[340px] flex flex-col justify-end`}
            >
              {/* Project Image */}
              <img
                src={project.image}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061C46] via-[#061C46]/60 to-transparent opacity-90 transition-opacity group-hover:opacity-85" />

              {/* Badges / Meta Top */}
              <div className="relative z-10 p-6 flex justify-between items-start mb-auto">
                <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-[#061C46]/80 text-[#72DFFF] border border-[#1766A5]/40 backdrop-blur-md">
                  {project.category}
                </span>
                <div className="w-9 h-9 rounded-full bg-[#061C46]/80 border border-[#1766A5]/40 flex items-center justify-center text-slate-300 group-hover:bg-[#F5C542] group-hover:text-[#061C46] transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Title & Description Bottom */}
              <div className="relative z-10 p-6 pt-0">
                <span className="text-xs text-slate-400 font-mono block mb-1">
                  {project.client ? `${project.client} · ` : ''}{project.year || '2026'}
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-[#F5C542] transition-colors mb-2">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox / Project Detail Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 bg-[#061C46]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-[#092A61] border border-[#1766A5]/50 rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-72 sm:h-96 w-full bg-[#061C46]">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-[#061C46]/80 text-white hover:bg-[#F5C542] hover:text-[#061C46] transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-[#72DFFF] uppercase tracking-wider">
                  {selectedProject.category} · {selectedProject.year || '2026'}
                </span>
                {selectedProject.externalUrl && (
                  <a
                    href={selectedProject.externalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F5C542] hover:underline"
                  >
                    <span>Visit Live Work</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-4">
                {selectedProject.title}
              </h3>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed mb-6">
                {selectedProject.description}
              </p>
              {selectedProject.tags && (
                <div className="flex flex-wrap gap-2 pt-4 border-t border-[#1766A5]/30">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded bg-[#061C46] text-xs font-medium text-slate-300 border border-[#1766A5]/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

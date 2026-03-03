import React from "react";
import { Calendar } from "lucide-react";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import { experiences } from "../../data/mockData";
import { cn } from "../../utils/cn";

const Experience: React.FC = () => {
  const [sectionRef] = useIntersectionObserver({
    threshold: 0.1,
    freezeOnceVisible: true,
  });

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="py-24 bg-[#f7f6f4] text-[#343535] transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Work Experience
          </h2>
          <p className="text-lg md:text-xl text-[#5a5958] max-w-3xl mx-auto leading-relaxed">
            My professional journey and the experiences that shaped my development career.
          </p>
          <div className="w-24 h-1 bg-[#343535] mx-auto mt-6 rounded-full" />
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Garis vertikal */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-0.5 w-0.5 h-full bg-[#d4d3d2]" />

          {experiences.map((experience, index) => (
            <div
              key={experience.id}
              className={cn(
                "relative flex items-center mb-12",
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              )}
            >
              {/* Titik pada timeline */}
              <div
                className={cn(
                  "absolute left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-4 border-[#343535] bg-white z-10"
                )}
              >
                {experience.current && (
                  <div className="absolute inset-0 rounded-full bg-[#343535] animate-ping opacity-40" />
                )}
              </div>

              {/* Kartu konten */}
              <div
                className={cn(
                  "ml-16 md:ml-0 flex-1 max-w-md transition-all duration-300 hover:-translate-y-1 hover:drop-shadow-lg",
                  index % 2 === 0 ? "md:mr-8" : "md:ml-8"
                )}
              >
                <div className="p-6 rounded-2xl bg-white border border-[#e4e4e4] shadow-sm relative">
                  {experience.current && (
                    <div className="absolute -top-3 left-6">
                      <span className="px-3 py-1 bg-[#343535] text-white text-xs font-semibold rounded-full">
                        Current Position
                      </span>
                    </div>
                  )}

                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-[#343535]">
                        {experience.title}
                      </h3>
                      <p className="text-[#5a5958] font-semibold">
                        {experience.company}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mb-4 text-sm text-[#6b6b6b]">
                    <Calendar className="w-4 h-4" />
                    {experience.period}
                  </div>

                  <p className="mb-4 text-[#5a5958] leading-relaxed">
                    {experience.description}
                  </p>

                  {/* Teknologi */}
                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-[#f0efee] text-[#343535]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Segitiga penunjuk */}
                  <div
                    className={cn(
                      "hidden md:block absolute top-8 w-4 h-4 transform rotate-45 bg-white border-l border-t border-[#e4e4e4]",
                      index % 2 === 0 ? "right-[-8px]" : "left-[-8px]"
                    )}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Status */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium bg-white border border-[#e4e4e4] shadow-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[#343535]">
              Available for new opportunities
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
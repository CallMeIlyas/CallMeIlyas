import React, { useState } from "react";
import { ExternalLink } from "lucide-react";
import { projects } from "../../data/mockData";
import { Project } from "../../types";
import { FiCode } from "react-icons/fi";

const Projects: React.FC = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projectCount = projects.length;
  const isSingleProject = projectCount === 1;

  return (
    // FIX: id diubah dari "projects" → "project-section" agar navbar bisa scroll ke sini
    <section id="project-section" className="py-20 bg-[#f7f6f4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-center text-gray-900 mb-4">
            My Projects
          </h1>
          <p className="text-xl max-w-3xl mx-auto text-gray-600 mb-6">
            Here are some of my featured projects that showcase my skills in
            full stack development.
          </p>
          <div className="w-24 h-1 bg-primary-600 mx-auto rounded-full" />
        </div>

        {/* Projects Grid */}
        <div
          className={
            isSingleProject
              ? "flex justify-center"
              : "grid md:grid-cols-2 lg:grid-cols-2 gap-8"
          }
        >
          {projects.map((project: Project) => (
            <div
              key={project.id}
              className={
                isSingleProject
                  ? "group relative rounded-3xl overflow-hidden bg-white shadow-lg transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl w-full max-w-2xl"
                  : "group relative rounded-3xl overflow-hidden bg-white shadow-lg transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl"
              }
            >
              <div
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Project Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Overlay Actions */}
                  <div
                    className={`absolute inset-0 flex items-center justify-center gap-4 transition-all duration-300 ${
                      hoveredProject === project.id ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {project.status === "development" ? (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition">
                        <FiCode className="w-6 h-6 mr-2" />
                        Still on developing
                      </div>
                    ) : (
                      <>
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-white text-primary-600 rounded-full hover:bg-primary-600 hover:text-white transition-colors duration-300 transform hover:scale-110"
                          >
                            <ExternalLink className="w-5 h-5" />
                          </a>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-primary-600 transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-sm mb-4 text-gray-600 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 4).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    {project.demoUrl && project.status !== "development" && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <button className="w-full px-4 py-2 rounded-xl font-medium bg-primary-600 text-black hover:bg-primary-700 shadow-lg transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-1">
                          <ExternalLink className="w-4 h-4" />
                          Live Demo
                        </button>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

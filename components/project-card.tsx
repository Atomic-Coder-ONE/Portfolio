"use client"

import type { JSX } from "react"

interface Project {
  id: number
  title: string
  description: string
  longDescription: string
  image: string
  technologies: string[]
  link?: string
}

interface ProjectCardProps {
  project: Project
  isActive: boolean
}

const techIcons: Record<string, JSX.Element> = {
  Python: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.13.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z" />
    </svg>
  ),
  C: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M11.5 2.5c-5.25 0-9.5 4.25-9.5 9.5s4.25 9.5 9.5 9.5c3.5 0 6.5-1.87 8.13-4.67l-2.75-1.58c-1.03 1.75-2.94 2.92-5.13 2.92-3.31 0-6-2.69-6-6s2.69-6 6-6c2.19 0 4.1 1.17 5.13 2.92l2.75-1.58C17.75 4.37 15 2.5 11.5 2.5z" />
    </svg>
  ),
  "C++": (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M22.394 6c-.167-.29-.398-.543-.652-.69L12.926.22c-.509-.294-1.34-.294-1.848 0L2.26 5.31c-.508.293-.923 1.013-.923 1.6v10.18c0 .294.104.62.271.91.167.29.398.543.652.69l8.816 5.09c.508.293 1.34.293 1.848 0l8.816-5.09c.254-.147.485-.4.652-.69.167-.29.27-.616.27-.91V6.91c.003-.294-.1-.62-.268-.91zM12 19.11c-3.92 0-7.109-3.19-7.109-7.11 0-3.92 3.19-7.11 7.11-7.11a7.133 7.133 0 016.156 3.553l-3.076 1.78a3.567 3.567 0 00-3.08-1.78A3.56 3.56 0 008.444 12 3.56 3.56 0 0012 15.555a3.57 3.57 0 003.08-1.778l3.078 1.78A7.135 7.135 0 0112 19.11zm5.556-5.555h-.889v.889h-.889v-.889h-.889v-.889h.889v-.889h.889v.889h.889v.889zm3.111 0h-.889v.889h-.889v-.889h-.889v-.889h.889v-.889h.889v.889h.889v.889z" />
    </svg>
  ),
  Go: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M1.811 10.231c-.047 0-.058-.023-.035-.059l.246-.315c.023-.035.081-.058.128-.058h4.172c.046 0 .058.035.035.07l-.199.303c-.023.036-.081.07-.117.07zM12 19.11c-3.92 0-7.109-3.19-7.109-7.11 0-3.92 3.19-7.11 7.11-7.11a7.133 7.133 0 016.156 3.553l-3.076 1.78a3.567 3.567 0 00-3.08-1.78A3.56 3.56 0 008.444 12 3.56 3.56 0 0012 15.555a3.57 3.57 0 003.08-1.778l3.078 1.78A7.135 7.135 0 0112 19.11zm5.556-5.555h-.889v.889h-.889v-.889h-.889v-.889h.889v-.889h.889v.889h.889v.889zm3.111 0h-.889v.889h-.889v-.889h-.889v-.889h.889v-.889h.889v.889h.889v.889z" />
    </svg>
  ),
  NumPy: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M10.315 4.876L6.3 2.831l-4.612 2.31 3.93 1.96zM13.685 4.876l4.7-2.352 4.311 2.157-3.93 1.96zM12 5.653L8.073 3.631l3.927-1.964 3.927 1.964zM6.778 9.834L2.856 7.877v4.603l3.922 1.96zM7.778 9.337v4.79l3.722 1.86v-4.79zM17.222 9.834l3.922-1.957v4.603l-3.922 1.96zM16.222 9.337v4.79l-3.722 1.86v-4.79zM12.5 17.24v4.79l3.722-1.86v-4.79zM11.5 17.24l-3.722 1.86v4.79l3.722-1.86z" />
    </svg>
  ),
  OpenGL: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <text x="2" y="17" fontSize="12" fontWeight="bold" fontFamily="sans-serif">
        GL
      </text>
    </svg>
  ),
  GLM: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M3 3h18v18H3V3zm16 16V5H5v14h14zM7 7h4v4H7V7zm6 0h4v2h-4V7zm0 4h4v2h-4v-2zm-6 4h10v2H7v-2z" />
    </svg>
  ),
  EGL: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  ),
  Glad: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  ),
  Wayland: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <circle cx="12" cy="12" r="10" fill="currentColor" />
      <path
        d="M6 8L8.5 16L12 9L15.5 16L18 8"
        stroke="black"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  Git: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.6-.719.721-1.881.721-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.34.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187" />
    </svg>
  ),
}

export function ProjectCard({ project, isActive }: ProjectCardProps) {
  return (
    <div
      className={`h-full w-full grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 md:p-12 lg:p-16 transition-opacity duration-500 ${
        isActive ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Left side - Description */}
      <div className="flex flex-col justify-center">
        <span className="text-emerald-400 font-mono text-sm mb-4 tracking-wide">Featured Project</span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 drop-shadow-lg">{project.title}</h2>
        <p className="text-gray-300 text-lg leading-relaxed mb-8">{project.longDescription}</p>

        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors font-medium w-fit group"
          >
            View Project
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        )}

        <div className="mt-auto pt-8">
          <span className="text-xs text-emerald-400/70 uppercase tracking-wider mb-4 block font-semibold">Built with</span>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
            {project.technologies.map((tech) => (
              <div
                key={tech}
                className="flex flex-col items-center gap-3 p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/20 hover:bg-emerald-950/50 hover:border-emerald-400/40 transition-all hover:shadow-[0_0_15px_rgba(34,197,94,0.2)] backdrop-blur-sm"
              >
                <div className="text-emerald-400">
                  {techIcons[tech] || (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                  )}
                </div>
                <span className="text-sm text-gray-300 text-center font-medium">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="flex items-center justify-center">
        <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-emerald-500/20 shadow-2xl shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-shadow">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none"></div>
          <img src={project.image || "/placeholder.svg"} alt={project.title} className="object-cover w-full h-full" />
        </div>
      </div>
    </div>
  )
}

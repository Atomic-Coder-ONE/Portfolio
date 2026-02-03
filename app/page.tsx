"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { HeroSection } from "@/components/hero-section"
import { ProjectsSection } from "@/components/projects-section"
import { ContactSection } from "@/components/contact-section"
import { GradFlow } from "@/components/grad-flow"

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentSection, setCurrentSection] = useState(0)
  const isScrollingRef = useRef(false)
  const lastScrollTime = useRef(0)
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0)
  const totalProjects = 4

  const gradFlowConfig = {
    color1: "#000000",
    color2: "#991515",
    color3: "#000000",
    speed: 0.7,
    scale: 3.0,
    noise: 0.17,
    type: "smoke" as const,
  }

  const scrollToSection = useCallback((index: number) => {
    if (isScrollingRef.current) return
    isScrollingRef.current = true
    setCurrentSection(index)
    setTimeout(() => {
      isScrollingRef.current = false
    }, 800)
  }, [])

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (currentSection === 1) return

      const now = Date.now()
      if (now - lastScrollTime.current < 800) return

      if (e.deltaY > 0 && currentSection === 0) {
        e.preventDefault()
        lastScrollTime.current = now
        scrollToSection(1)
      } else if (e.deltaY < 0 && currentSection === 2) {
        e.preventDefault()
        lastScrollTime.current = now
        scrollToSection(1)
      }
    },
    [currentSection, scrollToSection],
  )

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const now = Date.now()
      if (now - lastScrollTime.current < 800) return

      if (e.key === "ArrowDown") {
        e.preventDefault()
        lastScrollTime.current = now

        if (currentSection === 0) {
          // From hero, go to projects
          scrollToSection(1)
          setCurrentProjectIndex(0)
        } else if (currentSection === 1) {
          // In projects section, navigate through projects
          if (currentProjectIndex < totalProjects - 1) {
            setCurrentProjectIndex((prev) => prev + 1)
          } else {
            // Last project, go to contact
            scrollToSection(2)
          }
        }
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        lastScrollTime.current = now

        if (currentSection === 2) {
          // From contact, go back to projects (last project)
          scrollToSection(1)
          setCurrentProjectIndex(totalProjects - 1)
        } else if (currentSection === 1) {
          // In projects section, navigate through projects
          if (currentProjectIndex > 0) {
            setCurrentProjectIndex((prev) => prev - 1)
          } else {
            // First project, go back to hero
            scrollToSection(0)
          }
        }
      }
    },
    [currentSection, currentProjectIndex, scrollToSection, totalProjects],
  )

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.addEventListener("wheel", handleWheel, { passive: false })
    return () => container.removeEventListener("wheel", handleWheel)
  }, [handleWheel])

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  const handleProjectsComplete = useCallback(() => {
    scrollToSection(2)
  }, [scrollToSection])

  const handleProjectsGoBack = useCallback(() => {
    scrollToSection(0)
  }, [scrollToSection])

  const handleHeroScrollDown = useCallback(() => {
    scrollToSection(1)
    setCurrentProjectIndex(0)
  }, [scrollToSection])

  return (
    <div ref={containerRef} className="h-screen w-full overflow-hidden hide-scrollbar relative" tabIndex={0}>
      <div className="fixed inset-0 z-0">
        <GradFlow config={gradFlowConfig} />
      </div>

      <div
        className="fixed inset-0 z-[1] pointer-events-none transition-opacity duration-700 bg-black/50"
        style={{ opacity: currentSection === 0 ? 0 : 1 }}
      />

      <div
        className="transition-transform duration-700 ease-out relative z-10"
        style={{ transform: `translateY(-${currentSection * 100}vh)` }}
      >
        {/* Hero Section */}
        <div className="h-screen w-full">
          <HeroSection onScrollDown={handleHeroScrollDown} />
        </div>

        {/* Projects Section */}
        <div className="h-screen w-full">
          <ProjectsSection
            onComplete={handleProjectsComplete}
            onGoBack={handleProjectsGoBack}
            isActive={currentSection === 1}
            controlledIndex={currentProjectIndex}
            onIndexChange={setCurrentProjectIndex}
          />
        </div>

        {/* Contact Section */}
        <div className="h-screen w-full">
          <ContactSection />
        </div>
      </div>

      {/* Section indicators */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
        {["Hero", "Projects", "Contact"].map((name, index) => (
          <button
            key={name}
            onClick={() => {
              if (index === 1) {
                setCurrentProjectIndex(0)
              }
              scrollToSection(index)
            }}
            className="group flex items-center gap-3"
            aria-label={`Go to ${name} section`}
          >
            <span
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSection
                  ? "bg-emerald-400 scale-150 shadow-[0_0_10px_rgba(34,197,94,0.6)]"
                  : "bg-emerald-500/30 group-hover:bg-emerald-400/50"
              }`}
            />
            <span
              className={`text-xs font-medium transition-all duration-300 ${
                index === currentSection
                  ? "text-emerald-400 opacity-100"
                  : "text-gray-400 opacity-0 group-hover:opacity-100"
              }`}
            >
              {name}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

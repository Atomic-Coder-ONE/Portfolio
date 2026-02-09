"use client"

import { useRef, useEffect, useCallback, useState } from "react"
import { ProjectCard } from "./project-card"

const projects = [
  {
    id: 1,
    title: "DAM",
    description: "Neural Network Library",
    longDescription:
      "A lightweight neural network library built from scratch in Python and NumPy, designed as both an educational resource and a practical implementation of deep learning fundamentals. Features modular layers to support flexible model construction with numerical stability and efficiency through vectorized NumPy operations.",
    image: "/neural-network-deep-learning-visualization-dark-th.jpg",
    technologies: ["Python", "NumPy", "Git"],
    link: "https://github.com/Atomic-Coder-ONE/DAM-main.git",
  },
  {
    id: 2,
    title: "Face Recognition System",
    description: "Detects and identifies human faces in images or real-time video",
    longDescription:
      "A face recognition system built with OpenCV is a computer-vision setup that detects a human face in an image or video and then identifies whose face it is by comparing it with stored data",
    image: "/facerecog.jpg",
    technologies: ["OpenCV", "Python", "Machine Learning concepts", "Image processing techniques",],
    link: "https://github.com/Atomic-Coder-ONE/Face-Reco-Sysytem.git",
  },
  {
    id: 3,
    title: "Space Shooter ",
    description: "3D Game using Unity Engine",
    longDescription:
      "A 3D space shooter game built using the Unity engine. Features player movement, enemy AI, shooting mechanics, and particle effects.",
    image: "/spaceshooter.jpg",
    technologies: ["Unity", "C#", "Game Development"],
    link: "https://github.com/Atomic-Coder-ONE/Space-Shooter.git",
  },
  {
    id: 4,
    title: "Click Through Rate Prediction",
    description: "Predicts the likelihood of a user clicking on an advertisement",
    longDescription:
      "A machine learning model that predicts click-through rates for online advertisements. Uses historical data and user behavior patterns to estimate the probability of a user clicking on an ad.",
    image: "/clickthroughrate.jpg",
    technologies: ["Python", "Pandas", "Scikit-learn", "Machine Learning"],
    link: "https://github.com/Atomic-Coder-ONE/Click-Through-Rate-Prediction.git",
  },
]

interface ProjectsSectionProps {
  onComplete: () => void
  onGoBack: () => void
  isActive: boolean
  controlledIndex: number
  onIndexChange: (index: number) => void
}

export function ProjectsSection({
  onComplete,
  onGoBack,
  isActive,
  controlledIndex,
  onIndexChange,
}: ProjectsSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const lastScrollTime = useRef(0)

  const currentProject = controlledIndex

  // Neural network animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const canvasEl = canvas as HTMLCanvasElement

    const resizeCanvas = () => {
      canvasEl.width = window.innerWidth
      canvasEl.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    class Node {
      x: number
      y: number
      vx: number
      vy: number
      radius: number

      constructor() {
        this.x = Math.random() * canvasEl.width
        this.y = Math.random() * canvasEl.height
        this.vx = (Math.random() - 0.5) * 0.4
        this.vy = (Math.random() - 0.5) * 0.4
        this.radius = Math.random() * 1.5 + 0.5
      }

      update() {
        this.x += this.vx
        this.y += this.vy

        if (this.x < 0 || this.x > canvasEl.width) this.vx *= -1
        if (this.y < 0 || this.y > canvasEl.height) this.vy *= -1
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(34, 197, 94, 0.7)'
        ctx.fill()
      }
    }

    const nodes: Node[] = []
    const nodeCount = 80
    for (let i = 0; i < nodeCount; i++) {
      nodes.push(new Node())
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(4, 15, 12, 0.1)'
      ctx.fillRect(0, 0, canvasEl.width, canvasEl.height)

      nodes.forEach(node => {
        node.update()
        node.draw()
      })

      nodes.forEach((nodeA, i) => {
        nodes.slice(i + 1).forEach(nodeB => {
          const dx = nodeA.x - nodeB.x
          const dy = nodeA.y - nodeB.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 130) {
            ctx.beginPath()
            ctx.moveTo(nodeA.x, nodeA.y)
            ctx.lineTo(nodeB.x, nodeB.y)
            const opacity = (1 - distance / 130) * 0.4
            ctx.strokeStyle = `rgba(34, 197, 94, ${opacity})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (!isActive) return

      const now = Date.now()
      if (now - lastScrollTime.current < 800) return

      if (e.deltaY > 0) {
        if (currentProject < projects.length - 1) {
          e.preventDefault()
          e.stopPropagation()
          lastScrollTime.current = now
          onIndexChange(currentProject + 1)
        } else {
          e.preventDefault()
          e.stopPropagation()
          lastScrollTime.current = now
          onComplete()
        }
      } else {
        if (currentProject > 0) {
          e.preventDefault()
          e.stopPropagation()
          lastScrollTime.current = now
          onIndexChange(currentProject - 1)
        } else {
          e.preventDefault()
          e.stopPropagation()
          lastScrollTime.current = now
          onGoBack()
        }
      }
    },
    [currentProject, isActive, onComplete, onGoBack, onIndexChange],
  )

  useEffect(() => {
    const container = containerRef.current
    if (!container || !isActive) return

    container.addEventListener("wheel", handleWheel, { passive: false })
    return () => container.removeEventListener("wheel", handleWheel)
  }, [handleWheel, isActive])

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden">
      {/* Neural Network Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 bg-gradient-to-br from-slate-950 via-emerald-950/80 to-slate-950"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/3 via-transparent to-green-500/3"></div>

      {/* Radial glow effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.08),transparent_70%)]"></div>

      <div className="relative z-10 h-full">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={`absolute inset-0 transition-all duration-700 ease-out ${
              index === currentProject
                ? "opacity-100 translate-y-0"
                : index < currentProject
                  ? "opacity-0 -translate-y-full"
                  : "opacity-0 translate-y-full"
            }`}
          >
            <ProjectCard project={project} isActive={index === currentProject} />
          </div>
        ))}
      </div>

      {/* Project navigation dots - green themed */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => onIndexChange(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentProject 
                ? "bg-emerald-400 scale-150 shadow-[0_0_10px_rgba(34,197,94,0.5)]" 
                : "bg-emerald-500/30 hover:bg-emerald-400/50"
            }`}
            aria-label={`Go to project ${index + 1}`}
          />
        ))}
      </div>

      {/* Project counter - green themed */}
      <div className="absolute bottom-8 left-8 z-20 font-mono text-sm">
        <span className="text-emerald-400 font-bold">{String(currentProject + 1).padStart(2, "0")}</span>
        <span className="mx-2 text-gray-500">/</span>
        <span className="text-gray-400">{String(projects.length).padStart(2, "0")}</span>
      </div>
    </section>
  )
}

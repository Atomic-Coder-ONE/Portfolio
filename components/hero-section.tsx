"use client"

import { ChevronDown } from "lucide-react"
import { useEffect, useRef } from "react"

interface HeroSectionProps {
  onScrollDown: () => void
}

export function HeroSection({ onScrollDown }: HeroSectionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

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
        this.vx = (Math.random() - 0.5) * 0.5
        this.vy = (Math.random() - 0.5) * 0.5
        this.radius = Math.random() * 2 + 1
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
        ctx.fillStyle = 'rgba(34, 197, 94, 0.8)'
        ctx.fill()
      }
    }

    const nodes: Node[] = []
    const nodeCount = 100
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

          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(nodeA.x, nodeA.y)
            ctx.lineTo(nodeB.x, nodeB.y)
            const opacity = (1 - distance / 150) * 0.5
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

  const skills = {
    Languages: ["Python", "C++", "Go", "C#"],
    Web: ["HTML", "CSS", "JavaScript", "React"],
    ML: ["NumPy", "Pandas", "scikit-learn"]
  }

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Animated Neural Network Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-green-500/5"></div>

      {/* Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_50%)]"></div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6 drop-shadow-lg">
          Priyesh Kumar <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400">Pandey</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-6 drop-shadow">
          Driven computer science student with strong problem-solving skills. Building projects in AI/ML, Graphics
          Programming, and Backend Development.
        </p>

        {/* Skills Section */}
        <div className="space-y-3 mb-8">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="flex flex-wrap items-center justify-center gap-2">
              <span className="text-sm font-semibold text-emerald-400">{category}</span>
              {items.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1 text-xs font-mono bg-emerald-950/40 backdrop-blur-sm border border-emerald-500/30 rounded-md text-gray-200 hover:border-emerald-400 hover:bg-emerald-950/60 transition-all hover:shadow-[0_0_15px_rgba(34,197,94,0.3)]"
                >
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-8 mt-8">
          <div className="text-center backdrop-blur-sm bg-emerald-950/30 px-6 py-3 rounded-lg border border-emerald-500/30 hover:border-emerald-400 transition-all hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]">
            <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400">1033</div>
            <div className="text-xs text-gray-300 font-mono">Codeforces</div>
          </div>
          <div className="text-center backdrop-blur-sm bg-emerald-950/30 px-6 py-3 rounded-lg border border-emerald-500/30 hover:border-emerald-400 transition-all hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]">
            <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400">150+</div>
            <div className="text-xs text-gray-300 font-mono">Codolio</div>
          </div>
        </div>
      </div>

      <button
        onClick={onScrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-emerald-300 hover:text-emerald-200 transition-colors cursor-pointer group"
        aria-label="Scroll to projects"
      >
        <span className="text-sm font-medium">View Work</span>
        <ChevronDown className="w-6 h-6 animate-bounce" />
      </button>
    </section>
  )
}

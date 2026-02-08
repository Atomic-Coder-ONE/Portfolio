"use client"

import { Github, Linkedin, Mail } from "lucide-react"
import { useEffect, useRef } from "react"

export function ContactSection() {
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

    // Particle system for contact page
    class Particle {
      x: number
      y: number
      vx: number
      vy: number
      radius: number

      constructor() {
        this.x = Math.random() * canvasEl.width
        this.y = Math.random() * canvasEl.height
        this.vx = (Math.random() - 0.5) * 0.3
        this.vy = (Math.random() - 0.5) * 0.3
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
        ctx.fillStyle = 'rgba(34, 197, 94, 0.6)'
        ctx.fill()
      }
    }

    const particles: Particle[] = []
    for (let i = 0; i < 60; i++) {
      particles.push(new Particle())
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(4, 15, 12, 0.1)'
      ctx.fillRect(0, 0, canvasEl.width, canvasEl.height)

      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })

      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            const opacity = (1 - distance / 120) * 0.3
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

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-green-500/5"></div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

      <div className="relative z-10 text-center px-6 max-w-3xl">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
          {"Let's Work "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400">Together</span>
        </h2>
        <p className="text-lg text-gray-200 mb-12 max-w-xl mx-auto drop-shadow">
          {
            "I'm currently pursuing my B.Tech in Computer Science at Sharda University. Open to collaborations, internships, and exciting projects in AI/ML, Graphics Programming, or Backend Development."
          }
        </p>

        <a
          href="mailto:priyeshp667@gmail.com"
          className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white px-8 py-4 rounded-lg text-lg font-medium hover:from-emerald-400 hover:to-green-400 transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] mb-12"
        >
          <Mail className="w-5 h-5" />
          Get in Touch
        </a>

        <div className="flex justify-center gap-6">
          <a
            href="https://github.com/Atomic-Coder-ONE"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-emerald-950/50 backdrop-blur-sm border border-emerald-500/30 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/70 hover:border-emerald-400 transition-all hover:shadow-[0_0_15px_rgba(34,197,94,0.3)]"
            aria-label="GitHub"
          >
            <Github className="w-6 h-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/priyesh-pandey-961b67312/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-emerald-950/50 backdrop-blur-sm border border-emerald-500/30 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/70 hover:border-emerald-400 transition-all hover:shadow-[0_0_15px_rgba(34,197,94,0.3)]"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-6 h-6" />
          </a>
        </div>

        <p className="mt-16 text-sm text-gray-400/60 font-mono">© 2026 Priyesh Kumar Pandey • Built with passion & AI</p>
      </div>
    </section>
  )
}

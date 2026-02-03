"use client"

import { GradFlow as GradFlowComponent } from "gradflow"

interface GradFlowConfig {
  color1: string
  color2: string
  color3: string
  speed: number
  scale: number
  noise: number
  type: "smoke" | "wave" | "stripe" | "linear" | "animated" | "conic" | "silk"
}

interface GradFlowProps {
  config: GradFlowConfig
  className?: string
}

export function GradFlow({ config, className = "" }: GradFlowProps) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <GradFlowComponent
        config={{
          color1: config.color1,
          color2: config.color2,
          color3: config.color3,
          speed: config.speed,
          scale: config.scale,
          noise: config.noise,
          type: config.type,
        }}
      />
    </div>
  )
}

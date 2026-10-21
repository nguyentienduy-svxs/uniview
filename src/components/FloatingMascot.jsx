import { useEffect, useRef, useState } from 'react'

import mascotImage from '../assets/UniView_DUNG_MEO_TRONG_ANH_chop_mat_cuoi.webp'

function FloatingMascot({ discoveryLabel = 'ngành học' }) {
  const [motion, setMotion] = useState({ y: 0, tilt: 0, scale: 1 })
  const motionRef = useRef({ lastScrollY: 0, lastTime: 0, velocity: 0 })

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frameId = 0

    const handleScroll = () => {
      const now = performance.now()
      const currentY = window.scrollY
      const previous = motionRef.current
      const elapsed = Math.max(16, now - (previous.lastTime || now - 16))
      const frameVelocity = ((currentY - previous.lastScrollY) / elapsed) * 16

      motionRef.current = {
        lastScrollY: currentY,
        lastTime: now,
        velocity: Math.max(-34, Math.min(34, frameVelocity)),
      }
    }

    const animate = (time) => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0
      const velocity = prefersReducedMotion ? 0 : motionRef.current.velocity
      const baseY = (progress - 0.5) * Math.min(window.innerHeight * 0.42, 360)
      const bob = prefersReducedMotion ? 0 : Math.sin(time / 520) * 7
      const y = baseY + bob + velocity * 1.8

      setMotion({
        y,
        tilt: Math.max(-14, Math.min(14, velocity * 0.42)),
        scale: 1 + Math.min(Math.abs(velocity) * 0.0025, 0.08),
      })
      motionRef.current.velocity *= prefersReducedMotion ? 0 : 0.9
      frameId = window.requestAnimationFrame(animate)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    frameId = window.requestAnimationFrame(animate)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.cancelAnimationFrame(frameId)
    }
  }, [])

  return (
    <aside aria-label="Linh vật UniView bay theo thanh cuộn" className="pointer-events-none fixed right-1 top-1/2 z-40 sm:right-3 md:right-5">
      <div
        className="group pointer-events-auto relative w-[48px] drop-shadow-[0_18px_18px_rgba(29,78,216,0.22)] transition-transform duration-100 ease-out sm:w-[72px] md:w-[88px]"
        style={{ transform: `translate3d(0, ${motion.y}px, 0) rotate(${motion.tilt}deg) scale(${motion.scale})` }}
      >
        <img className="mascot-float w-full select-none" src={mascotImage} alt="Linh vật mèo UniView" draggable="false" />
        <span className="pointer-events-none absolute -left-0 top-0 -translate-x-full -translate-y-1/2 whitespace-nowrap rounded-2xl rounded-br-md bg-[#172033] px-3 py-1.5 text-xs font-bold text-white opacity-0 shadow-lg transition-all duration-200 group-hover:-translate-x-[calc(100%+8px)] group-hover:opacity-100">
          Meow meow! 🐾<br />
          Tôi là linh vật UniView<br />rất vui vì đồng hành cùng bạn<br />khám phá {discoveryLabel}.
        </span>
        <span className="absolute -left-3 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#93C5FD] opacity-70" />
        <span className="absolute -right-2 top-[28%] h-1.5 w-1.5 rounded-full bg-[#FBBF24] opacity-80" />
      </div>
    </aside>
  )
}

export default FloatingMascot

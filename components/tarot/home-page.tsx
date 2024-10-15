'use client'

import { Button } from "@/components/ui/button"
import { Star, Moon, Sun, Zap } from "lucide-react"

export function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[url('/images/wood.jpg')] bg-cover bg-center relative overflow-hidden">
      {/* Astrology symbol overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50">
        <div className="absolute top-10 left-10 text-yellow-300 opacity-30">
          <Star size={48} />
        </div>
        <div className="absolute top-20 right-20 text-blue-300 opacity-30">
          <Moon size={48} />
        </div>
        <div className="absolute bottom-[40%] left-10 text-orange-300 opacity-30">
          <Sun size={48} />
        </div>
        <div className="absolute bottom-[40%] right-20 text-purple-300 opacity-30">
          <Zap size={48} />
        </div>
      </div>

      {/* Content */}
      <div className="z-10 text-center absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 shadow-lg">
          TarotDOT: Daily Online Tarot Readings
        </h1>
        <Button className="bg-amber-600 hover:bg-amber-700 text-white text-lg py-6 px-8 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
          Get your reading now
        </Button>
      </div>

      {/* Tarot card table background */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-[url('/images/tarot-table.jpg')] bg-cover bg-center opacity-50"></div>
    </div>
  )
}
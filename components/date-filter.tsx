"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface DateFilterProps {
  dateRange: {
    start: string
    end: string
  }
  setDateRange: (dateRange: { start: string; end: string }) => void
}

export function DateFilter({ dateRange, setDateRange }: DateFilterProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <h3 className="text-sm font-medium">Date Range</h3>
        <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </motion.div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="space-y-3">
              <div>
                <label htmlFor="start-date" className="block text-xs text-gray-400 mb-1">
                  From
                </label>
                <input
                  type="date"
                  id="start-date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/40"
                />
              </div>
              <div>
                <label htmlFor="end-date" className="block text-xs text-gray-400 mb-1">
                  To
                </label>
                <input
                  type="date"
                  id="end-date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/40"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

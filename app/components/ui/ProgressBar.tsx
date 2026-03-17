import React from 'react'
import { motion } from 'framer-motion'

interface ProgressBarProps {
  progress: number;
  height?: string;
  showLabel?: boolean;
  color?: string;
}

const ProgressBar = ({ progress, height = 'h-2', showLabel = false, color = 'bg-primary' }: ProgressBarProps) => {
  const clampedProgress = Math.min(100, Math.max(0, progress))

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm font-bold text-primary">{clampedProgress}%</span>
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full ${height} overflow-hidden`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${clampedProgress}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`${height} ${color} rounded-full relative`}
        >
          {clampedProgress > 0 && (
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default ProgressBar
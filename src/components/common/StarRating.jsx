import { useState } from 'react'
import { MdStar, MdStarBorder } from 'react-icons/md'

export default function StarRating({ value = 0, max = 5, interactive = false, onChange, size = 18 }) {
  const [hovered, setHovered] = useState(0)
  const display = interactive && hovered ? hovered : value

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }, (_, i) => {
        const filled = i + 1 <= display
        return interactive ? (
          <button
            key={i}
            type="button"
            className="transition-transform hover:scale-110 focus:outline-none"
            onMouseEnter={() => setHovered(i + 1)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => onChange?.(i + 1)}
          >
            {filled
              ? <MdStar size={size} className="text-primary-500" />
              : <MdStarBorder size={size} className="text-neutral-300" />
            }
          </button>
        ) : (
          <span key={i}>
            {filled
              ? <MdStar size={size} className="text-primary-500" />
              : <MdStarBorder size={size} className="text-neutral-200" />
            }
          </span>
        )
      })}
    </div>
  )
}

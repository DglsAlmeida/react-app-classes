import { PlayCircle, Video } from "lucide-react";
import { LessonProps } from "./types";

export function Lesson({ title, duration, onPlay, isCurrent = false }: LessonProps) {
  const handleCurrentClasse = () => {
    onPlay()
  }

  return (
    <button
      className='flex items-center gap-3 text-sm text-zinc-400 data-[active=true]:text-emerald-400 enabled:hover:text-zinc-100'
      disabled={isCurrent}
      onClick={handleCurrentClasse}
      data-active={isCurrent}
    >
      {isCurrent ? (
        <PlayCircle className="w-4 h-4 text-emerald-400" />
      ) : (
        <Video />
      )}
      <span>{title}</span>
      <span className='ml-auto font-mono text-xs text-zinc-500'>{duration}</span>
    </button>
  )
}
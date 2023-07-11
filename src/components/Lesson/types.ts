export interface LessonProps {
  title: string
  duration: string
  onPlay: () => void;
  isCurrent?: boolean
}
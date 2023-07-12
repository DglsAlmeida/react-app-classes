import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronDown } from "lucide-react";
import { useCallback } from "react";
import { useStore } from '../../zustand-store';
import { Lesson } from "../Lesson";
import { ModuleProps } from "./types";

export function Module({ moduleIndex, title, amountOfLessons }: ModuleProps) {
  const { updateCurrentLesson, course, currentModuleIndex, currentLessonIndex: currentLesson } = useStore(store => {
    return {
      course: store.course,
      updateCurrentLesson: store.updateCurrentLesson,
      currentModuleIndex: store.currentModuleIndex,
      currentLessonIndex: store.currentLessonIndex,
    }
  })
  const lessons = course?.modules[moduleIndex].lessons

  const handleCurrentVideo = useCallback((currentModuleIndex: number, currentLessonIndex: number) => {
    updateCurrentLesson({ currentModuleIndex, currentLessonIndex })
  }, [])

  return (
    <Collapsible.Root className="group" defaultOpen={moduleIndex === 0}>
      <Collapsible.Trigger className='flex w-full items-center gap-3 bg-zinc-800 p-4'>
        <div className='flex h-10 w-10 rounded-full items-center justify-center bg-zinc-950 text-xs'>
          {moduleIndex + 1}
        </div>

        <div className='flex flex-col gap-1 text-left'>
          <strong className='text-sm'>{title}</strong>
          <span className='text-xs text-zinc-400'>{amountOfLessons} classes</span>
        </div>

        <ChevronDown className='w-5 h-5 ml-auto group-data-[state=open]:rotate-180 text-zinc-400' />
      </Collapsible.Trigger>

      <Collapsible.Content>
        <nav className='relative flex flex-col gap-4 p-6'>
          {lessons?.map((lesson, currentLessonIndex) => {
            const isCurrent = currentModuleIndex === moduleIndex && currentLesson === currentLessonIndex
            return (
              <Lesson key={lesson.id} title={lesson.title} isCurrent={isCurrent} duration={lesson.duration} onPlay={() => handleCurrentVideo(moduleIndex, currentLessonIndex)} />
            )
          })}
        </nav>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}
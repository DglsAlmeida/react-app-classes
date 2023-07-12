import { create } from "zustand";
import { api } from "../server/api";

interface Course {
  id: number;
  modules: Array<{
    id: number
    title: string
    lessons: Array<{
      id: string
      title: string
      duration: string
    }>
  }>
}

interface PlayerState {
  course: Course | null
  currentModuleIndex: number
  currentLessonIndex: number
  isLoading: boolean
  updateCurrentLesson: ({ currentModuleIndex, currentLessonIndex }: Partial<PlayerState>) => void
  nextLesson: () => void
  load: () => Promise<void>
}

export const useStore = create<PlayerState>((set, get) => {
  return {
    course: null,
    currentLessonIndex: 0,
    currentModuleIndex: 0,
    isLoading: false,

    load: async () => {
      set({ isLoading: true })

      const response = await api.get('/courses/1')

      set({
        course: response.data,
        isLoading: false,
      })
    },

    updateCurrentLesson: ({ currentModuleIndex, currentLessonIndex }: Partial<PlayerState>) => {
      set({
        currentModuleIndex,
        currentLessonIndex
      })
    },
    nextLesson: () => {
      let { course, currentModuleIndex, currentLessonIndex } = get()
      const currentModule = course?.modules[currentModuleIndex]
      const isLastModule = course?.modules.length! - 1 === currentModuleIndex
      const isLastLesson = currentModule!.lessons.length - 1 === currentLessonIndex

      if (!isLastLesson) {
        set({
          currentLessonIndex: currentLessonIndex + 1
        })
      }

      if (isLastLesson && !isLastModule) {
        set({
          currentModuleIndex: currentModuleIndex + 1,
          currentLessonIndex: 0,
        })
      }
    }
  }
})

export const useCurrentLesson = () => {
  const { currentModuleIndex, currentLessonIndex, course } = useStore(store => {
    return {
      course: store.course,
      currentModuleIndex: store.currentModuleIndex,
      currentLessonIndex: store.currentLessonIndex,
    }
  })

  const currentModule = course?.modules[currentModuleIndex]

  const currentLesson =
    currentModule?.lessons[currentLessonIndex]

  return { currentModule, currentLesson }
}

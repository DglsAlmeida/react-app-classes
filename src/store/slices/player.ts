import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { api } from "../../server/api";

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
}

const initialState: PlayerState = {
  course: null,
  currentLessonIndex: 0,
  currentModuleIndex: 0,
  isLoading: false,
}

export const loadCourse = createAsyncThunk(
  'player/load',
  async () => {
    const response = await api.get('/courses/1')
    return response.data
  }
)

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    start: (state, action: PayloadAction<Course>) => {
      state.course = action.payload
    },

    updateCurrentLesson: (state, action: PayloadAction<{ currentModuleIndex: number, currentLessonIndex: number }>) => {
      state.currentModuleIndex = action.payload.currentModuleIndex
      state.currentLessonIndex = action.payload.currentLessonIndex
    },
    nextLesson: (state) => {
      const currentModule = state.course?.modules[state.currentModuleIndex]
      const isLastModule = state.course?.modules.length! - 1 === state.currentModuleIndex
      const isLastLesson = currentModule!.lessons.length - 1 === state.currentLessonIndex

      if (!isLastLesson) {
        state.currentLessonIndex += 1
      }

      if (isLastLesson && !isLastModule) {
        state.currentModuleIndex += 1
        state.currentLessonIndex = 0
      }
    }
  },
  extraReducers(builder) {
    builder.addCase(loadCourse.pending, (state) => {
      state.isLoading = true 
    }),
    builder.addCase(loadCourse.fulfilled, (state, action) => {
      state.course = action.payload
      state.isLoading = false
    })
  }
})

export const { updateCurrentLesson, nextLesson, start } = playerSlice.actions

export const useCurrentLesson = (state: RootState) => {
  const { currentLessonIndex, currentModuleIndex } = state.player

  const currentModule = state.player.course?.modules[currentModuleIndex]

  const currentLesson =
    currentModule?.lessons[currentLessonIndex]

  return { currentModule, currentLesson }
}


export const player = playerSlice.reducer
import { act } from "react-dom/test-utils";
import { beforeEach, describe, expect, it } from "vitest";
import { useStore as store } from './';

const initialState = store.getState()

describe("zustand store", () => {
  beforeEach(() => {
    store.setState(initialState)
  })

  it('should be able to play', () => {
    const { updateCurrentLesson } = store.getState()

    updateCurrentLesson({ currentModuleIndex: 1, currentLessonIndex: 2 })

    const { currentModuleIndex, currentLessonIndex } = store.getState()

    expect(currentModuleIndex).toEqual(1)
    expect(currentLessonIndex).toEqual(2)
  })

  
  it('should be able to play next video automatically', () => {
    const { nextLesson, updateCurrentLesson } = store.getState()

    updateCurrentLesson({ currentModuleIndex: 0, currentLessonIndex: 0 })

    act(() => {
      nextLesson()
    })

    const { currentModuleIndex, currentLessonIndex } = store.getState()
    
    expect(currentModuleIndex).toEqual(0)
    expect(currentLessonIndex).toEqual(1)
  })
})
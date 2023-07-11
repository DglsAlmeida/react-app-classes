import { describe, expect, it } from 'vitest'
import { nextLesson, playerSlice } from '../../store/slices/player'
import { player as reducer, updateCurrentLesson } from './player'

describe('player slice', () => {
  it('should be able to play', () => {
    const initialState = playerSlice.getInitialState()

    const state = reducer(initialState, updateCurrentLesson({ currentModuleIndex: 1, currentLessonIndex: 2 }))

    expect(state.currentModuleIndex).toEqual(1)
    expect(state.currentLessonIndex).toEqual(2)
  })

  it('should be able to play next video automatically', () => {
    const initialState = playerSlice.getInitialState()

    const state = reducer(initialState, nextLesson())

    expect(state.currentModuleIndex).toEqual(0)
    expect(state.currentLessonIndex).toEqual(1)
  })

  it('should be able to jump to the next module automatically', () => {
    const initialState = playerSlice.getInitialState()

    const state = reducer({
      ...initialState,
      currentLessonIndex: 1,
    }, nextLesson())

    expect(state.currentModuleIndex).toEqual(0)
    expect(state.currentLessonIndex).toEqual(2)
  })
})
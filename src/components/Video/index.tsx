import { Loader } from "lucide-react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { nextLesson, useCurrentLesson } from "../../store/slices/player";

export function Video() {
  const dispatch = useAppDispatch()

  const { currentLesson } = useSelector(useCurrentLesson)
  const isCourseLoading = useSelector((state: RootState) => state.player.isLoading)

  const handlePlayNext = () => {
    dispatch(nextLesson())
  }

  return (
    <div className='w-full bg-zinc-950 aspect-video'>
      {isCourseLoading ? (
        <div className="flex h-full items-center justify-center">
          <Loader className="w-6 h-6 text-zinc-400 animate-spin" />
        </div>
      ) : (
        <ReactPlayer
          width="100%"
          height="100%"
          controls
          onEnded={handlePlayNext}
          url={`https://www.youtube.com/watch?v=${currentLesson?.id}`}
        />
      )}
    </div>
  )
}
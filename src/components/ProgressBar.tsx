import * as Progress from '@radix-ui/react-progress';

interface ProgressBarProps{
  progress: number
}

export function ProgressBar(props: ProgressBarProps) {
  return (
      // <div className='h-3 rounded-xl bg-zinc-700 w-full mt-4'>
      //   <div 
      //     role={'progressbar'}
      //     aria-label='Progresso de hábitos'
      //     aria-valuenow={75}
      //     className='h-3 rounded-xl bg-violet-600 w-1/2' 
      //   />
      // </div> 

          <Progress.Root value={100} className='h-3 rounded-xl bg-zinc-700 w-full mt-4'>
            <Progress.Indicator 
              className='h-3 rounded-xl bg-violet-600'
              style={{width:` ${props.progress}% `}}
            />
          </Progress.Root>
  )
}

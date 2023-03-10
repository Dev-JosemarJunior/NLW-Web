import * as Checkbox from "@radix-ui/react-checkbox";
import dayjs from "dayjs";
import { Check } from "phosphor-react";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";

interface HabitsListProps {
  date: Date,
  onCompletedChange: (completed: number) => void
}

interface HabitsInfo {
  possibleHabits: {
    id: string,
    title: string,
    created_at: string
  }[],
  completedHabits: string[]
}

export default function HabitsList({ date, onCompletedChange }: HabitsListProps) {

  const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>()

  useEffect(() => {
    api.get('/day', {
      params: {
        date: date.toISOString()
      }
    }).then((response) => {
      setHabitsInfo(response.data)
    })
  }, [])

  const isDateInPast = dayjs(date).endOf('day').isBefore(new Date);

  async function handleToggleHabit(habitId: string) {
    api.patch(`/habits/${habitId}/toggle`)

    const isHabitCompleted = habitsInfo!.completedHabits.includes(habitId)
    let completedHabits: string[] = []

    if (isHabitCompleted) {
      completedHabits = habitsInfo!.completedHabits.filter(id => id !== habitId)
    } else {
      completedHabits = [...habitsInfo!.completedHabits, habitId]
    }
    setHabitsInfo({
      possibleHabits: habitsInfo!.possibleHabits,
      completedHabits,
    })

    onCompletedChange(completedHabits.length)
  }

  return (
    <div className='mt-6 flex flex-col gap-3'>

      {
        habitsInfo?.possibleHabits.map((habit) => {
          return (
            <Checkbox.Root
              key={habit.id}
              checked={habitsInfo.completedHabits.includes(habit.id)}
              disabled={isDateInPast}
              onCheckedChange={() => handleToggleHabit(habit.id)}
              className='flex items-center gap-3 group transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus: ring-offset-background disabled:cursor-not-allowed '
            >

              <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500  group-data-[state=checked]:border-green-500 transition-colors duration-300 ease-in-out'>
                <Checkbox.Indicator>
                  <Check size={20} className='text-white' />
                </Checkbox.Indicator>
              </div>

              <span className='font-semibold text-xl text-white leading-tight transition-all duration-300 ease-in-out group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400 '>
                {habit.title}
              </span>
            </Checkbox.Root>
          )
        })
      }
    </div>
  )
}

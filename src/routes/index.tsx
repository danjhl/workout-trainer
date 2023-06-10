
import Exercise from "~/components/Exercise";
import { createStore } from "solid-js/store";

export default function Home() {
  let current = 0;

  let list = [
    {id: 0, name: 'Situps', time: 1, reps: 5, sets: 5, active: true, done: false},
    {id: 1, name: 'Pushups', time: 1, reps: 5, sets: 5, active: false, done: false},
    {id: 2, name: 'Curls', time: 1, reps: 5, sets: 5, active: false, done: false},
    {id: 3, name: 'Squats', time: 1, reps: 5, sets: 5, active: false, done: false}
  ];

  let [exercises, setExercises] = createStore(list)

  const finishStep = () => {
    if (current > 0) {
      setExercises((e, i) => i === current - 1, "active", active => false);
      setExercises((e, i) => i === current - 1, "done", done => true);
    }
    if (current < list.length) {
      setExercises((e, i) => i === current, "active", active => true);
    }
  };

  const next = () => {
    let ex = list[current];
    current += 1;
    if (current > list.length) {
      return;
    }
    setTimeout(() => {
      finishStep();
      next();
    }, ex.time * 1000);
  };

  next();

  return (
    <main class="text-center text-gray-700 p-4" >
      <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">
        Simple Starter Workout
      </h1>

      <div class="flex flex-col h-screen items-center pl-10 pr-10">
        <ol class="relative border-l border-gray-200">
          <For each={exercises}>
          { (exercise, i) => {
            return <li>
              <Exercise exercise={exercise} />
            </li>
          }}
          </For>
        </ol>
      </div>
    </main>
  );
}

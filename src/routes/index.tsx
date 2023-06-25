
import { Exercise, ExerciseProp, State } from "~/components/Exercise";
import { createStore } from "solid-js/store";
import { createSignal } from "solid-js";

export default function Home() {
  let current = 0;

  // todo read from url
  // https://workoutqr/situps[5,5,6],pullups[5,5],curls[5,10,8]

  let list = [
    {id: 0, name: 'Curls', time: 1, reps: 5, sets: 5, state: State.Ready},
    {id: 1, name: 'Pause', time: 1, reps: 0, sets: 0, state: State.Inactive},
    {id: 2, name: 'Pushups', time: 1, reps: 5, sets: 5, state: State.Inactive},
    {id: 3, name: 'Pause', time: 1, reps: 0, sets: 0, state: State.Inactive},
    {id: 4, name: 'Triceps Curls', time: 1, reps: 5, sets: 5, state: State.Inactive},
    {id: 5, name: 'Pause', time: 1, reps: 0, sets: 0, state: State.Inactive},
    {id: 6, name: 'Chest Curls', time: 1, reps: 5, sets: 5, state: State.Inactive}
  ];

  let [exercises, setExercises] = createStore(list)

  const setState = (index: number, newState: State) => {
    setExercises((e, i) => i === index , "state", state => newState);
  };

  let time = -1;
  let tickInterval;
  let paused = false;

  const nextEx = () => {
    let next = current + 1;
    setState(current, State.Done);
    setState(next, State.Running);
    time = list[next].time;
    current = next;
  };

  const startTicking = () => {
    if (time === -1) {
      time = list[current].time;
      setState(current, State.Running);
      playSound('next_exercise');
    }
    tickInterval = setInterval(() => {
      console.log('tick', time)
      let isLast = current == list.length - 1;
      if (isLast && time == 0) {
        setState(current, State.Done);
        clearInterval(tickInterval);
        playSound('finish');
      }
      if (time > 0 && !paused) {
        time -= 1;
      }
      if (time == 30) {
        playSound('30_seconds_left');
      }
      if (time == 10) {
        playSound('10_seconds_left');
      }
      if (time == 0 && !isLast) {
        if (list[current + 1].name === 'Pause') {
          playSound('take_a_break');
        } else {
          playSound('next_exercise');
        }
        nextEx();
      }
    }, 1000);  
  };

  const play = () => {
    console.log('current', current)
    if (time == -1) {
      startTicking();
    } else {
      resume();
    }
  };

  const pause = () => {
    setState(current, State.Ready);
    paused = true;
  };

  const resume = () => {
    setState(current, State.Running);
    paused = false;
  };

  return (
    <main class="text-center text-gray-700 p-4" >
      <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">
        Simple Starter Workout
      </h1>

      <div class="flex flex-col h-screen items-center pl-10 pr-10">
        <ol class="relative border-l border-gray-200">
          <For each={exercises}>
            { (ex, i) => {
              return <li class="flex">
                <span class={circle(ex.state)}>
                  <Show when={ex.state === State.Done}><Check/></Show>
                  <Show when={ex.state === State.Ready}><Play play={play}/></Show>
                  <Show when={ex.state === State.Running}><Pause pause={pause}/></Show>
                </span>
                <Exercise ex={ex} />
              </li>
            }}
          </For>
        </ol>
      </div>
    </main>
  );
}

function circle(state: State): string {
  let circleColor = state === State.Done || state === State.Inactive
    ? 'bg-gray-400'
    : 'bg-sky-700';

  return `absolute -left-5 flex items-center justify-center w-10 h-10 mt-2 ${circleColor} rounded-full ring-4 ring-white`;
}

function Pause(props) {
  return <a href="#" class="text-2xl text-white hover:text-gray-200" onClick={props.pause}>&#x23F8;&#xFE0E;</a>
}

function Play(props) {
  return <a href="#" class="pl-1 text-2xl text-white hover:text-gray-200" onClick={props.play}>&#x23F5;&#xFE0E;</a>
}

function Check() {
  return <div class="text-3xl text-white">&#10003;</div>
}

function playSound(file) {
  let audio = document.createElement('audio');
  audio.style.display = 'none';
  audio.src = '/mp3/' + file + '.mp3';
  audio.autoplay = true;
  audio.onended = function() { this.remove(); };
  document.body.appendChild(audio);
}
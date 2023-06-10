type Exercise = {
  name: string,
  time: number,
  reps: number,
  sets: number,
  active: boolean,
  done: boolean
}

type Props = {
  exercise: Exercise,
  done: boolean
}

export default function Exercise(props: Props) {
  return (
    <div>
      <span class={circle(props.exercise.active)}>
        <Show when={props.exercise.done}>
          <div class="text-3xl text-white">&#10003;</div>
        </Show>
      </span>
      <div class="block pl-20 mb-10">
        <h2 class={title(props.exercise.active)}>{props.exercise.name}</h2>
       <div class={content(props.exercise.active)}>{props.exercise.reps} reps - {props.exercise.sets} sets - {displayTime(props.exercise.time)}</div>
      </div>
    </div>
  );
}

function circle(active: boolean): string {
  let circleColor = active
    ? 'bg-sky-700'
    : 'bg-gray-400';

  return `absolute -left-5 flex items-center justify-center w-10 h-10 mt-2 ${circleColor} rounded-full ring-4 ring-white`;
}

function title(active: boolean): string {
  return 'text-3xl mb-2' + (active ? '' : ' text-gray-400')
}

function content(active: boolean): string {
  return active ? '' : 'text-gray-400';
}

function displayTime(time: number): string {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  let minutesStr = String(minutes).padStart(2, '0');
  let secondsStr = String(seconds).padStart(2, '0');

  return `${minutesStr}:${secondsStr}`;
}

export type ExerciseProp = {
  name: string,
  time: number,
  reps: number,
  sets: number,
  state: State
}

export enum State {
  Ready,
  Running,
  Done,
  Inactive
}

export function Exercise(props) {
  return (
    <div>
      <div class="block pl-20 mb-10">
        <h2 class={title(props.ex.state)}>{props.ex.name}</h2>
       <div class={content(props.ex.state)}>{props.ex.reps} reps - {props.ex.sets} sets - {displayTime(props.ex.time)}</div>
      </div>
    </div>
  );
}

function title(state: State): string {
  return 'text-3xl mb-2' + (!inactive(state) ? '' : ' text-gray-400')
}

function content(state: State): string {
  return !inactive(state) ? '' : 'text-gray-400';
}

function inactive(state: State): boolean {
  return state === State.Inactive || state === State.Done;
}

function displayTime(time: number): string {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  let minutesStr = String(minutes).padStart(2, '0');
  let secondsStr = String(seconds).padStart(2, '0');

  return `${minutesStr}:${secondsStr}`;
}

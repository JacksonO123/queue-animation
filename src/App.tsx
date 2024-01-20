import { createSignal } from "solid-js";
import Queue from "./utils/queue";
import QueueComp from "./components/QueueComp";
import errors from "./utils/errors";
import "./App.scss";
import ErrorMessages from "./components/ErrorMessages";

type ChangeEvent = Event & {
  currentTarget: HTMLInputElement;
  target: HTMLInputElement;
};

function App() {
  let size = 6;
  let queue = new Queue(size, 0);
  const [arr, setArr] = createSignal(queue.getArr());
  const [front, setFront] = createSignal(-1);
  const [back, setBack] = createSignal(-1);
  const [input, setInput] = createSignal("");
  const [errorList, setErrorList] = createSignal<string[]>([]);
  const errorMessageLength = 2500;

  const removeError = () => {
    setTimeout(() => {
      setErrorList((prev) => [...prev.slice(1)]);
    }, errorMessageLength);
  };

  errors.onError((error) => {
    setErrorList((prev) => [...prev, error]);
    removeError();
  });

  const updateInput = (e: ChangeEvent) => {
    const value = e.currentTarget.value;
    setInput(value);
  };

  const updateValues = () => {
    setArr([...queue.getArr()]);
    setFront(queue.getFront());
    setBack(queue.getBack());
  };

  const handlePush = () => {
    if (input().length === 0) return;

    const value = +input();
    setInput("");

    queue.enqueue(value);
    updateValues();
  };

  const handleDequeue = () => {
    queue.dequeue();

    updateValues();
  };

  const updateQueueSize = (e: ChangeEvent) => {
    const queueMin = 1;
    const queueMax = 25;
    const value = Math.max(
      Math.min(Math.floor(+e.currentTarget.value), queueMax),
      queueMin,
    );

    size = value;
  };

  const updateQueue = () => {
    queue = new Queue(size, 0);
    updateValues();
  };

  return (
    <div class="wrapper">
      <ErrorMessages messages={errorList} />

      <div class="controls">
        <input
          placeholder="Queue length"
          type="number"
          onChange={updateQueueSize}
          style={{
            width: "110px",
          }}
        />
        <button onClick={updateQueue}>Update Size</button>
      </div>

      <QueueComp queue={arr()} front={front()} back={back()} />

      <div class="controls">
        <input
          value={input()}
          onChange={updateInput}
          type="number"
          placeholder="Enter a number to enqueue"
          style={{
            width: "180px",
          }}
        />
        <button onClick={handlePush}>Enqueue</button>
        <button onClick={handleDequeue} class="dequeue-button">
          Dequeue
        </button>
      </div>
    </div>
  );
}

export default App;

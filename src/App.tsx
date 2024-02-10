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
  let queue = new Queue(size, "0");
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
    let value = e.currentTarget.value;

    const maxLen = 2;
    value = value.slice(0, maxLen);

    console.log(value);

    setInput(value);
  };

  const updateValues = () => {
    setArr([...queue.getArr()]);
    setFront(queue.getFront());
    setBack(queue.getBack());
  };

  const handlePush = () => {
    if (input().length === 0) return;

    const value = input();
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
    queue = new Queue(size, "0");
    updateValues();
  };

  return (
    <div class="wrapper">
      <ErrorMessages messages={errorList} />

      <div class="info-panel">
        <h1>Circular Queue Visualization</h1>

        <details>
          <summary>Instructions</summary>

          <ul>
            <li>
              Enter a number in the bottom input and press enter or click
              enqueue to add it to the queue
            </li>
            <li>Click dequeue to remove an item</li>
            <li>
              Enter a number in the top input and press enter or click update
              size to resize the queue
            </li>
          </ul>
        </details>

        <span>By Jackson Otto</span>
      </div>

      <div class="controls">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            placeholder="Queue length"
            type="number"
            onInput={updateQueueSize}
            style={{
              width: "110px",
            }}
          />
          <button onClick={updateQueue} type="submit">
            Update Size
          </button>
        </form>
      </div>

      <QueueComp queue={arr()} front={front()} back={back()} />

      <div class="controls">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            value={input()}
            onInput={updateInput}
            placeholder="Enter a number to enqueue"
            style={{
              width: "180px",
            }}
          />
          <button onClick={handlePush} type="submit">
            Enqueue
          </button>
          <button onClick={handleDequeue} class="dequeue-button" type="button">
            Dequeue
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;

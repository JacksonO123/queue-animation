import "./QueueComp.scss";

const size = 30;
const gap = 4;
const border = 2;

type InfoRailProps = {
  position: number;
  children: string;
  background: string;
  orientation: "above" | "below";
};

const InfoRail = (props: InfoRailProps) => {
  return (
    <div
      style={{
        "margin-left": `${
          (props.position + 1) * size +
          gap * (props.position + 1) +
          border * 2 * (props.position + 1)
        }px`,
        background: props.background,
      }}
      class="rail-info"
    >
      <div
        class={`pointing-box ${
          props.orientation === "above" ? "box-above" : "box-below"
        }`}
        style={{ background: props.background }}
      />
      <span>{props.children}</span>
    </div>
  );
};

type QueueComp<T> = {
  queue: T[];
  front: number;
  back: number;
};

const QueueComp = <T,>(props: QueueComp<T>) => {
  const sizeStyle = {
    height: `${size}px`,
    width: `${size}px`,
  };

  return (
    <div class="queue-wrapper">
      <InfoRail position={props.front} background="#007bff" orientation="below">
        Head
      </InfoRail>
      <div class="queue-items">
        <div class="item null" style={sizeStyle} />
        {props.queue.map((item) => (
          <div style={sizeStyle} class="item">
            {item + ""}
          </div>
        ))}
      </div>
      <InfoRail position={props.back} background="#489c4d" orientation="above">
        Tail
      </InfoRail>
    </div>
  );
};

export default QueueComp;

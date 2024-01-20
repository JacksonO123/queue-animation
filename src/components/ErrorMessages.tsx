import { Accessor, For } from "solid-js";
import ErrorMessage from "./ErrorMessage";
import "./ErrorMessages.scss";

type ErrorMessagesProps = {
  messages: Accessor<string[]>;
};

const ErrorMessages = (props: ErrorMessagesProps) => {
  return (
    <div class="error-messages">
      <For each={props.messages()}>
        {(message) => <ErrorMessage message={message} />}
      </For>
    </div>
  );
};

export default ErrorMessages;

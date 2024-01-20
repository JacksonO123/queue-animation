import "./ErrorMessage.scss";

type ErrorMessageProps = {
  message: string;
};

const ErrorMessage = (props: ErrorMessageProps) => {
  return <div class="error-message">{props.message}</div>;
};

export default ErrorMessage;

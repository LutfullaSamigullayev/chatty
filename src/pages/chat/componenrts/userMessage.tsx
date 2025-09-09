import { Icons } from "../../../icons";
import { userMessageType } from "../../../types";
import './userMessageStyle.css'

export function UserMessage({ message, time, receiver, read }: userMessageType) {
  return (
    <div className={`user-message-box ${receiver ? 'blue right-message' : 'gray'}`}>
      <p className={`user-message  `}>{message}</p>
      <div className="user-message-time">
        <p>{time}</p>
        {receiver ? read ? <Icons.read2 /> : <Icons.read /> : ''}
      </div>
    </div>
  );
}

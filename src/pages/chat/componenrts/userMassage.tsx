import { Icons } from "../../../icons";
import { userMassageType } from "../../../types";
import './userMassageStyle.css'

export function UserMassage({ massage, time, receiver, read }: userMassageType) {
  return (
    <div className={`user-massage-box ${receiver ? 'blue' : 'gray'}`}>
      <p className={`user-massage  `}>{massage}</p>
      <div className="user-massage-time">
        <p>{time}</p>
        {receiver ? read ? <Icons.read2 /> : <Icons.read /> : ''}
      </div>
    </div>
  );
}

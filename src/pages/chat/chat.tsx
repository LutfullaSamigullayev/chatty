import { InputSearch, UserContact } from './componenrts'
import './componenrts/chatStyle.css'

export function Chat() {
  return (
    <div className="chat-wrapper">
      <div className='contacts-box'>
        <InputSearch />
      {/* <UserContact userImgUrl='/users/user1.jpg' userName='Bill Kuphal' massage='The weather will be perfect for the great salom salom' time='9:41 AM' massageCount={80} isActive/> */}
      
      </div>
    </div>
  )
}

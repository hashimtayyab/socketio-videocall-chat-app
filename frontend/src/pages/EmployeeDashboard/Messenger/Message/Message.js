import React from 'react'
import './Message.css'

function Message({message, own}) {
    function formatTime(time){
      if(time !==null){
        var time = new Date(time);
        var fullTime = time.getHours() + ":" + time.getMinutes() 
        return fullTime;
      }
  }
  return (
    <div className={own? 'message own' : 'message'}>
        <div className='messageTop'>
            <p className='textMessage'>
                {message? (<>{message.text}
                </>
                )
              :(
                <>No Message</>
              )}
            </p>
            <p className='messageTime'>{formatTime(message.createdAt)}</p>
        </div>
    </div>
  )
}

export default Message
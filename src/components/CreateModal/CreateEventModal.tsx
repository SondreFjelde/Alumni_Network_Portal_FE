import { CalendarEvent } from "kalend/common/interface";
import React, { useState } from "react";
import { Event } from "../../common/interface/Event";
import { addEvent, addEventGroup, addEventTopic } from "../../common/util/API";
import { useUserStore } from "../../common/util/Store/userStore";



interface CreateEventProps{
  id: number,
  target: string
  
}
export default function CreateEventModal({id, target}: CreateEventProps) {
  
  const userState = useUserStore((state) => state)
  const [showModal, setShowModal] = useState(false);
  const [event, setEvent] = useState<Event>({id: 0, name: "", description: "", lastUpdated: "", startTime: "", endTime: "", allowGuests: true, usersAccepted: undefined, author: userState.User, topics: undefined, groups: undefined })
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(new Date())


  const createEvent = async () => {
//2022-10-29T19:00:00
    const myStartTime = startDate.getFullYear().toString() + "-" + (("00" +(startDate.getMonth() + 1)).toString()).slice(-2) + "-" + ("00" + startDate.getDate().toString()).slice(-2) + "T" + ("00" +startDate.getHours().toString()).slice(-2) + ":" + ("00" + startDate.getMinutes().toString()).slice(-2) + ":00"
    const myEndTime = endDate.getFullYear().toString() + "-" + (("00" + (endDate.getMonth()+1)).toString()).slice(-2) + "-" + ("00" + endDate.getDate().toString()).slice(-2) + "T" + ("00" +endDate.getHours().toString()).slice(-2) + ":" + ("00" + endDate.getMinutes().toString()).slice(-2) + ":00"

    if(target === 'topic'){
      const topic = userState.User.topics.find(x=>x.id===id)
      const eventUpdate: Event = {id: 0, name: "", description: "", lastUpdated: "", startTime: "", endTime: "", allowGuests: true, usersAccepted: undefined, author: userState.User, topics: [topic!] }
      setEvent(eventUpdate)
      const req: Event = await addEvent(event.name, event.description,myStartTime, myEndTime); // Add target
      await addEventTopic(req.id, topic!.id);
      userState.User.authoredEvents.push(req)

    }
    else if(target === 'group'){
      const group = userState.User.groups.find(x=>x.id===id)
      const groupUpdate: Event = {id: 0, name: "", description: "", lastUpdated: "", startTime: "", endTime: "", allowGuests: true, usersAccepted: undefined, author: userState.User, groups: [group!] }
      setEvent(groupUpdate)
      const req: Event = await addEvent(event.name, event.description,myStartTime, myEndTime); // Add target
      await addEventGroup(req.id, group!.id);
      userState.User.authoredEvents.push(req)

    }

  }

  const createStartDate = (date:string) => {
    const year = parseInt(date.slice(0,4))
    startDate.setFullYear(year)
    const month = parseInt(date.slice(5,7))-1
    startDate.setMonth(month)
    const day = parseInt(date.slice(8,10))
    startDate.setDate(day)

    

  }

  const createStartTime = (time:string) => {
    const hour = parseInt(time.slice(0,2))
    const minute = parseInt(time.slice(3,5))
    startDate.setHours(hour,minute)

    
  }

  const createEndDate = (date:string) => {
    const year = parseInt(date.slice(0,4))
    endDate.setFullYear(year)
    const month = parseInt(date.slice(5,7))-1
    endDate.setMonth(month)
    const day = parseInt(date.slice(8,10))
    endDate.setDate(day)

    
  }
  const createEndTime = (time:string) => {
    const hour = parseInt(time.slice(0,2))
    const minute = parseInt(time.slice(3,5))
    endDate.setHours(hour,minute)

    
  }

  return (
    <>
      <button
        className="px-4 flex py-2 bg-indigo-500 outline-none rounded text-white shadow-indigo-200 shadow-lg font-medium active:shadow-none active:scale-95 hover:bg-indigo-600 focus:bg-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200"
        type="button"
        onClick={() => setShowModal(true)}
      >
        New Event
      </button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-full my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Create Event
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <form className="bg-white-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                  <label className="block text-black text-sm font-bold mb-1">
                    Name of Event
                  </label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" required onChange={(e) => 
                  {
                      setEvent((state) => ({...state, name: e.target.value}))}} />
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Description</label>
                  <textarea id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Description..."
                  onChange={(e) => 
                      {
                          setEvent((state) => ({...state, description: e.target.value}))}} />

                  <label className="block text-black text-sm font-bold mb-1" htmlFor="start">Start date:</label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" type="date" id="start" name="trip-start" max="2100-12-31" onChange={(e) => 
                  {createStartDate(e.target.value)}}
                   ></input>
                   <label className="block text-black text-sm font-bold mb-1" htmlFor="appt">Start time:</label>
                   <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" type="time" id="appt" name="appt" min="09:00" max="18:00" required
                   onChange={(e) => 
                    {createStartTime(e.target.value)}}></input>
                   <label className="block text-black text-sm font-bold mb-1" htmlFor="start">End date:</label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" type="date" id="start" name="trip-start" max="2100-12-31"
                  onChange={(e) => 
                    {createEndDate(e.target.value)}}
                   ></input>

                
                <label className="block text-black text-sm font-bold mb-1" htmlFor="appt">End time:</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" type="time" id="appt" name="appt" min="09:00" max="18:00" required
                onChange={(e) => 
                  {createEndTime(e.target.value)}}></input>
                </form>

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => createEvent()}
                  >
                    Create Event
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
  }

  
import React from 'react'
import "./TodaysLeavesPageContent.css"
import { useSelector } from 'react-redux'
const TodaysLeavesPageContent = () => {
    const todaysLeaveData = useSelector((state)=>state.todayLeaveData)
    console.log(todaysLeaveData)
  return (
    <div>TodaysLeavesPageContent</div>
  )
}

export default TodaysLeavesPageContent
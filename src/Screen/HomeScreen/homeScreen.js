import React from 'react'
import './homeScreen.css'
import HomeBanner from './HomeBanner/homeBanner'
import HomeDetails from './HomeDetails/homeDetails'
const HomeScreen = () => {
  return (
    <div className="homeScreen">
      {/* please watch the video for code */}
        <HomeBanner />
        <HomeDetails/>
    </div>
  )
}

export default HomeScreen
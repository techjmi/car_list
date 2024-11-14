import React from 'react'
import CarList from '../components/CarList'
import UserCars from './UserCars'
const Home = () => {
  return (
    <div className='px-4 md:px-10'>
        <CarList />
        {/* <UserCars /> */}
    </div>
  )
}

export default Home
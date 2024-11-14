import React, { createContext, useState } from 'react'


export const DataContext = createContext(null);
const DataProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const[cars, setCars] =useState([])
  return (
    <DataContext.Provider value={{user, setUser,cars, setCars}}>{children}</DataContext.Provider>
  )
}

export default DataProvider
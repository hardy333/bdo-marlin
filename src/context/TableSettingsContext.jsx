import React, { createContext } from 'react'
import { useState } from 'react'

export const TableSettingsContext = createContext()


const TableSettingsContextProvider = ({children}) => {
    const [numberOfRows, setNumberOfRows] = useState(7)
    const [isOpen, setIsOpen] = useState(false)

  return (
    <TableSettingsContext.Provider value={{numberOfRows, setNumberOfRows, isOpen, setIsOpen}}>
        {children}
    </TableSettingsContext.Provider>
  )
}

export default TableSettingsContextProvider

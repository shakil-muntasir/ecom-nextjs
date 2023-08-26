import { createContext, useContext, useEffect, useReducer } from 'react'

const UserContext = createContext()

const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, userInfo: action.payload }
    default:
      return state
  }
}

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, { userInfo: null })

  useEffect(() => {
    // Load user info from localStorage on initialization
    const storedUserInfo = localStorage.getItem('userInfo')
    if (storedUserInfo) {
      dispatch({ type: 'SET_USER', payload: JSON.parse(storedUserInfo) })
    }
  }, [])

  return <UserContext.Provider value={{ state, dispatch }}>{children}</UserContext.Provider>
}

const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

export { UserProvider, useUser }

import axios from '@/utils/axios'
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
    const fetchUser = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken')
        if (!accessToken) {
          return
        }
        const response = await axios.get('/api/auth/user')

        dispatch({ type: 'SET_USER', payload: response.data })
      } catch (error) {
        console.log(error)
      }
    }
    fetchUser()
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

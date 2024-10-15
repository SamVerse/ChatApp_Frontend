import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Message {
  id: string
  text: string
  sender: string
  timestamp: number
}

interface ChatState {
  messages: Message[]
  currentUser: string
}

const initialState: ChatState = {
  messages: [],
  currentUser: 'User',
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    sendMessage: (state, action: PayloadAction<{ text: string }>) => {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: action.payload.text,
        sender: state.currentUser,
        timestamp: Date.now(),
      }
      state.messages.push(newMessage)
    },
    receiveMessage: (state, action: PayloadAction<{ text: string; sender: string }>) => {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: action.payload.text,
        sender: action.payload.sender,
        timestamp: Date.now(),
      }
      state.messages.push(newMessage)
    },
  },
})

export const { sendMessage, receiveMessage } = chatSlice.actions

export default chatSlice.reducer
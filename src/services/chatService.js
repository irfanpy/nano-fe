// Chat / messaging API calls
import api from './api'

export const chatService = {
  getConversations: ()           => api.get('/chat/conversations'),
  getMessages:      (convoId)    => api.get(`/chat/conversations/${convoId}/messages`),
  sendMessage:      (convoId, data) => api.post(`/chat/conversations/${convoId}/messages`, data),
  startConversation:(helperId)   => api.post('/chat/conversations', { helperId }),
  markRead:         (convoId)    => api.patch(`/chat/conversations/${convoId}/read`),
}

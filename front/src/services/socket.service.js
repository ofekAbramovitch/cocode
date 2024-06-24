import io from 'socket.io-client'

export const SOCKET_EMIT_SET_TOPIC = 'set-topic'
export const SOCKET_EMIT_SEND_CODE = 'send-code'
export const SOCKET_EVENT_UPDATE_CODE = 'update-code'
export const SOCKET_EVENT_MENTOR_JOINED = 'mentor-joined'

// eslint-disable-next-line no-undef
const baseUrl = (process.env.NODE_ENV === 'production') ? '' : '//localhost:3030'
export const socketService = createSocketService()

// for debugging from console
window.socketService = socketService

socketService.setup()

function createSocketService() {
  var socket = null;
  const socketService = {
    setup() {
      socket = io(baseUrl)
    },
    on(eventName, cb) {
      socket.on(eventName, cb)
    },
    off(eventName, cb = null) {
      if (!socket) return;
      if (!cb) socket.removeAllListeners(eventName)
      else socket.off(eventName, cb)
    },
    emit(eventName, data = '') {
      data = JSON.parse(JSON.stringify(data))
      socket.emit(eventName, data)
    },
    terminate() {
      socket = null
    },
  }
  return socketService
}
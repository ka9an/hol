globalThis.TOKEN = "5431682186:AAEBQCZqycdyaHFw5hLDxwVvRNtuNSM5IvE"
import './66o'
import template from './map'

let count = 0

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleSession(websocket) {
  websocket.accept()
  websocket.addEventListener("message", async ({ data }) => {
    if (data === "CLICK") {
      count += 1
      websocket.send(JSON.stringify({ count, tz: new Date() }))
    } else {
      // An unknown message came into the server. Send back an error message
      websocket.send(JSON.stringify({ error: "Unknown message received", tz: new Date() }))
    }
  })

  websocket.addEventListener("close", async evt => {
    // Handle when a client closes the WebSocket connection
    
    console.log(evt)
  })
}

const websocketHandler = async request => {
  const upgradeHeader = request.headers.get("Upgrade")
  if (upgradeHeader !== "websocket") {
    return new Response("Expected websocket", { status: 400 })
  }

  const [client, server] = Object.values(new WebSocketPair())
  await handleSession(server)

  return new Response(null, {
    status: 101,
    webSocket: client
  })
}

const handler = async request => {
  // console.info(request)
  return new Response("Expected", { status: 200 })
  // const upgradeHeader = request.headers.get("Upgrade")
  // if (upgradeHeader !== "websocket") {
  //   return new Response("Expected websocket", { status: 400 })
  // }

  // const [client, server] = Object.values(new WebSocketPair())
  // await handleSession(server)

  // return new Response(null, {
  //   status: 101,
  //   webSocket: client
  // })
}

async function handleRequest(request) {

if (request.method === "POST") {

    // await Do(request)
  try {
 
      await Z(request)
         // console.info(B)
  }
catch (err){
console.warn(err)
}
    // L = await U(request)

    // L = await b(L)
    // 
 
//console.info(B)
    return new Response(JSON.stringify(B, null, 4), {
    headers: {
      'content-type': 'application/json',
    }
  })
  }

  try {
    const url = new URL(request.url)
    switch (url.pathname) {
      case '/':
        return template()
      case '/x':
        return handler(request)
      case '/ws':
        return websocketHandler(request)
      default:
        return new Response("Not found", { status: 404 })
    }
  } catch (err) {
    return new Response(err.toString())
  }
}

let running = false
let intervalId: number | undefined
let lowFps = false
let prev = 0

self.onmessage = ({ data }) => {
    if (data.start) {
        lowFps = data.lowFps

        if (!running) {
            running = true
            prev = Date.now()

            const delay = lowFps ? 1000 : 16

            intervalId = setInterval(() => {
                const now = Date.now()
                const delta = now - prev
                prev = now
                self.postMessage(delta)
            }, delay)
        }
    } else {
        running = false
        if (intervalId) {
            clearInterval(intervalId)
            intervalId = undefined
        }
    }
}

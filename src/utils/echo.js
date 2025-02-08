import Echo from "laravel-echo";
// eslint-disable-next-line no-unused-vars
import Pusher from "pusher-js";

window.Pusher = Pusher;

const echo = new Echo({
  broadcaster: "pusher",
  key: process.env.VUE_APP_REVERB_APP_KEY,
  wsHost: process.env.VUE_APP_REVERB_HOST,
  wsPort: process.env.VUE_APP_REVERB_PORT,
  wssPort: process.env.VUE_APP_REVERB_PORT,
  forceTLS: process.env.VUE_APP_REVERB_SCHEME === "https",
  cluster:"mt1",
  disableStats: true,
  enabledTransports: ["ws", "wss"],
});

export default echo;

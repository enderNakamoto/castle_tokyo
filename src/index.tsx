import { Button, Frog } from "@airstack/frog";
import { devtools } from "@airstack/frog/dev";
import { serveStatic } from "@hono/node-server/serve-static";
import { config } from "dotenv";

config();

// Instantiate new Frog instance with Airstack API key
export const app = new Frog({
  apiKey: process.env.AIRSTACK_API_KEY as string,
});

// Frame to capture user's favorite fruit.
app.frame('/', (c) => {
    return c.res({
        action: '/submit',
      image: (
        <div style={{ color: 'white', display: 'flex', fontSize: 60 }}>
          Select your favorite fruit:
        </div>
      ),
      intents: [
        <Button value="apple">Apple</Button>,
        <Button value="banana">Banana</Button>,
        <Button value="mango">Mango</Button>
      ]
    })
  })
   
  // Frame to display user's response.
  app.frame('/submit', (c) => {
    const { buttonValue } = c
    return c.res({
      image: (
        <div style={{ color: 'white', display: 'flex', fontSize: 60 }}>
          Selected: {buttonValue}
        </div>
      )
    })
  })

devtools(app, { serveStatic });
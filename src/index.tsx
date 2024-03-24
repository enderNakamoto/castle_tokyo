import { Button, Frog } from "@airstack/frog";
import { devtools } from "@airstack/frog/dev";
import { serveStatic } from "@hono/node-server/serve-static";
import { config } from "dotenv";

config();

// Instantiate new Frog instance with Airstack API key
export const app = new Frog({
  apiKey: process.env.AIRSTACK_API_KEY as string,
});

app.frame('/', (c) => {
    const { buttonValue, status } = c
    return c.res({
      image
  
  : (
        <div style={{ color: 'white', display: 'flex', fontSize: 60 }}>
          {status === 'initial' ? (
            'Select your fruit!'
          ) : (
            `Selected: ${buttonValue}`
          )}
        </div>
      ),
      intents: [
        <Button value="apple">Apple</Button>,
        <Button value="banana">Banana</Button>,
        <Button value="mango">Mango</Button>
      ]
    })
  })

devtools(app, { serveStatic });
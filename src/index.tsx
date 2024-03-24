import { Button, Frog } from "@airstack/frog";
import { devtools } from "@airstack/frog/dev";
import { serveStatic } from "@hono/node-server/serve-static";
import { config } from "dotenv";

config();

type State = {
    count: number
}

// Instantiate new Frog instance with Airstack API key
export const app = new Frog<{State: State}>({ 
  apiKey: process.env.AIRSTACK_API_KEY as string,
  initialState: { count: 0 }
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
    console.log(c);
    const { buttonValue } = c
    return c.res({
      image: (
        <div style={{ color: 'white', display: 'flex', fontSize: 60 }}>
          Selected: {buttonValue}
        </div>
      )
    })
  })

  app.frame('/state', (c) => {
    const { buttonValue, deriveState } = c
    const state = deriveState(previousState => {
      if (buttonValue === 'inc') previousState.count++
      if (buttonValue === 'dec') previousState.count--
    })
    return c.res({
      image: (
        <div style={{ color: 'white', display: 'flex', fontSize: 60 }}>
          Count: {state.count}
        </div>
      ),
      intents: [
        <Button value="inc">Increment</Button>,
        <Button value="dec">Decrement</Button>,
      ]
    })
  })

devtools(app, { serveStatic });
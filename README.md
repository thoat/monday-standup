# Monday Standup

A simple web app to facilitate the weekly stand-up meetings at UNICEF Office of Innovation - NYHQ.

![Example Startpage](/public/screenshot-startpage.PNG)

Features available:

- Mark a member absent or present
- Pair up: put two members from two different teams together
- Remove a member
- Add a member

### Install and run

- Clone this GitHub repo, then, in your terminal or command-line interface:

```
cp /src/data-sample.js /src/data.js
yarn
yarn dev
```

Your app will open automatically in http://localhost:3000.


- Alternatively, if you want to run in production mode:

```
cp /src/data-sample.js /src/data.js
yarn
yarn build
NODE_ENV=production yarn start
```

You will need to manually open http://localhost:5000 in your browser.

### Credits

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Monday Standup

[![Build Status](https://travis-ci.com/thoat/monday-standup.svg?branch=master)](https://travis-ci.com/thoat/monday-standup)
[![Maintainability](https://api.codeclimate.com/v1/badges/69d18729ffd48f77245a/maintainability)](https://codeclimate.com/github/thoat/monday-standup/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/69d18729ffd48f77245a/test_coverage)](https://codeclimate.com/github/thoat/monday-standup/test_coverage)

A simple web app to facilitate the weekly stand-up meetings at UNICEF Office of Innovation - NYHQ.

![Example Startpage](/public/screenshot-startpage.PNG)

Features available:

- Mark a member absent or present
- Pair up: put two members from two different teams together
- Remove a member
- Add a member

## Usage

- The __demo version__ of the app is available with sample data, so be sure to type the following line before anything else. You need to do this only once:

```{shell}
cp /src/data-sample.js /src/data.js
```

Just note, however, that data changes (i.e. adding and removing members) won't be persistent between app sessions, because there's no backend service provisioned to handle it.

- Alternatively, if you believe you're authorized to use the __official UNICEFInnovate version__, contact me for the following credentials:

```{shell}
export REACT_APP_PASSKEY=<the-passkey>
export DATABASE_URL=<local-or-remote-database>
```

_Tip:_ Save these credentials into an `.env` file at the root directory to avoid having to `export` them every time.

## Install and run

- [Prep your environment](#usage)

- Clone this GitHub repo, then, in your terminal or command-line interface:

```{shell}
yarn
yarn dev
```

Your app will open automatically in http://localhost:3000.

- Alternatively, if you want to run in production mode:

```{shell}
yarn
yarn build
NODE_ENV=production yarn start
```

You will need to manually open http://localhost:5000 in your browser.

## Credits

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

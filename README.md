# 🃏 Card games API
[![CircleCI](https://circleci.com/gh/circleci/circleci-docs.svg?style=shield)](https://circleci.com/gh/igorantun/card-games-api)
[![Codecov Coverage](https://img.shields.io/codecov/c/github/igorantun/card-games-api.svg?style=badge)](https://codecov.io/gh/igorantun/card-games-api)

## Description
This is an API for managing card games. It supports creating card decks, buying cards, shuffling and returning them to the deck.

## Getting started
### Prerequesites
- Docker
- Docker Compose

### Cloning and copying .env example
```sh
$ git clone git@github.com:igorantun/card-games-api.git
$ cd card-games-api
$ cp .env.example .env
```

## Make commands
```sh
$ make dev # Starts development server, with nodemon
$ make start # Starts server
$ make stop # Stops server
$ make kill # Kills containers
$ make restart # Restarts server
$ make clean # Cleans containers and volumes
$ make sh # Opens shell inside api container
$ make test-e2e # Runs end-to-end test scripts
$ make test-unit # Runs unit test scripts
$ make test-coverage # Runs test coverage audit
$ make test # Runs all tests scripts
```

## Routes
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/c7473d187ecc911dcf01)


### Create new game with 2 decks
<details>
  <summary>Request</summary>

  `POST /decks`
  ```json
  {
    "decks": 2
  }
  ```
</details>

<details>
  <summary>Response</summary>

  ```json
  {
    "id": "5ec4b190eae60200181db40c",
    "remainingCards": 104
  }
  ```
</details>

### Create new game with truco deck
<details>
  <summary>Request</summary>

  `POST /decks`
  ```json
  {
    "decks": 1,
    "options": {
      "without": {
        "ranks": ["8", "9", "10"]
      }
    }
  }
  ```
</details>

<details>
  <summary>Response</summary>

  ```json
  {
    "id": "5ec4b282eae60200181db40d",
    "remainingCards": 40
  }
  ```
</details>

### Buy cards from deck
<details>
  <summary>Request</summary>

  `POST /decks/:deckId/buy`
  ```json
  {
    "cards": 3
  }
  ```
</details>

<details>
  <summary>Response</summary>

  ```json
  {
    "remainingCards": 37,
    "cards": [
      { "rank": "4", "suit": "diamonds" },
      { "rank": "5", "suit": "clubs" },
      { "rank": "7", "suit": "hearts" }
    ]
  }
  ```
</details>

### Return cards to deck
<details>
  <summary>Request</summary>

`PUT /decks/:deckId/return`
```json
{
    "position": "middle",
    "cards": [
      { "rank": "7", "suit": "hearts" },
      { "rank": "4", "suit": "diamonds" }
    ]
  }
  ```
</details>

<details>
  <summary>Response</summary>

  ```json
  {
    "remainingCards": 39
  }
  ```
</details>

### Shuffle cards on deck
<details>
  <summary>Request</summary>

  `PUT /decks/:deckId/shuffle`
</details>

<details>
  <summary>Response</summary>

  ```json
  {
    "remainingCards": 39
  }
  ```
</details>

## License
Released under the MIT License. See the [LICENSE](LICENSE) file
for details.

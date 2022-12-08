# wallet-generator
Offline wallet generator to run in your machine

## Requirements
node.js version 14 or greater

## How to use it
1. Clone this project
2. Install dependencies `npm i`
3. Execute the script `npm start`

## Parameters
* `accounts`: number of accounts to generate. Defaults to `1`
* `export type`: the type of exporting, one of three: `console`, `csv`, `json`. Defaults to `console`
* `file name`: file name when export type isn't `console`. Defaults to `accounts`

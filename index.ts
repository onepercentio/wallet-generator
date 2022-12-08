import * as fs from 'fs';
import * as path from 'path';
import Wallet from 'ethereumjs-wallet';
import { stringify } from 'csv-stringify/sync';
import * as prompts from 'prompts'


const FORMATS = {
  CSV: 'csv',
  JSON: 'json'
};

const schema = [
  {
    name: 'accounts',
    type: 'number',
    message: 'Number of accounts to generate',
    initial: 1
  },
  {
    type: 'select',
    name: 'format',
    message: 'Export file type',
    choices: [
      { title: 'console', value: 'console' },
      { title: 'csv', value: 'csv' },
      { title: 'json', value: 'json' },
    ],
    initial: false
  },
  {
    type: prev => prev == 'console' ? null : 'text',
    name: 'fileName',
    message: 'File name',
    initial: 'accounts'
  }
];


(async () => {
  const {
    accounts: numOfWallets,
    format,
    fileName
  } = await prompts(schema);

  const accounts: { address: string, private_key: string }[] = [];

  for (let i = 0; i < numOfWallets; i++) {
    const w = Wallet.generate();
    accounts.push({
      address: w.getChecksumAddressString(),
      private_key: w.getPrivateKeyString()
    });
  };

  const pathMaybe = path.join(__dirname, 'exports', `${fileName}.${format}`);

  switch (format) {
    case FORMATS.CSV:
      fs.writeFileSync(
        pathMaybe,
        stringify(accounts, { header: true })
      )
      console.log(`Accounts exported to ${pathMaybe}`)
      break
    case FORMATS.JSON:
      fs.writeFileSync(
        pathMaybe,
        JSON.stringify(accounts, null, 2)
      )
      console.log(`Accounts exported to ${pathMaybe}`)
      break
    default:
      console.table(accounts)
  };


})();
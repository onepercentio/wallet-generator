"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var fs = require("fs");
var path = require("path");
var ethereumjs_wallet_1 = require("ethereumjs-wallet");
var sync_1 = require("csv-stringify/sync");
var prompts = require("prompts");
var FORMATS = {
    CSV: 'csv',
    JSON: 'json'
};
var schema = [
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
        type: function (prev) { return prev == 'console' ? null : 'text'; },
        name: 'fileName',
        message: 'File name',
        initial: 'accounts'
    }
];
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, numOfWallets, format, fileName, accounts, i, w, pathMaybe;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, prompts(schema)];
            case 1:
                _a = _b.sent(), numOfWallets = _a.accounts, format = _a.format, fileName = _a.fileName;
                accounts = [];
                for (i = 0; i < numOfWallets; i++) {
                    w = ethereumjs_wallet_1["default"].generate();
                    accounts.push({
                        address: w.getChecksumAddressString(),
                        private_key: w.getPrivateKeyString()
                    });
                }
                ;
                pathMaybe = path.join(__dirname, 'exports', "".concat(fileName, ".").concat(format));
                switch (format) {
                    case FORMATS.CSV:
                        fs.writeFileSync(pathMaybe, (0, sync_1.stringify)(accounts, { header: true }));
                        console.log("Accounts exported to ".concat(pathMaybe));
                        break;
                    case FORMATS.JSON:
                        fs.writeFileSync(pathMaybe, JSON.stringify(accounts, null, 2));
                        console.log("Accounts exported to ".concat(pathMaybe));
                        break;
                    default:
                        console.table(accounts);
                }
                ;
                return [2 /*return*/];
        }
    });
}); })();

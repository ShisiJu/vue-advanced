const jsTokens = require("js-tokens");

const jsString = 'JSON.stringify({k:3.14**2}, null /*replacer*/, "\\t")';

for (const token of jsTokens(jsString)) {
  console.log(token);
}

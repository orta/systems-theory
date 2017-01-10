// Data looks like:
//
//  } 
//   "filename": "/Users/orta/dev/js/apps/systems-theory/index.ios.js",
//   "sourceCode": "[source code]",
//   "options": {
//     "dev": true,
//     "platform": "ios",
//     "hot": false,
//     "generateSourceMaps": false,
//     "projectRoots": [
//       "/Users/orta/dev/js/apps/systems-theory"
//     ]
//   }
// }

// Callback is (error, {
//      ast: result.ast,
//      code: result.code,
//      map: result.map,
//      filename: filename,
//    })

// Which I assume is the AST standard

const ts = require("typescript");
const originalTransform = require('./node_modules/react-native/packager/transformer');

const json5 = require('json5');
const {readFileSync} = require("fs")

const compilerOptions = json5.parse(readFileSync("tsconf.json").toString())

module.exports = function (data, callback) {

  // Skip TS transpile for React Native et-al
  const shouldTranspile = data.sourceCode.includes(".tsx") || data.sourceCode.includes(".ts")
  if (shouldTranspile) {
    const transpiled = ts.transpileModule(data.sourceCode, { compilerOptions: compilerOptions.compilerOptions, moduleName: "asda" });
    data.sourceCode = transpiled.outputText
  }
  originalTransform(data, callback)
}

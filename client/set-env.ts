
const fs = require('fs');

const{writeFile, readFile} = fs;

const targetPath = './src/environments/environment.ts';


const colors = require('colors');
require('dotenv').config();

const envConfigFile = `export const environment = {
    production: ${false},
    port: ${process.env.NODE_ENV || 4200}
} ;

`;


// console.log(colors.magenta('The file `environment.ts` will be written with the following content: \n'));
// console.log(colors.grey(envConfigFile));

writeFile(targetPath, envConfigFile, (err: Error) => {
   if (err) {
       throw console.error(err);
   } else {
       console.log(`Angular environment.ts file generated correctly at ${targetPath} \n`);
   }
});

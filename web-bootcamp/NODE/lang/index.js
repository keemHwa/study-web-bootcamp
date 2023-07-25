
const franc = require('franc');
const langs = require('langs');

let message = '';
const input = process.argv[2];

const langCode = franc(input, {minLength: 3});

if(langCode === 'und'){
    message = "SORRY COULDN'T FIGURE IT OUT !"
} else{
    message = langs.where("3",langCode).name;
}

console.log(message)
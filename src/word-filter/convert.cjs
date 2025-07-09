const fs = require('fs');
const path = require('path');


const inputPath = path.join(__dirname, 'cleaned_words.txt');
const outputPath = path.join(__dirname, 'words.json');

fs.readFile(inputPath, 'utf-8', (err, data) => {
  if (err) return console.error(err);

  const words = data.split('\n').filter(word => word.trim());

  fs.writeFile(outputPath, JSON.stringify(words, null, 2), 'utf-8', err => {
    if (err) return console.error(err);
    console.log('Файл words.json успешно создан!');
  });
});
const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, 'words.txt');
const outputFile = path.join(__dirname, 'cleaned_words.txt');

console.log('Чтение файла:', inputFile);

fs.readFile(inputFile, 'utf-8', (err, data) => {
  if (err) {
    return console.error('Ошибка при чтении файла:', err);
  }

  const lines = data.split('\n');

  const cleanedWords = lines
    .map(word => word.trim().toLowerCase())
    .filter(word => word.length >= 3)
    .filter(word => /^[a-z]+$/.test(word))
    .filter(word => word !== word.toUpperCase()); 

  const uniqueWords = [...new Set(cleanedWords)];

  fs.writeFile(outputFile, uniqueWords.join('\n'), 'utf-8', (err) => {
    if (err) {
      return console.error('Ошибка при записи файла:', err);
    }

    console.log(`Очищено ${uniqueWords.length} уникальных слов.`);
    console.log(`Результат сохранён в ${outputFile}`);
  });
});
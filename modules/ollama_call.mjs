import ollama from 'ollama'
var prepositions = [
  "in",
  "on",
  "at",
  "by",
  "for",
  "with",
  "about",
  "against",
  "between",
  "into",
  "through",
  "during",
  "before",
  "after",
  "above",
  "below"
];



let promptTemplate = "Craft a concise and imaginative email, that seamlessly integrates the following preposition word group. Each word must be used only once, in the exact same order, and use no other prepositions, the preposition list are: " 
                  + prepositions + ". Word Group: ";



async function generateText(wordList) {

  var prompt = promptTemplate + wordList;

  console.log(prompt);

  const response = await ollama.chat({
    model: 'Chidam/karpathy',
    messages: [{ role: 'user', content: prompt }],
});
  return response.message.content;
}

var testWords = ["next","near","between"];
var stegText = await generateText(testWords);
console.log(stegText);
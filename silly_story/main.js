var customName = document.querySelector('.customname');
var generateButton = document.querySelector('.generate');
var paragraph = document.querySelector('.story');


// CONSTANTS

// story that will be generated
const story = 'It was :temperature: outside, so :insertx: went for a walk.'
              + ' When they got to :inserty:, they stared in horror for a few'
              + ' moments, then :insertz:. :name: saw the whole thing, but was'
              + ' not surprised — :insertx: weights :weight:, and it was a'
              + ' hot day.'

// values to be inserted into the history
const insertxValues = [
    'Willy the Goblin',
    'Big Daddy',
    'Father Christmas'
];
const insertyValues = [
    'the soup kitchen',
    'Disneyland',
    'the White House'
];
const insertzValues = [
    'spontaneously combusted',
    'melted into a puddle on the sidewalk',
    'turned into a slug and crawled away'
];

const temperatureF = 94;
const temperatureC = Math.round((temperatureF - 32) * 5 / 9);
const weightPounds = 300;
const weightStone = Math.round(weightPounds / 14);

const temperatureUS = String(temperatureF) + ' farenheit';
const temperatureUK = String(temperatureC) + ' centigrade';
const weightUS = String(weightPounds) + ' pounds';
const weightUK = String(weightStone) + ' stone';

const defaultName = 'Bob'

// CORE

function randomChoice(array) {
    // return a random element of the array
    return array[Math.floor(Math.random() * array.length)]
}

function generateStory() {
    // main function
    var insertx, inserty, insertz;
    var units, temperature, weight;
    var name;

    // get random replacements
    insertx = randomChoice(insertxValues);
    inserty = randomChoice(insertyValues);
    insertz = randomChoice(insertzValues);

    // get unit replacements (US or UK)
    units = document.querySelector('input[name="units"]:checked').value;
    temperature = (units === 'US' ? temperatureUS : temperatureUK);
    weight = (units === 'US' ? weightUS : weightUK);

    // get name
    name = (customName.value === '' ? defaultName : customName.value);

    // generate story
    var generated = story;
    generated = generated.replace(':insertx:', insertx);
    generated = generated.replace(/:insertx:/g, insertx); // :insertx: happens twice
    generated = generated.replace(':inserty:', inserty);
    generated = generated.replace(':insertz:', insertz);
    generated = generated.replace(':temperature:', temperature);
    generated = generated.replace(':weight:', weight);
    generated = generated.replace(':name:', name);

    // display story
    paragraph.textContent = generated;
    paragraph.style.display = '';
}

// LISTENERS

generateButton.addEventListener('click', generateStory);

// INITIALIZE

paragraph.style.display = 'none';

const $result = document.querySelector('.result'); 
const $prompts = document.querySelector('.prompts'); 
const $visitingDays = $prompts.querySelector('.days');
const $visitingPlaces = $prompts.querySelector('.places');

// const url = 'https://api.openai.com/v1/chat/completions';
const url = 'https://api.openai.com/v1/completions';

const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer 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', 
};

// const data = {
//     "model": "gpt-3.5-turbo",
//     "messages": [
//         // {
//         //     "role": "system",
//         //     "content": "You are a helpful assistant."
//         // },
//         {
//             "role": "user",
//             "content": "Hello!"
//         }
//     ]
// };

// Statue of LIberty
// 911 Memorial
// Central Park
// The Met
// Museum of Natural HIstory
// Highline
// Vessel
// Chelsea Market
// Intrepid 
// Summit One
// Bryant Park 
// Grand Central Station 
// Times Square

$visitingDays.addEventListener('change', e => {
    runModel(); 
});

$visitingPlaces.addEventListener('change', e => {
    runModel(); 
});

async function runModel() {
    const fetchData = {
        "model": "gpt-3.5-turbo-instruct",
        "prompt": `Build a ${getDays()} day itinerary of NYC that groups activities by location and 
                    includes ${getPlaces()}. 
                    Provide the results in json and include lat & long`,
        // "max_tokens": 7,
        "temperature": 0, 
    };

    const res = await fetch(url, { 
        method: 'POST',
        headers,
        body: JSON.stringify(fetchData),
    });

    const data = await res.json(); 

    console.log('my_data', data.choices)  
    const result = data.choices.map(c => c.text).join('\n'); 

    $result.textContent = result; 
    console.log(data) 

    console.log('visiting days:', getDays())
    console.log('visiting places', getPlaces())
}

function getDays() {
    return Number( $visitingDays.value.trim() ) || 1; 
}

function getPlaces() {
    return $visitingPlaces.value.split('\n').map(text => text ).join(',').trim() || 'Say "Please add prompt"';
} 

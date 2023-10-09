const $result = document.querySelector('.result'); 
const $prompts = document.querySelector('.prompts'); 
const $visitingDays = $prompts.querySelector('.days');
const $visitingPlaces = $prompts.querySelector('.places');

const zapierWebhookUrl = 'https://hooks.zapier.com/hooks/catch/3203471/3sh1zkc/'; 

async function sendZapWebhook(fetchData) {
    const res = await fetch(zapierWebhookUrl, { 
        method: 'POST',
        body: JSON.stringify(fetchData),
    });

    const data = await res.json(); 
    console.log('Data after sending zapier webhook:', data)
}

$visitingDays.addEventListener('change', e => {
    triggerZap(); 
});

$visitingPlaces.addEventListener('change', e => {
    triggerZap(); 
});

function triggerZap() {
    const days = getDays(); 
    const places = getPlaces();
    const fetchData = { days, places };
    sendZapWebhook(fetchData);
}

function getDays() {
    return Number( $visitingDays.value.trim() ) || 1; 
}

function getPlaces() {
    return $visitingPlaces.value.split('\n').join(', ').trim() || 'Say "Please add prompt"';
} 


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


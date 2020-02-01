console.log('works');

const APICall = (address = '', callback) => {
    fetch(`/weather?address=${address}`)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data);
        if(data.error){
            console.log('Error ' + data.error);
        }
        else{
            console.log(data.location);
            console.log(data.forecast);
            
        }
        callback(data);
    })
}


const form = document.querySelector('.form');
const addressInput = document.querySelector('.address');
const showInfoDisplay = document.querySelector('.showInfo');
const loadingMessage = 'Loading....';

form.addEventListener('submit', (e) => {
    e.preventDefault();
    showInfoDisplay.innerHTML = loadingMessage;
    APICall(addressInput.value, (data) => {
        if(data.error){
            showInfoDisplay.innerHTML = data.error;
            return 0;
        }

        const message = `<p>Address: ${data.address}</p>
        <p>Forecast: ${data.forecast}</p>
        <p>Location: ${data.location}</p>
        <p>Temperature: ${data.temperature}</p>`;

        showInfoDisplay.innerHTML = message;
    });
})
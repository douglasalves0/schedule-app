import fetch from 'node-fetch';
import { integration, moorseUrl, token } from 'src/config/configs';

export async function sendMessage(userNumber: string, message: string){
    const options = {
        method: 'POST',
        headers: {
            Accept: 'application/json', 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            to: userNumber, 
            body: message
        })
    };
    const answer = await fetch(`${moorseUrl}/${integration}/send-message`, options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
}
import fetch from 'node-fetch';
import { moorseIntegration, moorseUrl, moorseToken } from 'src/config/configs';

export async function sendMessage(userNumber: string, message: string){
    const options = {
        method: 'POST',
        headers: {
            Accept: 'application/json', 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${moorseToken}`
        },
        body: JSON.stringify({
            to: userNumber, 
            body: message
        })
    };
    const answer = await fetch(`${moorseUrl}/${moorseIntegration}/send-message`, options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
}
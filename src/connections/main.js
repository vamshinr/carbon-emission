import { createVendiaClient } from '@vendia/client';

function clientdetails() {

    const client = createVendiaClient({
    apiUrl: 'https://uytqy9yq0l.execute-api.us-west-2.amazonaws.com/graphql/',
    websocketUrl: 'wss://e37irfs036.execute-api.us-west-2.amazonaws.com/graphql',
    apiKey: '3cYH1T5UtdNeVKe6ptzFqp9uZK7Tf81YVP8VBXP8BwMt'
    });

    const {entities} = client;
    console.log(entities);
    return entities;
}

export default clientdetails;
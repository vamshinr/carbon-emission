import { createVendiaClient } from '@vendia/client';

function clientdetails() {

    const client = createVendiaClient({
    apiUrl: 'https://uytqy9yq0l.execute-api.us-west-2.amazonaws.com/graphql/',
    websocketUrl: 'wss://e37irfs036.execute-api.us-west-2.amazonaws.com/graphql',
    apiKey: 'DEnnS31xC4V6ajfEcqzTBZRqjuAFTMAfFiFJuhYy4pAJ'
    });

    const {entities} = client;
    return entities;
}

export default clientdetails;
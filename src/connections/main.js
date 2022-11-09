import { createVendiaClient } from '@vendia/client';

function clientdetails() {

    const client = createVendiaClient({
    apiUrl: 'https://uytqy9yq0l.execute-api.us-west-2.amazonaws.com/graphql/',
    websocketUrl: 'wss://e37irfs036.execute-api.us-west-2.amazonaws.com/graphql',
    apiKey: 'Hf9o8NUwiiA2hdVch2AXDfmoqDSDqiqSJgwCApXnHtC'
    });

    const {entities} = client;
    return entities;
}

export default clientdetails;
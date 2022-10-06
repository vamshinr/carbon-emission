import clientdetails from "./main";

const clientauth = clientdetails();


    async function sea_fetch() {
        const seaResponse = await clientauth.seaTransportation.list();
        console.log(seaResponse.items);
        return (seaResponse);
    }


export default sea_fetch;



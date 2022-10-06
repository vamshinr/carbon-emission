import clientdetails from "./main";

const clientauth = clientdetails();

class SeaTransportCon{
    
    async sea_fetch() {
        const seaResponse = await clientauth.seaTransportation.list();
        console.log(seaResponse.items);
        return (seaResponse);
    }
}

export default new SeaTransportCon();



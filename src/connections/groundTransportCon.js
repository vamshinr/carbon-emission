import clientdetails from "./main";

const clientauth = clientdetails();

class groundTransportCon{
    
    async ground_fetch() {
        const groundResponse = await clientauth.groundTransportation.list();
        console.log(groundResponse.items);
        return (groundResponse);
    }
}

export default new groundTransportCon();



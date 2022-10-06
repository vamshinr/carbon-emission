import clientdetails from "./main";

const clientauth = clientdetails();


    async function ground_fetch() {
        const groundResponse = await clientauth.groundTransportation.list();
        console.log(groundResponse.items);
        return (groundResponse);
    }


export default ground_fetch;



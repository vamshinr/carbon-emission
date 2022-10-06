import clientdetails from "./main";

const clientauth = clientdetails();


    async function hpt_fetch() {
        const hptResponse = await clientauth.hornetPowerTools.list();
        console.log(hptResponse.items);
        return (hptResponse);
    }

export default hpt_fetch;
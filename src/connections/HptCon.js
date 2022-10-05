import clientdetails from "./main";

const clientauth = clientdetails();

class HptCon{
    async hpt_fetch() {
        const hptResponse = await clientauth.hornetPowerTools.list();
        console.log(hptResponse.items);
        return (hptResponse);
    }
}

export default new HptCon();
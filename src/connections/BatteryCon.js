import clientdetails from "./main";

const clientauth = clientdetails();

class BatteryCon{

    async battery_fetch() {
        const batteryResponse = await clientauth.battery.list();
        console.log(batteryResponse.items);
        return batteryResponse;
    }

    async battery_add() {
    }

}

export default new BatteryCon();



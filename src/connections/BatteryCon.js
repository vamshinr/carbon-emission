import clientdetails from "./main";

const clientauth = clientdetails();

async function battery_fetch() {
    const batteryResponse = await clientauth.battery.list();
    console.log(batteryResponse.items);
    return (batteryResponse);
}

export default battery_fetch;



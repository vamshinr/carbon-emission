import clientdetails from "./main";

const clientauth = clientdetails();

class BatteryCon{

    async battery_fetch() {
        const batteryResponse = await clientauth.battery.list();
        console.log(batteryResponse.items);
        return batteryResponse;
    }

    async battery_add() {
        const output = await clientauth.battery.add({
            co2: 30,
            costManufactured: 50,
            dateManufactured: "2022-01-02",
            partNumber: "2",
            salesPrice: 100,
            serialNumber: "112",
        });
    }

}

export default new BatteryCon();



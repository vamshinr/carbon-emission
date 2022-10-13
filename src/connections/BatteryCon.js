import clientdetails from "./main";

const clientauth = clientdetails();

class BatteryCon{

    async battery_fetch() {
        const batteryResponse = await clientauth.battery.list();
        console.log(batteryResponse.items);
        return batteryResponse;
    }

    async battery_create() {
        const response = await clientauth.battery.add({
            co2: 30,
            costManufactured: 20,
            dateManufactured: "2022-09-13",
            partNumber: "3",
            salesPrice: 50,
            serialNumber: "113",
        });
        console.log("response for addition: "+response)
    }

}

export default new BatteryCon();



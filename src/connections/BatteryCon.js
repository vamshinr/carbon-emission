import clientdetails from "./main";

const clientauth = clientdetails();

class BatteryCon{

    async battery_fetch() {
        const batteryResponse = await clientauth.battery.list();
        console.log(batteryResponse.items);
        return batteryResponse;
    }

    async battery_create(coo2,costManu,dateManu,partNum,salesPr,serialNum) {
        console.log("In battery Con")
        const response = await clientauth.battery.add({
            co2: coo2,
            costManufactured: costManu,
            dateManufactured: dateManu,
            partNumber: partNum,
            salesPrice: salesPr,
            serialNumber: serialNum,
        });
        console.log("response for addition: "+response)
    }

}

export default new BatteryCon();



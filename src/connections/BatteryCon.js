import clientdetails from "./main";

const clientauth = clientdetails();

class BatteryCon{

    async battery_fetch() {
        const batteryResponse = await clientauth.battery.list();
        console.log(batteryResponse.items);
        return batteryResponse.items;
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
        return response;
    }

    async battery_update(data) {
        console.log("in battery update");
        const updateProductResponse = await clientauth.battery.update(data);
        console.log("update response",updateProductResponse);
        return updateProductResponse;
    }

    async battery_delete(data) {
        console.log("in battery delete");
        const deleteProductResponse = await clientauth.battery.remove(data);
        console.log("delete response",deleteProductResponse);
        return deleteProductResponse;
    }
}

export default new BatteryCon();



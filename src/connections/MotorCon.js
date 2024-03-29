import clientdetails from "./main";

const clientauth = clientdetails();

class MotorCon {

    async motor_fetch() {
        const motorResponse = await clientauth.motor.list();
        console.log(motorResponse.items);
        return motorResponse.items;
    }

    async motor_create(coo2,costManu,dateManu,partNum,salesPr,serialNum) {
        console.log("In motor Con")
        const response = await clientauth.motor.add({
            co2: coo2,
            costManufactured: costManu,
            dateManufactured: dateManu,
            partNumber: partNum,
            salesPrice: salesPr,
            serialNumber: serialNum,
        });
        console.log("response for addition: "+response)
    }

    async motor_update(data) {
        console.log("in motor update");
        const updateProductResponse = await clientauth.motor.update(data);
        console.log("update response",updateProductResponse);
        return updateProductResponse;
    }

    async motor_delete(data) {
        console.log("in motor delete");
        const deleteProductResponse = await clientauth.motor.remove(data);
        console.log("delete response",deleteProductResponse);
        return deleteProductResponse;
    }
}

export default new MotorCon();

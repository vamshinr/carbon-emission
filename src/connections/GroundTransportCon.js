import clientdetails from "./main";

const clientauth = clientdetails();

class GroundTransportCon{
    
    async ground_fetch() {
        const groundResponse = await clientauth.groundTransportation.list();
        console.log(groundResponse.items);
        return groundResponse.items;
    }

    async ground_create(coo2,fuelCo,rouID,trackNum,labCo,tID,custCo) {
        console.log("In Ground Transport Con")
        const response = await clientauth.groundTransportation.add({
            co2: coo2,
            fuelCost: fuelCo,
            routeId: rouID.split(" - ")[0],
            trackingNumber: trackNum,
            laborCost: labCo,
            truckId: tID,
            customerCost: custCo,
        });
        console.log("response for addition: "+response)
    }
    
    async groundroute_update(data) {
        console.log("in groundroute update");
        const updateProductResponse = await clientauth.groundTransportation.update(data);
        console.log("update response",updateProductResponse);
        return updateProductResponse;
    }

    async groundroute_delete(data) {
        console.log("in ground route delete");
        const deleteProductResponse = await clientauth.groundTransportation.remove(data);
        console.log("delete response",deleteProductResponse);
        return deleteProductResponse;
    }
}

export default new GroundTransportCon();



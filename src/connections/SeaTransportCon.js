import clientdetails from "./main";

const clientauth = clientdetails();

class SeaTransportCon{
    
    async sea_fetch() {
        const seaResponse = await clientauth.seaTransportation.list();
        console.log(seaResponse.items);
        return seaResponse.items;
    }

    async sea_create(coo2,fuelCo,rouID,trackNum,labCo,sID,custCo) {
        console.log("In Sea Transport Con")
        const response = await clientauth.seaTransportation.add({
            co2: coo2,
            fuelCost: fuelCo,
            routeId: rouID,
            trackingNumber: trackNum,  
            laborCost: labCo,
            shipId: sID,
            customerCost: custCo,
        });
        console.log("response for addition: "+response)
    }

    async searoute_update(data) {
        console.log("in searoute update");
        const updateProductResponse = await clientauth.seaTransportation.update(data);
        console.log("update response",updateProductResponse);
        return updateProductResponse;
    }

    async searoute_delete(data) {
        console.log("in sea route delete");
        const deleteProductResponse = await clientauth.seaTransportation.remove(data);
        console.log("delete response",deleteProductResponse);
        return deleteProductResponse;
    }
}

export default new SeaTransportCon();



import clientdetails from "./main";
import HptCon from "./HptCon";
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
        const sleep = ms => new Promise(r => setTimeout(r, ms));
        const updateProductResponse = await clientauth.seaTransportation.update(data);
        //setTimeout(() => window.location.reload(false), 2000);
        console.log("update response",updateProductResponse);
        //await sleep(1000);
        //setTimeout(() => window.location.reload(false), 2000);
        const result = await HptCon.hpt_update_by_id(data['trackingNumber'],'seatransport');
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



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
            routeId: rouID,
            trackingNumber: trackNum,
            laborCost: labCo,
            truckId: tID,
            customerCost: custCo,
        });
        console.log("response for addition: "+response)
    }


}

export default new GroundTransportCon();



import clientdetails from "./main";

const clientauth = clientdetails();

class GroundTransportCon{
    
    async ground_fetch() {
        const groundResponse = await clientauth.groundTransportation.list();
        console.log(groundResponse.items);
        return (groundResponse);
    }

    async ground_create(coo2,fuelCo,rouID,trackNum,labCo,tID,custCo) {
        console.log("In Ground Transport Con")
        const response = await clientauth.ground.add({
            co2: coo2,
            fuelCost: fuelCo,
            routeID: rouID,
            trackNumber: trackNum,
            laborCost: labCo,
            truckID: tID,
            custCost: custCo,
        });
        console.log("response for addition: "+response)
    }


}

export default new GroundTransportCon();



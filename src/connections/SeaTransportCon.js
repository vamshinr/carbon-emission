import clientdetails from "./main";

const clientauth = clientdetails();

class SeaTransportCon{
    
    async sea_fetch() {
        const seaResponse = await clientauth.seaTransportation.list();
        console.log(seaResponse.items);
        return (seaResponse);
    }

    async sea_create(coo2,fuelCo,rouID,trackNum,labCo,sID,custCo) {
        console.log("In Sea Transport Con")
        const response = await clientauth.sea.add({
            co2: coo2,
            fuelCost: fuelCo,
            routeID: rouID,
            trackNumber: trackNum,  
            laborCost: labCo,
            shipID: sID,
            custCost: custCo,
        });
        console.log("response for addition: "+response)
    }
}

export default new SeaTransportCon();



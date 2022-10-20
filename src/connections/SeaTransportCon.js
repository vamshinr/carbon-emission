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
}

export default new SeaTransportCon();



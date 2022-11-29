import { json } from "react-router-dom";
import clientdetails from "./main";

const clientauth = clientdetails();

class HptCon{
    async hpt_fetch(selectedItemsList) {
        if(selectedItemsList == null){
            const hptResponse = await clientauth.hornetPowerTools.list();
            console.log("hpt data: ", hptResponse.items);
            return hptResponse.items;
        }
        else{
            var options = [];
            selectedItemsList.forEach(element =>{
                console.log("Key"+element.key);
                if(element.key === "Battery ID"){
                    options.push({batteryId: element.value});
                }
                else if(element.key === "Motor ID"){
                    options.push({motorId: element.value});
                }
                else if(element.key === "Sea Route ID"){
                    options.push({seaTransportId: element.value});
                }
                else if(element.key === "Ground Route ID"){
                    options.push({groundTransportId: element.value});
                }
            });
           
            console.log("Filter : "+options);
            const response = await clientauth.hornetPowerTools.list({
                
            });
            // const hptResponse = await clientauth.hornetPowerTools.list();
            console.log("hpt data after filter: ", response.items);
            return response.items;
        }
    }

    async hpt_create(tooltype,serialNumAdmin,coo2,partscost,motorid,
        batteryid,seaid,groundid) {
        console.log("In HPT Con")
        const response = await clientauth.hornetPowerTools.add({
            co2: coo2,
            tooltype: tooltype,
            SerialNumber: serialNumAdmin,
            partsCost: partscost,
            motorId: motorid,
            BatteryId: batteryid,
            seaTransportId: seaid,
            groundTransportId: groundid
        });
        console.log("response for addition: "+response)
    }

    async hpt_fetch_by_number(hpt, objtype){

        const hptdata =  await clientauth.hornetPowerTools.list(
            {
             filter: {
                 SerialNumber: {
                   contains: hpt,
                 },
            }
        }
        );

        if (objtype === 'motor')
        {
            const motorData = await clientauth.motor.list(
                {
                 filter: {
                     serialNumber: {
                       contains: hptdata.items[0].motorId,
                     },
                }
            }
            );

            return motorData.items;
        }

        if (objtype === 'battery'){

            const batteryData = await clientauth.battery.list(
                {
                 filter: {
                     serialNumber: {
                       contains: hptdata.items[0].BatteryId,
                     },
                }
            }
            );

            return batteryData.items;

        }
        if (objtype === 'seatransport'){
            const seadata = await clientauth.seaTransportation.list(
                {
                 filter: {
                    trackingNumber: {
                       contains: hptdata.items[0].seaTransportId,
                     },
                }
            }
            );

            return seadata.items;

        }
        if (objtype === 'groundtransport'){

            const grounddata = await clientauth.groundTransportation.list(
                {
                 filter: {
                    trackingNumber: {
                       contains: hptdata.items[0].groundTransportId,
                     },
                }
            }
            );

            return grounddata.items;

        }

         console.log("HPT Items :",hptdata.items)
         if (hptdata.items.length !== 0){
            console.log("HPT ID:", hptdata.items[0].SerialNumber);
            console.log("HPT Motor :", hptdata.items[0].motorId);
            console.log("HPT Battery :", hptdata.items[0].BatteryId);
            console.log("HPT Sea :", hptdata.items[0].seaTransportId);
            console.log("HPT Ground :", hptdata.items[0].groundTransportId);
         }
         return hptdata.items;
     }

    async hpt_delete(data) {
        console.log("in hpt delete");
        const deleteProductResponse = await clientauth.hornetPowerTools.remove(data);
        console.log("delete response",deleteProductResponse);
        return deleteProductResponse;
    }
}

export default new HptCon();
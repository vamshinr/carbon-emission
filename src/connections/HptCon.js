import { json } from "react-router-dom";
import clientdetails from "./main";

const clientauth = clientdetails();

class HptCon{
    // async hpt_filter_fetch(element){
    //     var options = [];
    //     var data = [];
    //     selectedItemsList.forEach(element =>{
    //         console.log("Key"+element.key+element.value);
    //         const name = element.name;
    //         const res =  clientauth.hornetPowerTools.list(
    //             {
    //                 filter: {
    //                 name : {
    //                     contains: element.value
    //                     },
    //             }
    //         }
    //         );
    //         data.extend(items);
    //         if(element.key === "Battery ID"){
    //             options.push({batteryId: element.value});
    //         }
    //         else if(element.key === "Motor ID"){
    //             options.push({motorId: element.value});
    //         }
    //         else if(element.key === "Sea Route ID"){
    //             options.push({seaTransportId: element.value});
    //         }
    //         else if(element.key === "Ground Route ID"){
    //             options.push({groundTransportId: element.value});
    //         }
    //     });
    //     return res.items
    // }
    async hpt_fetch(selectedItemsList) {
        console.log(selectedItemsList);
        const hptResponse = await clientauth.hornetPowerTools.list();
        if (selectedItemsList.length != 0){
            var options = [];
            var data = [];
            selectedItemsList.forEach(element =>{
                console.log("Key"+element.key+element.value);
                const res = hptResponse.items;
                console.log("res",res);
                console.log("going beyond");
                console.log(element.value);
                console.log(res[0]);
                for(var i = 0; i < res.length; i++) {
                    var flag = 0;
                    if(element.key === "Battery ID"){
                        if (res[i].BatteryId==element.value){
                            for (var j=0; j < data.length; j++){
                                if (data[j].BatteryId == res[i].BatteryId){
                                    flag = 1;
                                }
                            }
                            if (flag!=1){
                                data.push(res[i]);
                                flag = 0;
                            }
                            
                        }
                        options.push({batteryId: element.value});
                    }
                    else if(element.key === "Motor ID"){
                        if (res[i].motorId==element.value){
                            for (var j=0; j < data.length; j++){
                                if (data[j].motorId == res[i].motorId){
                                    flag = 1;
                                }
                            }
                            if (flag!=1){
                                data.push(res[i]);
                                flag = 0;
                            }
                            
                        }
                        options.push({motorId: element.value});
                    }
                    else if(element.key === "Sea Route ID"){
                        if (res[i].seaTransportId==element.value){
                            for (var j=0; j < data.length; j++){
                                if (data[j].seaTransportId == res[i].seaTransportId){
                                    flag = 1;
                                }
                            }
                            if (flag!=1){
                                data.push(res[i]);
                                flag = 0;
                            }
                            
                        }
                        options.push({seaTransportId: element.value});
                    }
                    else if(element.key === "Ground Route ID"){
                        if (res[i].groundTransportId==element.value){
                            for (var j=0; j < data.length; j++){
                                if (data[j].groundTransportId == res[i].groundTransportId){
                                    flag = 1;
                                }
                            }
                            if (flag!=1){
                                data.push(res[i]);
                                flag = 0;
                            }
                            
                        }
                        options.push({groundTransportId: element.value});
                    }
                }

            });
            console.log(data);
            console.log("Filter : "+options);
            return data;
            // const hptResponse = await clientauth.hornetPowerTools.list();
        }
        else{
            console.log("hpt data: ", hptResponse.items);
            return hptResponse.items;
        }
    }

    async hpt_create(tooltype,serialNumAdmin,coo2,partscost,motorid,
        batteryid,seaid,groundid) {
        console.log("In HPT Con")
        const response = await clientauth.hornetPowerTools.add({
            co2: coo2,
            toolType: tooltype,
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

    async hpt_update(data) {
        console.log("in hpt update");
        delete data['_owner'];
        const updatehptResponse = await clientauth.hornetPowerTools.update(data);
        console.log("update response",updatehptResponse);
        return updatehptResponse;
    }
}

export default new HptCon(); 
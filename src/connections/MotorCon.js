import clientdetails from "./main";

const clientauth = clientdetails();


    async function motor_fetch() {
        const motorResponse = await clientauth.motor.list();
        console.log(motorResponse.items);
        return (motorResponse);
    }

export default motor_fetch;

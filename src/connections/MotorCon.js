import clientdetails from "./main";

const clientauth = clientdetails();

class MotorCon {

    async motor_fetch() {
        const motorResponse = await clientauth.motor.list();
        console.log(motorResponse.items);
        return (motorResponse);
    }
}

export default new MotorCon();

import clientdetails from "./main";

const clientauth = clientdetails();

class RouteInfo{

    async route_fetch_start(id) {
        const Response = await clientauth.RouteInfo.list(
            {
             filter: {
                 routeId: {
                   eq: id
                 }
            }
        }
        );
        console.log(Response.items);
        return Response.items[0].startPoint;
    }

    async route_fetch_end(id) {
        const Response = await clientauth.RouteInfo.list(
            {
             filter: {
                 routeId: {
                   eq: id
                 }
            }
        }
        );
        console.log(Response.items);
        return Response.items[0].endPoint;
    }
}
export default new RouteInfo();
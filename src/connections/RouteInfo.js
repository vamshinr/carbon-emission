import clientdetails from "./main";

const clientauth = clientdetails();

class RouteInfo{

    async route_fetch() {
        console.log("entered route info",clientauth);
        const Response = await clientauth.routeTable.list();
        console.log(Response.items);
        return Response.items;
    }

    async route_fetch_start(id) {
        const Response = await clientauth.routeTable.list(
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
        const Response = await clientauth.routeTable.list(
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
import http from "node:http";

import { DEFAULT_HEADER } from "./constants.js";

const httpVerbs = ["GET", "POST", "PUT", "DELETE", "PATCH"];
const routes = {
  default: async (request, response) => {
    response.writeHead(404, DEFAULT_HEADER);
    response.write("Not Found");
    response.end();
  },
};

/**
 * Creates a customRouter application
 */
export default function CustomRouter() {
  /**
   * Starts a server listening for connections
   * @param {number | undefined} port Port to run an application
   * @param callback Called when the server is running
   */
  function listen(port = 3000, callback = () => void 0) {
    http.createServer(_handler).listen(port, callback());
  }

  function _handler(req, res) {
    const { url, method, headers } = req;

    const newUrl = new URL(url, `http://${headers.host}`);
    let pathSplitted = newUrl.pathname.split("/");

    const flag = pathSplitted[2];
    let key;
    let newReq = req;

    if (flag) {
      console.log("newReq.params: \n", newReq);
      newReq.params.id = flag;
      pathSplitted.pop();

      const pathSanitized = pathSplitted.join("/");
      const regex = new RegExp(`(${method}${pathSanitized}/:[a-zA-Z]*)`);

      key = Object.keys(routes).join("+").match(regex)[0];
    } else {
      const pathSanitized = pathSplitted.join("/");

      key = `${method}${pathSanitized}`;
    }

    const route = routes[key] || routes.default;

    return Promise.resolve(route(req, res)).catch(_ErrorHandler(res));
  }

  function _ErrorHandler(response) {
    return (error) => {
      console.error("FATAL ERROR", error);
      response.writeHead(error.status || 500, DEFAULT_HEADER);
      response.write(
        JSON.stringify({
          error: error.message || "Internal Server Error",
        })
      );

      return response.end();
    };
  }

  void (function _addMethods() {
    for (let method of httpVerbs) {
      CustomRouter.prototype[method] = function (path, handler) {
        const route = method.concat(path);

        routes[route] = handler;
        console.log("routes:\n", routes);
      };
    }
  })();

  const { GET, POST, PUT, PATCH, DELETE } = CustomRouter.prototype;

  return {
    get: GET,
    post: POST,
    put: PUT,
    patch: PATCH,
    delete: DELETE,
    listen,
  };
}

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/",
  withCredentials: true,
});

enum RequestMethods {
  GET,
  PUT,
  POST,
  PATCH,
  DELETE,
}

const request = async (method: RequestMethods, url: string, data?: any) => {
  switch (method) {
    case RequestMethods.GET: {
      return api.get(url);
    }
    case RequestMethods.DELETE: {
      return api.delete(url);
    }
    case RequestMethods.PATCH: {
      return api.patch(url, data);
    }
    case RequestMethods.POST: {
      return api.post(url, data);
    }
    case RequestMethods.PUT: {
      return api.put(url, data);
    }
  }
};

export { api, RequestMethods, request };

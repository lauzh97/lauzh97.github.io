import BaseRequestModel from "../utils/baseRequestModel";
import { Body } from "../utils/apiTypes";
import { Observable } from "rxjs";

const ApiService = {
  get: (route: string): Observable<any> => {
    const headers = new Headers();
    headers.append("Access-Control-Allow-Origin", "*");

    const newBase = new BaseRequestModel(route, "GET", headers);
    return newBase.request();
  },
  post: (route: string, form: Body): Observable<any> => {
    const headers = new Headers();
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Content-Type", "application/json");

    const newBase = new BaseRequestModel(route, "POST", headers, form);
    return newBase.request();
  },
};

export default ApiService;

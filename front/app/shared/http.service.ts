import { Injectable }     from '@angular/core';
import {Http, Response, Headers, RequestOptions, RequestMethod, Request} from '@angular/http';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import {RequestArgs} from "@angular/http/src/interfaces";
import {AppComponent} from "../app.component";
import {isNullOrUndefined} from "util";
import {AppModule} from "../app.module";


@Injectable()
export class HttpService {

    constructor (private http: Http) {}

    static discovery: Object = null;

    init(fn: Function) {
        console.log("init: get-discovery")
        this.http.get("http://localhost:9000/discovery").toPromise().then(r => this.setDiscovery(fn, r))
    }

    setDiscovery(fn: Function, response: Response) {
        HttpService.discovery = response.json();
        console.log(HttpService.discovery);
        console.log("Discovery Setado");
        fn();
    }

    req(reqMap: ReqMap): void {
        console.log("REQ: " + reqMap.url);
        if (HttpService.discovery == null) {
            console.log("NULL - INIT DISCOVERY");
            this.init(() => {
                this.simpleReq(reqMap);
            });
        } else {
            this.simpleReq(reqMap);
        }
    }

    private simpleReq(reqMap: ReqMap) {
        this.http.request(this.getRequestMap(reqMap)).toPromise().then(r => reqMap.handler(r))
    }

    getMethod(reqMap: ReqMap): RequestMethod {
        switch (reqMap.method.toLowerCase()) {
            case "get": {
                return RequestMethod.Get;
            }
            case "post": {
                return RequestMethod.Post;
            }
            case "delete": {
                return RequestMethod.Delete;
            }
        }
    }

    renderUrl(reqMap: ReqMap): string {
        var str = reqMap.url;
        console.log("Req: " + HttpService.discovery[reqMap.url]);
        if (HttpService.discovery[reqMap.url]) {
            str =  HttpService.discovery[reqMap.url]["url"];
            console.log("Achei: " + HttpService.discovery[reqMap.url].url)
        }
        console.log(reqMap.replaceMap);
        for (let key in reqMap.replaceMap) {
            str = str.replace(new RegExp(`:${key}`), reqMap.replaceMap[key]);
            console.log("STR: " + str);
        }
        return str;
    }

    getRequestMap(reqMap: ReqMap): Request {
        return new Request({url: this.renderUrl(reqMap), method: this.getMethod(reqMap), body: reqMap.body})
    }
}

export interface ReqMap {
    url: string;
    method: string;
    replaceMap?: Object;
    body?: any;
    handler: (value: Response) => any;
}

export interface DiscoveryEntry {
    url?: string,
    method?: string,
}

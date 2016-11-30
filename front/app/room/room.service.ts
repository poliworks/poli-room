import { Injectable }     from '@angular/core';
import {Http, Response, Headers, RequestOptions, RequestMethod, Request} from '@angular/http';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import {RequestArgs} from "@angular/http/src/interfaces";

@Injectable()
export class RoomService {

    constructor (private http: HttpService) {}

    getRooms(): void {
        this.http.req({url: "", method: "", handler: null})
    }

}

@Injectable()
export class HttpService {

    constructor (private http: Http) {}

    req(reqMap: ReqMap): void {
        this.http.request(this.getRequestMap(reqMap)).toPromise().then(reqMap.handler)
    }

    getMethod(reqMap: ReqMap): RequestMethod {
        switch (reqMap.method) {
            case "GET": {
                return RequestMethod.Get;
            }
            case "POST": {
                return RequestMethod.Post;
            }
        }
    }

    renderUrl(reqMap: ReqMap): string {
        var str = reqMap.url;
        for (let key in reqMap.replaceMap) {
            str = str.replace("/:" + key + "/g", reqMap.replaceMap[key])
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
    replaceMap?: Map<string, any>;
    body?: any;
    handler: (value: Response) => any;

}

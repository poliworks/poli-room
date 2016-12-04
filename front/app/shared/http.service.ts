import {Injectable}     from '@angular/core';
import {Http, Response, RequestMethod, Request} from '@angular/http';
import {Router, NavigationExtras} from '@angular/router'

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

declare var Materialize: any;

@Injectable()
export class HttpService {

    static discovery: Object = null;
    static user: User = null;

    constructor(private http: Http, private router: Router) { }

    init(fn: Function) {
        this.http.get("http://localhost:9000/discovery").toPromise().then(r => this.setDiscovery(fn, r))
    }

    setDiscovery(fn: Function, response: Response) {
        HttpService.discovery = response.json();
        fn();
    }

    req(reqMap: ReqMap): void {
        if (HttpService.discovery === null) {
            this.init(() => {
                this.simpleReq(reqMap);
            });
        } else {
            this.simpleReq(reqMap);
        }
    }

    private simpleReq(reqMap: ReqMap) {
        this.http.request(this.getRequestMap(reqMap)).toPromise().then(r => reqMap.handler(r)).catch(this.catchError.bind(this))
    }

    private catchError(reason: Response) {
        if (reason.status == 403) {
            let navigationExtras: NavigationExtras = {
                queryParams: {'forbidden': true},
            };
            this.router.navigate(["/login"], navigationExtras);
        } else {
            Materialize.toast(reason.status + "  " + reason.json()["message"], 4000);
        }
    }

    getMethod(reqMap: ReqMap): RequestMethod {

        if (reqMap.method != null) {
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
        } else {
            return HttpService.discovery[reqMap.url].method
        }

    }

    renderUrl(reqMap: ReqMap): string {
        var str = reqMap.url;
        if (HttpService.discovery[reqMap.url]) {
            str = HttpService.discovery[reqMap.url]["url"];
        }
        console.log(reqMap.replaceMap);
        for (let key in reqMap.replaceMap) {
            str = str.replace(new RegExp(`:${key}`), reqMap.replaceMap[key]);
        }
        return str;
    }

    getRequestMap(reqMap: ReqMap): Request {
        let req = new Request({url: this.renderUrl(reqMap), method: this.getMethod(reqMap), body: reqMap.body});
        req.headers.append("Authorization", this.getToken(reqMap));
        console.log(req.headers.toJSON());
        return req;
    }

    getToken(reqMap: ReqMap): string {
        return "Bearer " + (reqMap.token || (HttpService.user != null ? HttpService.user.token : null) || this.getTokenFromSession() || "")
    }

    getTokenFromSession(): string {
        let userToken = localStorage.getItem("user_token");
        if (userToken) {
            HttpService.setUserFromSession()
        }
        return localStorage.getItem("user_token")
    }

    static setUserFromSession() {
        HttpService.user = JSON.parse(localStorage.getItem("current_user"))
    }

    static setUser(user: User): void {
        HttpService.user = user;
        localStorage.setItem("user_token", user.token);
        localStorage.setItem("current_user", JSON.stringify(user))
    }

    static destroySession(): void {
        HttpService.user = null;
        localStorage.clear();
    }

    static isLoggedIn(): boolean {
        HttpService.setUserFromSession();
        return HttpService.user != null
    }

}

export interface ReqMap {
    url: string;
    method?: string;
    replaceMap?: Object;
    body?: any;
    token?: string;
    handler: (value: Response) => any;
}

export interface DiscoveryEntry {
    url?: string,
    method?: string,
}

export interface User {
    name: string,
    id: number,
    email: string,
    usertType: string,
    token: string
}

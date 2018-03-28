import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from "@angular/router";
import 'rxjs/Rx';
import { Observable } from "rxjs";
@Injectable()
export class AuthGuard   {
    public authstatus: boolean;
    constructor(private http: Http , private router: Router) {
        console.log("constructor()")
    }
}
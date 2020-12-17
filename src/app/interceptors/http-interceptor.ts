import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { GlobalService } from '../service/global/global.service';
import { tap } from 'rxjs/operators'; 

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

    constructor(private globalService: GlobalService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.globalService.requestStarted();
        return this.handler(next, req);
    }

    handler(next, request) {
        return next.handle(request)
            .pipe(
                tap((event: HttpResponse<any>) => {
                    if (event instanceof HttpResponse)
                        this.globalService.requestEnded();
                },
                    (error: HttpErrorResponse) => {
                        this.globalService.resetSpinner();
                        console.log(error);
                    }),
            );
    }
}
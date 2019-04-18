// For login token based authorization.
import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { LoginService } from './login.service';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req, next) {
    const loginService = this.injector.get(LoginService);
    const tokenizedReq = req.clone(
      {
        headers: req.headers.set('Authorization', 'bearer ' + loginService.getToken())
      }
    );
    return next.handle(tokenizedReq);
  }
}

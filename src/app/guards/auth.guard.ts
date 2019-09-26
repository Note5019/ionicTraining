import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivate,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private alert: AlertController
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return true;
    // if (route.url.toString().indexOf('/dashboard') > 0) {
    //   const expectedRole = route.data.roles;
    //   console.log(route.data.roles);
    //   return this.authService.getCurrentUser().pipe(
    //     map(user => {
    //       if (!user) {
    //         this.showAlert();
    //         return this.router.parseUrl('/login');
    //       } else {
    //         const role = user.roles;

    //         if (expectedRole === role || expectedRole === undefined) {
    //           return true;
    //         } else {
    //           this.showAlert();
    //           return this.router.parseUrl('/login');
    //         }
    //       }
    //     })
    //   );
    // } else {
    //   if (this.authService.isAuthenticated()) {
    //     return true;
    //   }
    // }
    // this.showAlert();
    // return this.router.parseUrl('/login');
  }

  async showAlert() {
    const alert = await this.alert.create({
      header: 'Unauthorized',
      message: 'You are not authorized to vist that page!',
      buttons: ['OK']
    });
    alert.present();
  }
  // return this.authService.isAuthenticated();
}

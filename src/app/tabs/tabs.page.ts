import { AlertController } from '@ionic/angular';
import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private authService: AuthService, private router: Router, public alertController: AlertController) { }

  // logout() {
  //   if (confirm('Do you want to logout?')) {
  //     this.authService.logout();
  //     this.router.navigateByUrl('/login');
  //   }
  // }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Do you want to logout?',
      message: 'Dah!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          cssClass: 'danger',
          handler: () => {
            this.authService.logout();
            this.router.navigateByUrl('/login');
          }
        }
      ]
    });

    await alert.present();
  }
}

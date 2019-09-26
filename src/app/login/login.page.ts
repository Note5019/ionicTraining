import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  currentUser: any;

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(loginForm: FormGroup) {
    const user = { ...loginForm.value }; // Object.assign({}, this.user, loginForm.value);
    this.router.navigateByUrl('/app/dashboard');
    // this.authService.login(user.username, user.password).subscribe(data => {
    //   if (data) {
    //     this.currentUser = data;
    //     console.log(this.currentUser);
    //     const role = this.currentUser.roles;

    //     if (role === 'ADMIN') {
    //       this.router.navigateByUrl('/app/dashboard');
    //     } else if (role === 'USER') {
    //       this.router.navigateByUrl('/app/user/dashboard');
    //     }
    //   }
    // });
  }
}

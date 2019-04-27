import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/api-boundle/services/auth.service';
import { Login } from 'src/app/api-boundle/models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  returnUrl: string;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private authService: AuthService
  ) { }

  schema: any = {
    'type': 'object',
    'properties': {
      'username': {
        'type': 'string'
      },
      'password': {
        'type': 'string'
      },
    },
  };

  layout: any = [
    {
      key: 'username'
    },
    {
      key: 'password'
    },
    {
      type: 'submit',
      title: 'Login'
    }
  ];

  login(form: any) {
    console.log(form);
    this.authService.login(new Login(form.username, form.password))
        .subscribe(
            data => {
              this.router.navigate([this.returnUrl]);
            },
            error => {}
          );
  }

  ngOnInit() {
      // reset login status
      this.authService.logout();

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

}

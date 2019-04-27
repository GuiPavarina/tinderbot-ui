import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/api-boundle/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  schema: any = {
    'type': 'object',
    'properties': {
      'username': {
        'type': 'string'
      },
      'email': {
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
      key: 'email'
    },
    {
      key: 'password'
    },
    {
      type: 'submit',
      title: 'Register'
    }
  ];

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  register(form: any) {
    this.authService.register(form).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}

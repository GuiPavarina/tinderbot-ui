import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/api-boundle/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  logged: Boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.authService.currentUserValue.subscribe(
      (value) => {
        console.log(value);
        if ( value != null) {
          this.logged = true;
        } else {
          this.logged = false;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

}

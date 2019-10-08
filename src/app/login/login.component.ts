import { Component, OnInit } from '@angular/core';
import { AuthService, ScopesBuilder, AuthConfig, TokenService } from '../spotify-auth';
import { Router } from '@angular/router';

@Component({
  selector: 'sort-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private tokenSvc: TokenService, private router: Router) {}

  ngOnInit() {
    if (!!this.tokenSvc.oAuthToken) {
      this.router.navigate(['home']);
    }
  }

  public login(): void {
    const scopes = new ScopesBuilder() /* .withScopes(ScopesBuilder.LIBRARY) */
      .build();

    const ac: AuthConfig = {
      client_id: '727f47bff18244eb83ad879e8ad30682', // WebPortal App Id. Shoud be config
      response_type: 'token',
      redirect_uri: 'http://localhost:4200/authorized', // My URL
      state: '',
      scope: 'playlist-read-private',
      show_dialog: true,
    };
    this.authService.configure(ac).authorize();
  }
}
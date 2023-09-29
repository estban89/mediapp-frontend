import { Component, OnInit } from '@angular/core';
import '../../../assets/login-animation.js';
import { LoginService } from 'src/app/service/login.service';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  username: string;
  password: string;
  message: string;
  error: string;

  constructor(
    private loginService: LoginService,
    private router: Router
  ){}

  ngOnInit(): void {
    
  }

  login(){
    this.loginService.login(this.username, this.password).subscribe(data => {
      sessionStorage.setItem(environment.TOKEN_NAME, data.jwtToken);
      //localStorage.setItem(environment.TOKEN_NAME, data.jwtToken);
      this.router.navigate(['/pages/dashboard']);
    });
  }

  ngAfterViewInit(){
    (window as any).initialize();
  }

}

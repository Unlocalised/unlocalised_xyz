import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: new FormControl(''),
      password: new FormControl(''),
  });
  }

  login(){
    this.authService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value).subscribe(response => {
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
    });
    this.loginForm.reset();
  }

  logout(){
    this.authService.logout(JSON.parse(localStorage.getItem('user')), localStorage.getItem('token')).subscribe(response => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    });
  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

}

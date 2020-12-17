import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/service/global/global.service';
import { SystemUserService } from 'src/app/service/system-user/system-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //TODO -loader and snackbar

  isDisabled: boolean;
  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router, private userService: SystemUserService, private globalService: GlobalService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.isDisabled = true;
  }

  onSubmit() {
    //stop here  if form fields are invalid
    if (this.loginForm.invalid)
      return;

    this.userService.userLoginCredsPost(this.loginForm.value)
      .subscribe(data => {
        console.log(data);
        if (data.statusCode == 200)
          localStorage.setItem("jwtToken", data.payload);
        this.globalService.openSnackBar(data.message, "Close");
      },
        error => {
          console.log(error);
          this.globalService.openSnackBar("Something went wrong", "Close");
        })
  }

  onInput(): void {
    if (this.loginForm.get('userName').invalid || this.loginForm.get('password').invalid) {
      this.isDisabled = true;
    } else {
      this.isDisabled = false;
    }
  }
}
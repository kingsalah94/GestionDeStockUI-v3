import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public loginFailed: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  login(): void {
    const username = this.f['username'].value;
    const password = this.f['password'].value;

    const success = this.authService.login(username, password);
    if (success) {
      this.loginFailed = false;
      this.router.navigateByUrl('/store');
    } else {
      this.loginFailed = true;
    }
  }
}


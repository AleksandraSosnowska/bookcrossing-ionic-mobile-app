import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertController} from '@ionic/angular';
import {Router} from '@angular/router';
import {SignUpInfo} from '../../shared/models/sign-up-info';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  private passRegex = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$';
  registerForm: FormGroup;

  constructor(private alertCtrl: AlertController,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
    this.registerForm = this.generateForm();
  }

  ionViewWillEnter() {
  }

  generateForm(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.pattern(this.passRegex)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      city: new FormControl('', [Validators.required]),
      province: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl(0, [Validators.pattern('^[0-9]+$')]),
    });
  }

  equalsPasswords(confirm: string): boolean{
    return this.registerForm.get('password').value === confirm;
  }

  onSubmit(){
    this.alertCtrl.create({
      header: 'Confirm password',
      inputs: [
        {
          name: 'confirmPassword',
          type: 'password',
          placeholder: 'Conform password',
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Register',
          handler: (alertData) => {
            this.register(alertData.confirmPassword);
          }
        }
      ]
    }).then(alert => alert.present());
  }

  register(confirm: string) {
    if (this.equalsPasswords(confirm) && this.registerForm.valid) {
      this.signIn();
    } else {
      this.failure('Passwords are not equal');
    }
  }

  signIn() {
    const signupInfo = new SignUpInfo(
        this.registerForm.get('name').value,
        this.registerForm.get('lastname').value,
        this.registerForm.get('username').value,
        this.registerForm.get('email').value,
        this.registerForm.get('city').value,
        this.registerForm.get('province').value,
        this.registerForm.get('phoneNumber').value,
        this.registerForm.get('password').value);

    this.authService.signUp(signupInfo).subscribe(
        () => {
          this.success();
        },
        error => {
          this.failure('Something went wrong');
        }
    );
  }

  success() {
    this.alertCtrl.create({
      header: 'Success!',
      subHeader: 'Account registered',
      message: 'Now you can login to app',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigateByUrl('navigation/login');
          }
        }]
    }).then(alert => alert.present());
  }

  failure(subHeader: string) {
    this.alertCtrl.create({
      header: 'Failure!',
      subHeader,
      message: 'Check entered data and try again',
      buttons: ['OK']
    }).then(alert => alert.present());
  }

  formInputIsRequired(i: string){
    return true;
  }
}
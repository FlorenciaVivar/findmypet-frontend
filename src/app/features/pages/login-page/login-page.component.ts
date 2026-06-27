import {Component, inject} from '@angular/core';
import {AuthFormComponent} from '../../components/auth-form/auth-form.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [
    AuthFormComponent
  ],
  templateUrl: './login-page.component.html',
  standalone: true,
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  private router = inject(Router);
  goBack() {
    this.router.navigate(['/'])
  }
}

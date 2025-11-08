import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { JsonPipe } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  imports: [JsonPipe, RouterLink, RouterLinkActive],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
  user: any
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.getUser().subscribe((user) => {
      this.user = user
    })
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/login'])
  }
}

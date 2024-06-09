import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../login/service/auth.service';

@Component({
    selector: 'sesion-experida-component',
    templateUrl: './sesion.expirada.component.html',
    styleUrls: ['./sesion.expirada.component.scss']
  })
export class SesionExpiradaComponent implements OnInit {

    visible: boolean
    
    constructor(private authService: AuthService) { 
      this.visible = true
    }

    ngOnInit() {
      //setTimeout(() => this.authService.logout(), 3000);
    }

    onLoggedout() {
      this.authService.logout();
  }
}
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../login/service/auth.service';

@Component({
    selector: 'sesion-inactiva-component',
    templateUrl: './sesion.inactiva.component.html',
    styleUrls: ['./sesion.inactiva.component.scss']
  })
export class SesionInactivaComponent implements OnInit {

    visible: boolean
    
    constructor(private authService: AuthService) { 
      this.visible = true
    }

    ngOnInit() {
      setTimeout(() => this.authService.logout(), 3000);
    }
}
import { Component, OnInit } from '@angular/core';
import { LoginOutput } from '@app/core/auth/login/dto/login.output';
import { AuthService } from '@app/core/auth/login/service/auth.service';
import { EtiquetaService } from '@app/core/etiqueta/service/etiqueta.service';
import { SideBarService } from '@app/core/sidebar/side.bar.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { ConfirmationService, MessageService, LazyLoadEvent, SelectItem } from 'primeng/api';
import { DashboardOutput } from './dto/dashboard.output';
import * as moment from 'moment';

@Component({
  selector: 'dashboard-component',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,
    private authService: AuthService,
    private sideBarService: SideBarService,
    private etiquetaService: EtiquetaService,
    private datepipe: DatePipe,
    public messageService: MessageService,
  ) {


  }

  ngOnInit() {


  }

}
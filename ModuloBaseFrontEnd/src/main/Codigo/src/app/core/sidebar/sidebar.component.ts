import { Component, Output, EventEmitter, OnInit, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '@app/core/auth/login/service/auth.service';
import { ModuloOutput } from '../auth/login/dto/modulo.output';
import { environment } from '@env/environment';
import { SideBarService } from './side.bar.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    isActive: boolean;
    collapsed: boolean;
    showMenu: string;
    pushRightClass: string;

    modulos: ModuloOutput[];

    @Output() collapsedEvent = new EventEmitter<boolean>();

    constructor(private authService: AuthService, public sideBarService: SideBarService,
                public router: Router) {
        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });

        this.modulos = this.authService.currentUserValueStore().modulos;
    }

    ngOnInit() {
        this.isActive = false;
        this.collapsed = false;
        this.showMenu = '';
        this.pushRightClass = 'push-right';
        this.ocultarSideBar();
    }

    obtenerContexto() {
        return environment.contexto;
    }

    redireccionarDashboard(): string {
        return environment.maDashboard;
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
            this.collapsed = false;
            this.collapsedEvent.emit(this.collapsed);
        }
        this.sideBarService.toggleOpen();
    }

    toggleCollapsed() {
        this.showMenu = '0';
        this.collapsed = !this.collapsed;
        this.collapsedEvent.emit(this.collapsed);
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rolUsuario() {
        return this.authService.currentUserValueStore().rol;
    }

    onLoggedout() {
        this.authService.logout();
    }

    redireccionar() {
        this.sideBarService.toggleOpen();
    }

   // @HostListener('mouseenter')
    mostrarSideBar(obj: Event) {
        this.collapsed = false;
        this.collapsedEvent.emit(this.collapsed);
        this.sideBarService.toggleOpen();
    }

    ocultarSideBar() {
        if (!this.collapsed) {
            this.showMenu = '0';
            this.collapsed = true;
            this.collapsedEvent.emit(this.collapsed);
        }
    }
    abrirSideBar() {
        if (this.collapsed) {
            this.showMenu = '1';
            this.collapsed = false;
            this.collapsedEvent.emit(!this.collapsed);
        }
    }

}

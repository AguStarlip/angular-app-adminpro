import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  menuItems: any[];

  constructor(private usuarioService: UsuarioService, private sidebarService: SidebarService) {

    this.menuItems = sidebarService.menu;
    
  }

  logout(){
    this.usuarioService.logout();
  }

}

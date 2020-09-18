import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  public menuItems: any[];
  public usuario: Usuario;

  constructor(private usuarioService: UsuarioService, private sidebarService: SidebarService) {
    this.menuItems = sidebarService.menu;
    this.usuario = usuarioService.usuario;
  }

  logout(){
    this.usuarioService.logout();
  }

}

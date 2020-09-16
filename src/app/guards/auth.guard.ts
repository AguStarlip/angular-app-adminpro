import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private usuarioService: UsuarioService){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){

      return this.usuarioService.validarToken()
              .pipe(
                tap(thisAuth => {
                  if(!thisAuth){
                    this.router.navigateByUrl('/login');
                  }
                })
              );
  }
  
}

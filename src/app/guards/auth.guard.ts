import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private router: Router, private usuarioService: UsuarioService){}

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    
    return this.usuarioService.validarToken()
              .pipe(
                tap(thisAuth => {
                  if(!thisAuth){
                    this.router.navigateByUrl('/login');
                  }
                })
              );
  }

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

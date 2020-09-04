import { Component, OnDestroy } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy{

  public titulo: string;
  public tituloSubs$: Subscription;

  constructor(private router: Router) { 

    this.tituloSubs$ = this.getRouteData()
                            .subscribe(data => {
                              this.titulo = data.titulo;
                              document.title = `AdminPro - ${this.titulo}`;
                            });

  }

  ngOnDestroy(): void {

    this.tituloSubs$.unsubscribe();
  
  }

  getRouteData(){

    return this.router.events
    .pipe(
      filter(event => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data)
    );

  }

}

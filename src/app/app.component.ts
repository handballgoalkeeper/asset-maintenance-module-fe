import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {FooterComponent} from "./components/common/footer/footer.component";
import {Title} from '@angular/platform-browser';
import {environment} from '../environments/environment';
import {filter, map, mergeMap} from 'rxjs';

@Component({
  selector: 'app-root',
    imports: [RouterOutlet, FooterComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  private title = inject(Title);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  constructor() {
    this.title.setTitle(`FAMS - ${environment.moduleName}`);
  }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      mergeMap(route => route.data)
    ).subscribe(data => {
      this.title.setTitle(`FAMS - ${environment.moduleName} | ${data['title']}` || `FAMS - ${environment.moduleName}`)
    });
  }
}

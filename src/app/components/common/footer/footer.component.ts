import {Component, OnInit, signal} from '@angular/core';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  standalone: true,
  styleUrl: './footer.component.css',
})
export class FooterComponent implements OnInit{
  public currentYear = signal<number|null>(null);
  public appName = environment.mainAppName;
  public moduleName = environment.moduleName;
  public appVersion = environment.version;

  ngOnInit(): void {
    this.currentYear.set(new Date().getFullYear());
  }
}

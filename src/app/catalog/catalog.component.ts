import {Component, effect, OnInit, signal} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {ExtensionModel} from '../core/models/extension.model';
import {CatalogService} from './services/catalog.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {SerieModel} from '../core/models/serie.model';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-catalog',
  standalone: true,  // Composant standalone
  imports: [
    NgForOf,
    NgIf,
    FormsModule,
  ],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit{
  selectedSerie = signal<SerieModel | null>(null);


  constructor(public catalogService: CatalogService, private router: Router){
    effect(() => {
      const series = this.catalogService.series();
      if (series && series.length > 0) {
        this.selectedSerie.set(series[0]);
      }
    }, { allowSignalWrites: true });
  }

  ngOnInit(): void {
    this.catalogService.fetchExtensions();
    this.catalogService.fetchSeries();
  }

  goToExtension(extensionId:string) {
    this.router.navigate(['/catalog/extension', extensionId]);
  }
}

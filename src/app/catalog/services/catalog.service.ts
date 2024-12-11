import {Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ExtensionModel} from '../../core/models/extension.model';
import {SerieModel} from '../../core/models/serie.model';

@Injectable({
  providedIn: 'root', // Permet une injection globale
})
export class CatalogService{

  private readonly apiUrl = 'http://localhost:8080/api/';

  extensions = signal<ExtensionModel[]>([]);
  series = signal<SerieModel[]>([]);

  isLoading = signal<boolean>(false);

  error = signal<string | null>(null);

  constructor(private http:HttpClient) {}

  fetchExtensions():void{
    this.isLoading.set(true);
    this.error.set(null);

    this.http.get<ExtensionModel[]>(this.apiUrl+"extensions").subscribe({
      next: (data) => {
        this.extensions.set([...data].reverse());
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('Erreur lors du chargement des extensions');
        this.isLoading.set(false);
        console.error(err);
      },
    });
  }

  fetchSeries():void{
    this.isLoading.set(true);
    this.error.set(null);

    this.http.get<SerieModel[]>(this.apiUrl+"series").subscribe({
      next: (data) => {
        data.push({_id: '', id: 'all', name: 'Toutes'})
        this.series.set([...data].reverse());
        console.log(data)
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('Erreur lors du chargement des extensions');
        this.isLoading.set(false);
        console.error(err);
      },
    });
  }


}

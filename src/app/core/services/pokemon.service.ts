import {Injectable, signal} from '@angular/core';
import {ExtensionModel} from '../models/extension.model';
import {PokemonModel} from '../models/pokemon.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root', // Permet une injection globale
})
export class PokemonService{
  private readonly apiUrl = 'http://localhost:8080/api/';

    pokemonByExtension = signal<PokemonModel[]>([]);

  isLoading = signal<boolean>(false);

  error = signal<string | null>(null);

  constructor(private http:HttpClient) {}

  fetchPokemonByExtension(idExtension:string){
    this.isLoading.set(true);
    this.error.set(null);

    this.http.get<PokemonModel[]>(this.apiUrl+"pokemons/set/"+idExtension).subscribe({
        next: (data) => {
          this.pokemonByExtension.set(data)
          this.isLoading.set(false);
        },
      error: (err) => {
        this.error.set('Erreur lors du chargement des pokémons');
        this.isLoading.set(false);
        console.error(err);
      },
    })
  }
}

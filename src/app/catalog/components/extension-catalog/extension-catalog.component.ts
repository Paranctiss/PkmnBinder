import {Component, effect, OnInit, signal} from '@angular/core';
import {Route, ActivatedRoute} from '@angular/router';
import {CatalogService} from '../../services/catalog.service';
import {PokemonService} from '../../../core/services/pokemon.service';
import {NgForOf, NgIf} from '@angular/common';
import {ExtensionModel} from '../../../core/models/extension.model';
import {ButtonComponentComponent} from '../../../core/components/button-component/button-component.component';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-extension-catalog',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    ButtonComponentComponent,
    FormsModule
  ],
  templateUrl: './extension-catalog.component.html',
  styleUrls: ['./extension-catalog.component.scss']
})
export class ExtensionCatalogComponent implements OnInit {

  extensionId = signal<string | null>(null);
  extension = signal<ExtensionModel | null>(null);
  searchInput = signal<string>('');

  selectedPokemonIds: Set<string> = new Set<string>();

  constructor(private route: ActivatedRoute,
              public pokemonService: PokemonService,
              public extensionService: CatalogService) {

    effect(() => {
      const extensions = this.extensionService.extensions();
      const currentExtensionId = this.extensionId();

      if (extensions.length > 0 && currentExtensionId) {
        this.extension.set(
          extensions.find(ext => ext.id === currentExtensionId) || null
        );
      }
    }, { allowSignalWrites: true });
  }

  ngOnInit(): void {
    this.extensionId.set(this.route.snapshot.paramMap.get('id'));

    const currentExtensionId = this.extensionId();
    if (currentExtensionId) {
      // Charger les extensions si la liste est vide
      if (this.extensionService.extensions().length === 0) {
        this.extensionService.fetchExtensions();
      }

      // Charger les pokémons de l'extension
      this.pokemonService.fetchPokemonByExtension(currentExtensionId);
      }
    }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement; // Cast explicite
    this.searchInput.set(target.value); // Met à jour le signal
  }

  filteredPokemon() {
    const normalizeString = (str: string): string =>
      str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

    const searchValue = normalizeString(this.searchInput());

    return this.pokemonService
      .pokemonByExtension()
      .filter(pokemon => normalizeString(pokemon.name).startsWith(searchValue));
  }

  toggleSelection(pokemonId: string) {
    if (this.selectedPokemonIds.has(pokemonId)) {
      this.selectedPokemonIds.delete(pokemonId); // Décocher
    } else {
      this.selectedPokemonIds.add(pokemonId); // Cocher
    }
  }

  isSelected(pokemonId: string): boolean {
    return this.selectedPokemonIds.has(pokemonId); // Vérifie si un Pokémon est sélectionné
  }

}

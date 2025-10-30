import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Poem, PoemService } from '../poem.service';

@Component({
  selector: 'app-poem-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './poem-list.component.html',
  styleUrls: ['./poem-list.component.css'],
})
export class PoemListComponent {
  query = '';
  searchType: 'author' | 'title' | 'both' = 'author';
  poems: Poem[] = [];
  errorMessage: string | null = null;
  loading = false;

  constructor(private poemService: PoemService) {}

  onSearch(): void {
    this.errorMessage = null;
    this.poems = [];
    const q = this.query.trim();
    if (!q) {
      this.errorMessage = 'Please enter a search term.';
      return;
    }

    this.loading = true;
    const req$ =
      this.searchType === 'author'
        ? this.poemService.searchByAuthor(q)
        : this.searchType === 'title'
        ? this.poemService.searchByTitle(q)
        : this.poemService.searchByAuthorOrTitle(q);

    req$.subscribe({
      next: (data) => {
        this.poems = data ?? [];
        if (this.poems.length === 0) this.errorMessage = 'No results found.';
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = err?.message || 'Request failed.';
        this.loading = false;
      },
    });
  }

  trackByKey(_: number, p: Poem) {
    return `${p.title}|${p.author}`;
  }
}

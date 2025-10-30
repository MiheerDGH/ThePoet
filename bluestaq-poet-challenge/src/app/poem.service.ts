import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, forkJoin, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Poem {
  title: string;
  author: string;
  lines: string[];
}

@Injectable({ providedIn: 'root' })
export class PoemService {
  private baseUrl = 'https://poetrydb.org';

  constructor(private http: HttpClient) {}

  searchByAuthor(author: string): Observable<Poem[]> {
    return this.http
      .get<Poem[]>(`${this.baseUrl}/author/${encodeURIComponent(author)}`)
      .pipe(catchError(this.handleError));
  }

  searchByTitle(title: string): Observable<Poem[]> {
    return this.http
      .get<Poem[]>(`${this.baseUrl}/title/${encodeURIComponent(title)}`)
      .pipe(catchError(this.handleError));
  }

  searchByAuthorOrTitle(query: string): Observable<Poem[]> {
    const author$ = this.searchByAuthor(query);
    const title$ = this.searchByTitle(query);
    return forkJoin([author$, title$]).pipe(
      map(([a, t]) => {
        const seen = new Set<string>();
        const merged: Poem[] = [];
        [...a, ...t].forEach((p) => {
          const key = `${p.title}|${p.author}`;
          if (!seen.has(key)) {
            seen.add(key);
            merged.push(p);
          }
        });
        return merged;
      })
    );
  }

  private handleError(error: HttpErrorResponse) {
    let message = 'Unknown error occurred.';
    if (error.status && error.status !== 200) {
      message = `HTTP Error ${error.status}: Could not fetch poem data.`;
    }
    if (error.error?.reason) {
      message += ` Reason: ${error.error.reason}`;
    }
    return throwError(() => new Error(message));
  }
}

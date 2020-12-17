import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private snackBar: MatSnackBar) { }

  //method for displaying snackbar
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  private requestCount = 0;
  private loader = new BehaviorSubject<boolean>(false);
  getLoaderObserver(): Observable<boolean> {
    return this.loader.asObservable();
  }

  requestStarted() {
    if (++this.requestCount == 1)
      this.loader.next(true);
  }

  requestEnded() {
    if (this.requestCount === 0 || --this.requestCount === 0)
      this.loader.next(false);
  }

  resetSpinner() {
    this.requestCount = 0;
    this.loader.next(false);
  }
}
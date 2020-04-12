import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  $loading: Observable<boolean>;
  constructor(
    public store: Store<{loading: boolean}>
  ) {
    this.$loading = store.pipe(select('loading'));
  }
}

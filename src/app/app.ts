import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './core/header';

@Component({
  selector: 'df-root',
  imports: [RouterOutlet, Header],
  template: `
    <header df-header></header>
    <main id="content">
      <router-outlet />
    </main>
  `,
})
export class App {}

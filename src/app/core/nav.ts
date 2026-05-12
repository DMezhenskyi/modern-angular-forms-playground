import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: '[df-nav], df-nav',
  imports: [RouterLink, RouterLinkActive],
  styles: [
    `
      :host {
        display: block;
        .nav {
          display: flex;
          align-items: center;
          gap: calc(var(--spacing-step) * 1);
        }
        .nav-link {
          padding: calc(var(--spacing-step) * 1) calc(var(--spacing-step) * 1.5);
          border-radius: var(--border-radius);
          color: var(--color-text);
          transition:
            background-color 0.15s ease,
            color 0.15s ease;

          &:hover {
            background-color: rgba(255, 255, 255, 0.06);
          }
          &.active {
            border: 1px solid var(--color-accent);
            font-weight: 600;
          }
        }
      }
    `,
  ],
  template: `
    <ul class="nav">
      <li>
        <a class="nav-link" routerLink="/basic-forms" routerLinkActive="active">Basic Forms</a>
      </li>
      <li>
        <a class="nav-link" routerLink="/dynamic-forms" routerLinkActive="active">Dynamic Forms</a>
      </li>
    </ul>
  `,
})
export class Nav {}

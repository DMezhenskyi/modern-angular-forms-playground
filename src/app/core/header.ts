import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Nav } from './nav';

@Component({
  selector: '[df-header], df-header',
  imports: [NgOptimizedImage, Nav],
  styles: [
    `
      :host {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: calc(var(--spacing-step) * 2);
        padding: calc(var(--spacing-step) * 2);
        height: var(--header-height);
        width: 100%;
        border-radius: calc(var(--border-radius) * 2);
      }

      .brand {
        display: flex;
        align-items: center;
        gap: calc(var(--spacing-step) * 1.5);
      }
    `,
  ],
  template: `
    <div class="brand">
      <img ngSrc="logo.svg" alt="Decoded Frontend Logo" width="150" height="65" priority />
      <span>| Modern Angular Forms</span>
    </div>
    <nav df-nav></nav>
  `,
})
export class Header {}

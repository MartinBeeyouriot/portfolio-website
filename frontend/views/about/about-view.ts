import { LitElement, html, css, customElement } from 'lit-element';
import './about-me-component';
import '@vaadin/vaadin-grid/all-imports.js';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout.js';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout.js';
import '@polymer/iron-icon/iron-icon.js';
import '@vaadin/vaadin-icons/vaadin-icons.js';

@customElement('about-view')
export class AboutView extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        height: 100%;
        /* padding: var(--lumo-space-m) var(--lumo-space-l); */
      }

      .main-title {
        margin: 0;
        padding: 35px 0px 15px 22px;
        background-color: var(--lumo-contrast-10pct);
      }
      about-me {
        background-color: unset;
      }
    `;
  }

  render() {
    return html`<h1 class="main-title">About me</h1>
      <about-me ?contactpage="${true}"></about-me>
      <div class="main-title" style="height:100%;"></div>`;
  }
}

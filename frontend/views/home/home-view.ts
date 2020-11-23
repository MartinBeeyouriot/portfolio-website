import { LitElement, html, css, customElement } from 'lit-element';

@customElement('home-view')
export class HomeView extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: var(--lumo-space-m) var(--lumo-space-l);
      }
    `;
  }

  render() {
    return html`
      <br />
      Content placeholder
    `;
  }
}

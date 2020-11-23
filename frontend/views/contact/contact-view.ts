import { LitElement, html, css, customElement } from 'lit-element';

@customElement('contact-view')
export class ContactView extends LitElement {
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
      You can send me an email <a href="mailto:your email">here</a>.
    `;
  }
}

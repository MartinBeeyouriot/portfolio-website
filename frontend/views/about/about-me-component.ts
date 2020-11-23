import { customElement, html, css, LitElement, property } from 'lit-element';
import { render, TemplateResult } from 'lit-html';
import sharedStyle from '../../shared-styles.css';

@customElement('about-me')
export class AboutMeComponent extends LitElement {
  @property({ type: Array })
  private items: string[];

  @property({ type: Boolean })
  contactpage = false;

  constructor() {
    super();
    this.items = ['one-item'];
  }

  static get styles() {
    return [
      css`
        vaadin-grid,
        vaadin-grid-cell-content {
          background-color: #e7ebee;
          /* background-color: var(--lumo-contrast-10pct); */
        }

        vaadin-grid {
          height: 350px;
          max-height: 500px;
          line-height: var(--lumo-line-height-m);
        }

        .card {
          background-color: var(--lumo-base-color);
          border-radius: var(--lumo-border-radius);
          box-shadow: var(--lumo-box-shadow-xs);
          padding: calc(var(--lumo-space-s) * 1.5) var(--lumo-space-m);
        }

        .intro {
          text-align: justify;
          text-decoration: none;
          color: var(--lumo-secondary-text-color);
          font-size: var(--lumo-font-size-s);
          margin-bottom: var(--lumo-space-s);
          white-space: normal;
        }

        .link-about-me {
          margin: -3px 0px 0px 46px;
        }

        .footer {
          flex-wrap: wrap;
          align-items: center;
        }

        .link {
          margin-right: unset !important;
          padding-left: unset !important;
        }

        @media screen and (max-width: 860px) {
          vaadin-grid {
            height: 450px;
          }
        }

        @media screen and (max-width: 860px) {
          vaadin-grid {
            height: 300px;
          }
        }

        @media screen and (max-width: 860px) {
          vaadin-grid {
            height: 350px;
          }
        }

        @media screen and (max-width: 600px) {
          vaadin-grid {
            height: 450px;
          }
        }

        @media screen and (max-width: 500px) {
          vaadin-grid {
            height: 600px;
          }
        }

        @media screen and (max-width: 400px) {
          vaadin-grid {
            height: 700px;
            max-height: 700px;
          }
          .link-about-me {
            margin-left: 6px;
            margin-bottom: 12px;
          }
          #github-link-button {
            margin-right: 70px;
          }
        }

        ${sharedStyle}
      `,
    ];
  }

  render(): TemplateResult {
    return html`<vaadin-grid id="grid-about-me" theme="no-border no-row-borders" .items="${this.items}">
      <vaadin-grid-column .renderer="${this.renderCard.bind(this)}"> </vaadin-grid-column>
    </vaadin-grid>`;
  }

  /**
   * Render a card
   */
  private renderCard(root: any): void {
    render(
      html` <vaadin-horizontal-layout theme="spacing-s" class="card">
        <vaadin-vertical-layout>
          <vaadin-horizontal-layout theme="spacing-s" class="header">
            <div class="intro">Your Description</div>
          </vaadin-horizontal-layout>

          <vaadin-horizontal-layout theme="spacing-s" class="footer">
            <vaadin-button style="cursor: pointer;" theme="tertiary contrast" id="github-link-button" @click="${this.openGithub.bind(this)}"
              ><iron-icon src="icons/github.png" style="margin-right:var(--lumo-space-s); margin-top:-2px;"></iron-icon>My GIthub</vaadin-button
            >
            ${!this.contactpage
              ? html`
                  <span class="link-about-me">
                    <iron-icon icon="vaadin:ellipsis-dots-h"></iron-icon>
                    <a href="/about" class="special-link"><span class="special-link-span">More about me</span></a>
                  </span>
                `
              : ``}

            <span class="link-about-me">
              <iron-icon icon="vaadin:comments"></iron-icon>
              <a href="/contact" class="special-link"><span class="special-link-span">Contact me</span></a>
            </span>
          </vaadin-horizontal-layout>
        </vaadin-vertical-layout>
      </vaadin-horizontal-layout>`,
      root
    );
  }

  /**
   * open Github link
   */
  private openGithub(): void {
    window.open('your_link', '_blank');
  }

  async firstUpdated(changedProperties: any): Promise<void> {
    super.firstUpdated(changedProperties);
    // Give the browser a chance to paint
    // await new Promise((r) => setTimeout(r, 0));
  }
}

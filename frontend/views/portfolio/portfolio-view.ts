import { css, customElement, html, LitElement, property, query } from 'lit-element';

import '@polymer/iron-icon/iron-icon.js';
import '@vaadin/vaadin-grid/all-imports.js';
import '@vaadin/vaadin-icons/vaadin-icons.js';
import '@vaadin/vaadin-lumo-styles/all-imports.js';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout.js';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout.js';
import '@vaadin/vaadin-notification/vaadin-notification';
import '@vaadin/vaadin-dialog';
import '@vaadin/vaadin-details';
import '@vaadin/vaadin-date-picker';
import './details-project';
import '../about/about-me-component';

import { render, TemplateResult } from 'lit-html';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { ifDefined } from 'lit-html/directives/if-defined';
import { Project } from './project';
import { projects } from './projects';
import { DetailsView } from './details-project';
import { AfterEnterObserver, EmptyCommands, Router, RouterLocation } from '@vaadin/router';
import { router } from '../../index';
import { NotificationElement } from '@vaadin/vaadin-notification/vaadin-notification';
import { registerStyles } from '@vaadin/vaadin-themable-mixin/register-styles.js';
import { DetailsElement } from '@vaadin/vaadin-details';

class RootColumnElement extends LitElement {
  clickEventDefined = false;
}

@customElement('portfolio-view')
export class PortfolioView extends LitElement implements AfterEnterObserver {
  @property({ type: Array })
  items: Project[] = [];

  @property({ type: Object })
  location = router.location;

  // @query('#grid')
  // private grid: any;

  @property({ type: String })
  detailsOpened = '(click to expand)';

  @query('#details-dialog')
  private detailsDialog: DetailsView | undefined;

  @query('.portfolio-header')
  private vaadinDetailsPortfolio: DetailsElement | undefined;

  @query('.about-header')
  private vaadinDetailsAbout: DetailsElement | undefined;

  @query('#notification')
  private notification: NotificationElement | undefined;

  /**
   * Default Constructor
   * See the details project for more explanation about binding this.
   * inside renderCard function we need to be able to access this as this class not the UI.
   * @param boundRenderCard
   */
  constructor(private boundRenderCard: (root: RootColumnElement, column: any, rowData: any) => void) {
    super();
    this.boundRenderCard = this.renderCard.bind(this);
  }

  /**
   * Check the url after entering into the view.
   * @param location
   * @param _commands
   * @param _router
   */
  onAfterEnter(location: RouterLocation, _commands: EmptyCommands, _router: Router) {
    if (location.params.project) {
    }
  }

  static get styles() {
    registerStyles(
      'vaadin-details',
      css`
        [part='toggle'] {
          padding-left: var(--lumo-space-l);
          margin-right: calc(var(--lumo-space-xs) * -1);
          padding-top: 1px;
          font-size: 20px;
        }

        :host([opened]) [part='toggle'] {
          margin-top: -32px;
          margin-left: 10px;
          margin-right: -22px;
        }

        [part='summary'] {
          cursor: pointer;
        }
      `
    );
    return [
      css`
        @import url('https://fonts.googleapis.com/css2?family=Inconsolata:wght@300;400&display=swap');

        :host {
          display: block;
          height: 100%;
        }

        .about-header,
        .portfolio-header {
          background-color: #e7ebee;
          padding: 0;
          margin: 0;
        }

        .main-title {
          margin: 0;
          padding: 15px 0px 15px 22px;
          background-color: #e7ebee;
        }

        .expand {
          float: right;
          padding-top: 9px;
          float: l;
          padding-left: 16px;
          margin-bottom: 10px;
          font-size: var(--lumo-font-size-xs);
        }

        vaadin-grid {
          height: 740px;
          line-height: var(--lumo-line-height-m);
        }

        vaadin-grid,
        vaadin-grid-cell-content {
          background-color: var(--lumo-contrast-10pct);
        }

        .card {
          background-color: var(--lumo-base-color);
          border-radius: var(--lumo-border-radius);
          box-shadow: var(--lumo-box-shadow-xs);
          padding: calc(var(--lumo-space-s) * 1.5) var(--lumo-space-m);
        }

        img {
          /* border-radius: 50%; */
          flex-shrink: 0;
          height: var(--lumo-size-m);
          width: var(--lumo-size-m);
        }

        .tags {
          list-style-type: none;
          border-radius: 14px;
          border: 2px solid #b1b1b1;
          padding: 1px 8px;
          font-size: var(--lumo-font-size-xs);
          /* --lumo-font-family: 'Nunito', sans-serif; */
          /* font-family: 'Nunito', sans-serif; */
          font-family: 'Inconsolata', monospace, sans-serif;
        }

        .l-liquid {
          border-color: #9ffffa;
        }

        .l-javascript {
          border-color: #aea8ec;
        }

        .l-java {
          border-color: #f1d2b8;
        }

        .l-css,
        .l-scss {
          border-color: #f7b6fd;
        }

        .l-typescript {
          border-color: #b4eba6;
        }

        .l-ruby {
          border-color: #b2f3b6;
        }

        .l-shopify-app,
        .l-shopify-api {
          border-color: #fdd2d2;
        }

        .l-angular {
          border-color: #c1abe4;
        }

        .l-firebase {
          border-color: #fac7d0;
        }

        .l-ionic {
          border-color: #98bdc4;
        }

        .l-android {
          border-color: #f5d6f2;
        }

        .l-aws {
          border-color: #7c9184;
        }

        .l-vaadin {
          border-color: #99b7bd;
        }

        .l-python {
          border-color: #f5d0ae;
        }

        .details {
          margin-top: calc(var(--lumo-space-xs) * -1);
          margin-bottom: calc(var(--lumo-space-xs) * -1);
          margin-left: auto;
          margin-right: auto;
        }

        .header {
          padding-left: 25px;
          flex-wrap: wrap;
          align-items: baseline;
        }

        .name {
          white-space: normal;
          display: contents;
          padding-left: var(--lumo-space-s);
          font-size: var(--lumo-font-size-m);
          font-weight: bold;
        }

        .date {
          white-space: normal;
          display: contents;
          color: var(--lumo-tertiary-text-color);
          font-size: var(--lumo-font-size-xs);
        }

        .post {
          color: var(--lumo-secondary-text-color);
          font-size: var(--lumo-font-size-s);
          margin-bottom: var(--lumo-space-s);
          white-space: normal;
        }

        .actions {
          flex-wrap: wrap;
          align-items: center;
        }

        iron-icon {
          color: var(--lumo-tertiary-text-color);
          height: calc(var(--lumo-icon-size-s) * 0.8);
          width: calc(var(--lumo-icon-size-s) * 0.8);
        }

        .likes,
        .comments,
        .shares,
        .github {
          color: var(--lumo-tertiary-text-color);
          font-size: var(--lumo-font-size-xs);
          margin-right: var(--lumo-space-l);
        }
        .githublink {
          text-decoration: none;
        }

        .tags-panel {
          flex-wrap: wrap;
          align-items: center;
        }

        .github-icon-1,
        .github-icon {
          margin-top: -2px;
          margin-right: var(--lumo-space-s);
        }

        @media screen and (max-height: 800px) {
          vaadin-grid {
            height: 530px;
            line-height: var(--lumo-line-height-xs);
          }
        }

        /** Mobile optimization */
        @media screen and (max-width: 740px) {
          .name {
            font-size: var(--lumo-font-size-s);
          }
          .githublink {
            margin-bottom: 20px;
          }
          .github {
            margin-bottom: 20px;
            margin-right: 70px;
            margin-left: -37px;
          }
          .tags-panel {
            margin-left: -37px;
          }

          .github-icon {
            margin-left: -14px;
          }
          .github-icon-1 {
            margin-left: -2px;
          }

          .tags {
            margin-top: 2px;
            font-size: var(--lumo-font-size-xs);
          }

          .website-panel {
            margin-left: -30px;
          }

          .icon-tag-fix-mobile {
            margin-left: -3px;
          }
        }
      `,
    ];
  }

  /**
   * Expand or collapse details
   */
  private detailsClick() {
    this.detailsOpened = !this.vaadinDetailsAbout?.opened ? '(click to expand)' : '(click to collapse)';
  }

  /**
   * Expand or collapse details
   * Prevent opening
   */
  private portfolioClick() {
    if (this.vaadinDetailsPortfolio) this.vaadinDetailsPortfolio.opened = false;
  }

  /**
   * render method that defines our grid
   */
  render(): TemplateResult {
    return html`
      <vaadin-details class="about-header" @click="${this.detailsClick}">
        <div slot="summary">
          <h2 class="main-title" style="display: inline;">About me</h2>
          <span class="expand">${this.detailsOpened} </span>
        </div>
        <about-me ?contactpage="${false}"></about-me>
      </vaadin-details>

      <vaadin-details class="portfolio-header" @click="${this.portfolioClick}">
        <div slot="summary">
          <h2 class="main-title">My work and projects</h2>
        </div>
      </vaadin-details>

      <vaadin-grid id="grid" theme="no-border no-row-borders" .items="${this.items}">
        <vaadin-grid-column .renderer="${this.boundRenderCard}"></vaadin-grid-column>
      </vaadin-grid>
      <details-view id="details-dialog" ?opened="${false}"></details-view>
      <vaadin-notification duration="4000" position="top-end" id="notification">
        <template>
          <div>
            <b>Notice</b><br />
            We could't found this project.
          </div>
        </template>
      </vaadin-notification>
    `;
  }

  /**
   * Render our card
   * @param root  the rootElement
   * @param _column
   * @param rowData
   */
  private renderCard(root: RootColumnElement, _column: any, rowData: any): void {
    // generate random id for our button

    /**
     * ${
                    project.shares == '0'
                      ? html`no shares yet.`
                      : html` <iron-icon icon="vaadin:connect"></iron-icon>
                          <span class="shares">${project.shares}</span>`
                  }
     */
    const buttonClass = 'button_' + Math.random().toString(36).substr(2, 9);
    const buttonClassLink = 'buttonlink_' + Math.random().toString(36).substr(2, 9);

    const project = rowData.item as Project;
    render(
      html`
        <vaadin-vertical-layout theme="spacing-s" class="card">
          <vaadin-horizontal-layout>
            <img src="${project.img}" />
            <vaadin-vertical-layout>
              <vaadin-horizontal-layout theme="spacing-s" class="header">
                <span class="name">${project.title}</span>
                <span class="date">${rowData.item.date}</span>
              </vaadin-horizontal-layout>
              <span class="post">${unsafeHTML(project.goal)}</span>
              <vaadin-horizontal-layout theme="spacing-s" class="actions">
                ${project.githubUrl
                  ? html`<a href="${ifDefined(project.githubUrl)}" class="githublink" target="_blank">
                      <span class="github"><iron-icon src="icons/github.png" class="github-icon"></iron-icon>Github</span>
                    </a>`
                  : html`${project.projectType ? html`<span class="github"><iron-icon icon="vaadin:info-circle-o" class="github-icon-1"></iron-icon>${project.projectType}</span>` : ``}`}
                <!-- PROJECT TAGS -->
                <vaadin-horizontal-layout theme="spacing-s" class="tags-panel">
                  <iron-icon icon="vaadin:tag" class="icon-tag-fix-mobile"></iron-icon>
                  ${project.tags?.map((item) => html`<li class="tags l-${item.replace('#', '')}">${item}</li>`)}
                </vaadin-horizontal-layout>
                <!-- PROJECT WEBSITE -->
                ${project.url
                  ? html`<vaadin-horizontal-layout theme="spacing-s" class="website-panel">
                      <vaadin-button theme="tertiary contrast" class="${buttonClassLink}" style="cursor: pointer;"> <iron-icon icon="vaadin:external-link" slot="prefix" style="font-size: 24px;"></iron-icon>Website sample</vaadin-button>
                    </vaadin-horizontal-layout>`
                  : html``}
              </vaadin-horizontal-layout>
            </vaadin-vertical-layout>
          </vaadin-horizontal-layout>
          <vaadin-horizontal-layout theme="spacing-xs" class="details">
            <vaadin-button theme="tertiary" class="${buttonClass}" style="cursor: pointer;">
              <!--
              <iron-icon icon="vaadin:file-picture" style="font-size: 28px;margin-top:-2px;"></iron-icon>
                -->
              View Details</vaadin-button
            >
          </vaadin-horizontal-layout>
        </vaadin-vertical-layout>
      `,
      root
    );

    /**
     * Add event listener because inside the grid they are not working
     * Can use this @click="${this.okDialog.bind(this)}
     */
    if (!root.clickEventDefined) {
      // add the click event on the card.
      // root?.firstElementChild?.addEventListener('click', () => this.clickProject(project));
      root.clickEventDefined = true;
      // needs to stop propagation if card click is enabled
      // e.stopPropagation();
      const buttonElement = root.getElementsByClassName(buttonClass)[0];
      buttonElement.addEventListener('click', () => this.clickProject(project));
      if (project.url) root.getElementsByClassName(buttonClassLink)[0].addEventListener('click', () => this.clickWebsiteLink(project));
    }
  }

  private clickWebsiteLink(project: Project): void {
    if (project.url) {
      window.open(project.url, '_blank');
    }
  }

  /**
   * Click on a project in the portfolio
   * @param project
   */
  private clickProject(project: Project): void {
    if (this.detailsDialog) {
      this.detailsDialog.project = project;
      this.detailsDialog.images = project.images;
      this.detailsDialog.opened = true;
      history.pushState(history.state, '', `/portfolio/${project.fragment}`);
    }
  }

  async firstUpdated() {
    // Give the browser a chance to paint
    await new Promise((r) => setTimeout(r, 0));

    if (this.detailsDialog && !this.detailsDialog.opened) {
      if (this.location.params.project) {
        const project = this.items.filter((project) => project.fragment === this.location.params.project)[0];
        if (project) {
          this.detailsDialog.project = project;
          this.detailsDialog.images = project.images;
          this.detailsDialog.opened = true;
        } else {
          this.notification?.open();
        }
      }
    }
  }

  /**
   * Connected callback
   */
  connectedCallback(): void {
    super.connectedCallback();
    this.items = projects;
  }
}

// Import the tagged template function that is used to define
// a multi-line CSS string
import { css } from '@vaadin/vaadin-themable-mixin/register-styles.js';

// Define and export a string of reusable CSS
export default css`
  .special-link-span {
    color: var(--lumo-tertiary-text-color);
    font-size: var(--lumo-font-size-s);
    margin-right: var(--lumo-space-l);
    padding-left: var(--lumo-space-s);
  }

  .special-link {
    text-decoration: none;
  }
`;

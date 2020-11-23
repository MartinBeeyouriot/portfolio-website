// eagerly import theme styles so as we can override them
import '@vaadin/vaadin-lumo-styles/all-imports';

const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `
<custom-style>
  <style>
    html {
      --lumo-border-radius: calc(var(--lumo-size-m) / 2);
      --lumo-size-xl: 4rem;
      --lumo-size-l: 3rem;
      --lumo-size-m: 2.5rem;
      --lumo-size-s: 2rem;
      --lumo-size-xs: 1.75rem;
      --lumo-space-xl: 2.5rem;
      --lumo-space-l: 1.75rem;
      --lumo-space-m: 1.125rem;
      --lumo-space-s: 0.75rem;
      --lumo-space-xs: 0.375rem;
    }
  </style>
</custom-style>


`;

document.head.appendChild($_documentContainer.content);

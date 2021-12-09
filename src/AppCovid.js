import { LitElement, html } from 'lit';
import { CountryListConnected } from './CountryList/CountryListConnected.js';

export class AppCovid extends LitElement {
  render() {
    return html` <country-list-connected></country-list-connected> `;
  }
}

customElements.define('country-list-connected', CountryListConnected);

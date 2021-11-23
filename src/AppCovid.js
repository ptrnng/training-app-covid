import { LitElement, html, css } from 'lit';
import { CovidTracker } from './CovidTracker.js';

export class AppCovid extends LitElement {
  render() {
    return html`
      <covid-tracker></covid-tracker>
    `;
  }
}

customElements.define("covid-tracker", CovidTracker);
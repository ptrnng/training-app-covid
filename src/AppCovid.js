import { LitElement, html } from 'lit';
import { CovidTrackerConnected } from './packages/CovidTracker/CovidTrackerConnected.js';

export class AppCovid extends LitElement {
  render() {
    return html` <covid-tracker-connected></covid-tracker-connected> `;
  }
}

customElements.define('covid-tracker-connected', CovidTrackerConnected);

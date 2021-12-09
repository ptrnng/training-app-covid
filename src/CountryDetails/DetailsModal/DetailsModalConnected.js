import { DetailsModal } from './DetailsModal.js';

export class DetailsModalConnected extends DetailsModal {
  shouldUpdate(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      if (propName === 'modalOpen') {
        if (typeof oldValue !== 'undefined' && !oldValue) {
          this.shadowRoot.getElementById(
            `${this.details.country}-modal`
          ).style.display = 'block';
          if (this.history === null) {
            this.fetchData();
          }
        }
      }
    });
    return true;
  }

  async fetchData() {
    this.loading = true;
    const myHeaders = new Headers({
      'x-rapidapi-host': 'covid-193.p.rapidapi.com',
      'x-rapidapi-key': '5af96d14dbmsh51fc4214ae8ceb1p1a3d43jsncd88f5576ae6',
    });
    const response = await fetch(
      `https://covid-193.p.rapidapi.com/history?country=${this.details.country}`,
      {
        method: 'GET',
        headers: myHeaders,
      }
    );
    const jsonResponse = await response.json();
    this.history = jsonResponse.response.reverse();
    this.loading = false;
    this._createChart();
  }
}

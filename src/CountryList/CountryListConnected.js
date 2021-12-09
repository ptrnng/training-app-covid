import { CountryList } from './CountryList.js';

export class CountryListConnected extends CountryList {
  connectedCallback() {
    super.connectedCallback();

    if (!this.data) {
      this.fetchData();
    }
  }

  async fetchData() {
    this.loading = true;
    const myHeaders = new Headers({
      'x-rapidapi-host': 'covid-193.p.rapidapi.com',
      'x-rapidapi-key': '5af96d14dbmsh51fc4214ae8ceb1p1a3d43jsncd88f5576ae6',
    });
    const response = await fetch(
      'https://covid-193.p.rapidapi.com/statistics',
      {
        method: 'GET',
        headers: myHeaders,
      }
    );
    const jsonResponse = await response.json();
    this.data = jsonResponse.response;
    this.processedData = jsonResponse.response.sort((a, b) =>
      a.country.localeCompare(b.country)
    );
    this.loading = false;
  }
}

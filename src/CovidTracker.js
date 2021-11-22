import { LitElement, html, css } from 'lit';
import { DetailsCard } from './DetailsCard.js';
import { CountrySearch } from './CountrySearch.js';
import { ContinentFilter } from './ContinentFilter.js';
import { DataSort } from './DataSort.js';

export class CovidTracker extends LitElement {
  static get properties() {
    return {
      loading: { type: Boolean },
      data: { type: Array },
      processedCountries: { type: Array },
      ascendingOrder: { type: Boolean },
      sortType: { type: String },
      continentFilter: { type: Array },
      searchKey: { type: String }
    };
  }

  static get styles() {
    return css`
    `;
  }

  constructor() {
    super();
    this.loading = true;
    this.ascendingOrder = true;
    this.data = null;
    this.processedCountries = null;
    this.sortType = 'alphabetical';
    this.continentFilter = [];
    this.searchKey = '';
  }

  connectedCallback() {
    super.connectedCallback();

    if (!this.data) {
      this.fetchCountries();
    }
  }

  async fetchCountries() {
    this.loading = true;
    const myHeaders = new Headers({
      "x-rapidapi-host": "covid-193.p.rapidapi.com",
      "x-rapidapi-key": "5af96d14dbmsh51fc4214ae8ceb1p1a3d43jsncd88f5576ae6"
    });
    const response = await fetch('https://covid-193.p.rapidapi.com/statistics', {
      method: 'GET',
      headers: myHeaders
    });
    const jsonResponse = await response.json();
    this.data = jsonResponse.response;
    this.processedCountries = jsonResponse.response.sort(function(a, b){ return a.country.localeCompare(b.country)});
    this.loading = false;
    // this.countries = this.sortCountriesBy();
  }


  render() {

    if (this.loading){
      return 'Loading..';
    }
    // this.processedCountries.map(c=>console.log(c));
    return html`
      <country-search @change-search-key="${this._changeSearchKey}"></country-search>
      <continent-filter .continentFilter="${this.continentFilter}" @change-continent-filter="${this._changeContinentFilter}"></continent-filter>
      <data-sort
      .ascendingOrder="${this.ascendingOrder}"
      .sortType="${this.sortType}"
      @change-order="${this._changeOrder}"
      @change-sort-type="${this._changeSortType}"></data-sort>
      ${this.processedCountries.map(item => html`
          <details-card .details="${item}"></details-card><br>
        `)}

    `;
  }

  _changeSortType(e){
    this.sortType = e.detail;
    this._applyOptions();
  }

  _changeOrder(e){
    this.ascendingOrder = e.detail;
    this._applyOptions();
  }

  _changeSearchKey(e){
    this.searchKey = e.detail;
    this._applyOptions();
  }

  _changeContinentFilter(e){
    this.continentFilter = e.detail;
    this._applyOptions();
  }


  _applyOptions(){
    this._filterDataByContinent();
    this._filterBySearchKey()
    this._sortData();
  }

  _filterDataByContinent(){
    if(this.continentFilter.length > 0){
      this.processedCountries = this.data.filter(country => this.continentFilter.includes(country.continent));
    }else
      this.processedCountries = this.data;
  }

  _filterBySearchKey(){
    if(this.searchKey.length > 0)
      this.processedCountries = this.processedCountries.filter(c => c.country.toLowerCase().includes(this.searchKey.toLowerCase()));
  }

  _sortData(){
    switch(this.sortType){
      case 'alphabetical': this.processedCountries = this.processedCountries.sort(function(a, b){ return a.country.localeCompare(b.country)});
        break;
      case 'population': 
        this.processedCountries = this.processedCountries.filter(country => country.population !== null);
        this.processedCountries.sort(function(a, b){return (a.population)-(b.population)});
        break;
      case 'activeCases': 
        this.processedCountries = this.processedCountries.filter(country => country.cases.active !== null);
        this.processedCountries.sort(function(a, b){return (a.cases.active)-(b.cases.active)});
        break;
      case 'totalCases': 
        this.processedCountries = this.processedCountries.filter(country => country.cases.total !== null);
        this.processedCountries.sort(function(a, b){return (a.cases.total)-(b.cases.total)});
        break;
      case 'recovered': 
        this.processedCountries = this.processedCountries.filter(country => country.cases.recovered !== null);
        this.processedCountries.sort(function(a, b){return (a.cases.recovered)-(b.cases.recovered)});
        break;
      case 'deaths': 
        this.processedCountries = this.processedCountries.filter(country => country.deaths.total !== null);
        this.processedCountries.sort(function(a, b){return (a.deaths.total)-(b.deaths.total)});
        break;
    }
    // console.log('---------------');
    // this.processedCountries.map(c => console.log(c.country+' - '+c.cases.recovered));
    if(!this.ascendingOrder) this.processedCountries = this.processedCountries.reverse();
  }
}

customElements.define("details-card", DetailsCard);
customElements.define("country-search", CountrySearch);
customElements.define("continent-filter", ContinentFilter);
customElements.define("data-sort", DataSort);
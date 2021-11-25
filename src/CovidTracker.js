import { LitElement, html, css } from 'lit';
import { DetailsCard } from './DetailsCard.js';
import { DataSearch } from './DataSearch.js';
import { ContinentFilter } from './ContinentFilter.js';
import { DataSort } from './DataSort.js';
import { Loading } from './Loading.js';

export class CovidTracker extends LitElement {
  static get properties() {
    return {
      loading: { type: Boolean },
      data: { type: Array },
      processedData: { type: Array },
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
    this.processedData = null;
    this.sortType = 'alphabetical';
    this.continentFilter = [];
    this.searchKey = '';
  }

  connectedCallback() {
    super.connectedCallback();

    if (!this.data) {
      this.fetchData();
    }
  }

  render() {

    if (this.loading){
      return html`<loading-gif></loading-gif>`;
      // return html`<img style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);" src="../assets/loading-buffering.gif">`;
    }
    return html`
      <h1 style="text-align: center">Covid Case Tracker</h1>

      <data-search @change-search-key="${this._changeSearchKey}"></data-search>

      <continent-filter .continentFilter="${this.continentFilter}" @change-continent-filter="${this._changeContinentFilter}"></continent-filter>

      <data-sort
      .ascendingOrder="${this.ascendingOrder}"
      .sortType="${this.sortType}"
      @change-order="${this._changeOrder}"
      @change-sort-type="${this._changeSortType}"
      ></data-sort>

      <div style="display: flex;flex-wrap: wrap;">
        ${this.processedData.map(item => html`
            <details-card .details="${item}"></details-card>
          `)}
      </div>

    `;
  }

  async fetchData() {
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
    this.processedData = jsonResponse.response.sort(function(a, b){ return a.country.localeCompare(b.country)});
    this.loading = false;
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
      this.processedData = this.data.filter(country => this.continentFilter.includes(country.continent));
    }else
      this.processedData = this.data;
  }

  _filterBySearchKey(){
    if(this.searchKey.length > 0)
      this.processedData = this.processedData.filter(c => c.country.toLowerCase().includes(this.searchKey.toLowerCase()));
  }

  _sortData(){
    switch(this.sortType){
      case 'alphabetical': this.processedData = this.processedData.sort(function(a, b){ return a.country.localeCompare(b.country)});
        break;
      case 'population': 
        this.processedData = this.processedData.filter(country => country.population);
        this.processedData = this.processedData.sort(function(a, b){return (a.population)-(b.population)});
        break;
      case 'activeCases': 
        this.processedData = this.processedData.filter(country => country.cases.active);
        this.processedData = this.processedData.sort(function(a, b){return (a.cases.active)-(b.cases.active)});
        break;
      case 'totalCases': 
        this.processedData = this.processedData.filter(country => country.cases.total);
        this.processedData = this.processedData.sort(function(a, b){return (a.cases.total)-(b.cases.total)});
        break;
      case 'recovered': 
        this.processedData = this.processedData.filter(country => country.cases.recovered);
        this.processedData = this.processedData.sort(function(a, b){return (a.cases.recovered)-(b.cases.recovered)});
        break;
      case 'deaths': 
        this.processedData = this.processedData.filter(country => country.deaths.total);
        this.processedData = this.processedData.sort(function(a, b){return (a.deaths.total)-(b.deaths.total)});
        break;
    }
    // console.log('---------------');
    // this.processedData.map(c => console.log(c.country+' - '+ typeof c.cases.active));
    if(!this.ascendingOrder) this.processedData = this.processedData.reverse();
  }
}

customElements.define("details-card", DetailsCard);
customElements.define("data-search", DataSearch);
customElements.define("continent-filter", ContinentFilter);
customElements.define("data-sort", DataSort);
customElements.define("loading-gif", Loading);
import { LitElement, html, css } from 'lit';
import Chart from 'chart.js/auto';

export class DetailsModal extends LitElement {
  static get properties() {
    return {
      details: { type: Object },
      modalOpen: { type: Boolean },
      history: { type: Object },
      loading: { type: Boolean }
    };
  }

  static get styles() {
    return css`
      .modal{
        z-index:3;
        display:none;
        position:fixed;
        left:0;
        top:0;
        width:100%;
        height:100%;
        overflow: auto;
        background-color:rgb(0,0,0);
        background-color:rgba(0,0,0,0.4)
      }
      .modal-content{
        margin:5%;
        background-color:#fff;
        position:relative;
        max-width: 100%;
        max-height: 80%;
        border-radius: 5px;
        padding: 30px;
        overflow: auto;
      }
      .w3-button{
        width:100%;
        text-align:left;
        padding:8px 16px;
      }
      #closeButton:hover{
        filter: brightness(50%);
      }
      #closeButton{
        position: absolute;
        top: 10px;
        right: 10px;
        border: none;
        font-size: 24px;
        background: 0px 0px;
        color: rgb(221, 221, 221);
        transition: color 0.3s ease 0s;
        cursor: pointer;
        outline: 0px;
      }
    `;
  }

  constructor() {
    super();
    this.details = null;
    this.history = null;
    this.modalOpen = false;
    this.loading = true;
  }

  shouldUpdate(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      if(propName === 'modalOpen'){
        if(typeof oldValue !== 'undefined' && !oldValue){
          this.shadowRoot.getElementById(this.details.country + '-modal').style.display='block';
          if(this.history === null){
            this.fetchData();
          }
        }
      }
    });
    return true;
  }

  render() {
    if(this.details){
      return html`
        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js"></script>
        <div id="${this.details.country}-modal" class="modal">
          <div class="modal-content">
            <button id="closeButton" @click="${this._closeModal}">&times;</button>
            <h1>${this.details.country}</h1>
            ${this.loading? html`<img style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);" src="../assets/loading-buffering.gif">` : ""}
            <div>
              <canvas id="myChart" style="width:100%;"></canvas>
            </div>
          </div>
        </div>
      `
    }else
      return html`<img style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);" src="../assets/loading-buffering.gif">`;
  }

  _closeModal(){
    this.dispatchEvent(new CustomEvent('close-modal', { 'detail': ''}));
    this.shadowRoot.getElementById(this.details.country + '-modal').style.display='none';
  }
  
  async fetchData() {
    this.loading = true;
    const myHeaders = new Headers({
      "x-rapidapi-host": "covid-193.p.rapidapi.com",
      "x-rapidapi-key": "5af96d14dbmsh51fc4214ae8ceb1p1a3d43jsncd88f5576ae6"
    });
    const response = await fetch('https://covid-193.p.rapidapi.com/history?country='+this.details.country, {
      method: 'GET',
      headers: myHeaders
    });
    const jsonResponse = await response.json();
    this.history = jsonResponse.response.reverse();
    this.loading = false;
    this._createChart();
  }

  _createChart(){
    const ctx = this.renderRoot.querySelector( '#myChart' ).getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.history.map(h => h.day),
          datasets: [{
            label: 'Recovered',
            data: this.history.map(h => h.cases.recovered),
            borderColor: "green",
            fill: false
          }, { 
            label: 'Deaths',
            data: this.history.map(h => h.deaths.total),
            borderColor: "red",
            fill: false
          }, { 
            label: 'Active',
            data: this.history.map(h => h.cases.active),
            borderColor: "blue",
            fill: false
          }]
        },
        options: {
          legend: {display: false}
        }
      });
  }
}

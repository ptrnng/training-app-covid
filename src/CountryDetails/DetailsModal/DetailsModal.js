import { LitElement, html, css } from 'lit';
import Chart from 'chart.js/auto';

export class DetailsModal extends LitElement {
  static get properties() {
    return {
      details: { type: Object },
      modalOpen: { type: Boolean },
      history: { type: Object },
      loading: { type: Boolean },
      chart: { type: Object },
    };
  }

  static get styles() {
    return css`
      .modal {
        z-index: 3;
        display: none;
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgb(0, 0, 0);
        background-color: rgba(0, 0, 0, 0.4);
      }
      .modal-content {
        margin: 5%;
        background-color: #fff;
        position: relative;
        max-width: 100%;
        max-height: 80%;
        border-radius: 5px;
        padding: 30px;
        overflow: auto;
      }
      #countryChart-div {
        position: relative;
        background: white;
        border-radius: 10px 10px 10px 10px;
        width: 100%;
      }
      #closeButton:hover {
        filter: brightness(50%);
      }
      #closeButton {
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

      @media screen and (max-width: 640px) {
        #countryChart-div {
          width: 200%;
        }
      }
      @media (prefers-color-scheme: dark) {
        .modal-content {
          background-image: linear-gradient(#292d31, #282c30);
        }
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

  render() {
    if (this.details) {
      return html`
        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js"></script>
        <div id="${this.details.country}-modal" class="modal">
          <div class="modal-content">
            <button id="closeButton" @click="${this._closeModal}">
              &times;
            </button>
            <h1>${this.details.country}</h1>
            <div id="countryChart-div">
              ${this.loading ? html`<loading-gif></loading-gif>` : ''}
              <canvas id="countryChart"></canvas>
            </div>
          </div>
        </div>
      `;
    }
    return html`<loading-gif></loading-gif>`;
  }

  _closeModal() {
    this.shadowRoot.getElementById(
      `${this.details.country}-modal`
    ).style.display = 'none';
    this.dispatchEvent(new CustomEvent('close-modal', { detail: '' }));
  }

  _createChart() {
    const ctx = this.renderRoot.querySelector('#countryChart').getContext('2d');
    this.chart = new Chart(ctx, {
      maintainAspectRatio: true,
      type: 'line',
      data: {
        labels: this.history.map(h => h.day),
        datasets: [
          {
            label: 'Recovered',
            data: this.history.map(h => h.cases.recovered),
            borderColor: 'green',
            fill: false,
          },
          {
            label: 'Deaths',
            data: this.history.map(h => h.deaths.total),
            borderColor: 'red',
            fill: false,
          },
          {
            label: 'Active',
            data: this.history.map(h => h.cases.active),
            borderColor: 'blue',
            fill: false,
          },
        ],
      },
      options: {
        legend: { display: false },
      },
    });
  }
}

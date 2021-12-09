import { LitElement, html, css } from 'lit';
import { CountryCodes } from '../../common/constants/CountryCodes.js';
import { DetailsModalConnected } from '../../CountryDetails/DetailsModal/DetailsModalConnected.js';

export class DetailsCard extends LitElement {
  static get properties() {
    return {
      details: { type: Object },
      modalOpen: { type: Boolean },
    };
  }

  static get styles() {
    return css`
      :host {
        box-sizing: border-box;
        padding: 20px;
        width: 33.33%;
      }
      h3 {
        margin: 2px;
      }
      h5 {
        margin: 5px;
      }
      header {
        border-radius: 10px 10px 0 0;
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
        z-index: 1;
      }

      .padding-20px {
        padding: 20px;
      }
      .data__card-listitem {
        box-sizing: border-box;
        box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.2),
          0 4px 20px 0 rgba(0, 0, 0, 0.19);
        background-color: transparent;
        width: 100%;
        border-radius: 10px;
        position: relative;
        z-index: 1;
      }
      .data__card-content {
        background-color: white;
        opacity: 1;
        border-radius: 10px 10px 10px 10px;
      }
      .bar {
        border-radius: 25px;
        background: darkgray;
      }
      .bar__value-recovered,
      .bar__value-death,
      .bar__value-active {
        background: darkgreen; //#4CAF50;
        border-radius: 25px;
        color: white;
        padding: 5px;
        min-width: 10%;
      }
      .bar__value-death {
        background: darkred;
      }
      .bar__value-active {
        background: black;
      }

      .flag {
        min-height: 50px;
        border-radius: 10px 10px 0 0;
        position: absolute;
        width: 100%;
        z-index: -1;
      }

      .flag img {
        border-radius: 10px 10px 0 0;
      }

      .data__card-listitem:hover .view-history {
        display: block;
      }
      .data__card-listitem:hover .flag {
        position: relative;
      }

      .view-history:hover {
        filter: brightness(50%);
      }
      .view-history {
        display: none;
        border: solid 1px white;
        width: 120px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        font-size: 18px;
        color: white;
        background-color: #fff;
        background-color: rgba(0, 0, 0, 0.5);
      }

      @media screen and (max-width: 1007px) {
        :host {
          width: 50%;
        }
      }
      @media screen and (max-width: 640px) {
        :host {
          width: 100%;
        }
      }

      @media (prefers-color-scheme: dark) {
        .data__card-content {
          background-image: linear-gradient(#292d31, #282c30);
        }
      }
    `;
  }

  constructor() {
    super();
    this.details = null;
    this.modalOpen = false;
  }

  render() {
    if (this.details) {
      return html`
        <link
          href="https://fonts.googleapis.com/css?family=Material+Icons%26display=block"
          rel="stylesheet"
        />
        <details-modal-connected
          @close-modal="${this._closeModal}"
          .details="${this.details}"
          .modalOpen="${this.modalOpen}"
        ></details-modal-connected>
        <div class="data__card-listitem">
          <div class="flag">
            <img
              width="100%"
              alt=""
              src="https://flagcdn.com/w1280/${CountryCodes[
                this.details.country
              ]
                ? CountryCodes[this.details.country].toLowerCase()
                : ''}.png"
            />
            <button
              class="view-history"
              @click="${() => {
                this.modalOpen = true;
              }}"
            >
              View History
            </button>
          </div>
          <header class="padding-20px">
            <h2>${this.details.country}</h2>
            <h4 style="padding-left: 40px; position: relative">
              <mwc-icon style="bottom: 0px;left: 3px;position: absolute;"
                >groups</mwc-icon
              >${this.details.population
                ? this.details.population
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                : 'N/A'}
            </h4>
          </header>
          <div class="data__card-content padding-20px">
            <h3>Recovered</h3>
            <div class="bar">
              <div
                class="bar__value-recovered"
                style="width: ${(100 * this.details.cases.recovered) /
                this.details.cases.total}%"
              >
                ${this.details.cases.recovered
                  ? this.details.cases.recovered
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  : 'N/A'}
              </div>
            </div>
            <h3>Deaths</h3>
            <div class="bar">
              <div
                class="bar__value-death"
                style="width: ${(100 * this.details.deaths.total) /
                this.details.cases.total}%"
              >
                ${this.details.deaths.total
                  ? this.details.deaths.total
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  : 'N/A'}
              </div>
            </div>
            <h3>Active</h3>
            <div class="bar">
              <div
                class="bar__value-active"
                style="width: ${(100 * this.details.cases.active) /
                this.details.cases.total}%"
              >
                ${this.details.cases.active
                  ? this.details.cases.active
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  : 'N/A'}
              </div>
            </div>

            <h4>
              Total Cases:
              ${this.details.cases.total
                ? this.details.cases.total
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                : 'N/A'}
            </h4>
            <h4>
              Total Tested:
              ${this.details.tests.total
                ? this.details.tests.total
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                : 'N/A'}
            </h4>
          </div>
        </div>
      `;
    }
    return html``;
  }

  _closeModal() {
    this.modalOpen = false;
  }
}

customElements.define('details-modal-connected', DetailsModalConnected);

import { html } from 'lit';
import { fixture, expect, oneEvent } from '@open-wc/testing';
import '../src/app-covid.js';

// import {sinonStubPromise} from 'sinon-stub-promise'
import sinon from 'sinon';
// sinonStubPromise(sinon);

const dummyData = [
  {
    continent: 'Africa',
    country: 'Sao-Tome-and-Principe',
    population: 224822,
    cases: {
      new: null,
      active: 0,
      critical: null,
      recovered: 3675,
      '1M_pop': '16595',
      total: 3731,
    },
    deaths: {
      new: null,
      '1M_pop': '249',
      total: 56,
    },
    tests: {
      '1M_pop': '65336',
      total: 14689,
    },
    day: '2021-11-25',
    time: '2021-11-25T09:30:05+00:00',
  },
  {
    continent: 'Africa',
    country: 'Sierra-Leone',
    population: 8201763,
    cases: {
      new: null,
      active: null,
      critical: null,
      recovered: null,
      '1M_pop': '780',
      total: 6400,
    },
    deaths: {
      new: null,
      '1M_pop': '15',
      total: 121,
    },
    tests: {
      '1M_pop': '19597',
      total: 160729,
    },
    day: '2021-11-25',
    time: '2021-11-25T09:30:05+00:00',
  },
  {
    continent: 'Asia',
    country: 'Bhutan',
    population: 783441,
    cases: {
      new: null,
      active: 10,
      critical: null,
      recovered: 2620,
      '1M_pop': '3361',
      total: 2633,
    },
    deaths: {
      new: null,
      '1M_pop': '4',
      total: 3,
    },
    tests: {
      '1M_pop': '1574431',
      total: 1233474,
    },
    day: '2021-11-25',
    time: '2021-11-25T09:30:05+00:00',
  },
  {
    continent: 'Oceania',
    country: 'Vanuatu',
    population: 316575,
    cases: {
      new: null,
      active: 2,
      critical: null,
      recovered: 3,
      '1M_pop': '19',
      total: 6,
    },
    deaths: {
      new: null,
      '1M_pop': '3',
      total: 1,
    },
    tests: {
      '1M_pop': '72653',
      total: 23000,
    },
    day: '2021-11-25',
    time: '2021-11-25T09:30:05+00:00',
  },
  {
    continent: 'North-America',
    country: 'Anguilla',
    population: 15190,
    cases: {
      new: '+66',
      active: 124,
      critical: null,
      recovered: 1207,
      '1M_pop': '87821',
      total: 1334,
    },
    deaths: {
      new: null,
      '1M_pop': '197',
      total: 3,
    },
    tests: {
      '1M_pop': '3382620',
      total: 51382,
    },
    day: '2021-11-25',
    time: '2021-11-25T09:30:05+00:00',
  },
  {
    continent: 'Oceania',
    country: 'Wallis-and-Futuna',
    population: 10964,
    cases: {
      new: null,
      active: 0,
      critical: null,
      recovered: 438,
      '1M_pop': '40587',
      total: 445,
    },
    deaths: {
      new: null,
      '1M_pop': '638',
      total: 7,
    },
    tests: {
      '1M_pop': '1870485',
      total: 20508,
    },
    day: '2021-11-25',
    time: '2021-11-25T09:30:05+00:00',
  },
];

describe('AppCovid', () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`<app-covid></app-covid>`);
  });

  it('renders a covid-tracker', () => {
    const covidTracker = element.shadowRoot.querySelector(
      'covid-tracker-connected'
    );
    expect(covidTracker).to.exist;
  });
});

describe('ContinentFilter', () => {
  let el;
  beforeEach(async () => {
    el = await fixture(html`<continent-filter></continent-filter>`);
  });

  describe('_changeContinentFilter', async () => {
    it('should dispatch the change-continent-filter event', async () => {
      const cb = el.shadowRoot.querySelector('input');
      setTimeout(() => {
        cb.value = 'Africa';
        cb.dispatchEvent(new Event('change'));
      });
      const event = await oneEvent(el, 'change-continent-filter');
      expect(event).to.exist;
      expect(event.detail).to.eql(el.continentFilter);
    });
  });
});

describe('CovidTracker', async () => {
  let el;
  let fetchWrap;

  beforeEach(async () => {
    fetchWrap = sinon.stub(window, 'fetch').resolves({
      json: () => ({
        response: dummyData,
      }),
    });

    el = await fixture(
      html`<covid-tracker-connected></covid-tracker-connected>`
    );
  });
  afterEach(async () => {
    fetchWrap.restore();
  });

  describe('_toggleDarkModeSwitch', async () => {
    it('should toggle darkMode value', async () => {
      const cb = el.shadowRoot.querySelector('dark-mode-switch');
      cb.dispatchEvent(new CustomEvent('toggle-switch'));
      expect(!el.darkMode).to.eql(true);
    });
  });

  describe('_changeSortType', async () => {
    it('should update the value of sortType', async () => {
      const cb = el.shadowRoot.querySelector('data-sort');

      cb.dispatchEvent(
        new CustomEvent('change-sort-type', { detail: 'activeCases' })
      );
      expect(el.sortType).to.eql('activeCases');
    });
  });

  describe('_changeOrder', async () => {
    it('should update the value of ascendingOrder', async () => {
      const cb = el.shadowRoot.querySelector('data-sort');

      cb.dispatchEvent(new CustomEvent('change-order', { detail: true }));
      expect(el.ascendingOrder).to.eql(true);
    });
  });

  describe('_changeSearchKey', async () => {
    it('should update the value of searchKey', async () => {
      const cb = el.shadowRoot.querySelector('data-search');

      cb.dispatchEvent(
        new CustomEvent('change-search-key', { detail: 'Africa' })
      );
      expect(el.searchKey).to.eql('Africa');
    });
  });

  describe('_changeContinentFilter', async () => {
    it('should update the value of continentFilter', async () => {
      const cb = el.shadowRoot.querySelector('continent-filter');

      cb.dispatchEvent(
        new CustomEvent('change-continent-filter', { detail: ['Asia'] })
      );
      expect(el.continentFilter).to.eql(['Asia']);
    });
  });
});

describe('DarkModeSwitch', () => {
  let el;
  beforeEach(async () => {
    el = await fixture(html`<dark-mode-switch></dark-mode-switch>`);
  });

  describe('_toggleCheckbox', async () => {
    it('should dispatch the toggle-switch event', async () => {
      const cb = el.shadowRoot.querySelector('input');
      setTimeout(() => {
        el.darkMode = false;
        cb.checked = true;
        cb.dispatchEvent(new Event('change'));
      });
      const event = await oneEvent(el, 'toggle-switch');
      expect(event).to.exist;
      expect(event.detail).to.eql(true);

      setTimeout(() => {
        el.darkMode = true;
        cb.checked = false;
        cb.dispatchEvent(new Event('change'));
      });
      const event1 = await oneEvent(el, 'toggle-switch');
      expect(event1).to.exist;
      expect(event1.detail).to.eql(false);
    });
  });
});

describe('DataSearch', () => {
  let el;
  beforeEach(async () => {
    el = await fixture(html`<data-search></data-search>`);
  });

  describe('_changeSearchKey', async () => {
    it('should dispatch the change-search-key event', async () => {
      const input = el.shadowRoot.querySelector('input');

      setTimeout(() => {
        input.value = 'Philippines';
        el._changeSearchKey();
      });

      const event = await oneEvent(el, 'change-search-key');
      expect(event).to.exist;
      expect(event.detail).to.eql('Philippines');
    });
  });

  describe('_onKeyPress', async () => {
    it('should call _changeSearchKey after pressing 2 keys', async () => {
      const input = el.shadowRoot.querySelector('input');
      const changeSearchKeySpy = sinon.spy(el, '_changeSearchKey');
      setTimeout(() => {
        input.dispatchEvent(new Event('keyup'));
        input.dispatchEvent(new Event('keyup'));
      });
      setTimeout(() => {
        expect(changeSearchKeySpy).calledOnce();
      }, 500);
    });
  });
});

describe('DataSort', () => {
  let el;
  beforeEach(async () => {
    el = await fixture(html`<data-sort></data-sort>`);
  });

  describe('_changeSortType', async () => {
    it('should dispatch the change-sort-type event', async () => {
      const sel = el.shadowRoot.querySelector('select');
      setTimeout(() => {
        sel.value = 'population';
        sel.dispatchEvent(new Event('change'));
      });
      const event = await oneEvent(el, 'change-sort-type');
      expect(event).to.exist;
      expect(event.detail).to.eql(el.sortType);
      expect(event.detail).to.eql('population');
    });
  });

  describe('_changeOrder', async () => {
    it('should dispatch the change-order event', async () => {
      const sel = el.shadowRoot.querySelector('button');
      setTimeout(() => {
        el.ascendingOrder = true;
        sel.dispatchEvent(new Event('click'));
      });
      let event = await oneEvent(el, 'change-order');
      expect(event).to.exist;
      expect(event.detail).to.eql(el.ascendingOrder);
      expect(event.detail).to.eql(false);

      setTimeout(() => {
        el.ascendingOrder = false;
        sel.dispatchEvent(new Event('click'));
      });
      event = await oneEvent(el, 'change-order');
      expect(event).to.exist;
      expect(event.detail).to.eql(el.ascendingOrder);
      expect(event.detail).to.eql(true);
    });
  });
});

describe('DetailsCard', () => {
  let el;
  beforeEach(async () => {
    el = await fixture(
      html`<details-card .details="${dummyData[0]}"></details-card>`
    );
  });

  describe('_closeModal', async () => {
    it('should set openModal props to false', async () => {
      const comp = el.shadowRoot.querySelector('details-modal-connected');
      setTimeout(() => {
        el.modalOpen = true;
        comp.modalOpen = true;
        comp.dispatchEvent(new CustomEvent('close-modal'));
      });
      expect(el.modalOpen).to.eql(false);
    });
  });
});

const modalDummyHistory = [
  {
    continent: 'Africa',
    country: 'Africa',
    population: null,
    cases: {
      new: '+5722',
      active: 377962,
      critical: 1896,
      recovered: 8100314,
      '1M_pop': null,
      total: 8701102,
    },
    deaths: {
      new: '+216',
      '1M_pop': null,
      total: 222826,
    },
    tests: {
      '1M_pop': null,
      total: null,
    },
    day: '2021-11-26',
    time: '2021-11-26T06:30:03+00:00',
  },
  {
    continent: 'Africa',
    country: 'Africa',
    population: null,
    cases: {
      new: '+3257',
      active: 379804,
      critical: 1896,
      recovered: 8096121,
      '1M_pop': null,
      total: 8698637,
    },
    deaths: {
      new: '+102',
      '1M_pop': null,
      total: 222712,
    },
    tests: {
      '1M_pop': null,
      total: null,
    },
    day: '2021-11-26',
    time: '2021-11-26T01:00:02+00:00',
  },
  {
    continent: 'Africa',
    country: 'Africa',
    population: null,
    cases: {
      new: '+3095',
      active: 395051,
      critical: 1896,
      recovered: 8078939,
      '1M_pop': null,
      total: 8696702,
    },
    deaths: {
      new: '+102',
      '1M_pop': null,
      total: 222712,
    },
    tests: {
      '1M_pop': null,
      total: null,
    },
    day: '2021-11-26',
    time: '2021-11-26T00:15:02+00:00',
  },
];

describe('DetailsModal', () => {
  let el;
  let fetchWrap;
  beforeEach(async () => {
    fetchWrap = sinon.stub(window, 'fetch').resolves({
      json: () => ({
        response: modalDummyHistory,
      }),
    });
    el = await fixture(
      html`<details-modal
        .openModa="${false}"
        .details="${dummyData[0]}"
      ></details-modal>`
    );
  });
  afterEach(async () => {
    fetchWrap.restore();
  });

  describe('_closeModal', async () => {
    it('should dispatch the close-modal event', async () => {
      el = await fixture(
        html`<details-modal-connected
          .openModa="${true}"
          .details="${dummyData[0]}"
        ></details-modal-connected>`
      );
      const comp = el.shadowRoot.querySelector('button');
      setTimeout(() => {
        el.modalOpen = true;
        comp.dispatchEvent(new Event('click'));
      });

      const event = await oneEvent(el, 'close-modal');
      expect(event).to.exist;
      // console.log(el.details.country);
      // el._closeModal();
      // expect(el.shadowRoot.getElementById(el.details.country + '-modal').style.display).to.eql('none');
    });
  });
});

describe('Loading', () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`<loading-gif></loading-gif>`);
  });

  it('renders a loading-gif', () => {
    const img = element.shadowRoot.querySelector('img');
    expect(img).to.exist;
  });
});

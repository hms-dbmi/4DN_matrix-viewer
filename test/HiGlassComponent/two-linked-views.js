import { configure } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

import {
  mountHGComponent,
  removeHGComponent,
  waitForTilesLoaded,
} from '../../app/scripts/utils';

import { twoViewConfig } from '../view-configs';

configure({ adapter: new Adapter() });

// import FetchMockHelper from '../utils/FetchMockHelper';

describe('Two linked views', () => {
  let hgc = null;
  let div = null;
  // const fetchMockHelper = new FetchMockHelper(null, 'higlass.io');

  beforeAll(async (done) => {
    // await fetchMockHelper.activateFetchMock();
    [div, hgc] = mountHGComponent(
      div,
      hgc,
      JSON.parse(JSON.stringify(twoViewConfig)),
      done,
      {
        style: 'width:800px; height:400px; background-color: lightgreen',
        bounded: true,
      },
    );
    // visual check that the heatmap track config menu is moved
    // to the left
  });

  afterAll(async () => {
    removeHGComponent(div);
    // await fetchMockHelper.storeDataAndResetFetchMock();
  });

  it('zoom to the data extent', (done) => {
    // console.log('zooming to extent');
    hgc.instance().api.zoomToDataExtent('aa');

    waitForTilesLoaded(hgc.instance(), done);
  });

  it('ensures both views zoomed to the data extent', () => {
    expect(hgc.instance().xScales.aa.domain()[0]).toEqual(
      hgc.instance().xScales.view2.domain()[0],
    );

    expect(hgc.instance().xScales.aa.domain()[1]).toEqual(
      hgc.instance().xScales.view2.domain()[1],
    );
  });
});

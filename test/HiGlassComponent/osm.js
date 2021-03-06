import { configure } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

import { mountHGComponent, removeHGComponent } from '../../app/scripts/utils';

import { osmConf } from '../view-configs';

configure({ adapter: new Adapter() });

// import FetchMockHelper from '../utils/FetchMockHelper';

describe('osm', () => {
  let hgc = null;
  let div = null;
  // const fetchMockHelper = new FetchMockHelper(null, 'higlass.io');

  beforeAll(async (done) => {
    // await fetchMockHelper.activateFetchMock();
    [div, hgc] = mountHGComponent(div, hgc, osmConf, done, {
      style: 'width:800px; height:400px; background-color: lightgreen',
      bounded: false,
    });
    // visual check that the heatmap track config menu is moved
    // to the left
  });

  afterAll(async () => {
    removeHGComponent(div);
    // await fetchMockHelper.storeDataAndResetFetchMock();
  });

  it('Switches to the osm tiles track', () => {
    const { views } = hgc.instance().state;
    // console.log('views:', views);

    const view = views.aa;

    view.tracks.center[0].type = 'osm-2d-tile-ids';
    view.tracks.center[0].uid = 'bb';

    hgc.setState({
      views,
    });
  });
});

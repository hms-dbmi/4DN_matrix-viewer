const viewconf = {
  editable: false,
  zoomFixed: false,
  trackSourceServers: [
    'http://higlass.io/api/v1'
  ],
  exportViewUrl: 'http://higlass.io/api/v1/viewconfs/',
  views: [
    {
      uid: 'a',
      initialXDomain: [
        7595655.0000270605,
        2507738795.9999733
      ],
      tracks: {
        top: [
          {
            server: 'http://higlass.io/api/v1',
            tilesetUid: 'OHJakQICQD6gTD7skx4EWA',
            uid: 'genes1',
            type: 'horizontal-gene-annotations',
            height: 24
          },
          {
            server: 'http://higlass.io/api/v1',
            tilesetUid: 'PjIJKXGbSNCalUZO21e_HQ',
            uid: 'bar1',
            type: 'horizontal-bar',
            height: 36
          },
        ],
        left: [],
        center: [],
        right: [],
        bottom: []
      },
      layout: {
        w: 12,
        h: 0,
        x: 0,
        y: 0,
        moved: false,
        static: false
      }
    }
  ]
};

export default viewconf;

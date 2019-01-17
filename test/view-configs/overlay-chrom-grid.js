const viewConf = {
  editable: true,
  zoomFixed: false,
  trackSourceServers: ['http://higlass.io/api/v1'],
  exportViewUrl: 'http://localhost:8000/api/v1/viewconfs/',
  views: [{
    uid: 'aa',
    initialXDomain: [-128227010, 3227095876],
    tracks: {
      top: [
        {
          server: 'http://higlass.io/api/v1',
          tilesetUid: 'OHJakQICQD6gTD7skx4EWA',
          uid: 'genes-top',
          type: 'horizontal-gene-annotations'
        }
      ],
      left: [
        {
          server: 'http://higlass.io/api/v1',
          tilesetUid: 'OHJakQICQD6gTD7skx4EWA',
          uid: 'genes-left',
          type: 'vertical-gene-annotations'
        }
      ],
      center: [],
      right: [],
      bottom: []
    },
    layout: {
      w: 12,
      h: 12,
      x: 0,
      y: 0,
      i: 'aa',
      moved: false,
      static: false
    },
    overlays: [
      {
        uid: 'overlay-chroms',
        type: 'chromosome-grid',
        includes: ['genes-top', 'genes-left'],
        chromInfoPath: '//s3.amazonaws.com/pkerp/data/hg19/chromSizes.tsv',
        options: {
          lineStrokeWidth: 1,
          lineStrokeColor: 'grey'
        }
      }
    ]
  }]
};

export default viewConf;

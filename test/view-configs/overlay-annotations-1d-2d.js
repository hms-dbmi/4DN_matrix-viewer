const viewConf = {
  editable: false,
  zoomFixed: false,
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
        },
        {
          chromInfoPath: '//s3.amazonaws.com/pkerp/data/hg19/chromSizes.tsv',
          type: 'horizontal-chromosome-labels',
          position: 'top',
          uid: 'chroms-top'
        }
      ],
      left: [
        {
          server: 'http://higlass.io/api/v1',
          tilesetUid: 'OHJakQICQD6gTD7skx4EWA',
          uid: 'genes-left',
          type: 'vertical-gene-annotations'
        },
        {
          chromInfoPath: '//s3.amazonaws.com/pkerp/data/hg19/chromSizes.tsv',
          type: 'vertical-chromosome-labels',
          position: 'left',
          name: 'Chromosome Labels (hg19)',
          uid: 'chroms-left'
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
    overlays: [{
      uid: 'overlay',
      type: '',
      includes: ['chroms-top', 'chroms-left', 'genes-top', 'genes-left'],
      options: {
        extent: [
          [1000000000, 1100000000]
        ]
      }
    }]
  }]
};

export default viewConf;

import React from 'react';
import RadarChart from 'react-svg-radar-chart';
import 'react-svg-radar-chart/build/css/index.css';

function radarBean(props) {
  const data = [
    {
      data: {
        fragrance: props.data.fragrance,
        flavor: props.data.flavor,
        aftertaste: props.data.aftertaste,
        acidity: props.data.acidity,
        body: props.data.body,
        balance: props.data.balance,
        uniformity: props.data.uniformity,
        cleanCups: props.data.cleanCups,
        sweetness: props.data.sweetness,
        overall: props.data.overall,
      },
      meta: { color: 'blue' },
    },
  ];

  const captions = {
    fragrance: 'fragrance',
    flavor: 'flavor',
    aftertaste: 'aftertaste',
    acidity: 'acidity',
    body: 'body',
    balance: 'balance',
    uniformity: 'uniformity',
    cleanCups: 'cleanCups',
    sweetness: 'sweetness',
    overall: 'overall',
  };

  return <RadarChart captions={captions} data={data} size={300} />;
}

export default radarBean;

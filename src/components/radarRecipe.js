import React from 'react';
import RadarChart from 'react-svg-radar-chart';
import 'react-svg-radar-chart/build/css/index.css';

function radarRecipe(props) {
  const data = [
    {
      data: {
        fragrance: props.data.fragrance,
        aroma: props.data.aroma,
        cleanliness: props.data.cleanliness,
        sweetness: props.data.sweetness,
        taste: props.data.taste,
        acidity: props.data.acidity,
        aftertaste: props.data.aftertaste,
        balance: props.data.balance,
        globalTaste: props.data.globalTaste,
        body: props.data.body,
      },
      meta: { color: 'blue' },
    },
  ];

  const captions = {
    // columns
    fragrance: 'fragrance',
    aroma: 'aroma',
    cleanliness: 'cleanliness',
    sweetness: 'sweetness',
    taste: 'taste',
    acidity: 'acidity',
    aftertaste: 'aftertaste',
    balance: 'balance',
    globalTaste: 'global',
    body: 'body',
  };

  return <RadarChart captions={captions} data={data} size={300} />;
}

export default radarRecipe;

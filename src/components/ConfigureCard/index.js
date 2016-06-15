import React, { PropTypes } from 'react';
import CardItem from '../CardItem';

const propTypes = {
  uuid: PropTypes.string.isRequired,
};

const ConfigureCard = ({ uuid }) => {
  return (
    <CardItem
      title="Next Step"
      linkTo={`/things/configure/${uuid}`}
      linkTitle="Configure Thing"
    />
  );
};

ConfigureCard.propTypes = propTypes;

export default ConfigureCard;

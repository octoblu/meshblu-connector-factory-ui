import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
import React from 'react';

import Versions from './Versions';

chai.use(chaiEnzyme());

describe('<Versions />', () => {
  let sut;

  beforeEach(() => {
    sut = shallow(<Versions />);
  });

  it('should exist', () => {
    expect(sut).to.be.present;
  });
});

import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
import React from 'react';

import NotFound from './';

chai.use(chaiEnzyme());

describe('<NotFound />', () => {
  let sut;

  beforeEach(() => {
    sut = shallow(<NotFound />);
  });

  it('should exist', () => {
    expect(sut).to.be.present;
  });
});

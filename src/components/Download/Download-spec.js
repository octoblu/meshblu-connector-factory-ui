import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
import React from 'react';

import Download from './Download';

chai.use(chaiEnzyme());

describe('<Download />', () => {
  let sut;

  beforeEach(() => {
    sut = shallow(<Download />);
  });

  it('should exist', () => {
    expect(sut).to.be.present;
  });
});

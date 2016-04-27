import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
import React from 'react';

import VersionInfo from './VersionInfo';

chai.use(chaiEnzyme());

describe('<VersionInfo />', () => {
  let sut;

  beforeEach(() => {
    sut = shallow(<VersionInfo />);
  });

  it('should exist', () => {
    expect(sut).to.be.present;
  });
});

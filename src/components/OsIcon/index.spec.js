import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import React from 'react'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { mount, shallow } from 'enzyme'

import OsIcon from './'

chai.use(chaiEnzyme())
chai.use(sinonChai)

describe('<OsIcon />', () => {
  it('should render nothing', () => {
    const sut = shallow(<OsIcon />)
    expect(sut).to.be.empty
  })
})
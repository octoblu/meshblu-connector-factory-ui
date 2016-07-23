import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import React from 'react'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { mount, shallow } from 'enzyme'

import OsArchButton from './'

chai.use(chaiEnzyme())
chai.use(sinonChai)

describe('<OsArchButton />', () => {
  it('should render nothing', () => {
    const sut = shallow(<OsArchButton />)
    expect(sut).to.be.empty
  })
})

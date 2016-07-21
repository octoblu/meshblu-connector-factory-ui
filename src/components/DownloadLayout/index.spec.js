import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import React from 'react'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { mount, shallow } from 'enzyme'

import DownloadLayout from './'

chai.use(chaiEnzyme())
chai.use(sinonChai)

describe('<DownloadLayout />', () => {
  it('should render nothing', () => {
    const sut = shallow(<DownloadLayout />)
    expect(sut).to.be.empty
  })
})

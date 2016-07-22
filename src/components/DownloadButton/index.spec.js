import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import React from 'react'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { mount, shallow } from 'enzyme'

import DownloadButton from './'

chai.use(chaiEnzyme())
chai.use(sinonChai)

describe('<DownloadButton />', () => {
  it('should render nothing', () => {
    const sut = shallow(<DownloadButton />)
    expect(sut).to.be.empty
  })
})

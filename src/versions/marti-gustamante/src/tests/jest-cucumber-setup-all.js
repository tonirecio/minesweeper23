import { autoBindSteps, loadFeatures } from 'jest-cucumber'
import steps from './steps'

const features = loadFeatures('src/tests/features/*.feature', {
  tagFilter: 'not @skip and not @manual and not @ignore'
})

autoBindSteps(features, steps)
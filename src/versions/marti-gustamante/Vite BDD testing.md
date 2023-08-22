# Vite BDD testing

# Getting started

## Create Vite project

```gherkin
# npm 6.x
npm create vite@latest

# npm 7+, extra double-dash is needed:
npm create vite@latest

# yarn
yarn create vite

# pnpm
pnpm create vite

# npx
npx create-vite

√ Project name: ... vite-project
√ Select a framework: » React
√ Select a variant: » JavaScript + SWC
```

```bash
# npm 6.x
npm create vite@latest project-name --template react-swc

# npm 7+, extra double-dash is needed:
npm create vite@latest project-name -- --template react-swc

# yarn
yarn create vite project-name --template react-swc

# pnpm
pnpm create vite project-name --template react-swc

# npx
npx create-vite project-name --template react-swc
```

## Configure SWC

### Install packages

```bash
# yarn
yarn add -D @swc/core @swc/jest

# npm
npm install --dev @swc/core @swc/jest
```

### Add config file

Create **`.swcrc`** file in the project root directory

```json
{
  "$schema": "https://json.schemastore.org/swcrc",
  "jsc": {
    "parser": {
      "syntax": "ecmascript",
      "jsx": true,
      "dynamicImport": false,
      "privateMethod": false,
      "functionBind": false,
      "exportDefaultFrom": false,
      "exportNamespaceFrom": false,
      "decorators": false,
      "decoratorsBeforeExport": false,
      "topLevelAwait": false,
      "importMeta": false
    },
    "transform": null,
    "target": "es5",
    "loose": false,
    "externalHelpers": false,
    "keepClassNames": false
  },
  "minify": false
}
```

## Configure Jest

### Install packages

```bash
# yarn
yarn add -D jest jest-cucumber jest-environment-jsdom

**# npm
npm install --dev jest jest-cucumber jest-environment-jsdom
```

### Add config file

Create `**jest.config.cjs**` file in the project root directory

```jsx
module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(t|m?j)sx?$': '@swc/jest'
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.yarn/'],
  moduleFileExtensions: ['js', 'mjs', 'jsx'],
  moduleNameMapper: {
    uuid: require.resolve('uuid')
  },
  collectCoverage: true,
  coveragePathIgnorePatterns: [
    'src/__tests__/',
    'node_modules/',
    '.yarn/'
  ]
}
```

### Edit package.json

Add to scripts section the test script

```json
"test:all": "jest --config jest.config.cjs --testRegex jest-cucumber-setup-all.js",
"test:single": "jest --config jest.config.cjs --testRegex jest-cucumber-setup-single.js"
```

```json
"scripts": {
    "build": "vite build",
    "dev": "vite",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "test:all": "jest --config jest.config.cjs --testRegex jest-cucumber-setup-all.js",
    "test:single": "jest --config jest.config.cjs --testRegex jest-cucumber-setup-single.js"
  },
```

## Setup BDD

### Install packages

```bash
# yarn
yarn add -D @testing-library/jest-dom @testing-library/react uuid

# npm
npm install --dev @testing-library/jest-dom @testing-library/react uuid
```

### Create file system

Inside `**src`** folder create `**__tests__**` inside it create **`features` a**nd **`steps`**

```
src
└───__tests__
    ├───features
    └───steps
```

### Add basic files

Create `**__template__.jsx**` inside **`src/__tests__/steps/`**

```jsx
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

export const __template__ = ({
  given: Given,
  and: And,
  when: When,
  then: Then
}) => {
  /**
   * Your test steps go here.
   *
   * Example:
   *
   * Given('I am on the home page', () => {
   *     render(<Home />)
   * })
   */

}

export default __template__
```

Create **`index.js`** inside **`src/__tests__/steps/`**

```jsx
import __template__ from './__template__.jsx'

export default [__template__]
```

Create **`jest-cucumber-setup-all.js`** inside **`src/__tests__/`**

```jsx
import { autoBindSteps, loadFeatures } from 'jest-cucumber'
import steps from './steps'

const features = loadFeatures('src/__tests__/features/*.feature', {
  tagFilter: 'not @skip and not @manual and not @ignore'
})

autoBindSteps(features, steps)
```

Create **`jest-cucumber-setup-single.js`** inside **`src/__tests__/`**

```jsx
import { autoBindSteps, loadFeatures } from 'jest-cucumber'
import steps from './steps'

const features = loadFeatures('src/__tests__/features/*.feature', {
  tagFilter: 'not @skip and not @manual and not @ignore and (@single or @test or @run)'
})

autoBindSteps(features, steps)
```

# Add first test

## Create basic component

Add **`HelloWorld.jsx`** inside **`src/components/`**

```jsx
import React from 'react'

export const HelloWorld = () => {
  return (
    <h1 data-testid='helloWorld'>Hello World!</h1>
  )
}

export default HelloWorld
```

## Add features file

Add **`helloWorld.feature`** inside **`src/__test__/features/`**

```gherkin
Feature: Hello World

  Scenario: Check Hello World
    Given Hello World
    Then I should see "Hello World!"
```

## Add steps file

Using **`__template__.jsx`** from **`src/__test__/steps/`** create **`helloWorld.steps.jsx`**

```jsx
import React from 'react'
import { render, screen } from '@testing-library/react'
import { HelloWorld } from '../../components/HelloWorld.jsx'
import '@testing-library/jest-dom/extend-expect'

export const helloWorldSteps = ({
  given: Given,
  and: And,
  when: When,
  then: Then
}) => {
  Given(/^Hello World$/, () => {
    render(<HelloWorld />)
  })
  Then(/^I should see "([^"]*)"$/, (text) => {
    const helloWorld = screen.getByTestId('helloWorldSteps')

    expect(helloWorld).toHaveTextContent(text)
  })
}

export default helloWorldSteps
```

Add the steps file into **`index.js`** from **`src/__test__/steps/`**

```jsx
import __template__ from './__template__.jsx'
import helloWorldSteps from './helloWorld.steps.jsx'

export default [__template__, helloWorldSteps]
```

## Run tests

```bash
# yarn All tests
yarn test:all

# npm All tests
npm run test:all
```

```gherkin
# yarn Tagged tests
yarn test:single

# npm Tagged tests
npm run test:single
```

## Extras for Gherkin

```gherkin
Feature: Skip/Ignore Scenario

  @Skip
  Scenario: Skip that one
	.....

	@Manual
	Scenario: Manual Scenario Skip it
	.....

	@Ignore
	Scenario: Alias for @Skip
	.....

Feature: Single run

  @Single
  Scenario: Run "test:single"
	.....

	@Test
	Scenario: Run on demand
	.....

	@Run
	Scenario: The same llike @Single and @Test
	.....

```
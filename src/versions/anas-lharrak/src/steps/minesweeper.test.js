import { loadFeature, defineFeature } from 'jest-cucumber'
import * as steps from '../steps/minesweeper.steps.js'
import { getElementError } from '@testing-library/react'

const featureFile = loadFeature('./src/features/minesweeper.core.feature', {
    errors: {
        missingScenarioInStepDefinitions: false,
        missingStepInStepDefinitions: false,
        missingScenarioInFeature: false,
        missingStepInFeature: false
    }
})

defineFeature(featureFile, test => {
    test('Starting game - All the cells should be hidden', ({given, then}) => {
        given('the player opens the game', () => {
            steps.openTheGame()  
        }) 
        then('all the cells should be hidden', () => {
        
        })
    })
    test('Starting game - All the cells should be enabled', ({given, then}) => {
        given('the player opens the game', () => {
            steps.openTheGame()  
        }) 
        then('all the cells should be enabled', () => {
         
        })
    })
    test('Left clicking a cell - The cell should be uncovered', ({given, when, then}) => {
        given('the player opens the game', () => {
            steps.openTheGame()   
        }) 
        given('the player loads the following mock data:', (docString) => {
        })
        when(/^the player left clicks the cell \((\d+),(\d+)\)$/, (arg0, arg1) => {
        })
        then(/^the cell \((\d+),(\d+)\) should be uncovered$/, (arg0, arg1) => {
        
        })
    })
    test('Uncovering a cell - The cell should be disabled', ({given, when, then}) => {
        given('the player opens the game', () => {
            steps.openTheGame()   
        }) 
        given('the player loads the following mock data:', (docString) => {
        })
        when(/^the player uncovers the cell \((\d+),(\d+)\)$/, (arg0, arg1) => {
        })
        then(/^the cell \((\d+),(\d+)\) should be disabled$/, (arg0, arg1) => {
        
        }) 
    })
    test('Right-clicking one time on a cell - The cell should be a flag', ({given, when, then}) => {
        given('the player opens the game', () => {
            steps.openTheGame()   
        }) 
        given('the player loads the following mock data:', (docString) => {
        })
        when(/^the player right-clicks "(.*)" times on the cell \((\d+),(\d+)\)$/, (arg0, arg1, arg2) => {

        });
        then(/^the cell \((\d+),(\d+)\) should be "(.*)"$/, (arg0, arg1, arg2) => {      

        });
    })
    test('Right-clicking two times on a cell - The cell should be inconclusive', ({given, when, then}) => {
        given('the player opens the game', () => {
            steps.openTheGame()   
        }) 
        given('the player loads the following mock data:', (docString) => {
        })
        when(/^the player right-clicks "(.*)" times on the cell \((\d+),(\d+)\)$/, (arg0, arg1, arg2) => {

        });
        then(/^the cell \((\d+),(\d+)\) should be "(.*)"$/, (arg0, arg1, arg2) => {      
 
        });
    })
    test('Right-clicking three times on a cell - Remove the inconclusive', ({given, when, then}) => {
        given('the player opens the game', () => {
            steps.openTheGame()   
        }) 
        given('the player loads the following mock data:', (docString) => {
        })
        when(/^the player right-clicks "(.*)" times on the cell \((\d+),(\d+)\)$/, (arg0, arg1, arg2) => {

        });
        then(/^the cell \((\d+),(\d+)\) should be "(.*)"$/, (arg0, arg1, arg2) => {      
 
        });
    })
    test('Uncovering a cell with a flag - The cell should be uncovered', ({given, and, when, then}) => {
        given('the player opens the game', () => {
            steps.openTheGame()   
        }) 
        given('the player loads the following mock data:', (docString) => {
        })
        and(/^the player puts "(.*)" in the cell \((\d+),(\d+)\)$/, (arg0, arg1, arg2) => {

        });
        when(/^the player uncovers the cell \((\d+),(\d+)\)$/, (arg0, arg1) => {

        });
        then(/^the cell \((\d+),(\d+)\) should be uncovered$/, (arg0, arg1) => {

        });
    })
    test('Uncovering a cell with a flag - The cell should be disabled', ({given, and, when, then}) => {
        given('the player opens the game', () => {
            steps.openTheGame()   
        }) 
        given('the player loads the following mock data:', (docString) => {
        })
        and(/^the player puts "(.*)" in the cell \((\d+),(\d+)\)$/, (arg0, arg1, arg2) => {

        }); 
        when(/^the player uncovers the cell \((\d+),(\d+)\)$/, (arg0, arg1) => {

        });
        then(/^the cell \((\d+),(\d+)\) should be disabled$/, (arg0, arg1) => {

        });
       
    })
    test('Uncovering a mine cell with a flag - The cell should be a highlighted mine', ({given, and, when, then}) => {
        given('the player opens the game', () => {
            steps.openTheGame()   
        }) 
        given('the player loads the following mock data:', (docString) => {
        })
        and(/^the player puts "(.*)" in the cell \((\d+),(\d+)\)$/, (arg0, arg1, arg2) => {
 
        });
        when(/^the player uncovers the cell \((\d+),(\d+)\)$/, (arg0, arg1) => {

        });
        then(/^the cell \((\d+),(\d+)\) should be '@'$/, (arg0, arg1) => {

        });
       
    })
    test('Putting a flag on an uncovered cell - The cell should stay uncovered', ({given, and, when, then}) => {
        given('the player opens the game', () => {
            steps.openTheGame()   
        }) 
        given('the player loads the following mock data:', (docString) => {
        })
        and(/^the player uncovers the cell \((\d+),(\d+)\)$/, (arg0, arg1) => {

        }); 
        when(/^the player puts "(.*)" in the cell \((\d+),(\d+)\)$/, (arg0, arg1, arg2) => {

        });
        then(/^the cell \((\d+),(\d+)\) should be uncovered$/, (arg0, arg1) => {

        });
    })
    test('Putting a flag on an uncovered cell - The cell should stay disabled', ({given, and, when, then}) => {
        given('the player opens the game', () => {
            steps.openTheGame()   
        }) 
        given('the player loads the following mock data:', (docString) => {
        })
        and(/^the player uncovers the cell \((\d+),(\d+)\)$/, (arg0, arg1) => {

        });
        when(/^the player puts "(.*)" in the cell \((\d+),(\d+)\)$/, (arg0, arg1, arg2) => {

        });
        then(/^the cell \((\d+),(\d+)\) should be disabled$/, (arg0, arg1) => {

        });
    })
    test('Uncovering a mine - The player should lose the game', ({given, and, when, then}) => {
        given('the player opens the game', () => {
            steps.openTheGame()   
        }) 
        given('the player loads the following mock data:', (docString) => {
        })
        when(/^the player uncovers the cell \((\d+),(\d+)\)$/, (arg0, arg1) => {

        });
        then('the player should lose', () => {

        });
      
    })
    test('Losing the game - All the cells should be disabled', ({given, and, when, then}) => {
        given('the player opens the game', () => {
            steps.openTheGame()   
        }) 
        given('the player loads the following mock data:', (docString) => {
        })
        when(/^the player uncovers the cell \((\d+),(\d+)\)$/, (arg0, arg1) => {

        });
        then('all the cells should be disabled', () => {

        });       
    })
}) 
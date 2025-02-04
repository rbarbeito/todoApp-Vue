// sum.test.js
import { describe, expect, test } from 'vitest'
import { addArray, sum } from '../../src/helpers/sum'


describe('add functions', () => {
  test('adds 1 + 2 to equal 3', () => {

    // Preparation
    const a = 1
    const b = 2


    // estimulo
    const resultado = sum(a, b)


    // COmportamiento esperado
    expect(resultado).toBe(a + b)
  })

})


describe('addArray function',()=>{

  test('should return 0 if array is empty', () => {

    const arrayNumber = []
    const result = addArray(arrayNumber)
    expect(result).toBe(0)

  })



  test('should return proper value of the addArray function', () => {

    const arr = [1, 2, 3, 4, 5]
    const resultado = addArray(arr)
    expect(resultado).toBe(15)
  })
})
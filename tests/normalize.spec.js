import normalizeData from "../src/normalize.js"

const examples = [
  [{ year : '2018', make : 'fo', model : 'focus', trim : 'blank' },
   { year : 2018, make : 'Ford', model : 'Focus', trim : null }],
  [{ year : '200', make : 'blah', model : 'foo', trim : 'bar' },
   { year : '200', make : 'blah', model : 'foo', trim : 'bar' }],
  [{ year : '1999', make : 'Chev', model : 'IMPALA', trim : 'st' },
   { year : 1999, make : 'Chevrolet', model : 'Impala', trim : 'ST' }],
  [{ year : '2000', make : 'ford', model : 'focus se', trim : '' },
   { year : 2000, make : 'Ford', model : 'Focus', trim : 'SE' }]
]


describe("normalizeData",()=>{
  it("should correctly normalize data",()=>{
    examples.forEach((exampleSet)=>{
      const result = normalizeData(exampleSet[0])
      console.log(result);
      console.log(exampleSet[1]);
      expect(result).toEqual(exampleSet[1])
    })
  })
})


export const sanitizeNames =(nameArray)=>{
  const setOfNames = new Set(nameArray.map(name => {
    if(name.includes(',')){
      return name.split(',').reverse().join(' ')
    } else {
      return name
    }
  })
  )

  return [...setOfNames]
}

export default {}
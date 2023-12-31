
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

export const findProp= (obj, prop)=>{
  let item = Object.keys(obj).map(key =>{

    if(key === prop){
      return obj[key]
    }
     if(typeof obj[key] === 'object' ){
       return findProp(obj[key], prop)
     } 
    
  }).flat().filter(item => item !== undefined);

  if(prop === 'description' && typeof item !== 'string' &&  item.length > 0){
    item = item[0].value || item[0]
  }
  return item
}

export default {}

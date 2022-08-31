export function filterData(array, property, value) { //filtra dados
  return array.results.filter(elem => elem[property] === value) //.filter somente acessa arrays. para acessar objetos, usamos "." (literal, como em .results)
}//retorna uma array de strings

export function filterName(array, characterCondition) { //filtra nome
  return array.results.filter(elem => elem.name.toUpperCase().includes(characterCondition.toUpperCase()))
}

export function sortArr(data, select) {
  const orderedNameArr = data.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
  });

  if (select === 'az') {
    return orderedNameArr
  } else if (select === 'za') {
    return orderedNameArr.reverse()
  } else if (select === 'episode') {
    return data.sort((a, b) => {
      if (a.episode < b.episode) {
        return -1;
      }
      if (a.episode > b.episode) {
        return 1;
      }
    });
  }
}

export function percentage(array, newArrayLength) {
  return parseInt((100 * newArrayLength) / array.results.length)
}
















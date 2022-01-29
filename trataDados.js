var objeto = {
    "nome": ['eli', 'livro', 'agora'],
    "sobre":['ile', 'orvil', 'aroga'],
    "imp":['erp', 'sap', 'inc']
  }
  
  function paraCada(elem){
    var result = [];
    for (var i=0; i < elem.nome.length; i++){
    result.push({
      "nome":elem.nome[i],
      "sobre":elem.sobre[i],
      "imp":elem.imp[i]
    })
  }
    return console.log(result);
  }
  
  paraCada(objeto)  
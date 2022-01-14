const criaInput = (nome, etiqueta) =>{
    var div = document.createElement('div');
    var label = document.createElement('label');
        label.setAttribute('for', nome);
    var textLabel = document.createTextNode(etiqueta + ':');
        label.appendChild(textLabel);
    var input = document.createElement('input');
    input.setAttribute('id', nome);
    input.setAttribute('name', nome);
    input.setAttribute('type', 'text');

    div.appendChild(label);
    div.appendChild(input)

    return div;
}

const conferirEscolhaConjuge = () => {
    var escolha = document.querySelector('input[type=radio]:checked').value;
    var divConjuge = document.querySelector('.Conjuge');
    if(escolha == 'yes'){ criarForm('Conjuge') }
    else if(escolha == 'no'){
        if(divConjuge){ divConjuge.remove(); }
    }
    return true;
}

const conferirEscolhaFilho = () => {
    var escolha = document.querySelector('input[name=filho]:checked').value;
    var maisDe3 = document.querySelector('#qtdFilhos').value;

    const crie = (qtd) =>{
        var i = 0;
        do{
            i++;
            criarForm(`Filho(${i})`);
        }
        while(i < qtd);
    }
    const remova = () =>{
        var i = 0;
        do{
            i++;
            var divFilho = document.querySelectorAll('.Filho');
            console.log('<divFilho> - '+ divFilho)
            if(divFilho){
                divFilho.remove();
            }
        }
        while(i < divFilho.length);
        return divFilho;
    }

    switch(escolha){
        case '1':
            crie(1);
            break;
        case '2':
            crie(2);
            break;
        case '3':
            crie(3);
            break;
        case '9':
            escolha = maisDe3;
            crie(escolha);
            break;
        case 'no':
            remova();
    }
    console.log('<escolhaFilho> - '+escolha);

    return true;
}

const criarForm = (parentesco) => {
    var campo = document.createElement('fieldset');
    if(parentesco[0] == 'F'){
        campo.className = 'Filho';
    }else{
        campo.className = parentesco;
    }
    campo.setAttribute('id', parentesco)
    var legenda = document.createElement('legend');
        legenda.innerText = parentesco;
    var sobrenome = criaInput('lastName', 'Sobrenome');
    //console.log(sobrenome);
    var nome = criaInput('firstName', 'Nome');
    //console.log(nome);
    var email = criaInput('email', 'Email');
    //console.log(email);
    var telefone = criaInput('phone', 'Telefone');
    //console.log(telefone);
        campo.appendChild(legenda);
        campo.appendChild(sobrenome);
        campo.appendChild(nome);
        campo.appendChild(email);
        campo.appendChild(telefone);

    var form = document.querySelector('form');
    var botaoDeEnviar = document.querySelector('#botao');

    form.insertBefore(campo, botaoDeEnviar);

    return true
 }
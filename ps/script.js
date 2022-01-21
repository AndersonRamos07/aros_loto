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

const conferirEscolhaFilho = async () =>{
    var quantos = document.querySelector('#qtdFilhos');
    document.querySelector('#qtdFilhos').value = '';
    var escolha = document.querySelector('input[name=filho]:checked').value;

    if(escolha != '9'){
        quantos.setAttribute('disabled', 'true');
        criarFieldSets(escolha);
    }
    if (escolha == '9'){
        console.log('aqui')
        quantos.removeAttribute('disabled');
        quantos.focus();
    }
}

const escolhaMaior3 = () =>{
    var maisDe3 = document.querySelector('#qtdFilhos').value;
    criarFieldSets(maisDe3);
}

const criarFieldSets = (pEscolha) => {
    var maisDe3 = document.querySelector('#qtdFilhos').value;

    const limpe = () =>{
        var divsFilho = document.querySelectorAll('.Filho');
        for (var i=0; i < divsFilho.length; i++){
            divsFilho[i].remove();
        }
        return true;
    }

    const crie = (qtd) =>{
        limpe();
        if(qtd != 0 || qtd != ''){
            var i = 0;
            do{
                i++;
                criarForm(`Filho(${i})`);
            }
            while(i < qtd);
        }

    }

    switch(pEscolha){
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
            pEscolha = maisDe3;
            limpe();
            crie(pEscolha);
            break;
        case 'no':
            limpe();
            break;
            default:
            crie(pEscolha);
    }
    console.log('<escolhaFilho> - '+pEscolha);

    return true;
}

const criarForm = (parentesco) => {
    var campo = document.createElement('fieldset');
    if(parentesco[0] == 'F'){ campo.className = 'Filho'; }
    else{ campo.className = parentesco; }
    campo.setAttribute('id', parentesco)
    var legenda = document.createElement('legend');
        legenda.innerText = `INFORMAÇÕES DE CONTATO - ${parentesco}`;
    var sobrenome = criaInput('lastName', 'Sobrenome');
    var nome = criaInput('firstName', 'Nome');
    var email = criaInput('email', 'Email');
    var telefone = criaInput('phone', 'Telefone');
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

 const deveEscolher = () =>{
     var campoDeEscolha = document.querySelector('#qtdFilhos');
     var valorDeEscolha = campoDeEscolha.value;
     if(valorDeEscolha == 0 || valorDeEscolha == ''){
         alert('Favor informar a quantidade de filhos!');
         campoDeEscolha.focus();
     }
     else(criarFieldSets(valorDeEscolha));     
 }
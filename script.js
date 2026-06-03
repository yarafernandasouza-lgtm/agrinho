let carrinho = [];
let total = 0;

function adicionarAoCarrinho(nome, preco) {
    // Adiciona o produto ao array do carrinho
    carrinho.push({ nome, preco });
    total += preco;
    
    atualizarInterface();
}

function atualizarInterface() {
    const listaHtml = document.getElementById('itens-carrinho');
    const totalHtml = document.getElementById('valor-total');
    
    // Limpa a lista antes de redesenhar
    listaHtml.innerHTML = '';
    
    // Lista os itens atuais
    carrinho.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${item.nome}</span> <span>R$ ${item.preco.toFixed(2)}</span>`;
        listaHtml.appendChild(li);
    });
    
    // Atualiza o valor total na tela
    totalHtml.innerText = total.toFixed(2).replace('.', ',');
}

function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }
    
    // Monta a mensagem de texto para o WhatsApp
    let mensagem = "Olá, gostaria de fazer o seguinte pedido na feirinha:\n\n";
    carrinho.forEach(item => {
        mensagem += `- ${item.nome}: R$ ${item.preco.toFixed(2)}\n`;
    });
    mensagem += `\n*Total: R$ ${total.toFixed(2)}*`;
    
    // Codifica o texto para formato de URL
    let textoCodificado = encodeURIComponent(mensagem);
    
    // Substitua o número abaixo pelo SEU número com DDD (ex: 5511999999999)
    let numeroWhatsApp = "5500999999999"; 
    
    // Abre o WhatsApp com a mensagem pronta
    window.open(`https://wa.me/${numeroWhatsApp}?text=${textoCodificado}`, '_blank');
}

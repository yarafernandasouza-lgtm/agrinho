let carrinho = [];
let total = 0;

function adicionarAoCarrinho(nome, preco) {
    // Adiciona o produto ao array do carrinho
    carrinho.push({ nome, preco });
    total += preco;
    
    atualizarInterface();
}

function removerDoCarrinho(index) {
    // Subtrai o valor do item que será removido do total
    total -= carrinho[index].price || carrinho[index].preco;
    
    // Remove o item da lista usando a posição (index) dele
    carrinho.splice(index, 1);
    
    atualizarInterface();
}

function atualizarInterface() {
    const listaHtml = document.getElementById('itens-carrinho');
    const totalHtml = document.getElementById('valor-total');
    
    // Limpa a lista antes de redesenhar
    listaHtml.innerHTML = '';
    
    // Lista os itens atuais e adiciona um botão de remover em cada um
    carrinho.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item.nome} - R$ ${item.preco.toFixed(2).replace('.', ',')}</span> 
            <button class="btn-remover" onclick="removerDoCarrinho(${index})">❌</button>
        `;
        listaHtml.appendChild(li);
    });
    
    // Se o total ficar negativo por erro de arredondamento, zera ele
    if (total < 0) total = 0;
    
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
        mensagem += `- ${item.nome}: R$ ${item.preco.toFixed(2).replace('.', ',')}\n`;
    });
    mensagem += `\n*Total: R$ ${total.toFixed(2).replace('.', ',')}*`;
    
    // Codifica o texto para formato de URL
    let textoCodificado = encodeURIComponent(mensagem);
    
    // Substitua o número abaixo pelo SEU número com DDD
    let numeroWhatsApp = "5500999999999"; 
    
    // Abre o WhatsApp com a mensagem pronta
    window.open(`https://wa.me/${numeroWhatsApp}?text=${textoCodificado}`, '_blank');
}

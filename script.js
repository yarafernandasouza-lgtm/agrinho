let carrinho = [];
let total = 0;

function adicionarAoCarrinho(nome, preco) {
    carrinho.push({ nome, preco });
    total += preco;
    atualizarInterface();
}

function removerDoCarrinho(index) {
    total -= carrinho[index].preco;
    carrinho.splice(index, 1);
    atualizarInterface();
}

function atualizarInterface() {
    const listaHtml = document.getElementById('itens-carrinho');
    const totalHtml = document.getElementById('valor-total');
    
    listaHtml.innerHTML = '';
    
    carrinho.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item.nome} - R$ ${item.preco.toFixed(2).replace('.', ',')}</span> 
            <button class="btn-remover" onclick="removerDoCarrinho(${index})">❌</button>
        `;
        listaHtml.appendChild(li);
    });
    
    if (total < 0) total = 0;
    
    totalHtml.innerText = total.toFixed(2).replace('.', ',');
}

function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }
    
    // Monta o texto de resumo do pedido para exibir na tela
    let resumoPedido = "🛒 PEDIDO CONFIRMADO COM SUCESSO!\n\nItens comprados:\n";
    carrinho.forEach(item => {
        resumoPedido += `- ${item.nome}: R$ ${item.preco.toFixed(2).replace('.', ',')}\n`;
    });
    resumoPedido += `\nValor Total: R$ ${total.toFixed(2).replace('.', ',')}\n\nObrigado por comprar na nossa Feirinha!`;
    
    // Exibe o alerta na tela para o usuário
    alert(resumoPedido);
    
    // Limpa o carrinho e o total após finalizar a compra
    carrinho = [];
    total = 0;
    atualizarInterface();
}

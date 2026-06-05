// Banco de dados dos produtos da feira
const produtosDados = [
    { id: 1, nome: "🍌 Banana Prata (Kg)", preco: 6.50, busca: "banana prata" },
    { id: 2, nome: "🍓 Morango (Bandeja)", preco: 8.50, busca: "morango" },
    { id: 3, nome: "🍎 Maçã Gala (Kg)", preco: 9.00, busca: "maca gala" },
    { id: 4, nome: "🍊 Laranja Pêra (Kg)", preco: 4.50, busca: "laranja pera" },
    { id: 5, nome: "🥑 Abacate (Kg)", preco: 6.80, busca: "abacate" },
    { id: 6, nome: "🍉 Melancia (Fatia)", preco: 5.00, busca: "melancia" },
    { id: 7, nome: "🍇 Uva Sem Semente (Bdj)", preco: 9.50, busca: "uva" },
    { id: 8, nome: "🍍 Abacaxi (Unid)", preco: 7.00, busca: "abacaxi" },
    { id: 9, nome: "🍅 Tomate Italiano (Kg)", preco: 9.50, busca: "tomate" },
    { id: 10, nome: "🥔 Batata Inglesa (Kg)", preco: 8.90, busca: "batata" },
    { id: 11, nome: "🥕 Cenoura (Kg)", preco: 5.50, busca: "cenoura" },
    { id: 12, nome: "🧅 Cebola (Kg)", preco: 6.00, busca: "cebola" },
    { id: 13, nome: "🥒 Abobrinha (Kg)", preco: 4.50, busca: "abobrinha" },
    { id: 14, nome: "🫑 Pimentão Verde (Kg)", preco: 7.00, busca: "pimentao" },
    { id: 15, nome: "🥬 Alface Crespa (Maço)", preco: 3.50, busca: "alface" },
    { id: 16, nome: "🥦 Brócolis (Unid)", preco: 6.00, busca: "brocolis" },
    { id: 17, nome: "🌿 Couve Manteiga (Maço)", preco: 4.00, busca: "couve" }
];

let carrinho = [];
let totalSemDesconto = 0;
let desconto = 0;
let cupomAtivo = false;

// Inicializa as quantidades de cada produto temporariamente na tela
let quantidadesDefinidas = {};
produtosDados.forEach(p => quantidadesDefinidas[p.id] = 1);

// Gera a vitrine de produtos na tela automaticamente
function renderizarVitrine(lista) {
    const vitrine = document.getElementById('vitrine-produtos');
    vitrine.innerHTML = '';
    
    lista.forEach(p => {
        const card = document.createElement('div');
        card.className = 'produto-card';
        card.innerHTML = `
            <h3>${p.nome}</h3>
            <p class="preco">R$ ${p.preco.toFixed(2).replace('.', ',')}</p>
            <div class="contador">
                <button class="btn-qtd" onclick="alterarQtdTemp(${p.id}, -1)">-</button>
                <span class="qtd-numero" id="qtd-${p.id}">${quantidadesDefinidas[p.id]}</span>
                <button class="btn-qtd" onclick="alterarQtdTemp(${p.id}, 1)">+</button>
            </div>
            <button onclick="adicionarComQuantidade(${p.id})">Adicionar</button>
        `;
        vitrine.appendChild(card);
    });
}

// Altera o número no seletor do card antes de mandar pro carrinho
function alterarQtdTemp(id, valor) {
    if (quantidadesDefinidas[id] + valor >= 1) {
        quantidadesDefinidas[id] += valor;
        document.getElementById(`qtd-${id}`).innerText = quantidadesDefinidas[id];
    }
}

// Adiciona o produto multiplicando pela quantidade escolhida
function adicionarComQuantidade(id) {
    const produto = produtosDados.find(p => p.id === id);
    const qtd = quantidadesDefinidas[id];
    
    const itemNoCarrinho = carrinho.find(item => item.id === id);
    
    if (itemNoCarrinho) {
        itemNoCarrinho.qtd += qtd;
    } else {
        carrinho.push({ id: produto.id, nome: produto.nome, preco: produto.preco, qtd: qtd });
    }
    
    quantidadesDefinidas[id] = 1;
    document.getElementById(`qtd-${id}`).innerText = 1;
    
    atualizarInterface();
}

function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    atualizarInterface();
}

function atualizarInterface() {
    const listaHtml = document.getElementById('itens-carrinho');
    const totalHtml = document.getElementById('valor-total');
    const descontoLinha = document.getElementById('desconto-linha');
    const valorDescontoHtml = document.getElementById('valor-desconto');
    
    listaHtml.innerHTML = '';
    totalSemDesconto = 0;
    
    carrinho.forEach((item, index) => {
        const subtotalItem = item.preco * item.qtd;
        totalSemDesconto += subtotalItem;
        
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item.qtd}x ${item.nome}</span> 
            <span>R$ ${subtotalItem.toFixed(2).replace('.', ',')} 
                <button class="btn-remover" onclick="removerDoCarrinho(${index})">❌</button>
            </span>
        `;
        listaHtml.appendChild(li);
    });
    
    if (cupomAtivo) {
        desconto = totalSemDesconto * 0.10; // 10%
        descontoLinha.style.display = 'block';
        valorDescontoHtml.innerText = desconto.toFixed(2).replace('.', ',');
    } else {
        desconto = 0;
        descontoLinha.style.display = 'none';
    }
    
    let totalFinal = totalSemDesconto - desconto;
    if (totalFinal < 0) totalFinal = 0;
    
    totalHtml.innerText = totalFinal.toFixed(2).replace('.', ',');
}

function filtrarProdutos() {
    const termoBusca = document.getElementById('barra-busca').value.toLowerCase();
    const filtrados = produtosDados.filter(p => p.busca.includes(termoBusca) || p.nome.toLowerCase().includes(termoBusca));
    renderizarVitrine(filtrados);
}

function aplicarCupom() {
    const cupomTexto = document.getElementById('input-cupom').value.trim().toUpperCase();
    const msg = document.getElementById('msg-cupom');
    
    if (cupomTexto === "FEIRA10") {
        cupomAtivo = true;
        msg.style.color = "#8e24aa"; // Mensagem em roxo
        msg.innerText = "Cupom FEIRA10 aplicado (10% de desconto)!";
        atualizarInterface();
    } else {
        msg.style.color = "#e53935";
        msg.innerText = "Cupom inválido!";
    }
}

function alternarModoEscuro() {
    document.body.classList.toggle('dark-mode');
    const btn = document.getElementById('btn-dark-mode');
    if(document.body.classList.contains('dark-mode')) {
        btn.innerText = "☀️ Modo Claro";
    } else {
        btn.innerText = "🌙 Modo Escuro";
    }
}

function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }
    
    let resumoPedido = "🛒 PEDIDO CONFIRMADO COM SUCESSO!\n\nItens:\n";
    carrinho.forEach(item => {
        resumoPedido += `- ${item.qtd}x ${item.nome} (Subtotal: R$ ${(item.preco * item.qtd).toFixed(2).replace('.', ',')})\n`;
    });
    
    if(cupomAtivo) {
        resumoPedido += `\nDesconto aplicado: R$ ${desconto.toFixed(2).replace('.', ',')}`;
    }
    
    let totalFinal = totalSemDesconto - desconto;
    resumoPedido += `\n\nValor Final Pago: R$ ${totalFinal.toFixed(2).replace('.', ',')}\n\nObrigado por comprar conosco!`;
    
    alert(resumoPedido);
    
    carrinho = [];
    cupomAtivo = false;
    document.getElementById('input-cupom').value = '';
    document.getElementById('msg-cupom').innerText = '';
    atualizarInterface();
}

renderizarVitrine(produtosDados);

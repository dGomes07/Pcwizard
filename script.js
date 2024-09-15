let currentPage = 1;
const pageSize = 10; // Número de produtos a carregar por página

async function fetchProducts() {
    const apiKey = 'AgbY1k7GZzwXhlq3K2c9Kbwk';
    const apiUrl = `https://api.bestbuy.com/v1/products((categoryPath.id=abcat0501000))?apiKey=${apiKey}&format=json&pageSize=${pageSize}&page=${currentPage}`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const productsContainer = document.getElementById('products');

        if (data.products && data.products.length > 0) {
            data.products.forEach(product => {
                const productElement = document.createElement('div');
                productElement.classList.add('product');

                productElement.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h2>${product.name}</h2>
                    <p>Marca: ${product.manufacturer}</p>
                    <p>Modelo: ${product.modelNumber}</p>
                    <p class="price">Preço: ${product.salePrice ? '$' + product.salePrice : 'Preço não disponível'}</p>
                    <button>Comprar Agora</button>
                `;

                productsContainer.appendChild(productElement);
            });
        } else {
            const loadMoreBtn = document.getElementById('loadMoreBtn');
            loadMoreBtn.disabled = true;  // Desabilita o botão se não houver mais produtos
            loadMoreBtn.innerText = "Nenhum produto restante";
        }
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
    }
}

// Função para carregar mais produtos quando o botão for clicado
document.getElementById('loadMoreBtn').addEventListener('click', () => {
    currentPage++;
    fetchProducts();
});

// Carregar a primeira página de produtos ao carregar a página
fetchProducts();

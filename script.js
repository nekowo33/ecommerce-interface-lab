//task 1
class Product {
    constructor(id, name, price, image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
    }
}

const products = [
    new Product(1, "Rose Bouquet", 1200.00, "https://i.pinimg.com/736x/5a/aa/d2/5aaad243a6cc3e7e3c1f6669b50b260d.jpg"),
    new Product(2, "Tulip Bouquet", 1800.00, "https://i.pinimg.com/736x/f8/6c/7b/f86c7b3f61c7b5409d462498f05bb11b.jpg"),
    new Product(3, "Lilies Bouquet", 2000.00, "https://i.pinimg.com/736x/98/4a/a6/984aa6c4765025d0abac3a00fae15d0d.jpg"),
    new Product(4, "Sunflower Bouquet", 1500.00, "https://i.pinimg.com/1200x/e7/74/ac/e774ace7f45a08a7f1573d42a0824dc0.jpg"),
    new Product(5, "Daisy Bouquet", 900.00, "https://i.pinimg.com/1200x/e1/dd/06/e1dd06c81bde52961dfa25c2c9061fc1.jpg"),
    new Product(6, "Orchid Bouquet", 2500.00, "https://i.pinimg.com/736x/5a/83/0f/5a830f1e2f75fc3bc3a8151b8918670e.jpg"),
    new Product(7, "Peony Bouquet", 2200.00, "https://i.pinimg.com/736x/c4/cf/a6/c4cfa6cf64212db4966cd5d1b801288c.jpg"),
    new Product(8, "Lavender Bouquet", 1300.00, "https://i.pinimg.com/1200x/19/e1/7b/19e17b26ed6a194a3d5f8bbcfe94a31e.jpg"),
    new Product(9, "Mixed Bouquet", 1700.00, "https://i.pinimg.com/1200x/47/c5/e0/47c5e08d73d917717ec2565f4960724b.jpg"),
    new Product(10, "Carnation Bouquet", 1300.00, "https://i.pinimg.com/736x/7f/e0/d5/7fe0d5ac477b225b9602368357690027.jpg"),
]

//task 2

const productContainer = document.querySelector('section[aria-label="Product Grid"]');
if (productContainer) {
    productContainer.innerHTML = "";

    products.forEach(function(product) {
        const article = document.createElement('article');
        article.setAttribute('data-id', product.id);

        const heading = document.createElement('h3');
        const headingText = document.createTextNode(product.name);
        heading.appendChild(headingText);

        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.name;

        const pricePara = document.createElement('p');
        const priceLabel = document.createTextNode('Price: ');
        pricePara.appendChild(priceLabel);

        const priceSpan = document.createElement('span');
        priceSpan.classList.add('price');
        const priceText = document.createTextNode(product.price.toLocaleString('en-PH', { minimumFractionDigits: 2}));
        priceSpan.appendChild(priceText);
        pricePara.appendChild(priceSpan);

        const detailLink = document.createElement('a');
        detailLink.href = 'detail.html';
        const detailText = document.createTextNode('View Details');
        detailLink.appendChild(detailText);

        const addBtn = document.createElement('button');
        addBtn.classList.add('add-to-cart');
        addBtn.setAttribute('data-id', product.id);

        const btnText = document.createTextNode('Add to Cart');
        addBtn.appendChild(btnText);

        article.appendChild(heading);
        article.appendChild(img);
        article.appendChild(pricePara);
        article.appendChild(detailLink);
        article.appendChild(addBtn);

        productContainer.appendChild(article);
    });
}
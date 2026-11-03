
const products = [
  { name: "ცეზარი", weight: "250 გ", price: 10, category: "salad" },
  { name: "ქათმის სალათი", weight: "100 გ", price: 3.50, category: "salad" },
  { name: "ბადრიჯანი ნიგვზით", weight: "100 გ", price: 4, category: "salad" },
  { name: "ნიგვზიანი ჭარხალი", weight: "100 გ", price: 3, category: "salad" },
  { name: "ისპანახის სალათი", weight: "100 გ", price: 3.50, category: "salad" },
  { name: "კომბოსტოს სალათი", weight: "100 გ", price: 2.50, category: "salad" },
  { name: "ქათმის კუჭმაჭი ნიგვზით", weight: "100 გ", price: 3.50, category: "main" },
  { name: "კარტოფილი პიურე", weight: "100 გ", price: 4, category: "garnish" },
  { name: "კარტოფილი ნივრით", weight: "100 გ", price: 4, category: "garnish" },
  { name: "კარტოფილი ქათმით", weight: "პორცია", price: 2, category: "main" },
  { name: "მექსიკური კარტოფილი", weight: "100 გ", price: 3, category: "garnish" },
  { name: "ქათმის ფრთები", weight: "100 გ", price: 4, category: "main" },
  { name: "ნიგოზი", weight: "პორცია", price: 4, category: "main" },
  { name: "კარტოფილი ფრი", weight: "პორცია", price: 3, category: "garnish" },
  { name: "ბოზბაში", weight: "პორცია", price: 5, category: "soup" }
];

const menuGrid = document.getElementById("menuGrid");
const searchInput = document.getElementById("searchInput");
const categoryButtons = document.querySelectorAll(".category-btn");
const emptyMessage = document.getElementById("emptyMessage");

let selectedCategory = "all";

function renderMenu() {
  const searchText = searchInput.value.trim().toLocaleLowerCase();

  const filteredProducts = products.filter(product => {
    const matchesCategory =
      selectedCategory === "all" ||
      product.category === selectedCategory;

    const matchesSearch =
      product.name.toLocaleLowerCase().includes(searchText);

    return matchesCategory && matchesSearch;
  });

  menuGrid.innerHTML = "";

  filteredProducts.forEach(product => {
    const card = document.createElement("article");
    card.className = "menu-card";

    const details = document.createElement("div");

    const title = document.createElement("h3");
    title.textContent = product.name;

    const weight = document.createElement("p");
    weight.textContent = product.weight;

    const price = document.createElement("span");
    price.className = "menu-price";
    price.textContent =
      `${product.price.toFixed(2)} ₾`;

    details.append(title, weight);
    card.append(details, price);
    menuGrid.appendChild(card);
  });

  emptyMessage.hidden = filteredProducts.length !== 0;
}

categoryButtons.forEach(button => {
  button.addEventListener("click", () => {
    categoryButtons.forEach(btn => {
      btn.classList.remove("active");
      btn.setAttribute("aria-pressed", "false");
    });

    button.classList.add("active");
    selectedCategory = button.dataset.category;

    renderMenu();
  });
});

searchInput.addEventListener("input", renderMenu);

// QR კოდის შექმნა
const websiteUrl = document.getElementById("websiteUrl");
const generateQR = document.getElementById("generateQR");
const qrImage = document.getElementById("qrImage");
const qrPlaceholder = document.getElementById("qrPlaceholder");
const qrMessage = document.getElementById("qrMessage");

generateQR.addEventListener("click", () => {
  const url = websiteUrl.value.trim();

  if (!url) {
    qrMessage.textContent = "ჯერ ჩასვი შენი საიტის ბმული.";
    return;
  }

  try {
    const parsedUrl = new URL(url);

    if (
      parsedUrl.protocol !== "https:" &&
      parsedUrl.protocol !== "http:"
    ) {
      throw new Error("არასწორი ბმული");
    }

    qrImage.hidden = true;
    qrPlaceholder.hidden = false;
    qrMessage.textContent = "QR კოდი იქმნება...";
    qrImage.onload = () => {
      qrMessage.textContent = "QR კოდი მზად არის! შეგიძლია დაასკანერო.";
    };

    qrImage.onerror = () => {
      qrImage.hidden = true;
      qrPlaceholder.hidden = false;
      qrMessage.textContent = "QR კოდი ვერ შეიქმნა. სცადე თავიდან.";
    };

  } catch (error) {
    qrMessage.textContent = "გთხოვ, შეიყვანე სწორი საიტის ბმული.";
  }
});

// მენიუს ჩატვირთვა
renderMenu();

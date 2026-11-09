// CHAVES DE ARMAZENAMENTO LOCAL (LOCALSTORAGE)
const STORAGE_KEY_PRODUCTS = "almoxarifado_products_v1";
const STORAGE_KEY_HISTORY = "almoxarifado_history_v1";

// CREDENCIAIS MOCKADAS
const MOCK_USERS = [
    {
        username: "admin",
        password: "123",
        name: "Administrador do Sistema",
        role: "ADMIN"
    },
    {
        username: "user",
        password: "123",
        name: "Usuário Comum",
        role: "COMUM"
    }
];

// DADOS DE INICIALIZAÇÃO DA APLICAÇÃO (USADOS NO PRIMEIRO ACESSO)
const DEFAULT_PRODUCTS = [
    { 
        code: "PRD001", 
        name: "Papel A4 Sulfite 75g (Pacote 500fls)", 
        category: "Escritório", 
        unit: "Pacote", 
        stock: 45, 
        minStock: 10,
        location: "Prateleira A-01",
        description: "Papel sulfite branco formato A4, resma com 500 folhas."
    },
    { 
        code: "PRD002", 
        name: "Caneta Esferográfica Azul", 
        category: "Escritório", 
        unit: "Unidade", 
        stock: 120, 
        minStock: 20,
        location: "Gaveta B-03",
        description: "Caneta esferográfica ponta média 1.0mm azul."
    },
    { 
        code: "PRD003", 
        name: "Detergente Neutro 500ml", 
        category: "Limpeza", 
        unit: "Frasco", 
        stock: 5, 
        minStock: 15,
        location: "Armário C-02",
        description: "Detergente líquido neutro para uso geral."
    },
    { 
        code: "PRD004", 
        name: "Marcador de Texto Amarelo", 
        category: "Escritório", 
        unit: "Unidade", 
        stock: 0, 
        minStock: 5,
        location: "Gaveta B-04",
        description: "Pincel marca-texto amarelo fluorescente."
    }
];

const DEFAULT_HISTORY = [
    { 
        date: "2026-10-06",
        time: "09:30",
        fullDate: "06/10/2026 09:30", 
        type: "ENTRADA", 
        product: "Papel A4 Sulfite 75g (Pacote 500fls)", 
        qty: 50, 
        user: "Administrador do Sistema" 
    },
    { 
        date: "2026-10-06",
        time: "10:15",
        fullDate: "06/10/2026 10:15", 
        type: "SAÍDA", 
        product: "Detergente Neutro 500ml", 
        qty: 10, 
        user: "Administrador do Sistema" 
    },
    { 
        date: "2026-10-06",
        time: "11:00",
        fullDate: "06/10/2026 11:00", 
        type: "SAÍDA", 
        product: "Marcador de Texto Amarelo", 
        qty: 5, 
        user: "Administrador do Sistema" 
    }
];

// ESTRUTURAS EM MEMÓRIA
let sampleProducts = [];
let sampleHistory = [];

// VARIÁVEL DE EXCLUSÃO PENDENTE
let pendingDeleteIndex = null;

// ELEMENTOS DO DOM
const globalToast = document.getElementById("global-toast");
const loginScreen = document.getElementById("login-screen");
const appScreen = document.getElementById("app-screen");
const loginForm = document.getElementById("login-form");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginError = document.getElementById("login-error");
const userDisplayName = document.getElementById("user-display-name");
const userRoleBadge = document.getElementById("user-role-badge");
const logoutBtn = document.getElementById("logout-btn");

// NAVEGAÇÃO E CONTROLES DE FILTRO DE PRODUTOS
const navButtons = document.querySelectorAll(".nav-btn");
const tabContents = document.querySelectorAll(".tab-content");
const navShortcuts = document.querySelectorAll(".nav-shortcut");

const searchProductInput = document.getElementById("search-product");
const filterCategorySelect = document.getElementById("filter-category");
const filterStatusSelect = document.getElementById("filter-status");
const sortProductsSelect = document.getElementById("sort-products");
const btnClearFilters = document.getElementById("btn-clear-filters");

// CONTROLES DE FILTRO DO HISTÓRICO
const searchHistoryInput = document.getElementById("search-history");
const filterHistoryTypeSelect = document.getElementById("filter-history-type");
const filterHistoryDateFromInput = document.getElementById("filter-history-date-from");
const filterHistoryDateToInput = document.getElementById("filter-history-date-to");
const btnClearHistoryFilters = document.getElementById("btn-clear-history-filters");

const tableProductsBody = document.getElementById("table-products-body");
const tableStockBody = document.getElementById("table-stock-body");
const tableHistoryBody = document.getElementById("table-history-body");
const tableRecentHistoryBody = document.getElementById("table-recent-history-body");

// ELEMENTOS DO DASHBOARD E ALERTAS
const statTotalProducts = document.getElementById("stat-total-products");
const statTotalItems = document.getElementById("stat-total-items");
const statLowStock = document.getElementById("stat-low-stock");
const statOutOfStock = document.getElementById("stat-out-of-stock");
const dashboardAlertsContainer = document.getElementById("dashboard-alerts-container");

// MODAL DE CADASTRO / EDIÇÃO
const productModal = document.getElementById("product-modal");
const productForm = document.getElementById("product-form");
const productModalTitle = document.getElementById("product-modal-title");
const productFormError = document.getElementById("product-form-error");
const prodEditIndexInput = document.getElementById("prod-edit-index");
const groupProdStock = document.getElementById("group-prod-stock");
const btnOpenProductModal = document.getElementById("btn-open-product-modal");
const btnShortcutAddProduct = document.getElementById("btn-shortcut-add-product");
const btnCloseProductModal = document.getElementById("btn-close-product-modal");
const btnCancelProductModal = document.getElementById("btn-cancel-product-modal");

// MODAL DE VISUALIZAÇÃO
const viewProductModal = document.getElementById("view-product-modal");
const btnCloseViewProduct = document.getElementById("btn-close-view-product");
const btnCancelViewProduct = document.getElementById("btn-cancel-view-product");

// MODAL DE CONFIRMAÇÃO
const confirmModal = document.getElementById("confirm-modal");
const confirmItemName = document.getElementById("confirm-item-name");
const btnCloseConfirmModal = document.getElementById("btn-close-confirm-modal");
const btnCancelConfirm = document.getElementById("btn-cancel-confirm");
const btnAcceptConfirm = document.getElementById("btn-accept-confirm");

// MODAIS DE MOVIMENTAÇÃO DE ESTOQUE
const btnOpenEntryModal = document.getElementById("btn-open-entry-modal");
const btnShortcutEntry = document.getElementById("btn-shortcut-entry");
const entryModal = document.getElementById("entry-modal");
const entryForm = document.getElementById("entry-form");
const entryProductSelect = document.getElementById("entry-product-select");
const entryQtyInput = document.getElementById("entry-qty");
const entryFormError = document.getElementById("entry-form-error");
const entryFormSuccess = document.getElementById("entry-form-success");
const btnCloseEntryModal = document.getElementById("btn-close-entry-modal");
const btnCancelEntry = document.getElementById("btn-cancel-entry");

const btnOpenExitModal = document.getElementById("btn-open-exit-modal");
const btnShortcutExit = document.getElementById("btn-shortcut-exit");
const exitModal = document.getElementById("exit-modal");
const exitForm = document.getElementById("exit-form");
const exitProductSelect = document.getElementById("exit-product-select");
const exitQtyInput = document.getElementById("exit-qty");
const exitStockAvailable = document.getElementById("exit-stock-available");
const exitFormError = document.getElementById("exit-form-error");
const exitFormSuccess = document.getElementById("exit-form-success");
const btnCloseExitModal = document.getElementById("btn-close-exit-modal");
const btnCancelExit = document.getElementById("btn-cancel-exit");

// INICIALIZAÇÃO DA APLICAÇÃO
document.addEventListener("DOMContentLoaded", () => {
    loadDataFromStorage();
    checkAuthentication();
    loginForm.addEventListener("submit", handleLogin);
    logoutBtn.addEventListener("click", handleLogout);
    setupNavigation();
    setupProductModalEvents();
    setupViewModalEvents();
    setupConfirmModalEvents();
    setupStockMovementEvents();
    setupFilterEvents();
    setupHistoryFilterEvents();
});

// SISTEMA DE NOTIFICAÇÃO TOAST
function showToast(message, type = "success") {
    if (!globalToast) return;
    globalToast.textContent = message;
    globalToast.className = `toast toast-${type}`;
    globalToast.classList.remove("hidden");

    setTimeout(() => {
        globalToast.classList.add("hidden");
    }, 3000);
}

// PERSISTÊNCIA VIA LOCALSTORAGE
function loadDataFromStorage() {
    const storedProducts = localStorage.getItem(STORAGE_KEY_PRODUCTS);
    if (storedProducts) {
        try {
            sampleProducts = JSON.parse(storedProducts);
        } catch (e) {
            sampleProducts = DEFAULT_PRODUCTS.slice();
            saveProductsToStorage();
        }
    } else {
        sampleProducts = DEFAULT_PRODUCTS.slice();
        saveProductsToStorage();
    }

    const storedHistory = localStorage.getItem(STORAGE_KEY_HISTORY);
    if (storedHistory) {
        try {
            sampleHistory = JSON.parse(storedHistory);
        } catch (e) {
            sampleHistory = DEFAULT_HISTORY.slice();
            saveHistoryToStorage();
        }
    } else {
        sampleHistory = DEFAULT_HISTORY.slice();
        saveHistoryToStorage();
    }
}

function saveProductsToStorage() {
    localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(sampleProducts));
}

function saveHistoryToStorage() {
    localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(sampleHistory));
}

// LÓGICA DE SITUAÇÃO DO ESTOQUE
function getProductStockStatusInfo(p) {
    if (p.stock === 0) {
        return {
            key: "ZERO",
            label: "Sem Estoque",
            fullLabel: "Sem Estoque (Crítico)",
            badgeClass: "badge badge-danger-alert",
            textClass: "status-zero"
        };
    } else if (p.stock <= p.minStock) {
        return {
            key: "LOW",
            label: "Estoque Baixo",
            fullLabel: "Estoque Baixo (Reposição Necessária)",
            badgeClass: "badge badge-warning-alert",
            textClass: "status-low"
        };
    } else {
        return {
            key: "NORMAL",
            label: "Normal",
            fullLabel: "Estoque Adequado",
            badgeClass: "badge badge-success-alert",
            textClass: "status-ok"
        };
    }
}

// FILTROS DE PRODUTOS
function setupFilterEvents() {
    if (searchProductInput) searchProductInput.addEventListener("input", applyProductFiltersAndSort);
    if (filterCategorySelect) filterCategorySelect.addEventListener("change", applyProductFiltersAndSort);
    if (filterStatusSelect) filterStatusSelect.addEventListener("change", applyProductFiltersAndSort);
    if (sortProductsSelect) sortProductsSelect.addEventListener("change", applyProductFiltersAndSort);
    if (btnClearFilters) btnClearFilters.addEventListener("click", resetProductFilters);
}

function resetProductFilters() {
    if (searchProductInput) searchProductInput.value = "";
    if (filterCategorySelect) filterCategorySelect.value = "";
    if (filterStatusSelect) filterStatusSelect.value = "";
    if (sortProductsSelect) sortProductsSelect.value = "name-asc";
    applyProductFiltersAndSort();
}

function populateCategoryFilter() {
    if (!filterCategorySelect) return;
    const currentSelected = filterCategorySelect.value;
    
    const categories = [...new Set(sampleProducts.map((p) => p.category))].sort();

    filterCategorySelect.innerHTML = `<option value="">Todas as Categorias</option>` +
        categories.map((cat) => `<option value="${cat}">${cat}</option>`).join("");

    filterCategorySelect.value = currentSelected;
}

function applyProductFiltersAndSort() {
    const user = getCurrentUser();
    const role = user ? user.role : "COMUM";

    const query = searchProductInput ? searchProductInput.value.toLowerCase().trim() : "";
    const category = filterCategorySelect ? filterCategorySelect.value : "";
    const status = filterStatusSelect ? filterStatusSelect.value : "";
    const sortBy = sortProductsSelect ? sortProductsSelect.value : "name-asc";

    let result = sampleProducts.slice();

    if (query) {
        result = result.filter(
            (p) => p.name.toLowerCase().includes(query) || p.code.toLowerCase().includes(query)
        );
    }

    if (category) {
        result = result.filter((p) => p.category === category);
    }

    if (status) {
        result = result.filter((p) => {
            const info = getProductStockStatusInfo(p);
            return info.key === status;
        });
    }

    result.sort((a, b) => {
        if (sortBy === "name-asc") return a.name.localeCompare(b.name);
        if (sortBy === "name-desc") return b.name.localeCompare(a.name);
        if (sortBy === "code-asc") return a.code.localeCompare(b.code);
        if (sortBy === "stock-asc") return a.stock - b.stock;
        if (sortBy === "stock-desc") return b.stock - a.stock;
        return 0;
    });

    renderFilteredProductsTable(result, role);
}

// FILTROS DO HISTÓRICO
function setupHistoryFilterEvents() {
    if (searchHistoryInput) searchHistoryInput.addEventListener("input", applyHistoryFilters);
    if (filterHistoryTypeSelect) filterHistoryTypeSelect.addEventListener("change", applyHistoryFilters);
    if (filterHistoryDateFromInput) filterHistoryDateFromInput.addEventListener("change", applyHistoryFilters);
    if (filterHistoryDateToInput) filterHistoryDateToInput.addEventListener("change", applyHistoryFilters);
    if (btnClearHistoryFilters) btnClearHistoryFilters.addEventListener("click", resetHistoryFilters);
}

function resetHistoryFilters() {
    if (searchHistoryInput) searchHistoryInput.value = "";
    if (filterHistoryTypeSelect) filterHistoryTypeSelect.value = "";
    if (filterHistoryDateFromInput) filterHistoryDateFromInput.value = "";
    if (filterHistoryDateToInput) filterHistoryDateToInput.value = "";
    applyHistoryFilters();
}

function applyHistoryFilters() {
    const query = searchHistoryInput ? searchHistoryInput.value.toLowerCase().trim() : "";
    const type = filterHistoryTypeSelect ? filterHistoryTypeSelect.value : "";
    const dateFrom = filterHistoryDateFromInput ? filterHistoryDateFromInput.value : "";
    const dateTo = filterHistoryDateToInput ? filterHistoryDateToInput.value : "";

    let result = sampleHistory.slice();

    if (query) {
        result = result.filter(
            (h) => h.product.toLowerCase().includes(query) || h.user.toLowerCase().includes(query)
        );
    }

    if (type) {
        result = result.filter((h) => h.type === type);
    }

    if (dateFrom) {
        result = result.filter((h) => h.date >= dateFrom);
    }

    if (dateTo) {
        result = result.filter((h) => h.date <= dateTo);
    }

    renderFilteredHistoryTable(result);
}

// AUTENTICAÇÃO E SESSÃO
function handleLogin(event) {
    event.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    const userFound = MOCK_USERS.find(
        (u) => u.username === username && u.password === password
    );

    if (userFound) {
        hideError();

        const sessionData = {
            username: userFound.username,
            name: userFound.name,
            role: userFound.role
        };
        sessionStorage.setItem("loggedUser", JSON.stringify(sessionData));

        loginForm.reset();
        showAppScreen(sessionData);
        showToast(`Bem-vindo, ${userFound.name}!`);
    } else {
        showError("Usuário ou senha incorretos.");
    }
}

function handleLogout() {
    sessionStorage.removeItem("loggedUser");
    showLoginScreen();
    showToast("Sessão encerrada com sucesso.", "warning");
}

function checkAuthentication() {
    const savedSession = sessionStorage.getItem("loggedUser");

    if (savedSession) {
        const user = JSON.parse(savedSession);
        showAppScreen(user);
    } else {
        showLoginScreen();
    }
}

function getCurrentUser() {
    const savedSession = sessionStorage.getItem("loggedUser");
    return savedSession ? JSON.parse(savedSession) : null;
}

// TELA PRINCIPAL E NAVEGAÇÃO
function showAppScreen(user) {
    loginScreen.classList.add("hidden");
    appScreen.classList.remove("hidden");

    userDisplayName.textContent = user.name;
    userRoleBadge.textContent = user.role === "ADMIN" ? "Administrador" : "Usuário Comum";

    if (user.role === "ADMIN") {
        userRoleBadge.className = "badge badge-admin";
    } else {
        userRoleBadge.className = "badge badge-user";
    }

    applyPermissions(user.role);
    renderAllViews(user.role);
}

function showLoginScreen() {
    appScreen.classList.add("hidden");
    loginScreen.classList.remove("hidden");
    hideError();
}

function applyPermissions(role) {
    const adminElements = document.querySelectorAll(".admin-only");

    adminElements.forEach((element) => {
        if (role === "ADMIN") {
            element.classList.remove("hidden");
        } else {
            element.classList.add("hidden");
        }
    });
}

function setupNavigation() {
    navButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const targetId = btn.getAttribute("data-target");
            switchTab(targetId);
        });
    });

    navShortcuts.forEach((btn) => {
        btn.addEventListener("click", () => {
            const targetId = btn.getAttribute("data-target");
            if (targetId) switchTab(targetId);
        });
    });
}

function switchTab(targetId) {
    navButtons.forEach((b) => {
        if (b.getAttribute("data-target") === targetId) {
            b.classList.add("active");
        } else {
            b.classList.remove("active");
        }
    });

    tabContents.forEach((tc) => tc.classList.add("hidden"));
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
        targetSection.classList.remove("hidden");
    }
}

// MODAIS - PRODUTOS
function setupProductModalEvents() {
    if (btnOpenProductModal) {
        btnOpenProductModal.addEventListener("click", () => openProductModal());
    }
    if (btnShortcutAddProduct) {
        btnShortcutAddProduct.addEventListener("click", () => {
            switchTab("section-products");
            openProductModal();
        });
    }
    if (btnCloseProductModal) {
        btnCloseProductModal.addEventListener("click", closeProductModal);
    }
    if (btnCancelProductModal) {
        btnCancelProductModal.addEventListener("click", closeProductModal);
    }
    if (productForm) {
        productForm.addEventListener("submit", handleSaveProduct);
    }
}

function openProductModal(index = -1) {
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.role !== "ADMIN") {
        showToast("Ação restrita a administradores.", "error");
        return;
    }

    hideProductFormError();
    productForm.reset();
    prodEditIndexInput.value = index;

    if (index >= 0) {
        productModalTitle.textContent = "Editar Produto";
        const prod = sampleProducts[index];

        document.getElementById("prod-code").value = prod.code;
        document.getElementById("prod-code").readOnly = true;
        document.getElementById("prod-name").value = prod.name;
        document.getElementById("prod-category").value = prod.category;
        document.getElementById("prod-unit").value = prod.unit;
        document.getElementById("prod-min-stock").value = prod.minStock;
        document.getElementById("prod-location").value = prod.location;
        document.getElementById("prod-description").value = prod.description || "";

        groupProdStock.classList.add("hidden");
        document.getElementById("prod-stock").required = false;
    } else {
        productModalTitle.textContent = "Cadastrar Novo Produto";
        document.getElementById("prod-code").readOnly = false;
        groupProdStock.classList.remove("hidden");
        document.getElementById("prod-stock").required = true;
    }

    productModal.classList.remove("hidden");
}

function closeProductModal() {
    productModal.classList.add("hidden");
    productForm.reset();
    hideProductFormError();
}

function setupViewModalEvents() {
    if (btnCloseViewProduct) btnCloseViewProduct.addEventListener("click", closeViewModal);
    if (btnCancelViewProduct) btnCancelViewProduct.addEventListener("click", closeViewModal);
}

function openViewModal(index) {
    const prod = sampleProducts[index];
    if (!prod) return;

    const statusInfo = getProductStockStatusInfo(prod);

    document.getElementById("view-prod-code").textContent = prod.code;
    document.getElementById("view-prod-name").textContent = prod.name;
    document.getElementById("view-prod-category").textContent = prod.category;
    document.getElementById("view-prod-unit").textContent = prod.unit;
    document.getElementById("view-prod-stock").textContent = `${prod.stock} ${prod.unit}`;
    document.getElementById("view-prod-min-stock").textContent = `${prod.minStock} ${prod.unit}`;
    document.getElementById("view-prod-location").textContent = prod.location;
    document.getElementById("view-prod-description").textContent = prod.description || "Nenhuma descrição informada.";

    document.getElementById("view-prod-status").innerHTML = `<span class="${statusInfo.badgeClass}">${statusInfo.fullLabel}</span>`;
    viewProductModal.classList.remove("hidden");
}

function closeViewModal() {
    viewProductModal.classList.add("hidden");
}

function setupConfirmModalEvents() {
    if (btnCloseConfirmModal) btnCloseConfirmModal.addEventListener("click", closeConfirmModal);
    if (btnCancelConfirm) btnCancelConfirm.addEventListener("click", closeConfirmModal);
    if (btnAcceptConfirm) btnAcceptConfirm.addEventListener("click", handleConfirmDelete);
}

function openDeleteModal(index) {
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.role !== "ADMIN") {
        showToast("Ação restrita a administradores.", "error");
        return;
    }

    pendingDeleteIndex = index;
    const prod = sampleProducts[index];
    if (prod) {
        confirmItemName.textContent = `${prod.name} (${prod.code})`;
        confirmModal.classList.remove("hidden");
    }
}

function closeConfirmModal() {
    confirmModal.classList.add("hidden");
    pendingDeleteIndex = null;
}

function handleConfirmDelete() {
    if (pendingDeleteIndex !== null && pendingDeleteIndex >= 0) {
        const deletedProduct = sampleProducts[pendingDeleteIndex];
        sampleProducts.splice(pendingDeleteIndex, 1);

        saveProductsToStorage();

        const currentUser = getCurrentUser();
        closeConfirmModal();
        renderAllViews(currentUser ? currentUser.role : "COMUM");
        showToast(`Produto "${deletedProduct.name}" excluído com sucesso.`);
    }
}

// MOVIMENTAÇÕES DE ESTOQUE
function setupStockMovementEvents() {
    if (btnOpenEntryModal) btnOpenEntryModal.addEventListener("click", openEntryModal);
    if (btnShortcutEntry) btnShortcutEntry.addEventListener("click", () => {
        switchTab("section-stock");
        openEntryModal();
    });
    if (btnCloseEntryModal) btnCloseEntryModal.addEventListener("click", closeEntryModal);
    if (btnCancelEntry) btnCancelEntry.addEventListener("click", closeEntryModal);
    if (entryForm) entryForm.addEventListener("submit", handleStockEntry);

    if (btnOpenExitModal) btnOpenExitModal.addEventListener("click", openExitModal);
    if (btnShortcutExit) btnShortcutExit.addEventListener("click", () => {
        switchTab("section-stock");
        openExitModal();
    });
    if (btnCloseExitModal) btnCloseExitModal.addEventListener("click", closeExitModal);
    if (btnCancelExit) btnCancelExit.addEventListener("click", closeExitModal);
    if (exitForm) exitForm.addEventListener("submit", handleStockExit);
    if (exitProductSelect) exitProductSelect.addEventListener("change", updateExitStockLabel);
}

function populateProductSelects() {
    const optionsHtml = sampleProducts.length === 0
        ? `<option value="">Nenhum produto cadastrado</option>`
        : `<option value="">-- Selecione um Produto --</option>` +
          sampleProducts.map((p, idx) => `<option value="${idx}">${p.code} - ${p.name} (Atual: ${p.stock} ${p.unit})</option>`).join("");

    if (entryProductSelect) entryProductSelect.innerHTML = optionsHtml;
    if (exitProductSelect) exitProductSelect.innerHTML = optionsHtml;
}

function openEntryModal() {
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.role !== "ADMIN") {
        showToast("Apenas administradores podem registrar entrada de estoque.", "error");
        return;
    }
    populateProductSelects();
    entryForm.reset();
    hideEntryFeedback();
    entryModal.classList.remove("hidden");
}

function closeEntryModal() {
    entryModal.classList.add("hidden");
    entryForm.reset();
    hideEntryFeedback();
}

function hideEntryFeedback() {
    entryFormError.classList.add("hidden");
    entryFormSuccess.classList.add("hidden");
}

function openExitModal() {
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.role !== "ADMIN") {
        showToast("Apenas administradores podem registrar saída de estoque.", "error");
        return;
    }
    populateProductSelects();
    exitForm.reset();
    exitStockAvailable.textContent = "Estoque disponível: -";
    hideExitFeedback();
    exitModal.classList.remove("hidden");
}

function closeExitModal() {
    exitModal.classList.add("hidden");
    exitForm.reset();
    hideExitFeedback();
}

function hideExitFeedback() {
    exitFormError.classList.add("hidden");
    exitFormSuccess.classList.add("hidden");
}

function updateExitStockLabel() {
    const selectedIdx = exitProductSelect.value;
    if (selectedIdx === "" || !sampleProducts[selectedIdx]) {
        exitStockAvailable.textContent = "Estoque disponível: -";
        return;
    }
    const prod = sampleProducts[selectedIdx];
    exitStockAvailable.textContent = `Estoque disponível: ${prod.stock} ${prod.unit}`;
}

function handleStockEntry(event) {
    event.preventDefault();
    hideEntryFeedback();

    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.role !== "ADMIN") {
        entryFormError.textContent = "Erro de permissão: Apenas ADMIN pode registrar entrada.";
        entryFormError.classList.remove("hidden");
        return;
    }

    const selectedIdx = entryProductSelect.value;
    const qtyVal = parseInt(entryQtyInput.value, 10);

    if (selectedIdx === "" || isNaN(selectedIdx)) {
        entryFormError.textContent = "Por favor, selecione um produto válido.";
        entryFormError.classList.remove("hidden");
        return;
    }

    if (isNaN(qtyVal) || qtyVal <= 0) {
        entryFormError.textContent = "A quantidade de entrada deve ser um número maior que zero.";
        entryFormError.classList.remove("hidden");
        return;
    }

    const prod = sampleProducts[selectedIdx];
    prod.stock += qtyVal;

    saveProductsToStorage();

    const now = new Date();
    const dateStr = now.toISOString().split("T")[0];
    const timeStr = now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
    const formattedDate = `${now.toLocaleDateString("pt-BR")} ${timeStr}`;

    sampleHistory.unshift({
        date: dateStr,
        time: timeStr,
        fullDate: formattedDate,
        type: "ENTRADA",
        product: prod.name,
        qty: qtyVal,
        user: currentUser.name
    });

    saveHistoryToStorage();

    renderAllViews(currentUser.role);

    entryFormSuccess.textContent = `Entrada de ${qtyVal} ${prod.unit}(s) no produto "${prod.name}" registrada com sucesso! Novo saldo: ${prod.stock}.`;
    entryFormSuccess.classList.remove("hidden");
    showToast(`Entrada efetuada! Novo estoque: ${prod.stock}`);

    setTimeout(() => {
        closeEntryModal();
    }, 1500);
}

function handleStockExit(event) {
    event.preventDefault();
    hideExitFeedback();

    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.role !== "ADMIN") {
        exitFormError.textContent = "Erro de permissão: Apenas ADMIN pode registrar saída.";
        exitFormError.classList.remove("hidden");
        return;
    }

    const selectedIdx = exitProductSelect.value;
    const qtyVal = parseInt(exitQtyInput.value, 10);

    if (selectedIdx === "" || isNaN(selectedIdx)) {
        exitFormError.textContent = "Por favor, selecione um produto válido.";
        exitFormError.classList.remove("hidden");
        return;
    }

    if (isNaN(qtyVal) || qtyVal <= 0) {
        exitFormError.textContent = "A quantidade de saída deve ser um número maior que zero.";
        exitFormError.classList.remove("hidden");
        return;
    }

    const prod = sampleProducts[selectedIdx];

    if (qtyVal > prod.stock) {
        exitFormError.textContent = `Operação recusada: A quantidade solicitada (${qtyVal}) é superior ao estoque disponível (${prod.stock} ${prod.unit}).`;
        exitFormError.classList.remove("hidden");
        showToast("Quantidade indisponível em estoque!", "error");
        return;
    }

    prod.stock -= qtyVal;

    saveProductsToStorage();

    const now = new Date();
    const dateStr = now.toISOString().split("T")[0];
    const timeStr = now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
    const formattedDate = `${now.toLocaleDateString("pt-BR")} ${timeStr}`;

    sampleHistory.unshift({
        date: dateStr,
        time: timeStr,
        fullDate: formattedDate,
        type: "SAÍDA",
        product: prod.name,
        qty: qtyVal,
        user: currentUser.name
    });

    saveHistoryToStorage();

    renderAllViews(currentUser.role);

    exitFormSuccess.textContent = `Saída de ${qtyVal} ${prod.unit}(s) do produto "${prod.name}" registrada com sucesso! Saldo restante: ${prod.stock}.`;
    exitFormSuccess.classList.remove("hidden");
    showToast(`Saída efetuada! Restante: ${prod.stock}`);

    setTimeout(() => {
        closeExitModal();
    }, 1500);
}

// SALVAR PRODUTO
function handleSaveProduct(event) {
    event.preventDefault();

    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.role !== "ADMIN") {
        showProductFormError("Sem permissão para realizar esta ação.");
        return;
    }

    const editIndex = parseInt(prodEditIndexInput.value, 10);
    const code = document.getElementById("prod-code").value.trim().toUpperCase();
    const name = document.getElementById("prod-name").value.trim();
    const category = document.getElementById("prod-category").value.trim();
    const unit = document.getElementById("prod-unit").value.trim();
    const minStockVal = document.getElementById("prod-min-stock").value;
    const location = document.getElementById("prod-location").value.trim();
    const description = document.getElementById("prod-description").value.trim();

    if (!code || !name || !category || !unit || minStockVal === "" || !location) {
        showProductFormError("Preencha todos os campos obrigatórios (*).");
        return;
    }

    const minStock = parseInt(minStockVal, 10);
    if (isNaN(minStock) || minStock < 0) {
        showProductFormError("O estoque mínimo não pode ser negativo.");
        return;
    }

    if (editIndex >= 0) {
        sampleProducts[editIndex].name = name;
        sampleProducts[editIndex].category = category;
        sampleProducts[editIndex].unit = unit;
        sampleProducts[editIndex].minStock = minStock;
        sampleProducts[editIndex].location = location;
        sampleProducts[editIndex].description = description;

        saveProductsToStorage();

        closeProductModal();
        renderAllViews(currentUser.role);
        showToast("Produto atualizado com sucesso!");
    } else {
        const stockVal = document.getElementById("prod-stock").value;
        const stock = parseInt(stockVal, 10);

        if (isNaN(stock) || stock < 0) {
            showProductFormError("A quantidade inicial não pode ser negativa.");
            return;
        }

        const codeExists = sampleProducts.some((p) => p.code === code);
        if (codeExists) {
            showProductFormError(`Já existe um produto com o código ${code}.`);
            return;
        }

        const newProduct = { code, name, category, unit, stock, minStock, location, description };
        sampleProducts.push(newProduct);

        saveProductsToStorage();

        if (stock > 0) {
            const now = new Date();
            const dateStr = now.toISOString().split("T")[0];
            const timeStr = now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
            const formattedDate = `${now.toLocaleDateString("pt-BR")} ${timeStr}`;

            sampleHistory.unshift({
                date: dateStr,
                time: timeStr,
                fullDate: formattedDate,
                type: "ENTRADA",
                product: name,
                qty: stock,
                user: currentUser.name
            });

            saveHistoryToStorage();
        }

        closeProductModal();
        renderAllViews(currentUser.role);
        showToast("Produto cadastrado com sucesso!");
    }
}

function showProductFormError(msg) {
    productFormError.textContent = msg;
    productFormError.classList.remove("hidden");
}

function hideProductFormError() {
    productFormError.textContent = "";
    productFormError.classList.add("hidden");
}

// RENDERIZAÇÃO DE INTERFACE E DADOS
function renderAllViews(role) {
    populateCategoryFilter();
    renderDashboard();
    applyProductFiltersAndSort();
    renderStockTable();
    applyHistoryFilters();
}

function renderDashboard() {
    const totalProducts = sampleProducts.length;
    const totalItems = sampleProducts.reduce((acc, p) => acc + p.stock, 0);
    const lowStockCount = sampleProducts.filter((p) => p.stock > 0 && p.stock <= p.minStock).length;
    const outOfStockCount = sampleProducts.filter((p) => p.stock === 0).length;

    if (statTotalProducts) statTotalProducts.textContent = totalProducts;
    if (statTotalItems) statTotalItems.textContent = totalItems;
    if (statLowStock) statLowStock.textContent = lowStockCount;
    if (statOutOfStock) statOutOfStock.textContent = outOfStockCount;

    renderDashboardAlerts();
    renderRecentHistoryTable();
}

function renderDashboardAlerts() {
    if (!dashboardAlertsContainer) return;

    const criticalItems = sampleProducts.filter((p) => p.stock <= p.minStock);

    if (criticalItems.length === 0) {
        dashboardAlertsContainer.innerHTML = `
            <div class="alert-item alert-item-ok">
                <span>Nenhum alerta de reposição pendente. Todos os itens estão com estoque adequado.</span>
            </div>
        `;
        return;
    }

    dashboardAlertsContainer.innerHTML = `
        <ul class="alert-list">
            ${criticalItems.map((p) => {
                const info = getProductStockStatusInfo(p);
                const isZero = p.stock === 0;
                const alertClass = isZero ? "alert-item-danger" : "alert-item-warning";

                return `
                    <li class="alert-item ${alertClass}">
                        <div>
                            <strong>[${p.code}] ${p.name}</strong> - 
                            ${isZero 
                                ? `<strong>SEM ESTOQUE (0 ${p.unit})</strong>` 
                                : `Estoque Atual: <strong>${p.stock} ${p.unit}</strong> (Mínimo: ${p.minStock} ${p.unit})`}
                        </div>
                        <span class="${info.badgeClass}">${info.label}</span>
                    </li>
                `;
            }).join("")}
        </ul>
    `;
}

function renderRecentHistoryTable() {
    if (!tableRecentHistoryBody) return;

    if (sampleHistory.length === 0) {
        tableRecentHistoryBody.innerHTML = `<tr><td colspan="5" class="table-empty">Nenhuma movimentação registrada.</td></tr>`;
        return;
    }

    const recentItems = sampleHistory.slice(0, 5);

    tableRecentHistoryBody.innerHTML = recentItems.map((h) => {
        const badgeClass = h.type === "ENTRADA" ? "status-type-entry" : "status-type-exit";

        return `
            <tr>
                <td>${h.fullDate}</td>
                <td><span class="badge ${badgeClass}">${h.type}</span></td>
                <td>${h.product}</td>
                <td><strong>${h.qty}</strong></td>
                <td>${h.user}</td>
            </tr>
        `;
    }).join("");
}

function renderFilteredProductsTable(productList, role) {
    if (!tableProductsBody) return;

    if (productList.length === 0) {
        tableProductsBody.innerHTML = `<tr><td colspan="7" class="table-empty">Nenhum produto encontrado com os critérios selecionados.</td></tr>`;
        return;
    }

    tableProductsBody.innerHTML = productList.map((p) => {
        const realIndex = sampleProducts.findIndex((orig) => orig.code === p.code);
        const statusInfo = getProductStockStatusInfo(p);

        const adminBtns = role === "ADMIN" 
            ? `<button class="btn btn-secondary btn-sm" onclick="openProductModal(${realIndex})">Editar</button>
               <button class="btn btn-danger btn-sm" onclick="openDeleteModal(${realIndex})">Excluir</button>`
            : "";

        return `
            <tr>
                <td><strong>${p.code}</strong></td>
                <td>${p.name}</td>
                <td>${p.category}</td>
                <td>${p.unit}</td>
                <td><span class="${statusInfo.badgeClass}">${statusInfo.label} (${p.stock})</span></td>
                <td>${p.location}</td>
                <td>
                    <div class="actions-cell">
                        <button class="btn btn-info btn-sm" onclick="openViewModal(${realIndex})">Ver</button>
                        ${adminBtns}
                    </div>
                </td>
            </tr>
        `;
    }).join("");
}

function renderStockTable() {
    if (!tableStockBody) return;

    if (sampleProducts.length === 0) {
        tableStockBody.innerHTML = `<tr><td colspan="5" class="table-empty">Nenhum item em estoque.</td></tr>`;
        return;
    }

    tableStockBody.innerHTML = sampleProducts.map((p) => {
        const statusInfo = getProductStockStatusInfo(p);

        return `
            <tr>
                <td><strong>${p.code}</strong></td>
                <td>${p.name}</td>
                <td><strong>${p.stock} ${p.unit}</strong></td>
                <td>${p.minStock} ${p.unit}</td>
                <td><span class="${statusInfo.badgeClass}">${statusInfo.fullLabel}</span></td>
            </tr>
        `;
    }).join("");
}

function renderFilteredHistoryTable(historyList) {
    if (!tableHistoryBody) return;

    if (historyList.length === 0) {
        tableHistoryBody.innerHTML = `<tr><td colspan="5" class="table-empty">Nenhuma movimentação encontrada com os filtros selecionados.</td></tr>`;
        return;
    }

    tableHistoryBody.innerHTML = historyList.map((h) => {
        const badgeClass = h.type === "ENTRADA" ? "status-type-entry" : "status-type-exit";

        return `
            <tr>
                <td>${h.fullDate}</td>
                <td><span class="badge ${badgeClass}">${h.type}</span></td>
                <td>${h.product}</td>
                <td><strong>${h.qty}</strong></td>
                <td>${h.user}</td>
            </tr>
        `;
    }).join("");
}

function showError(message) {
    loginError.textContent = message;
    loginError.classList.remove("hidden");
}

function hideError() {
    loginError.textContent = "";
    loginError.classList.add("hidden");
}
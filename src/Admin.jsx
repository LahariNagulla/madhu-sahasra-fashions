import { useMemo, useState } from "react";
import {
  LayoutDashboard, Package, ShoppingCart, Users, ChartNoAxesCombined,
  Settings, Search, Bell, Plus, Pencil, Trash2, Download, Menu, X,
  IndianRupee, Boxes, AlertTriangle, CheckCircle2, CalendarDays,
  ChevronDown, ArrowUpRight, LogOut
} from "lucide-react";
import "./admin.css";
import madhuSahasraLogo from "./assets/madhu-sahasra-logo.jpeg";

const seedProducts = [
  { id: 1, name: "Royal Kanchipuram Pattu", category: "Sarees", price: 12999, stock: 12, emoji: "🥻", tone: "#f0dce1" },
  { id: 2, name: "Golden Bloom Half Saree", category: "Half Sarees", price: 8999, stock: 8, emoji: "🌼", tone: "#f6e8c2" },
  { id: 3, name: "Gold Necklace Set", category: "Jewellery", price: 3299, stock: 21, emoji: "✨", tone: "#f2e5c7" },
  { id: 4, name: "Pastel Party Half Saree", category: "Half Sarees", price: 6999, stock: 3, emoji: "🌸", tone: "#f3dfe8" },
  { id: 5, name: "Emerald Soft Silk", category: "Sarees", price: 6499, stock: 0, emoji: "💚", tone: "#dce8dd" },
  { id: 6, name: "Pearl Choker Necklace", category: "Jewellery", price: 2499, stock: 15, emoji: "🤍", tone: "#eee8dc" },
  { id: 7, name: "Lavender Anarkali Dress", category: "Dresses", price: 5499, stock: 7, emoji: "👗", tone: "#e8def2" }
];

const seedOrders = [
  { id: "#MS-1048", customer: "Ananya Reddy", date: "13 Oct 2026", items: 2, total: 16298, status: "Processing" },
  { id: "#MS-1047", customer: "Priya Sharma", date: "13 Oct 2026", items: 1, total: 3299, status: "Shipped" },
  { id: "#MS-1046", customer: "Meera Rao", date: "12 Oct 2026", items: 3, total: 18497, status: "Delivered" },
  { id: "#MS-1045", customer: "Kavya Nair", date: "12 Oct 2026", items: 1, total: 8999, status: "Processing" },
  { id: "#MS-1044", customer: "Ishita Patel", date: "11 Oct 2026", items: 2, total: 5798, status: "Cancelled" }
];

const categories = ["Sarees", "Half Sarees", "Dresses", "Jewellery"];
const inr = (n) => new Intl.NumberFormat("en-IN", {
  style: "currency", currency: "INR", maximumFractionDigits: 0
}).format(n);

function Badge({ status }) {
  return <span className={"badge " + status.toLowerCase().replaceAll(" ", "-")}>{status}</span>;
}
function Stat({ icon: Icon, label, value, note, color }) {
  return <article className="stat-card">
    <div className="stat-top"><span>{label}</span><i className={color}><Icon size={19} /></i></div>
    <strong>{value}</strong><small>{note}</small>
  </article>;
}
function PageTitle({ eyebrow, title, description, action }) {
  return <div className="page-title"><div><small className="eyebrow">{eyebrow}</small><h1>{title}</h1><p>{description}</p></div>{action}</div>;
}
function OrdersTable({ orders, onStatus, compact = false }) {
  return <div className="table-scroll"><table><thead><tr>
    <th>Order</th><th>Customer</th><th>Date</th><th>Items</th><th>Total</th><th>Status</th>{!compact && <th>Update</th>}
  </tr></thead><tbody>{orders.map(o => <tr key={o.id}>
    <td className="order-number">{o.id}</td><td>{o.customer}</td><td>{o.date}</td><td>{o.items}</td>
    <td className="price">{inr(o.total)}</td><td><Badge status={o.status} /></td>
    {!compact && <td><select className="status-select" value={o.status} onChange={e => onStatus(o.id, e.target.value)}>
      <option>Processing</option><option>Shipped</option><option>Delivered</option><option>Cancelled</option>
    </select></td>}
  </tr>)}</tbody></table>{!orders.length && <div className="empty">No orders found.</div>}</div>;
}

export default function Admin({ onLogout, credentials, onChangeCredentials }) {
  const [page, setPage] = useState("Overview");
  const [mobile, setMobile] = useState(false);
  const [products, setProducts] = useState(seedProducts);
  const [orders, setOrders] = useState(seedOrders);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All categories");
  const [period, setPeriod] = useState("This month");
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState("");
  const [storeName, setStoreName] = useState("Madhu Sahasra Fashions");
  const [settingsTab, setSettingsTab] = useState("Store Profile");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPhone, setAdminPhone] = useState("");
  const [storeAddress, setStoreAddress] = useState("");
  const [lowStockLimit, setLowStockLimit] = useState("5");
  const [orderAlerts, setOrderAlerts] = useState(true);
  const [stockAlerts, setStockAlerts] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(false);
  const [compactSidebar, setCompactSidebar] = useState(false);
  const [accountUsername, setAccountUsername] = useState(credentials?.username || "adminlogin");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const notify = (message) => { setToast(message); window.setTimeout(() => setToast(""), 2600); };
  const nav = [
    ["Overview", LayoutDashboard], ["Products", Package], ["Orders", ShoppingCart],
    ["Customers", Users], ["Analytics", ChartNoAxesCombined], ["Settings", Settings]
  ];
  const visible = useMemo(() => products.filter(p =>
    (filter === "All categories" || p.category === filter) &&
    `${p.name} ${p.category}`.toLowerCase().includes(search.toLowerCase())
  ), [products, filter, search]);

  const periodOrders = useMemo(() => {
    const parseDate = (value) => {
      const [day, month, year] = value.split(" ");
      return new Date(`${month} ${day}, ${year}`);
    };
    const now = new Date(2026, 9, 13);
    return orders.filter(order => {
      const d = parseDate(order.date);
      if (period === "Last 7 days") return (now - d) / 86400000 < 7 && d <= now;
      if (period === "Last 30 days") return (now - d) / 86400000 < 30 && d <= now;
      if (period === "This year") return d.getFullYear() === now.getFullYear();
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    });
  }, [orders, period]);

  const completedOrders = periodOrders.filter(o => o.status !== "Cancelled");
  const salesTotal = completedOrders.reduce((sum, o) => sum + o.total, 0);
  const orderCount = periodOrders.length;
  const salesByCategory = categories.map(category => ({
    category, count: products.filter(p => p.category === category).length
  }));
  const maxCategory = Math.max(1, ...salesByCategory.map(c => c.count));

  function saveProduct(e) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const item = {
      id: modal?.id || Date.now(), name: f.get("name"), category: f.get("category"),
      price: Number(f.get("price")), stock: Number(f.get("stock")),
      emoji: f.get("emoji"), tone: modal?.tone || "#f0dce1"
    };
    setProducts(old => modal?.id ? old.map(p => p.id === item.id ? item : p) : [item, ...old]);
    setModal(null); notify("Product saved in this demo session");
  }
  function removeProduct(product) {
    if (window.confirm(`Delete ${product.name}?`)) {
      setProducts(old => old.filter(p => p.id !== product.id));
      notify("Product removed from this demo session");
    }
  }
  function exportCsv() {
    const csv = [["Order", "Customer", "Date", "Items", "Total INR", "Status"],
      ...orders.map(o => [o.id, o.customer, o.date, o.items, o.total, o.status])]
      .map(row => row.join(",")).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = "madhu-sahasra-demo-orders.csv"; a.click(); URL.revokeObjectURL(a.href);
  }
  const goTo = (name) => { setPage(name); setSearch(""); setMobile(false); };

  return <div className="aar-admin">
    {mobile && <button className="admin-scrim" onClick={() => setMobile(false)} aria-label="Close menu" />}
    <aside className={"admin-sidebar " + (mobile ? "open" : "")}>
      <a className="admin-brand" href="#admin" onClick={e => { e.preventDefault(); goTo("Overview"); }}>
        <img src={madhuSahasraLogo} alt="Madhu Sahasra Fashions" className="brand-logo" />
        <span><b>MADHU SAHASRA</b><small>FASHIONS · SAREES · DRESSES</small></span>
      </a>
      <div className="store-chip"><span className="store-monogram">MS</span><div><b>Madhu Sahasra</b><small>Store workspace</small></div><ChevronDown size={15} /></div>
      <small className="nav-caption">WORKSPACE</small>
      <nav className="admin-navigation">{nav.slice(0, 5).map(([name, Icon]) =>
        <button key={name} className={"admin-nav " + (page === name ? "selected" : "")} onClick={() => goTo(name)}>
          <Icon size={18} />{name}{name === "Orders" && <i>{orders.length}</i>}
        </button>)}</nav>
      <small className="nav-caption preferences">PREFERENCES</small>
      <button className={"admin-nav " + (page === "Settings" ? "selected" : "")} onClick={() => goTo("Settings")}><Settings size={18} />Settings</button>
      <div className="sidebar-bottom">
        <div className="sidebar-note"><span className="note-star">✦</span><b>Thoughtfully made. Beautifully managed.</b><p>Store dashboard · Demo mode</p></div>
        <div className="admin-user"><span>MS</span><div><b>Store Admin</b><small>Administrator</small></div></div>
        <button type="button" className="admin-sidebar-logout" onClick={() => { if (onLogout) onLogout(); else window.location.href = "/admin"; }}>
          <LogOut size={17} /> <span>Logout</span>
        </button>
      </div>
    </aside>

    <main className="admin-main">
      <header className="admin-topbar">
        <button className="mobile-menu" onClick={() => setMobile(true)} aria-label="Open menu"><Menu /></button>
        <div className="crumb"><span>Workspace</span><b>{page}</b></div>
        <div className="top-actions">
          <label className="searchbox"><Search size={16} /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products, orders..." /></label>
          <button className="bell" onClick={() => notify("You're all caught up")} aria-label="Notifications"><Bell size={18} /><i /></button>
          <span className="avatar">A</span><div className="admin-username"><b>Admin</b><small>Store Administrator</small></div>
          <button type="button" className="admin-logout-button" onClick={() => { if (onLogout) onLogout(); else window.location.href = "/admin"; }}><LogOut size={16} /> <span>Logout</span></button>
        </div>
      </header>

      <div className="admin-content">
        {page === "Overview" && <>
          <div className="welcome">
            <div><small className="eyebrow">{new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).toUpperCase()}</small><h1>Good morning <em>✦</em></h1><p>Your store at a glance. Here’s what needs your attention.</p></div>
            <label className="period-picker"><CalendarDays size={17} /><select value={period} onChange={e => setPeriod(e.target.value)} aria-label="Select sales period"><option>This month</option><option>Last 7 days</option><option>Last 30 days</option><option>This year</option></select><ChevronDown size={15} /></label>
          </div>
          <div className="demo-banner"><span>i</span><p><b>Demo dashboard</b> — sales and orders below are sample data, not live store transactions.</p></div>
          <section className="stats">
            <Stat icon={IndianRupee} label="Sales in selected period" value={inr(salesTotal)} note={`${periodOrders.length} sample orders in period`} color="gold" />
            <Stat icon={ShoppingCart} label="Orders in selected period" value={String(orderCount).padStart(2, "0")} note="Based on sample orders" color="rose" />
            <Stat icon={Package} label="Products" value={String(products.length).padStart(2, "0")} note="In catalogue" color="green" />
            <Stat icon={Boxes} label="Low stock items" value={String(products.filter(p => p.stock < 5).length).padStart(2, "0")} note="Need attention" color="orange" />
          </section>
          <section className="overview-grid">
            <div className="panel sales-panel">
              <div className="panel-head"><div><h2>Sales overview</h2><p>Revenue from available sample orders</p></div><span className="period-label">{period}</span></div>
              <div className="sales-number">{inr(salesTotal)} <span><ArrowUpRight size={15} /> Sample total</span><small>Cancelled orders excluded</small></div>
              <div className="chart">
                <div className="y-labels"><span>{inr(Math.max(1000, salesTotal))}</span><span>{inr(Math.round(salesTotal * .66))}</span><span>{inr(Math.round(salesTotal * .33))}</span><span>₹0</span></div>
                <div className="chart-inner"><div className="gridlines"><i /><i /><i /><i /></div>
                  <svg viewBox="0 0 100 100" preserveAspectRatio="none" role="img" aria-label="Illustrative sales trend">
                    <defs><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#b99a5a" stopOpacity=".3" /><stop offset="1" stopColor="#b99a5a" stopOpacity="0" /></linearGradient></defs>
                    <polygon points={salesTotal ? "0,85 20,64 40,73 60,38 80,52 100,25 100,100 0,100" : "0,100 100,100"} fill="url(#area)" />
                    <polyline points={salesTotal ? "0,85 20,64 40,73 60,38 80,52 100,25" : "0,98 100,98"} fill="none" stroke="#9c7540" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                  </svg><div className="x-labels"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div>
                </div>
              </div>
            </div>
            <div className="panel category-panel">
              <div className="panel-head"><div><h2>Category mix</h2><p>Products in your catalogue</p></div></div>
              <div className="category-bars">{salesByCategory.map((c, i) => <div className="category-row" key={c.category}>
                <div className="category-row-head"><span><i className={`category-dot dot${i}`} />{c.category}</span><b>{c.count}</b></div>
                <div className="category-track"><i style={{ width: `${(c.count / maxCategory) * 100}%` }} /></div>
              </div>)}</div>
              <p className="category-footnote">{products.length} products across {categories.length} categories</p>
            </div>
          </section>
          <section className="panel orders-panel"><div className="panel-head"><div><h2>Recent orders</h2><p>Latest activity in the sample order list</p></div><button className="text-button" onClick={() => goTo("Orders")}>View all orders <ArrowUpRight size={15} /></button></div>
            <OrdersTable orders={orders.slice(0, 4)} compact />
          </section>
          <section className="panel inventory-panel"><div className="panel-head"><div><h2>Inventory to watch</h2><p>Products that may need restocking</p></div><button className="text-button" onClick={() => goTo("Products")}>Manage inventory <ArrowUpRight size={15} /></button></div>
            {products.filter(p => p.stock < 5).map(p => <div className="inventory-row" key={p.id}><span className="product-emoji" style={{ background: p.tone }}>{p.emoji}</span><div className="inventory-name"><b>{p.name}</b><small>{p.category}</small></div><div className="stock-meter"><i><span style={{ width: Math.min(100, p.stock * 20) + "%" }} /></i><small>{p.stock} units left</small></div><Badge status={p.stock === 0 ? "Out of stock" : "Low stock"} /></div>)}
          </section>
        </>}

        {page === "Products" && <>
          <PageTitle eyebrow="CATALOGUE MANAGEMENT" title="Products" description="Manage sarees, half sarees, dresses and jewellery." action={<button className="primary-button" onClick={() => setModal({})}><Plus size={16} /> Add product</button>} />
          <section className="panel table-panel"><div className="table-toolbar"><select value={filter} onChange={e => setFilter(e.target.value)}><option>All categories</option>{categories.map(c => <option key={c}>{c}</option>)}</select><span>{visible.length} products</span></div>
            <div className="table-scroll"><table><thead><tr><th>Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Status</th><th>Actions</th></tr></thead><tbody>{visible.map(p => <tr key={p.id}><td><div className="product-cell"><span className="product-emoji" style={{ background: p.tone }}>{p.emoji}</span><div><b>{p.name}</b><small>MS-{String(p.id).slice(-4)}</small></div></div></td><td>{p.category}</td><td className="price">{inr(p.price)}</td><td className={p.stock < 5 ? "stock-warning" : ""}>{p.stock}</td><td><Badge status={p.stock === 0 ? "Out of stock" : p.stock < 5 ? "Low stock" : "Active"} /></td><td><button className="tiny-action" title="Edit" onClick={() => setModal(p)}><Pencil size={15} /></button><button className="tiny-action delete" title="Delete" onClick={() => removeProduct(p)}><Trash2 size={15} /></button></td></tr>)}</tbody></table>{!visible.length && <div className="empty">No products found.</div>}</div>
          </section>
        </>}

        {page === "Orders" && <><PageTitle eyebrow="ORDER MANAGEMENT" title="Orders" description="Review purchases and update order statuses." action={<button className="soft-button" onClick={exportCsv}><Download size={16} /> Export CSV</button>} /><section className="panel table-panel"><div className="table-toolbar"><span>{orders.length} sample orders</span><span>Demo mode</span></div><OrdersTable orders={orders.filter(o => `${o.id} ${o.customer}`.toLowerCase().includes(search.toLowerCase()))} onStatus={(id, status) => setOrders(old => old.map(o => o.id === id ? { ...o, status } : o))} /></section></>}

        {page === "Customers" && <><PageTitle eyebrow="CUSTOMER RELATIONSHIPS" title="Customers" description="A sample overview of shoppers and their purchase history." /><section className="panel table-panel"><div className="table-scroll"><table><thead><tr><th>Customer</th><th>Email</th><th>Orders</th><th>Lifetime spend</th></tr></thead><tbody>{[["Ananya Reddy", "ananya@example.com", 4, 28490], ["Priya Sharma", "priya@example.com", 2, 11200], ["Meera Rao", "meera@example.com", 6, 42680], ["Kavya Nair", "kavya@example.com", 1, 8999]].filter(c => (c[0] + c[1]).toLowerCase().includes(search.toLowerCase())).map(c => <tr key={c[1]}><td><b>{c[0]}</b></td><td>{c[1]}</td><td>{c[2]}</td><td className="price">{inr(c[3])}</td></tr>)}</tbody></table></div></section></>}

        {page === "Analytics" && <><PageTitle eyebrow="STORE PERFORMANCE" title="Analytics" description="A clear view of the available sample order metrics." action={<label className="period-picker"><CalendarDays size={17} /><select value={period} onChange={e => setPeriod(e.target.value)}><option>This month</option><option>Last 7 days</option><option>Last 30 days</option><option>This year</option></select><ChevronDown size={15} /></label>} /><div className="demo-banner"><span>i</span><p><b>Sample analytics</b> — connect your database to see live sales and customer activity.</p></div><section className="stats"><Stat icon={IndianRupee} label="Revenue (sample)" value={inr(salesTotal)} note={period} color="gold" /><Stat icon={ShoppingCart} label="Orders" value={String(orderCount)} note="Selected period" color="rose" /><Stat icon={Users} label="Customers listed" value="4" note="Sample records" color="green" /><Stat icon={Boxes} label="Products" value={String(products.length)} note="In catalogue" color="orange" /></section><section className="panel sales-panel analytics-panel"><h2>Revenue trend</h2><p>Totals are calculated from the sample orders available in this dashboard.</p><div className="large-chart"><svg viewBox="0 0 100 100" preserveAspectRatio="none"><polyline points="0,80 15,63 30,72 45,40 60,52 75,25 100,35" fill="none" stroke="#9c7540" strokeWidth="2" vectorEffect="non-scaling-stroke" /></svg></div></section></>}

        {page === "Settings" && <>
          <PageTitle
            eyebrow="STORE CONTROL CENTER"
            title="Settings"
            description="Personalize your store, manage preferences, and review system configuration."
          />

          <div className="settings-layout">
            <aside className="settings-nav panel">
              <div className="settings-nav-heading">PREFERENCES</div>
              {[
                ["Store Profile", "Store details and contact information", "◇"],
                ["Account & Security", "Administrator account", "♙"],
                ["Notifications", "Alerts and updates", "♧"],
                ["Inventory & Orders", "Stock and order preferences", "▦"],
                ["Appearance", "Dashboard display", "◐"],
                ["System Status", "Connections and integrations", "⌘"]
              ].map(([name, description, symbol]) => (
                <button
                  type="button"
                  key={name}
                  className={`settings-nav-item ${settingsTab === name ? "active" : ""}`}
                  onClick={() => setSettingsTab(name)}
                >
                  <span className="settings-nav-icon">{symbol}</span>
                  <span className="settings-nav-copy">
                    <b>{name}</b>
                    <small>{description}</small>
                  </span>
                  <span className="settings-chevron">›</span>
                </button>
              ))}
            </aside>

            <div className="settings-main">
              {settingsTab === "Store Profile" && (
                <section className="panel settings-card">
                  <div className="settings-section-heading">
                    <div>
                      <span className="eyebrow">YOUR BUSINESS</span>
                      <h2>Store profile</h2>
                      <p>Manage the information displayed for your store.</p>
                    </div>
                    <span className="settings-symbol">◇</span>
                  </div>

                  <div className="settings-brand-preview">
                    <img src={madhuSahasraLogo} alt="Madhu Sahasra Fashions" />
                    <div><b>{storeName}</b><small>Store identity</small></div>
                  </div>

                  <label>
                    Store name
                    <input value={storeName} onChange={e => setStoreName(e.target.value)} />
                  </label>
                  <div className="settings-form-grid">
                    <label>
                      Contact email
                      <input type="email" value={adminEmail} onChange={e => setAdminEmail(e.target.value)} placeholder="store@example.com" />
                    </label>
                    <label>
                      Contact phone
                      <input value={adminPhone} onChange={e => setAdminPhone(e.target.value)} placeholder="Enter business phone" />
                    </label>
                  </div>
                  <label>
                    Business address
                    <textarea value={storeAddress} onChange={e => setStoreAddress(e.target.value)} placeholder="Enter your business address" rows={3} />
                  </label>
                  <label>
                    Store currency
                    <select defaultValue="INR">
                      <option value="INR">INR — Indian Rupee (₹)</option>
                    </select>
                  </label>
                  <div className="settings-actions">
                    <button type="button" className="primary-button" onClick={() => notify("Profile updated for this demo session")}>Save store profile</button>
                  </div>
                </section>
              )}

              {settingsTab === "Account & Security" && (
                <section className="panel settings-card">
                  <div className="settings-section-heading">
                    <div>
                      <span className="eyebrow">PROTECT YOUR ACCOUNT</span>
                      <h2>Account &amp; security</h2>
                      <p>Change the username and password used for this demo login.</p>
                    </div>
                    <span className="settings-symbol">♙</span>
                  </div>
                  <div className="settings-info">
                    <b>Administrator account</b>
                    <span>Changes apply to this running app session.</span>
                    <small>This demo login is stored in frontend state, not a secure authentication service.</small>
                  </div>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    if (!credentials || !onChangeCredentials) {
                      notify("Account update is unavailable.");
                      return;
                    }
                    if (currentPassword !== credentials.password) {
                      notify("Current password is incorrect.");
                      return;
                    }
                    if (newPassword.length < 8) {
                      notify("New password must be at least 8 characters.");
                      return;
                    }
                    if (newPassword !== confirmPassword) {
                      notify("New passwords do not match.");
                      return;
                    }
                    if (!accountUsername.trim()) {
                      notify("Username cannot be empty.");
                      return;
                    }
                    onChangeCredentials({ username: accountUsername.trim(), password: newPassword });
                    setCurrentPassword("");
                    setNewPassword("");
                    setConfirmPassword("");
                    notify("Username and password changed for this session. Use the new credentials next time you log in.");
                  }}>
                    <label>
                      Username
                      <input value={accountUsername} onChange={e => setAccountUsername(e.target.value)} autoComplete="username" required />
                    </label>
                    <div className="settings-divider" />
                    <h3>Change password</h3>
                    <label>
                      Current password
                      <input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} autoComplete="current-password" required />
                    </label>
                    <label>
                      New password
                      <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} autoComplete="new-password" minLength={8} placeholder="At least 8 characters" required />
                    </label>
                    <label>
                      Confirm new password
                      <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} autoComplete="new-password" minLength={8} placeholder="Re-enter new password" required />
                    </label>
                    <div className="settings-warning">Demo mode: changes work only while this app remains open. Connect a secure authentication backend for permanent and production-safe changes.</div>
                    <div className="settings-actions">
                      <button className="primary-button" type="submit">Save account changes</button>
                    </div>
                  </form>
                </section>
              )}

              {settingsTab === "Notifications" && (
                <section className="panel settings-card">
                  <div className="settings-section-heading">
                    <div>
                      <span className="eyebrow">STAY INFORMED</span>
                      <h2>Notifications</h2>
                      <p>Choose which alerts you want enabled in the dashboard.</p>
                    </div>
                    <span className="settings-symbol">♧</span>
                  </div>
                  {[
                    ["Order updates", "Receive alerts about order activity.", orderAlerts, setOrderAlerts],
                    ["Low-stock alerts", "Highlight products that need restocking.", stockAlerts, setStockAlerts],
                    ["Email notifications", "Email alerts require backend integration.", emailAlerts, setEmailAlerts]
                  ].map(([title, description, enabled, setter]) => (
                    <div className="settings-toggle-row" key={title}>
                      <div><b>{title}</b><small>{description}</small></div>
                      <button type="button" role="switch" aria-checked={enabled} className={`settings-switch ${enabled ? "on" : ""}`} onClick={() => setter(!enabled)}><span /></button>
                    </div>
                  ))}
                  <div className="settings-warning">These preferences apply in this session only. Actual email and order alerts need backend integration.</div>
                  <div className="settings-actions">
                    <button type="button" className="primary-button" onClick={() => notify("Notification preferences updated for this session")}>Save notification preferences</button>
                  </div>
                </section>
              )}

              {settingsTab === "Inventory & Orders" && (
                <section className="panel settings-card">
                  <div className="settings-section-heading">
                    <div>
                      <span className="eyebrow">OPERATIONS</span>
                      <h2>Inventory &amp; orders</h2>
                      <p>Configure the stock threshold used by your dashboard.</p>
                    </div>
                    <span className="settings-symbol">▦</span>
                  </div>
                  <label>
                    Low-stock threshold
                    <input type="number" min="0" value={lowStockLimit} onChange={e => setLowStockLimit(e.target.value)} />
                    <small className="settings-help">Chosen threshold: {lowStockLimit || "0"} units. This setting is not yet persisted or connected to the inventory calculations.</small>
                  </label>
                  <div className="settings-info">
                    <b>Order management</b>
                    <small>Order statuses can currently be changed from the Orders page. Payment processing and fulfilment integrations are not connected.</small>
                  </div>
                  <div className="settings-actions">
                    <button type="button" className="primary-button" onClick={() => notify("Inventory preference updated for this session")}>Save inventory settings</button>
                  </div>
                </section>
              )}

              {settingsTab === "Appearance" && (
                <section className="panel settings-card">
                  <div className="settings-section-heading">
                    <div>
                      <span className="eyebrow">YOUR WORKSPACE</span>
                      <h2>Appearance</h2>
                      <p>Manage the dashboard display preferences.</p>
                    </div>
                    <span className="settings-symbol">◐</span>
                  </div>
                  <div className="settings-theme-preview">
                    <span className="theme-swatch emerald" />
                    <span className="theme-swatch gold" />
                    <span className="theme-swatch ivory" />
                    <div><b>Madhu Sahasra</b><small>Emerald, champagne and warm ivory</small></div>
                  </div>
                  <div className="settings-toggle-row">
                    <div><b>Compact sidebar preference</b><small>Remember this display preference for the current session.</small></div>
                    <button type="button" role="switch" aria-checked={compactSidebar} className={`settings-switch ${compactSidebar ? "on" : ""}`} onClick={() => setCompactSidebar(!compactSidebar)}><span /></button>
                  </div>
                  <div className="settings-info">
                    <b>Current theme</b>
                    <span>Emerald green · Champagne gold · Warm ivory</span>
                  </div>
                  <div className="settings-actions">
                    <button type="button" className="primary-button" onClick={() => notify("Appearance preference updated for this session")}>Save appearance</button>
                  </div>
                </section>
              )}

              {settingsTab === "System Status" && (
                <section className="panel settings-card">
                  <div className="settings-section-heading">
                    <div>
                      <span className="eyebrow">SYSTEM OVERVIEW</span>
                      <h2>System status</h2>
                      <p>Review current setup and integration readiness.</p>
                    </div>
                    <span className="settings-symbol">⌘</span>
                  </div>
                  {[
                    ["Admin dashboard", "Interface available", true],
                    ["Product catalogue", "Currently using sample data", false],
                    ["Admin authentication", "Not connected in this component", false],
                    ["Database connection", "Not verified in this component", false],
                    ["Customer storefront sync", "Not connected in this component", false]
                  ].map(([title, detail, ready]) => (
                    <div className="settings-status-row" key={title}>
                      <span className={`settings-status-dot ${ready ? "ready" : ""}`} />
                      <div><b>{title}</b><small>{detail}</small></div>
                      <span className={`settings-status-label ${ready ? "ready" : ""}`}>{ready ? "Ready" : "Setup needed"}</span>
                    </div>
                  ))}
                  <div className="settings-warning">Connect and verify your backend before relying on live order, inventory, security, or sales information.</div>
                </section>
              )}
            </div>
          </div>
        </>}
        <footer className="admin-footer">
          <span>© 2026 {storeName}</span>
          <span>Demo dashboard · Local sample data</span>
          <span>Made with care ✦</span>
        </footer>
      </div>
    </main>

    {toast && <div className="admin-toast"><CheckCircle2 size={17} />{toast}</div>}
    {modal && <div className="modal-backdrop" onMouseDown={e => e.target === e.currentTarget && setModal(null)}><form className="product-modal" onSubmit={saveProduct}>
      <div className="modal-head"><div><small className="eyebrow">PRODUCT CATALOGUE</small><h2>{modal.id ? "Edit product" : "Add a product"}</h2></div><button type="button" className="close-modal" onClick={() => setModal(null)}><X /></button></div>
      <label>Product name<input name="name" required defaultValue={modal.name || ""} placeholder="e.g. Rose Gold Silk Saree" /></label>
      <div className="modal-fields"><label>Category<select name="category" defaultValue={modal.category || "Sarees"}>{categories.map(c => <option key={c}>{c}</option>)}</select></label><label>Icon<select name="emoji" defaultValue={modal.emoji || "🥻"}>{["🥻", "🌸", "✨", "💚", "🤍", "🌼", "👗"].map(e => <option key={e}>{e}</option>)}</select></label><label>Price (₹)<input name="price" type="number" min="0" required defaultValue={modal.price ?? ""} /></label><label>Stock quantity<input name="stock" type="number" min="0" required defaultValue={modal.stock ?? ""} /></label></div>
      <div className="demo-notice">Demo mode: changes remain in this browser session and are not synced to the customer storefront.</div><div className="modal-actions"><button className="soft-button" type="button" onClick={() => setModal(null)}>Cancel</button><button className="primary-button" type="submit">Save product</button></div>
    </form></div>}
  </div>;
}

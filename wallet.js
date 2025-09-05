// wallet.js
let provider, signer, userAddress;

// ✅ Connect Wallet
async function connectWallet() {
  if (!window.ethereum) {
    alert("Please install MetaMask or OKX Wallet!");
    return;
  }

  provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  signer = provider.getSigner();
  userAddress = await signer.getAddress();

  // Save in localStorage so other pages know
  localStorage.setItem("wallet", userAddress);

  updateWalletUI();
  return userAddress;
}

// ✅ Disconnect Wallet
function disconnectWallet() {
  localStorage.removeItem("wallet");
  userAddress = null;
  updateWalletUI();
  // Send player back home
  window.location.href = "/home";
}

// ✅ Update Navbar Button / Dropdown
function updateWalletUI() {
  const btn = document.getElementById("connectWalletBtn");
  if (!btn) return;

  const wallet = localStorage.getItem("wallet");
  if (wallet) {
    btn.textContent = "✅ " + wallet.slice(0, 6) + "..." + wallet.slice(-4);
    btn.onclick = () =>
      document.getElementById("walletContainer").classList.toggle("active");
  } else {
    btn.textContent = "🔌 Connect Wallet";
    btn.onclick = connectWallet;
  }
}

// ✅ When page loads
document.addEventListener("DOMContentLoaded", () => {
  userAddress = localStorage.getItem("wallet") || null;
  updateWalletUI();

  const disconnectBtn = document.getElementById("disconnectBtn");
  if (disconnectBtn) disconnectBtn.onclick = disconnectWallet;
});

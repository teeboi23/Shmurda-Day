let activePin = "";
const modal = document.getElementById("airtimeModal");
const copyBtn = document.getElementById("copyBtn");

function openClaimModal(networkName, pinCode) {
  activePin = pinCode;
  document.getElementById("modalNetworkTitle").innerText = networkName + " Airtime Pin";
  document.getElementById("airtimePinText").innerText = pinCode;
  copyBtn.innerText = "Copy Pin";
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeClaimModal() {
  modal.style.display = "none";
  document.body.style.overflow = "";
}

function showCopied() {
  copyBtn.innerText = "Copied! ✅";
  setTimeout(() => (copyBtn.innerText = "Copy Pin"), 2000);
}

function fallbackCopy(text) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  try {
    document.execCommand("copy");
    showCopied();
  } catch (e) {
    copyBtn.innerText = "Copy failed, hold the pin to copy";
  }
  document.body.removeChild(ta);
}

function copyPin() {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(activePin).then(showCopied).catch(() => fallbackCopy(activePin));
  } else {
    fallbackCopy(activePin);
  }
}

modal.addEventListener("click", (e) => {
  if (e.target === modal) closeClaimModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeClaimModal();
});
const pinEl = document.getElementById("airtimePinText");

// Shrinks the font until the pin fits in at most 2 lines, however long it is
function fitPinText() {
  let size = 20.8;                 // 1.3rem in px
  pinEl.style.fontSize = size + "px";
  const lineHeight = () => parseFloat(getComputedStyle(pinEl).lineHeight);
  while (size > 11 && pinEl.scrollHeight > lineHeight() * 2.1) {
    size -= 1;
    pinEl.style.fontSize = size + "px";
  }
}

// Open the modal from any button that has data-pin
document.querySelectorAll("[data-pin]").forEach((btn) => {
  btn.addEventListener("click", () => {
    openClaimModal(btn.dataset.network, btn.dataset.pin);
  });
});
function hitungTrading() {
    const modal = parseFloat(document.getElementById('modal').value);
    const risiko = parseFloat(document.getElementById('risiko').value);
    const hargaBeli = parseFloat(document.getElementById('hargaBeli').value);
    const atr = parseFloat(document.getElementById('atr').value);
    const riskReward = parseInt(document.getElementById('riskReward').value, 10);
    const hasilDiv = document.getElementById('hasil');

    if (
        !Number.isFinite(modal) ||
        !Number.isFinite(hargaBeli) ||
        !Number.isFinite(atr) ||
        modal <= 0 ||
        hargaBeli <= 0 ||
        atr <= 0
    ) {
        hasilDiv.innerHTML = '<p class="error">Modal, harga beli, dan ATR harus diisi dengan angka yang lebih besar dari nol.</p>';
        return;
    }

    // --- 1. Perhitungan Batas Risiko ---
    const nilaiRisikoMaksimal = modal * risiko;

    // --- 2. Perhitungan Jarak SL (2 x ATR) ---
    const jarakSLFloat = atr * 2;
    const jarakSL = Math.ceil(jarakSLFloat); // Bulatkan ke atas karena harga bergerak dalam Rupiah penuh

    // --- 3. Perhitungan Titik SL & TP ---
    const titikSL = hargaBeli - jarakSL;
    const jarakTP = jarakSL * riskReward;
    const titikTP = hargaBeli + jarakTP;

    // --- 4. Perhitungan Lot Maksimum (Position Sizing) ---
    const risikoPerSaham = jarakSL;
    const lotMaksimum = Math.floor(nilaiRisikoMaksimal / (risikoPerSaham * 100));

    // --- Tampilkan Hasil ---
    hasilDiv.innerHTML = `
        <h3>✅ Hasil Perhitungan Optimal</h3>
        <hr>
        <p>Batas Risiko Nominal (${(risiko * 100).toFixed(0)}%): <strong>Rp${nilaiRisikoMaksimal.toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</strong></p>

        <h4>📊 Ukuran Posisi</h4>
        <p>Risiko per Saham (Jarak SL): <strong>Rp${risikoPerSaham}</strong></p>
        <p>Lot Maksimum (Aman): <strong>${lotMaksimum} Lot</strong></p>

        <h4>📉 Exit Plan: Stop-Loss (SL)</h4>
        <p>Jarak SL (2 x ATR): <strong>Rp${jarakSL}</strong></p>
        <p>Titik SL Teknis: <strong>Rp${titikSL.toFixed(0)}</strong></p>

        <h4>📈 Exit Plan: Take-Profit (TP)</h4>
        <p>Rasio Risk-Reward: <strong>1:${riskReward}</strong></p>
        <p>Jarak TP: <strong>Rp${jarakTP}</strong></p>
        <p>Titik TP Teknis: <strong>Rp${titikTP.toFixed(0)}</strong></p>
    `;
}

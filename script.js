const form = document.getElementById('tradingForm');
const hasilDiv = document.getElementById('hasil');

function formatRupiah(value) {
    return value.toLocaleString('id-ID', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
}

function hitungTrading() {
    const modal = parseFloat(document.getElementById('modal').value);
    const risiko = parseFloat(document.getElementById('risiko').value);
    const hargaBeli = parseFloat(document.getElementById('hargaBeli').value);
    const atr = parseFloat(document.getElementById('atr').value);
    const jumlahSahamValue = document.getElementById('jumlahSaham').value;
    const jumlahSaham = jumlahSahamValue === '' ? null : parseInt(jumlahSahamValue, 10);
    const riskReward = parseInt(document.getElementById('riskReward').value, 10);

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

    if (jumlahSaham !== null && (!Number.isInteger(jumlahSaham) || jumlahSaham <= 0)) {
        hasilDiv.innerHTML = '<p class="error">Jumlah saham harus berupa bilangan bulat yang lebih besar dari nol.</p>';
        return;
    }

    const nilaiRisikoMaksimal = modal * risiko;
    const jarakSL = Math.ceil(atr * 2);
    const titikSL = hargaBeli - jarakSL;
    const jarakTP = jarakSL * riskReward;
    const titikTP = hargaBeli + jarakTP;
    const risikoPerSaham = jarakSL;
    const lotMaksimum = Math.floor(nilaiRisikoMaksimal / (risikoPerSaham * 100));
    const sahamMaksimum = lotMaksimum * 100;
    const risikoAktual = jumlahSaham === null ? null : risikoPerSaham * jumlahSaham;
    const lotAktual = jumlahSaham === null ? null : jumlahSaham / 100;
    const melebihiBatas = risikoAktual !== null && risikoAktual > nilaiRisikoMaksimal;

    hasilDiv.innerHTML = `
        <h3 id="result-heading">✅ Hasil Perhitungan Optimal</h3>
        <hr>
        <p>Batas Risiko Nominal (${(risiko * 100).toFixed(0)}%): <strong>Rp${formatRupiah(nilaiRisikoMaksimal)}</strong></p>

        <h4>📊 Ukuran Posisi</h4>
        <p>Lot Maksimum (Aman): <strong>${lotMaksimum} Lot (${sahamMaksimum.toLocaleString('id-ID')} saham)</strong></p>
        ${jumlahSaham === null ? '<p>Jumlah saham aktual: <strong>Belum diisi</strong></p>' : `
            <p>Jumlah saham aktual: <strong>${jumlahSaham.toLocaleString('id-ID')} saham (${lotAktual.toLocaleString('id-ID')} lot)</strong></p>
            <p>Risiko aktual: <strong>Rp${formatRupiah(risikoAktual)}</strong></p>
            ${melebihiBatas ? '<p class="warning">⚠️ Jumlah saham aktual melebihi batas risiko yang dipilih.</p>' : '<p class="success">✅ Jumlah saham aktual masih dalam batas risiko.</p>'}
        `}

        <h4>📉 Exit Plan: Stop-Loss (SL)</h4>
        <p>Jarak SL (2 × ATR): <strong>Rp${jarakSL}</strong></p>
        <p>Titik SL Teknis: <strong>Rp${titikSL.toFixed(0)}</strong></p>

        <h4>📈 Exit Plan: Take-Profit (TP)</h4>
        <p>Rasio Risk-Reward: <strong>1:${riskReward}</strong></p>
        <p>Jarak TP: <strong>Rp${jarakTP}</strong></p>
        <p>Titik TP Teknis: <strong>Rp${titikTP.toFixed(0)}</strong></p>
    `;
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    hitungTrading();
});

form.addEventListener('reset', () => {
    window.setTimeout(() => {
        hasilDiv.innerHTML = '<p class="centered">Masukkan data untuk memulai perhitungan.</p>';
    }, 0);
});

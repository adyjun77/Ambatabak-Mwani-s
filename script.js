let nomorPesanan = 1;

// =========================
// BUAT PESANAN
// =========================
function buatPesanan() {

    const nama = document.getElementById("nama").value.trim();
    const telepon = document.getElementById("telepon").value.trim();
    const menu = document.getElementById("menuMartabak").value;
    const jumlah = parseInt(document.getElementById("jumlah").value);

    if (nama == "" || telepon == "" || menu == "") {
        alert("Silakan lengkapi data terlebih dahulu!");
        return;
    }


    const total = harga[menu] * jumlah;

    // Ringkasan
    document.getElementById("ringMenu").innerHTML = menu;
    document.getElementById("trackingJumlah").innerHTML = jumlah;
    document.getElementById("trackingTotal").innerHTML =
    "Rp " + total.toLocaleString("id-ID");

    // Detail Tracking
    document.getElementById("trackingNama").innerHTML = nama;
    document.getElementById("trackingTelepon").innerHTML = telepon;
    document.getElementById("namaMenu").innerHTML = menu;

    // Nomor Pesanan
    const kode = "A" + String(nomorPesanan).padStart(3,"0");

    document.getElementById("nomorPesanan").innerHTML = kode;

    nomorPesanan++;

    alert("Pesanan berhasil dibuat!");

    // pindah ke tracking
    document.getElementById("tracking").scrollIntoView({
        behavior:"smooth"
    });

    // reset step
    resetTracking();

    // mulai simulasi
    mulaiTracking();

}


// =========================
// TRACKING 30 DETIK
// =========================

function resetTracking(){

    document.querySelectorAll(".step").forEach(step=>{
        step.classList.remove("active");
        step.classList.remove("done");
    });

    document.getElementById("step1").classList.add("active");

    document.getElementById("badgeStatus").innerHTML="MENUNGGU";

}


function mulaiTracking(){

    const badge=document.getElementById("badgeStatus");

    const step1=document.getElementById("step1");
    const step2=document.getElementById("step2");
    const step3=document.getElementById("step3");
    const step4=document.getElementById("step4");

    // 7.5 detik
    setTimeout(()=>{

        step1.classList.remove("active");
        step1.classList.add("done");

        step2.classList.add("active");

        badge.innerHTML="DIPROSES";

    },7500);

    //15 detik
    setTimeout(()=>{

        step2.classList.remove("active");
        step2.classList.add("done");

        step3.classList.add("active");

        badge.innerHTML="DIANTAR";

    },15000);

    //22.5 detik
    setTimeout(()=>{

        step3.classList.remove("active");
        step3.classList.add("done");

        step4.classList.add("active");

        badge.innerHTML="SELESAI";

    },22500);

    //30 detik
setTimeout(()=>{

        step4.classList.add("done");

        alert("🎉 Pesanan telah selesai!\n\nTerima kasih telah memesan di Ambatabak Mwani's.");

        // ==========================
        // RESET FORM PEMESANAN
        // ==========================
        document.getElementById("nama").value = "";
        document.getElementById("telepon").value = "";
        document.getElementById("menuMartabak").selectedIndex = 0;
        document.getElementById("jumlah").value = 1;
        document.getElementById("catatan").value = "";

        // Reset Ringkasan
        document.getElementById("ringMenu").innerHTML = "-";
        document.getElementById("ringJumlah").innerHTML = "0";
        document.getElementById("ringTotal").innerHTML = "Rp0";

        // Reset Tracking
        document.getElementById("namaMenu").innerHTML = "-";
        document.getElementById("nomorPesanan").innerHTML = "-";
        document.getElementById("trackingNama").innerHTML = "-";
        document.getElementById("trackingTelepon").innerHTML = "-";
        document.getElementById("trackingJumlah").innerHTML = "0";
        document.getElementById("trackingTotal").innerHTML = "Rp0";

        // Reset Badge
        badge.innerHTML = "MENUNGGU";

        // Reset Timeline
        document.querySelectorAll(".step").forEach(step=>{
            step.classList.remove("active");
            step.classList.remove("done");
        });

        document.getElementById("step1").classList.add("active");

        // Kembali ke Form Pemesanan
        document.getElementById("pesan").scrollIntoView({
            behavior:"smooth"
        });

    },30000);
}




// =========================
// NAVBAR ACTIVE
// =========================

const menuLinks=document.querySelectorAll("nav ul li a");

menuLinks.forEach(link=>{

    link.addEventListener("click",function(){

        menuLinks.forEach(item=>{

            item.classList.remove("active");

        });

        this.classList.add("active");

    });

});


// =========================
// MENU MOBILE
// =========================

function toggleMenu(){

    document.getElementById("navMenu").classList.toggle("active");

}
// =========================
// UPDATE RINGKASAN OTOMATIS
// =========================

const harga = {
    "Martabak Coklat":15000,
    "Martabak Keju":15000,
    "Martabak Hijau Pandan":15000,
    "Martabak Kacang":15000,
    "Martabak Black Forest":15000,
    "Martabak Red Velvet":15000,
    "Martabak Telur":35000,
    "Martabak Tahu":20000
};

function updateRingkasan(){

    const menu = document.getElementById("menuMartabak").value;
    const jumlah = parseInt(document.getElementById("jumlah").value) || 0;

    document.getElementById("ringMenu").innerHTML =
        menu == "" ? "-" : menu;

    document.getElementById("ringJumlah").innerHTML =
        jumlah;

    if(menu==""){

        document.getElementById("ringTotal").innerHTML="Rp0";

    }else{

        const total = harga[menu] * jumlah;

        document.getElementById("ringTotal").innerHTML =
        "Rp " + total.toLocaleString("id-ID");

    }

}

document.getElementById("menuMartabak")
.addEventListener("change",updateRingkasan);

document.getElementById("jumlah")
.addEventListener("input",updateRingkasan);
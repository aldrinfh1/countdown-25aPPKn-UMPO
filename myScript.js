// --- AREA PENGATURAN TUGAS ---
    // Ubah, tambah, atau hapus tugas Anda di dalam daftar di bawah ini.
    // Format Tanggal: "Bulan Hari, Tahun Jam:Menit:Detik" (Bulan dalam Bahasa Inggris)
               const tasks = [
        {
            title: "Presentasi Pengantar Pendidikan",
            description: "",
            deadline: "Oct 27, 2025 23:59:59"
        },
        {
            title: "Agama Islam : Me-resume kajian",
            description: "5 Oktober 2025, pukul 17.00 WIB.",
            deadline: "Oct 5, 2025 17:00:00"
        },
        {
            title: "B.Indonesia : Mencari 25 kosakata",
            description: "Mencari kosakata yg berhubungan dengan PPKn dan definisikan.",
            deadline: "Oct 7, 2025 23:59:59"
        },
        {
            title: "Ilmu Negara : Book Chapter / Artikel",
            description: "Membuat book chapter atau Artikel+jurnal, Makalah+Video.",
            deadline: "Oct 8, 2025 23:59:59"
        },
        {
            title: "PIS : Latar Belakang & Rumusan",
            description: "Membuat latar belakang dan rumusan dari judul yang sudah ditentukan.",
            deadline: "Nov 19, 2025 23:59:59"
        },
        {
            title: "Ilmu Politik : Membuat Poster",
            description: "Tugas pertama dari mata kuliah Ilmu Politik.",
            deadline: "Oct 29, 2025 23:59:59"
        },
        {
            title: "Ilmu Politik : Review 10 Artikel Ilmiah",
            description: "5 artikel Indonesia & 5 artikel internasional.",
            deadline: "Jan 14, 2026 23:59:59" 
        },
        {
            title: "Pancasila : Studi Kasus",
            description: "Menghasilkan laporan 7-10 halaman dan produk kreatif.",
            deadline: "Nov 6, 2025 23:59:59"
        },
        {
            title: "Pancasila : Riset Sederhana",
            description: "Menghasilkan laporan singkat 5 halaman dan produk kreatif.",
            deadline: "Dec 18, 2025 23:59:59"
        },
        {
            title: "Teori Pembelajaran : Merangkum & Poster",
            description: "Deadline bertahap: 16, 23, & 30 Oktober. Countdown menuju deadline pertama.",
            deadline: "Oct 16, 2025 23:59:59" // Countdown diatur ke tanggal terdekat
        }
    ];

    const container = document.querySelector('.task-container');

    // Membuat HTML untuk setiap tugas
    tasks.forEach((task, index) => {
        const card = document.createElement('div');
        card.className = 'task-card';
        card.id = `task-${index}`;

        let descriptionHTML = task.description ? `<p>${task.description}</p>` : '';

        card.innerHTML = `
            <h2>${task.title}</h2>
            ${descriptionHTML}
            <div class="countdown-wrapper">
                <div class="countdown" id="countdown-${index}">
                    <div class="time-box">
                        <div class="number" data-unit="days">0</div>
                        <div class="label">Hari</div>
                    </div>
                    <div class="time-box">
                        <div class="number" data-unit="hours">0</div>
                        <div class="label">Jam</div>
                    </div>
                    <div class="time-box">
                        <div class="number" data-unit="minutes">0</div>
                        <div class="label">Menit</div>
                    </div>
                    <div class="time-box">
                        <div class="number" data-unit="seconds">0</div>
                        <div class="label">Detik</div>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(card);
    });

    // Fungsi utama untuk mengupdate semua countdown
    function updateAllCountdowns() {
        const now = new Date().getTime();

        tasks.forEach((task, index) => {
            const countDownDate = new Date(task.deadline).getTime();
            const distance = countDownDate - now;

            const card = document.getElementById(`task-${index}`);
            const countdownWrapper = card.querySelector('.countdown-wrapper');

            if (distance < 0) {
                // Jika waktu sudah habis
                countdownWrapper.innerHTML = `<div class="message overdue-msg">Tenggat Waktu Terlewat</div>`;
                card.classList.add('overdue');
            } else {
                // Jika masih ada waktu
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                const countdownEl = document.getElementById(`countdown-${index}`);
                countdownEl.querySelector('[data-unit="days"]').innerText = days;
                countdownEl.querySelector('[data-unit="hours"]').innerText = hours;
                countdownEl.querySelector('[data-unit="minutes"]').innerText = minutes;
                countdownEl.querySelector('[data-unit="seconds"]').innerText = seconds;

                // Tandai jika deadline sudah dekat (kurang dari 3 hari)
                if(days < 3) {
                    card.classList.add('soon');
                }
            }
        });
    }

    // Jalankan fungsi update setiap detik
    setInterval(updateAllCountdowns, 1000);

    // Panggil fungsi sekali saat halaman dimuat
    updateAllCountdowns();

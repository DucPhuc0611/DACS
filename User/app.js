// ==========================================
// 1. KHOI TAO DATABASE
// ==========================================
const ROOM_READY = 'Sẵn Sàng Đón Khách';
const BOOKING_ACTIVE_STATUSES = ['Chờ nhận phòng', 'Đã nhận phòng'];
const ONE_DAY = 24 * 60 * 60 * 1000;

const DEFAULT_CUSTOMERS = [
    {
        MaKH: 'KH01',
        username: 'phuc',
        password: '123',
        HoTen: 'Hoàng Gia Đức Phúc',
        SDT: '0901234567',
        Email: 'phuc@hutech.edu.vn'
    }
];

const DEFAULT_ROOM_TYPES = [
    {
        MaLoaiPhong: 'LP_KING',
        TenLoai: 'Phòng Tiêu Chuẩn King',
        GiaTieuChuan: 150,
        SucChua: 2,
        MoTa: 'Giường King, vòi sen đứng, máy sấy Dyson và hệ thống phòng thông minh.',
        img: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80'
    },
    {
        MaLoaiPhong: 'LP_TWIN',
        TenLoai: 'Phòng Cao Cấp Twin',
        GiaTieuChuan: 280,
        SucChua: 4,
        MoTa: 'Hai giường Twin, không gian làm việc riêng và tầm nhìn trung tâm thành phố.',
        img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'
    },
    {
        MaLoaiPhong: 'LP_SUITE',
        TenLoai: 'SSA Executive Suite',
        GiaTieuChuan: 850,
        SucChua: 6,
        MoTa: 'Suite riêng tư với phòng khách, minibar cao cấp và dịch vụ ưu tiên.',
        img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80'
    }
];

const DEFAULT_ROOMS = [
    { MaPhong: 'P101', MaLoaiPhong: 'LP_KING', TrangThaiVeSinh: ROOM_READY },
    { MaPhong: 'P102', MaLoaiPhong: 'LP_KING', TrangThaiVeSinh: ROOM_READY },
    { MaPhong: 'P103', MaLoaiPhong: 'LP_KING', TrangThaiVeSinh: ROOM_READY },
    { MaPhong: 'P104', MaLoaiPhong: 'LP_KING', TrangThaiVeSinh: ROOM_READY },
    { MaPhong: 'P105', MaLoaiPhong: 'LP_KING', TrangThaiVeSinh: 'Chưa dọn' },
    { MaPhong: 'P106', MaLoaiPhong: 'LP_KING', TrangThaiVeSinh: ROOM_READY },
    { MaPhong: 'P201', MaLoaiPhong: 'LP_TWIN', TrangThaiVeSinh: ROOM_READY },
    { MaPhong: 'P202', MaLoaiPhong: 'LP_TWIN', TrangThaiVeSinh: 'Đang sử dụng' },
    { MaPhong: 'P203', MaLoaiPhong: 'LP_TWIN', TrangThaiVeSinh: ROOM_READY },
    { MaPhong: 'P204', MaLoaiPhong: 'LP_TWIN', TrangThaiVeSinh: ROOM_READY },
    { MaPhong: 'P205', MaLoaiPhong: 'LP_TWIN', TrangThaiVeSinh: 'Chưa dọn' },
    { MaPhong: 'P206', MaLoaiPhong: 'LP_TWIN', TrangThaiVeSinh: ROOM_READY },
    { MaPhong: 'P301', MaLoaiPhong: 'LP_SUITE', TrangThaiVeSinh: ROOM_READY },
    { MaPhong: 'P302', MaLoaiPhong: 'LP_SUITE', TrangThaiVeSinh: ROOM_READY },
    { MaPhong: 'P303', MaLoaiPhong: 'LP_SUITE', TrangThaiVeSinh: 'Chưa dọn' },
    { MaPhong: 'P304', MaLoaiPhong: 'LP_SUITE', TrangThaiVeSinh: ROOM_READY },
    { MaPhong: 'P401', MaLoaiPhong: 'LP_SUITE', TrangThaiVeSinh: ROOM_READY },
    { MaPhong: 'P402', MaLoaiPhong: 'LP_SUITE', TrangThaiVeSinh: ROOM_READY },
    { MaPhong: 'P403', MaLoaiPhong: 'LP_SUITE', TrangThaiVeSinh: ROOM_READY },
    { MaPhong: 'P501', MaLoaiPhong: 'LP_KING', TrangThaiVeSinh: ROOM_READY },
    { MaPhong: 'P502', MaLoaiPhong: 'LP_TWIN', TrangThaiVeSinh: ROOM_READY }
];

function docDuLieu(key, fallback = []) {
    try {
        return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch {
        return fallback;
    }
}

function luuDuLieu(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function initDB() {
    if (!localStorage.getItem('KhachHang')) luuDuLieu('KhachHang', DEFAULT_CUSTOMERS);
    if (!localStorage.getItem('LoaiPhong')) luuDuLieu('LoaiPhong', DEFAULT_ROOM_TYPES);
    if (!localStorage.getItem('Phong')) luuDuLieu('Phong', DEFAULT_ROOMS);
    if (!localStorage.getItem('PhieuDatPhong')) luuDuLieu('PhieuDatPhong', []);

    dongBoDuLieuMau();
}

function dongBoDanhSachTheoKhoa(storageKey, defaults, idField) {
    const currentItems = docDuLieu(storageKey);
    const mergedItems = defaults.map(defaultItem => {
        const currentItem = currentItems.find(item => item[idField] === defaultItem[idField]);
        return currentItem ? { ...defaultItem, ...currentItem } : defaultItem;
    });

    currentItems.forEach(currentItem => {
        if (!mergedItems.some(item => item[idField] === currentItem[idField])) {
            mergedItems.push(currentItem);
        }
    });

    luuDuLieu(storageKey, mergedItems);
}

function dongBoDuLieuMau() {
    dongBoDanhSachTheoKhoa('LoaiPhong', DEFAULT_ROOM_TYPES, 'MaLoaiPhong');
    dongBoDanhSachTheoKhoa('Phong', DEFAULT_ROOMS, 'MaPhong');
}

// ==========================================
// 2. HAM TIEN ICH
// ==========================================
function formatTien(value) {
    return `$${Number(value || 0).toLocaleString('en-US')}`;
}

function parseNgay(value) {
    if (!value) return null;
    const [year, month, day] = value.split('-').map(Number);
    return new Date(year, month - 1, day);
}

function formatNgayISO(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function tinhSoDem(checkIn, checkOut) {
    const start = parseNgay(checkIn);
    const end = parseNgay(checkOut);
    if (!start || !end || end <= start) return 0;
    return Math.round((end - start) / ONE_DAY);
}

function coTrungLich(lichAStart, lichAEnd, lichBStart, lichBEnd) {
    const aStart = parseNgay(lichAStart);
    const aEnd = parseNgay(lichAEnd);
    const bStart = parseNgay(lichBStart);
    const bEnd = parseNgay(lichBEnd);
    if (!aStart || !aEnd || !bStart || !bEnd) return false;
    return aStart < bEnd && bStart < aEnd;
}

function timLoaiPhong(maLoaiPhong) {
    return docDuLieu('LoaiPhong').find(roomType => roomType.MaLoaiPhong === maLoaiPhong);
}

function phongBiGiuTrongKhoangNgay(maPhong, checkIn, checkOut, bookings = docDuLieu('PhieuDatPhong')) {
    return bookings.some(booking => {
        const laPhieuDangHieuLuc = BOOKING_ACTIVE_STATUSES.includes(booking.TrangThai);
        return (
            booking.MaPhong === maPhong &&
            laPhieuDangHieuLuc &&
            coTrungLich(checkIn, checkOut, booking.NgayNhanDuKien, booking.NgayTraDuKien)
        );
    });
}

function demPhongSanSang(maLoaiPhong) {
    const rooms = docDuLieu('Phong');
    return rooms.filter(room => room.MaLoaiPhong === maLoaiPhong && room.TrangThaiVeSinh === ROOM_READY).length;
}

// ==========================================
// 3. GIAO DIEN & TAI KHOAN
// ==========================================
function renderRooms() {
    const container = document.getElementById('room-list-container');
    if (!container) return;

    const roomTypes = docDuLieu('LoaiPhong');
    container.innerHTML = roomTypes.map(roomType => {
        const availableCount = demPhongSanSang(roomType.MaLoaiPhong);
        const disabled = availableCount === 0;

        return `
        <div class="group cursor-pointer">
            <div class="overflow-hidden relative shadow-sm">
                <img src="${roomType.img}" alt="${roomType.TenLoai}" loading="lazy" class="w-full h-[450px] object-cover transition duration-1000 group-hover:scale-105">
            </div>
            <div class="pt-6 text-center">
                <h4 class="text-2xl font-serif text-dark mb-2">${roomType.TenLoai}</h4>
                <p class="text-sm font-serif text-gray-500 mb-2 italic">
                    Giá: <span class="font-sans font-bold text-dark">${formatTien(roomType.GiaTieuChuan)}</span> / Đêm
                </p>
                <p class="text-xs text-gray-400 mb-4">Sức chứa ${roomType.SucChua || 2} khách · ${availableCount} phòng sẵn sàng</p>
                <button
                    onclick="chuanBiDatPhong('${roomType.MaLoaiPhong}')"
                    ${disabled ? 'disabled' : ''}
                    class="uppercase tracking-[0.2em] text-[10px] font-bold border-b pb-1 transition ${disabled ? 'text-gray-300 border-gray-200 cursor-not-allowed' : 'text-dark border-gold hover:text-gold'}"
                >
                    ${disabled ? 'Tạm Hết Phòng' : 'Đặt Ngay'}
                </button>
            </div>
        </div>`;
    }).join('');
}

function moModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;

    if (id === 'profile-modal') taiDuLieuProfile();
    if (id === 'login-modal') document.getElementById('login-error')?.classList.add('hidden');
    if (id === 'register-modal') document.getElementById('register-error')?.classList.add('hidden');

    modal.classList.remove('hidden');
}

function dongModal(id) {
    document.getElementById(id)?.classList.add('hidden');
}

function moDangKyTuDangNhap() {
    dongModal('login-modal');
    moModal('register-modal');
}

function moDangNhapTuDangKy() {
    dongModal('register-modal');
    moModal('login-modal');
}

function checkLoginStatus() {
    const currentUser = docDuLieu('CurrentUser', null);
    const guestMenu = document.getElementById('menu-guest');
    const userMenu = document.getElementById('menu-user');
    const displayName = document.getElementById('display-name');

    if (currentUser) {
        guestMenu?.classList.add('hidden');
        userMenu?.classList.remove('hidden');
        if (displayName) displayName.innerText = currentUser.HoTen.split(' ').pop();
    } else {
        guestMenu?.classList.remove('hidden');
        userMenu?.classList.add('hidden');
        if (displayName) displayName.innerText = '';
    }
}

function xuLyDangNhap(e) {
    e.preventDefault();

    const username = document.getElementById('login-username').value.trim().toLowerCase();
    const password = document.getElementById('login-password').value;
    const users = docDuLieu('KhachHang');
    const user = users.find(item => String(item.username || '').toLowerCase() === username && item.password === password);

    if (!user) {
        document.getElementById('login-error')?.classList.remove('hidden');
        return;
    }

    const { password: _matKhau, ...safeUser } = user;
    luuDuLieu('CurrentUser', safeUser);
    document.getElementById('login-form')?.reset();
    document.getElementById('login-error')?.classList.add('hidden');
    dongModal('login-modal');
    checkLoginStatus();
    taiDuLieuProfile();
}

function taoMaKhachHangMoi(users) {
    const maxNumber = users.reduce((max, user) => {
        const match = String(user.MaKH || '').match(/^KH(\d+)$/);
        return match ? Math.max(max, Number(match[1])) : max;
    }, 0);

    return `KH${String(maxNumber + 1).padStart(2, '0')}`;
}

function hienLoiDangKy(message) {
    const error = document.getElementById('register-error');
    if (!error) return;

    error.innerText = message;
    error.classList.remove('hidden');
}

function xuLyDangKy(e) {
    e.preventDefault();

    const name = document.getElementById('reg-name').value.trim();
    const phone = document.getElementById('reg-phone').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const username = document.getElementById('reg-username').value.trim().toLowerCase();
    const password = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('reg-password-confirm').value;
    const error = document.getElementById('register-error');
    const users = docDuLieu('KhachHang');

    error?.classList.add('hidden');

    if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
        hienLoiDangKy('Tên đăng nhập chỉ dùng chữ, số, dấu gạch dưới và dài 3-20 ký tự.');
        return;
    }

    if (password !== confirmPassword) {
        hienLoiDangKy('Mật khẩu nhập lại chưa khớp.');
        return;
    }

    const isUsernameUsed = users.some(user => String(user.username || '').toLowerCase() === username);
    if (isUsernameUsed) {
        hienLoiDangKy('Tên đăng nhập này đã tồn tại. Vui lòng chọn tên khác.');
        return;
    }

    const newUser = {
        MaKH: taoMaKhachHangMoi(users),
        username,
        password,
        HoTen: name,
        SDT: phone,
        Email: email
    };

    users.push(newUser);
    luuDuLieu('KhachHang', users);

    const { password: _matKhau, ...safeUser } = newUser;
    luuDuLieu('CurrentUser', safeUser);

    document.getElementById('register-form')?.reset();
    dongModal('register-modal');
    checkLoginStatus();
    taiDuLieuProfile();

    alert(`Đăng ký thành công! Chào mừng ${name} đến với SSA Hotel.`);
}

function xuLyDangXuat() {
    localStorage.removeItem('CurrentUser');
    checkLoginStatus();
    taiDuLieuProfile();
    alert('Đã đăng xuất thành công!');
}

function taiDuLieuProfile() {
    const user = docDuLieu('CurrentUser', null);
    const historyList = document.getElementById('history-list');

    if (!user) {
        if (document.getElementById('prof-name')) document.getElementById('prof-name').innerText = '---';
        if (document.getElementById('prof-phone')) document.getElementById('prof-phone').innerText = '---';
        if (document.getElementById('prof-email')) document.getElementById('prof-email').innerText = '---';
        if (historyList) historyList.innerHTML = '<p class="text-sm text-gray-400 italic mt-4">Vui lòng đăng nhập để xem lịch sử lưu trú.</p>';
        return;
    }

    document.getElementById('prof-name').innerText = user.HoTen;
    document.getElementById('prof-phone').innerText = user.SDT;
    document.getElementById('prof-email').innerText = user.Email;

    const bookings = docDuLieu('PhieuDatPhong')
        .filter(booking => booking.MaKH === user.MaKH)
        .reverse();

    if (bookings.length === 0) {
        historyList.innerHTML = '<p class="text-sm text-gray-400 italic mt-4">Chưa có giao dịch lưu trú nào.</p>';
    } else {
        historyList.innerHTML = bookings.map(booking => {
            const roomType = timLoaiPhong(booking.MaLoaiPhong);
            const nights = booking.SoDem || tinhSoDem(booking.NgayNhanDuKien, booking.NgayTraDuKien);
            const total = booking.TongTienDuKien || (roomType?.GiaTieuChuan || 0) * nights;

            return `
            <div class="bg-gray-50 p-4 border flex justify-between items-center gap-4 mb-2">
                <div>
                    <p class="font-serif text-lg text-dark">${roomType?.TenLoai || 'Phòng SSA'} (Phòng ${booking.MaPhong})</p>
                    <p class="text-xs text-gray-500">Nhận: ${booking.NgayNhanDuKien} - Trả: ${booking.NgayTraDuKien}</p>
                    <p class="text-xs text-gray-500">${nights} đêm · ${booking.SoKhach || 1} khách · Tổng dự kiến ${formatTien(total)}</p>
                </div>
                <span class="shrink-0 text-[10px] font-bold uppercase text-gold border border-gold px-2 py-1">${booking.TrangThai}</span>
            </div>`;
        }).join('');
    }
}

// ==========================================
// 4. NGHIEP VU DAT PHONG
// ==========================================
function chuanBiDatPhong(maLoaiPhong) {
    const user = docDuLieu('CurrentUser', null);
    if (!user) {
        alert('Vui lòng đăng nhập để đặt phòng!');
        moModal('login-modal');
        return;
    }

    const roomType = timLoaiPhong(maLoaiPhong);
    if (!roomType) {
        alert('Không tìm thấy hạng phòng này.');
        return;
    }

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    document.getElementById('booking-room-id').value = maLoaiPhong;
    document.getElementById('booking-room-name').innerText = roomType.TenLoai;
    document.getElementById('bk-name').value = user.HoTen;
    document.getElementById('bk-phone').value = user.SDT;
    document.getElementById('bk-email').value = user.Email;

    const checkInInput = document.getElementById('bk-checkin');
    const checkOutInput = document.getElementById('bk-checkout');
    const guestsInput = document.getElementById('bk-guests');

    checkInInput.min = formatNgayISO(today);
    checkOutInput.min = formatNgayISO(tomorrow);
    checkInInput.value = formatNgayISO(today);
    checkOutInput.value = formatNgayISO(tomorrow);

    guestsInput.max = roomType.SucChua || 6;
    guestsInput.value = Math.min(Number(guestsInput.value || 2), roomType.SucChua || 6);

    capNhatTomTatDatPhong();
    moModal('booking-modal');
}

function capNhatTomTatDatPhong() {
    const maLoaiPhong = document.getElementById('booking-room-id')?.value;
    const roomType = timLoaiPhong(maLoaiPhong);
    const checkIn = document.getElementById('bk-checkin')?.value;
    const checkOut = document.getElementById('bk-checkout')?.value;
    const summary = document.getElementById('booking-summary');

    if (!roomType || !summary) return;

    const nights = tinhSoDem(checkIn, checkOut);
    if (nights <= 0) {
        summary.classList.add('hidden');
        return;
    }

    const total = nights * Number(roomType.GiaTieuChuan || 0);
    const deposit = Math.min(total, Math.max(100, Math.round(total * 0.2)));

    document.getElementById('summary-nights').innerText = `${nights} đêm`;
    document.getElementById('summary-price').innerText = `${formatTien(roomType.GiaTieuChuan)} / đêm`;
    document.getElementById('summary-total').innerText = formatTien(total);
    document.getElementById('bk-deposit').value = deposit;
    summary.classList.remove('hidden');
}

function timPhongTrong(maLoaiPhong, checkIn, checkOut) {
    const rooms = docDuLieu('Phong');
    const bookings = docDuLieu('PhieuDatPhong');

    return rooms.find(room => (
        room.MaLoaiPhong === maLoaiPhong &&
        room.TrangThaiVeSinh === ROOM_READY &&
        !phongBiGiuTrongKhoangNgay(room.MaPhong, checkIn, checkOut, bookings)
    ));
}

function xuLyDatPhong(e) {
    e.preventDefault();

    const user = docDuLieu('CurrentUser', null);
    if (!user) {
        alert('Phiên đăng nhập đã hết. Vui lòng đăng nhập lại!');
        dongModal('booking-modal');
        moModal('login-modal');
        return;
    }

    const maLoaiPhong = document.getElementById('booking-room-id').value;
    const roomType = timLoaiPhong(maLoaiPhong);
    const checkIn = document.getElementById('bk-checkin').value;
    const checkOut = document.getElementById('bk-checkout').value;
    const guests = Number(document.getElementById('bk-guests').value || 1);
    const nights = tinhSoDem(checkIn, checkOut);
    const today = parseNgay(formatNgayISO(new Date()));

    if (!roomType) {
        alert('Không tìm thấy hạng phòng cần đặt.');
        return;
    }

    if (parseNgay(checkIn) < today) {
        alert('Ngày nhận phòng không được nhỏ hơn ngày hiện tại.');
        return;
    }

    if (nights <= 0) {
        alert('Lỗi: Ngày trả phòng phải sau ngày nhận phòng!');
        return;
    }

    if (guests < 1 || guests > (roomType.SucChua || 6)) {
        alert(`Số khách của ${roomType.TenLoai} phải từ 1 đến ${roomType.SucChua || 6}.`);
        return;
    }

    const availableRoom = timPhongTrong(maLoaiPhong, checkIn, checkOut);
    if (!availableRoom) {
        alert('Hạng phòng này đã hết phòng trống trong khoảng ngày đã chọn. Vui lòng đổi ngày hoặc chọn hạng khác!');
        return;
    }

    const total = nights * Number(roomType.GiaTieuChuan || 0);
    const deposit = Number(document.getElementById('bk-deposit').value || 0);
    const bookings = docDuLieu('PhieuDatPhong');
    const newBooking = {
        MaPDP: `PDP${Date.now()}`,
        MaKH: user.MaKH,
        MaLoaiPhong: maLoaiPhong,
        MaPhong: availableRoom.MaPhong,
        NgayNhanDuKien: checkIn,
        NgayTraDuKien: checkOut,
        SoKhach: guests,
        SoDem: nights,
        DonGia: Number(roomType.GiaTieuChuan || 0),
        TienCoc: deposit,
        TongTienDuKien: total,
        NgayTao: new Date().toISOString(),
        TrangThai: 'Chờ nhận phòng'
    };

    bookings.push(newBooking);
    luuDuLieu('PhieuDatPhong', bookings);

    alert(`ĐẶT PHÒNG THÀNH CÔNG!\n\nHệ thống đã giữ mã phòng ${availableRoom.MaPhong}.\nMã phiếu: ${newBooking.MaPDP}\nSố đêm: ${nights}\nTổng dự kiến: ${formatTien(total)}\nTiền cọc: ${formatTien(deposit)}`);
    dongModal('booking-modal');
    document.getElementById('booking-form').reset();
    document.getElementById('booking-summary')?.classList.add('hidden');
    renderRooms();
    taiDuLieuProfile();
}

function ganSuKienForm() {
    document.getElementById('bk-checkin')?.addEventListener('change', () => {
        const checkInInput = document.getElementById('bk-checkin');
        const checkOutInput = document.getElementById('bk-checkout');
        const checkInDate = parseNgay(checkInInput.value);

        if (checkInDate) {
            const minCheckout = new Date(checkInDate);
            minCheckout.setDate(checkInDate.getDate() + 1);
            checkOutInput.min = formatNgayISO(minCheckout);

            if (!checkOutInput.value || parseNgay(checkOutInput.value) <= checkInDate) {
                checkOutInput.value = formatNgayISO(minCheckout);
            }
        }

        capNhatTomTatDatPhong();
    });

    document.getElementById('bk-checkout')?.addEventListener('change', capNhatTomTatDatPhong);
    document.getElementById('bk-guests')?.addEventListener('change', capNhatTomTatDatPhong);
}

window.addEventListener('DOMContentLoaded', () => {
    initDB();
    renderRooms();
    checkLoginStatus();
    taiDuLieuProfile();
    ganSuKienForm();
});

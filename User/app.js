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

const DEFAULT_DINING_SERVICES = [
    {
        MaDichVu: 'DINING_SIGNATURE',
        TenDichVu: 'Signature Restaurant',
        ViTri: 'Tầng 6',
        GioPhucVu: '06:30 - 22:00',
        GiaThamKhao: 45,
        MoTa: 'Thực đơn Á - Âu theo mùa, phù hợp cho bữa sáng, bữa tối và tiếp khách thân mật.',
        img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80'
    },
    {
        MaDichVu: 'DINING_SKYBAR',
        TenDichVu: 'Sky Lounge Bar',
        ViTri: 'Rooftop',
        GioPhucVu: '17:00 - 01:00',
        GiaThamKhao: 30,
        MoTa: 'Cocktail, rượu vang và set tapas trong không gian nhìn về trung tâm Sài Gòn.',
        img: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=900&q=80'
    },
    {
        MaDichVu: 'DINING_PRIVATE',
        TenDichVu: 'Private Dining',
        ViTri: 'Phòng riêng',
        GioPhucVu: 'Theo lịch đặt',
        GiaThamKhao: 120,
        MoTa: 'Bàn tiệc riêng với thực đơn cá nhân hóa cho gia đình, đối tác hoặc dịp kỷ niệm.',
        img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80'
    }
];

const DEFAULT_EVENT_PACKAGES = [
    {
        MaGoi: 'EVENT_MEETING',
        TenGoi: 'Executive Meeting',
        SucChua: 40,
        GiaKhoiDiem: 500,
        MoTa: 'Phòng họp riêng, màn hình trình chiếu, tea-break và hỗ trợ kỹ thuật trong suốt sự kiện.',
        img: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=900&q=80'
    },
    {
        MaGoi: 'EVENT_BANQUET',
        TenGoi: 'Grand Banquet',
        SucChua: 180,
        GiaKhoiDiem: 2500,
        MoTa: 'Không gian tiệc lớn cho gala dinner, tiệc cưới và tiệc doanh nghiệp với thực đơn trọn gói.',
        img: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=900&q=80'
    },
    {
        MaGoi: 'EVENT_ROOFTOP',
        TenGoi: 'Rooftop Reception',
        SucChua: 90,
        GiaKhoiDiem: 1800,
        MoTa: 'Tiệc cocktail trên tầng thượng, phù hợp cho ra mắt sản phẩm và networking buổi tối.',
        img: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=900&q=80'
    }
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
    if (!localStorage.getItem('DichVuAmThuc')) luuDuLieu('DichVuAmThuc', DEFAULT_DINING_SERVICES);
    if (!localStorage.getItem('GoiSuKien')) luuDuLieu('GoiSuKien', DEFAULT_EVENT_PACKAGES);
    if (!localStorage.getItem('YeuCauDichVu')) luuDuLieu('YeuCauDichVu', []);

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
    dongBoDanhSachTheoKhoa('DichVuAmThuc', DEFAULT_DINING_SERVICES, 'MaDichVu');
    dongBoDanhSachTheoKhoa('GoiSuKien', DEFAULT_EVENT_PACKAGES, 'MaGoi');
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

function timDichVuAmThuc(maDichVu) {
    return docDuLieu('DichVuAmThuc').find(service => service.MaDichVu === maDichVu);
}

function timGoiSuKien(maGoi) {
    return docDuLieu('GoiSuKien').find(eventPackage => eventPackage.MaGoi === maGoi);
}

function timDichVuTheoLoai(loaiDichVu, maDichVu) {
    return loaiDichVu === 'SU_KIEN' ? timGoiSuKien(maDichVu) : timDichVuAmThuc(maDichVu);
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

function renderDining() {
    const container = document.getElementById('dining-list-container');
    if (!container) return;

    const services = docDuLieu('DichVuAmThuc');
    container.innerHTML = services.map(service => `
        <article class="bg-white border border-gray-100 shadow-sm">
            <img src="${service.img}" alt="${service.TenDichVu}" loading="lazy" class="w-full h-72 object-cover">
            <div class="p-7">
                <p class="text-[10px] uppercase tracking-[0.2em] text-gold font-bold mb-3">${service.ViTri}</p>
                <h4 class="text-2xl font-serif text-dark mb-3">${service.TenDichVu}</h4>
                <p class="text-sm text-gray-500 leading-relaxed mb-5">${service.MoTa}</p>
                <div class="flex justify-between gap-4 text-xs text-gray-500 border-t border-gray-100 pt-4 mb-6">
                    <span>${service.GioPhucVu}</span>
                    <span>Từ ${formatTien(service.GiaThamKhao)} / khách</span>
                </div>
                <button onclick="chuanBiYeuCauDichVu('AM_THUC', '${service.MaDichVu}')" class="uppercase tracking-[0.2em] text-[10px] font-bold text-dark border-b border-gold pb-1 hover:text-gold transition">
                    Đặt Bàn
                </button>
            </div>
        </article>
    `).join('');
}

function renderEvents() {
    const container = document.getElementById('event-list-container');
    if (!container) return;

    const packages = docDuLieu('GoiSuKien');
    container.innerHTML = packages.map(eventPackage => `
        <article class="border border-gray-100 shadow-sm bg-gray-50">
            <img src="${eventPackage.img}" alt="${eventPackage.TenGoi}" loading="lazy" class="w-full h-72 object-cover">
            <div class="p-7">
                <p class="text-[10px] uppercase tracking-[0.2em] text-gold font-bold mb-3">Tối đa ${eventPackage.SucChua} khách</p>
                <h4 class="text-2xl font-serif text-dark mb-3">${eventPackage.TenGoi}</h4>
                <p class="text-sm text-gray-500 leading-relaxed mb-5">${eventPackage.MoTa}</p>
                <div class="flex justify-between gap-4 text-xs text-gray-500 border-t border-gray-200 pt-4 mb-6">
                    <span>Trọn gói sự kiện</span>
                    <span>Từ ${formatTien(eventPackage.GiaKhoiDiem)}</span>
                </div>
                <button onclick="chuanBiYeuCauDichVu('SU_KIEN', '${eventPackage.MaGoi}')" class="uppercase tracking-[0.2em] text-[10px] font-bold text-dark border-b border-gold pb-1 hover:text-gold transition">
                    Tư Vấn Sự Kiện
                </button>
            </div>
        </article>
    `).join('');
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
    const serviceHistoryList = document.getElementById('service-history-list');

    if (!user) {
        if (document.getElementById('prof-name')) document.getElementById('prof-name').innerText = '---';
        if (document.getElementById('prof-phone')) document.getElementById('prof-phone').innerText = '---';
        if (document.getElementById('prof-email')) document.getElementById('prof-email').innerText = '---';
        if (historyList) historyList.innerHTML = '<p class="text-sm text-gray-400 italic mt-4">Vui lòng đăng nhập để xem lịch sử lưu trú.</p>';
        if (serviceHistoryList) serviceHistoryList.innerHTML = '<p class="text-sm text-gray-400 italic">Vui lòng đăng nhập để xem yêu cầu dịch vụ.</p>';
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

    const serviceRequests = docDuLieu('YeuCauDichVu')
        .filter(request => request.MaKH === user.MaKH)
        .reverse();

    if (!serviceHistoryList) return;

    if (serviceRequests.length === 0) {
        serviceHistoryList.innerHTML = '<p class="text-sm text-gray-400 italic">Chưa có yêu cầu dịch vụ nào.</p>';
        return;
    }

    serviceHistoryList.innerHTML = serviceRequests.map(request => {
        const service = timDichVuTheoLoai(request.LoaiDichVu, request.MaDichVu);
        const serviceName = request.TenDichVu || service?.TenDichVu || service?.TenGoi || 'Dịch vụ SSA';
        const typeLabel = request.LoaiDichVu === 'SU_KIEN' ? 'Sự kiện' : 'Ẩm thực';

        return `
        <div class="bg-white p-4 border border-gray-100 flex justify-between items-center gap-4 mb-2">
            <div>
                <p class="font-serif text-lg text-dark">${serviceName}</p>
                <p class="text-xs text-gray-500">${typeLabel} · ${request.NgaySuDung}${request.GioSuDung ? ` lúc ${request.GioSuDung}` : ''}</p>
                <p class="text-xs text-gray-500">${request.SoKhach} khách${request.GhiChu ? ` · ${request.GhiChu}` : ''}</p>
            </div>
            <span class="shrink-0 text-[10px] font-bold uppercase text-gold border border-gold px-2 py-1">${request.TrangThai}</span>
        </div>`;
    }).join('');
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

function chuanBiYeuCauDichVu(loaiDichVu, maDichVu) {
    const user = docDuLieu('CurrentUser', null);
    if (!user) {
        alert('Vui lòng đăng nhập để gửi yêu cầu dịch vụ!');
        moModal('login-modal');
        return;
    }

    const service = timDichVuTheoLoai(loaiDichVu, maDichVu);
    if (!service) {
        alert('Không tìm thấy dịch vụ đã chọn.');
        return;
    }

    const isEvent = loaiDichVu === 'SU_KIEN';
    const serviceName = isEvent ? service.TenGoi : service.TenDichVu;
    const today = new Date();
    const defaultDate = new Date(today);
    defaultDate.setDate(today.getDate() + (isEvent ? 7 : 1));

    document.getElementById('service-type').value = loaiDichVu;
    document.getElementById('service-id').value = maDichVu;
    document.getElementById('service-modal-title').innerText = isEvent ? 'Tư Vấn Sự Kiện' : 'Đặt Bàn Ẩm Thực';
    document.getElementById('service-modal-subtitle').innerText = serviceName;
    document.getElementById('svc-name').value = user.HoTen;
    document.getElementById('svc-phone').value = user.SDT;
    document.getElementById('svc-email').value = user.Email;

    const dateInput = document.getElementById('svc-date');
    const timeInput = document.getElementById('svc-time');
    const guestsInput = document.getElementById('svc-guests');
    const guestsLabel = document.getElementById('svc-guests-label');

    dateInput.min = formatNgayISO(today);
    dateInput.value = formatNgayISO(defaultDate);
    timeInput.value = isEvent ? '18:00' : '19:00';
    guestsInput.min = '1';
    guestsInput.max = isEvent ? String(service.SucChua || 300) : '20';
    guestsInput.value = isEvent ? Math.min(30, service.SucChua || 30) : 2;
    guestsLabel.innerText = isEvent ? `Số khách dự kiến * (tối đa ${service.SucChua || 300})` : 'Số khách *';
    document.getElementById('svc-note').value = '';

    moModal('service-modal');
}

function xuLyGuiYeuCauDichVu(e) {
    e.preventDefault();

    const user = docDuLieu('CurrentUser', null);
    if (!user) {
        alert('Phiên đăng nhập đã hết. Vui lòng đăng nhập lại!');
        dongModal('service-modal');
        moModal('login-modal');
        return;
    }

    const loaiDichVu = document.getElementById('service-type').value;
    const maDichVu = document.getElementById('service-id').value;
    const service = timDichVuTheoLoai(loaiDichVu, maDichVu);
    const date = document.getElementById('svc-date').value;
    const time = document.getElementById('svc-time').value;
    const guests = Number(document.getElementById('svc-guests').value || 1);
    const note = document.getElementById('svc-note').value.trim();
    const today = parseNgay(formatNgayISO(new Date()));

    if (!service) {
        alert('Không tìm thấy dịch vụ đã chọn.');
        return;
    }

    if (parseNgay(date) < today) {
        alert('Ngày sử dụng dịch vụ không được nhỏ hơn ngày hiện tại.');
        return;
    }

    const maxGuests = loaiDichVu === 'SU_KIEN' ? (service.SucChua || 300) : 20;
    if (guests < 1 || guests > maxGuests) {
        alert(`Số khách phải từ 1 đến ${maxGuests}.`);
        return;
    }

    const serviceName = loaiDichVu === 'SU_KIEN' ? service.TenGoi : service.TenDichVu;
    const serviceRequests = docDuLieu('YeuCauDichVu');
    const newRequest = {
        MaYC: `YC${Date.now()}`,
        MaKH: user.MaKH,
        LoaiDichVu: loaiDichVu,
        MaDichVu: maDichVu,
        TenDichVu: serviceName,
        NgaySuDung: date,
        GioSuDung: time,
        SoKhach: guests,
        GhiChu: note,
        NgayTao: new Date().toISOString(),
        TrangThai: 'Đã tiếp nhận'
    };

    serviceRequests.push(newRequest);
    luuDuLieu('YeuCauDichVu', serviceRequests);

    alert(`ĐÃ GỬI YÊU CẦU THÀNH CÔNG!\n\nDịch vụ: ${serviceName}\nMã yêu cầu: ${newRequest.MaYC}\nNhân viên SSA Hotel sẽ liên hệ xác nhận chi tiết.`);
    dongModal('service-modal');
    document.getElementById('service-form').reset();
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
    renderDining();
    renderEvents();
    checkLoginStatus();
    taiDuLieuProfile();
    ganSuKienForm();
});

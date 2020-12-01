const mongoose = require('mongoose');

const ProductsLaptopsChema = new mongoose.Schema({ //schema of item displayed on fron page
    pathImages: {
        type: String, 
        required: false,
    },
    title: {
        type: String, 
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    price: {
        type: Number, 
        required: true
    },
    thuong_hieu: {
        type: String,
        require: true
    },
    bao_hanh: {
        type: Number,
        require: true
    },
    mau_sac: {
        type: String,
        require: true
    },
    series_laptop: {
        type: String,
        require: true
    },
    part_number: {
        type: String,
        require: true
    },
    cpu: {
        type: String,
        require: true
    },
    chip_do_hoa: {
        type: String,
        require: true
    },
    ram: {
        type: String,
        require: true
    },
    man_hinh: {
        type: String,
        require: true
    },
    luu_tru: {
        type: String,
        require: true
    },
    cong_ket_noi: {
        type: String,
        require: true
    },
    ket_noi_khong_day: {
        type: String,
        require: true
    },
    ban_phim: {
        type: String,
        require: true
    },
    he_dieu_hanh: {
        type: String,
        require: true
    },
    kich_thuoc: {
        type: String,
        require: true
    },
    pin: {
        type: String,
        require: true
    },
    khoi_luong: {
        type: Number,
        require: true
    },
    bao_mat: {
        type: String,
        require: true
    },
    den_led_tren_may: {
        type: String,
        require: true
    },
    phu_kien_di_kem: {
        type: String,
        require: true
    },
});

module.exports = mongoose.model('ProductLaptop', ProductsLaptopsChema);//accessing a model

const ProductsPCsChema = new mongoose.Schema({ //schema of item displayed on fron page
    pathImages: {
        type: String, 
        required: false,
    },
    title: {
        type: String, 
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    price: {
        type: Number, 
        required: true
    },
    thuong_hieu: {
        type: String,
        require: true
    },
    bao_hanh: {
        type: Number,
        require: true
    },
    the_he_cpu: {
        type: String,
        require: true
    },
    dong_cpu: {
        type: String,
        require: true
    },
    cpu: {
        type: String,
        require: true
    },
    ram: {
        type: String,
        require: true
    },
    chip_do_hoa: {
        type: String,
        require: true
    },
    luu_tru: {
        type: String,
        require: true
    },
    so_cong_luu_toi_da: {
        type: String,
        require: true
    },
    cong_ket_noi: {
        type: String,
        require: true
    },
    cong_xuat_hinh: {
        type: String,
        require: true
    },
    he_dieu_hanh: {
        type: String,
        require: true
    },
    dau_doc_the: {
        type: String,
        require: true
    },
    khoi_luong: {
        type: Number,
        require: true
    },
    kich_thuoc: {
        type: Number,
        require: true
    },
    phu_kien_di_kem: {
        type: String,
        require: true
    },
});

module.exports = mongoose.model('ProductPC', ProductsPCsChema);//accessing a model

const ProductsMonitorsChema = new mongoose.Schema({ //schema of item displayed on fron page
    pathImages: {
        type: String, 
        required: false,
    },
    title: {
        type: String, 
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    price: {
        type: Number, 
        required: true
    },
    thuong_hieu: {
        type: String,
        require: true
    },
    bao_hanh: {
        type: Number,
        require: true
    },
    kich_thuoc: {
        type: Number,
        require: true
    },
    do_phan_giai: {
        type: String,
        require: true
    },
    tam_nen: {
        type: String,
        require: true
    },
    tan_so_quet: {
        type: Number,
        require: true
    },
    thoi_gian_phan_hoi: {
        type: Number,
        require: true
    },
    kieu_man_hinh: {
        type: String,
        require: true
    },
    do_sang: {
        type: Number,
        require: true
    },
    goc_nhin: {
        type: String,
        require: true
    },
    kha_nang_hien_thi_mau_sac: {
        type: String,
        require: true
    },
    do_tuong_phan_tinh: {
        type: String,
        require: true
    },
    do_tuong_phan_dong: {
        type: String,
        require: true
    },
    cong_xuat_hinh: {
        type: String,
        require: true
    },
    tinh_nang_dac_biet: {
        type: Number,
        require: true
    },
    phu_kien_di_kem: {
        type: String,
        require: true
    },
});

module.exports = mongoose.model('ProductAirConditioner', ProductsMonitorsChema);//accessing a model

const ProductsVGAChema = new mongoose.Schema({ //schema of item displayed on fron page
    pathImages: {
        type: String, 
        required: false,
    },
    title: {
        type: String, 
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    price: {
        type: Number, 
        required: true
    },
    thuong_hieu: {
        type: String,
        require: true
    },
    bao_hanh: {
        type: Number,
        require: true
    },
    nhap_sx_chip_set: {
        type: Number,
        require: true
    },
    series_chip_do_hoa: {
        type: String,
        require: true
    },
    ten: {
        type: String,
        require: true
    },
    gpu: {
        type: String,
        require: true
    },
    bo_nho: {
        type: String,
        require: true
    },
    gpu_lock: {
        type: String,
        require: true
    },
    giao_tiep_PCI: {
        type: String,
        require: true
    },
    so_luong_don_vi_xu_ly: {
        type: Number,
        require: true
    },
    cong_ket_noi: {
        type: String,
        require: true
    },
    tan_nhiet: {
        type: String,
        require: true
    },
    dau_cap_nguon: {
        type: String,
        require: true
    },
    nguon_de_xuat: {
        type: Number,
        require: true
    },
    kich_thuoc: {
        type: String,
        require: true
    },
});

module.exports = mongoose.model('ProductVGAs', ProductsVGAChema);//accessing a model

const ProductsCamerasChema = new mongoose.Schema({ //schema of item displayed on fron page
    pathImages: {
        type: String, 
        required: false,
    },
    title: {
        type: String, 
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    price: {
        type: Number, 
        required: true
    },
    thuong_hieu: {
        type: String,
        require: true
    },
    bao_hanh: {
        type: Number,
        require: true
    },
    loai_san_pham: {
        type: String,
        require: true
    },
    tieu_cu: {
        type: String,
        require: true
    },
    loai_cam_bien: {
        type: String,
        require: true
    },
    diem_anh: {
        type: String,
        require: true
    },
    zoom_quang_hoc: {
        type: String,
        require: true
    },
    dinh_dang_video: {
        type: String,
        require: true
    },
    dinh_dang_image: {
        type: String,
        require: true
    },
    toc_do_man_trap: {
        type: String,
        require: true
    },
    the_nho_ho_tro: {
        type: String,
        require: true
    },
    loai_pin: {
        type: String,
        require: true
    },
    phu_kien: {
        type: String,
        require: true
    },
});

module.exports = mongoose.model('ProductCamera', ProductsCamerasChema);//accessing a model
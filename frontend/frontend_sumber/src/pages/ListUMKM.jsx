import React, { useEffect, useState, useCallback} from "react";
import { useLocation } from "react-router-dom";
import { Search, MapPin, Phone, User, AlertCircle, RefreshCw, Filter } from "lucide-react";
import HeaderComponent from "./navbarComponent";
import axios from "axios";

export const ListUmkmPage = () => {
    const location = useLocation();
    const searchText = location.state?.searchText || "";

    const [umkms, setUmkms] = useState([]);
    const [filteredUmkms, setFilteredUmkms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState(searchText || "");
    const [selectedCategory, setSelectedCategory] = useState("all");

    // Kategori UMKM
    const categories = [
        { id: "all", label: "Semua Kategori", color: "primary" },
        { id: "kelontong", label: "Warung Kelontong", color: "success" },
        { id: "mebel", label: "Mebel", color: "warning" },
        { id: "peternakan", label: "Peternakan", color: "info" },
        { id: "service", label: "Service/Servis", color: "secondary" },
        { id: "jasa", label: "Jasa", color: "dark" },
        { id: "jual", label: "Jual Beli", color: "danger" },
        { id: "fotocopy", label: "Fotocopy", color: "primary" },
        { id: "lainnya", label: "Lainnya", color: "secondary" }
    ];

    // Fungsi untuk mengkategorikan UMKM berdasarkan nama
    const categorizeUmkm = (umkmName) => {
        const name = umkmName.toLowerCase();
        
        if (name.includes('kelontong') || name.includes('warung kelontong')) {
            return 'kelontong';
        } else if (name.includes('mebel')) {
            return 'mebel';
        } else if (name.includes('peternakan') || name.includes('ternak')) {
            return 'peternakan';
        } else if (name.includes('service') || name.includes('servis')) {
            return 'service';
        } else if (name.includes('jasa')) {
            return 'jasa';
        } else if (name.includes('jual')) {
            return 'jual';
        } else if (name.includes('fotocopy') || name.includes('foto copy')) {
            return 'fotocopy';
        } else {
            return 'lainnya';
        }
    };

    // Fetch UMKM data with improved error handling
    const fetchUmkms = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await axios.get("https://api.sumberplanjan.com/api/umkms");
            
            // Add category to each UMKM
            const umkmsWithCategory = response.data.map(umkm => ({
                ...umkm,
                category: categorizeUmkm(umkm.name || '')
            }));
            
            setUmkms(umkmsWithCategory);
            setFilteredUmkms(umkmsWithCategory);
        } catch (err) {
            console.error("Error fetching UMKM data:", err);
            setError("Gagal mengambil data UMKM. Silakan coba lagi.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        setSearchTerm(searchText); 
    }, [searchText]);

    // Initial data fetch
    useEffect(() => {
        fetchUmkms();
    }, [fetchUmkms]);

    // Filter UMKMs based on search term and category
    useEffect(() => {
        let filtered = umkms;

        // Filter by category
        if (selectedCategory !== "all") {
            filtered = filtered.filter(umkm => umkm.category === selectedCategory);
        }

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(umkm => 
                umkm.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                umkm.owner_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                umkm.description?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredUmkms(filtered);
    }, [searchTerm, selectedCategory, umkms]);

    const handleRetry = () => {
        fetchUmkms();
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleCategoryChange = (categoryId) => {
        setSelectedCategory(categoryId);
    };

    const getCategoryLabel = (categoryId) => {
        const category = categories.find(cat => cat.id === categoryId);
        return category ? category.label : 'Lainnya';
    };

    const getCategoryColor = (categoryId) => {
        const category = categories.find(cat => cat.id === categoryId);
        return category ? category.color : 'secondary';
    };

    // Get category statistics
    const getCategoryStats = () => {
        const stats = {};
        categories.forEach(cat => {
            if (cat.id === 'all') {
                stats[cat.id] = umkms.length;
            } else {
                stats[cat.id] = umkms.filter(umkm => umkm.category === cat.id).length;
            }
        });
        return stats;
    };

    const categoryStats = getCategoryStats();

    return (
        <div className="min-vh-100" style={{ background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)' }}>
            < HeaderComponent />
            <div className="container py-5">
                {/* Header */}
                <div className="text-center mb-5">
                    <h1 className="display-4 fw-bold text-dark mb-3">
                        Daftar UMKM
                    </h1>
                    <p className="lead text-muted">
                        Menampilkan daftar UMKM yang terdaftar di Padukuhan berdasarkan kategori
                    </p>
                </div>

                {/* Search Bar */}
                <div className="row justify-content-center mb-4">
                    <div className="col-lg-8">
                        <div className="position-relative">
                            <Search 
                                className="position-absolute top-50 translate-middle-y text-muted ms-3" 
                                style={{ width: '20px', height: '20px', left: '8px' }}
                            />
                            <input
                                type="text"
                                className="form-control form-control-lg ps-5 pe-3 shadow-sm"
                                placeholder="Cari UMKM berdasarkan nama, pemilik, atau deskripsi..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                                style={{ borderRadius: '10px' }}
                            />
                        </div>
                    </div>
                </div>

                {/* Category Filter */}
                <div className="row justify-content-center mb-5">
                    <div className="col-lg-10">
                        <div className="card shadow-sm border-0" style={{ borderRadius: '15px' }}>
                            <div className="card-body p-4">
                                <div className="d-flex align-items-center mb-3">
                                    <Filter className="text-muted me-2" size={20} />
                                    <h5 className="mb-0 fw-bold">Filter Berdasarkan Kategori</h5>
                                </div>
                                
                                <div className="row g-2">
                                    {categories.map((category) => (
                                        <div key={category.id} className="col-6 col-md-4 col-lg-3">
                                            <button
                                                onClick={() => handleCategoryChange(category.id)}
                                                className={`btn w-100 ${selectedCategory === category.id 
                                                    ? `btn-${category.color}` 
                                                    : `btn-outline-${category.color}`
                                                } position-relative`}
                                                style={{ borderRadius: '10px' }}
                                            >
                                                <div className="d-flex flex-column align-items-center">
                                                    <span className="fw-semibold">{category.label}</span>
                                                    <small className="opacity-75">
                                                        ({categoryStats[category.id] || 0})
                                                    </small>
                                                </div>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        {loading ? (
                            <div className="text-center py-5">
                                <div className="spinner-border text-primary mb-3" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                <p className="text-muted">Sedang memuat data UMKM...</p>
                            </div>
                        ) : error ? (
                            <div className="text-center py-5">
                                <div className="card border-danger mx-auto" style={{ maxWidth: '400px' }}>
                                    <div className="card-body text-center">
                                        <AlertCircle className="text-danger mb-3" size={48} />
                                        <h5 className="card-title text-danger">Terjadi Kesalahan</h5>
                                        <p className="card-text text-danger">{error}</p>
                                        <button
                                            onClick={handleRetry}
                                            className="btn btn-danger"
                                            disabled={loading}
                                        >
                                            <RefreshCw className="me-2" size={16} />
                                            {loading ? 'Memuat...' : 'Coba Lagi'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : filteredUmkms.length === 0 ? (
                            <div className="text-center py-5">
                                <div className="card border-secondary mx-auto" style={{ maxWidth: '400px' }}>
                                    <div className="card-body text-center">
                                        <Search className="text-secondary mb-3" size={48} />
                                        <h5 className="card-title text-secondary">Tidak Ada Data</h5>
                                        <p className="card-text text-muted">
                                            {searchTerm || selectedCategory !== "all" ? 
                                                `Tidak ditemukan UMKM dengan filter yang dipilih` : 
                                                "Belum ada data UMKM yang terdaftar."
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                {/* Results count */}
                                <div className="text-center mb-4">
                                    <p className="text-muted">
                                        Menampilkan {filteredUmkms.length} dari {umkms.length} UMKM
                                        {selectedCategory !== "all" && (
                                            <span className="fw-semibold"> dalam kategori "{getCategoryLabel(selectedCategory)}"</span>
                                        )}
                                    </p>
                                </div>

                                {/* UMKM Cards */}
                                <div className="row g-4">
                                    {filteredUmkms.map((umkm) => (
                                        <div key={umkm.id} className="col-12">
                                            <div className="card h-100 shadow-sm border-0" style={{ borderRadius: '15px' }}>
                                                <div className="card-body p-4">
                                                    <div className="row">
                                                        <div className="col-lg-9">
                                                            <div className="d-flex align-items-center mb-3">
                                                                <h4 className="card-title fw-bold text-dark mb-0 me-3">
                                                                    {umkm.name}
                                                                </h4>
                                                                <span className={`badge bg-${getCategoryColor(umkm.category)} rounded-pill`}>
                                                                    {getCategoryLabel(umkm.category)}
                                                                </span>
                                                            </div>
                                                            
                                                            <div className="d-flex align-items-center mb-3">
                                                                <User className="text-muted me-2" size={16} />
                                                                <span className="fw-semibold text-muted">
                                                                    {umkm.owner_name || "Tidak diketahui"}
                                                                </span>
                                                            </div>

                                                            <div className="mb-3">
                                                                {umkm.contact && (
                                                                    <div className="d-flex align-items-center mb-2">
                                                                        <Phone className="text-muted me-2" size={16} />
                                                                        <span className="text-muted">{umkm.contact}</span>
                                                                    </div>
                                                                )}
                                                                
                                                                {umkm.address && (
                                                                    <div className="d-flex align-items-start mb-2">
                                                                        <MapPin className="text-muted me-2 mt-1" size={16} />
                                                                        <span className="text-muted">{umkm.address}</span>
                                                                    </div>
                                                                )}
                                                            </div>

                                                            <p className="card-text text-dark">
                                                                {umkm.description || "Belum ada deskripsi"}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="card-footer bg-light border-0 py-3">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <small className="text-muted">ID: {umkm.id}</small>
                                                        <small className="text-muted">
                                                            Terdaftar: {new Date().toLocaleDateString('id-ID')}
                                                        </small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

import React, { useEffect, useState, useRef } from "react";
import { Card, Row, Col, Carousel, Container, ListGroup, Spinner, Badge, Button, Form, InputGroup, Image, Modal } from "react-bootstrap";
import { 
  MapPin, Store, Package, Users, TrendingUp, 
  Eye, Clock, ChevronRight, Building, ShoppingBag,
  Star, Activity, Calendar, Award, Search, Plus, BookOpen, Download, Check, AlertCircle, Play, Share2, Info,
  BarChart3, FileText, Settings, Bell, Grid, X, Menu, RefreshCw, Heart, ShoppingCart
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import HeaderComponent from "./navbarComponent";
import axios from "axios";
import { pdfjs, Document, Page } from "react-pdf";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import {API_URL} from "../api/api";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

export const DashboardPage = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [sites, setSites] = useState([]);
    const [umkms, setUmkms] = useState([]);
    const [potensis, setPotensis] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showGalleryModal, setShowGalleryModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [showModulModal, setShowModulModal] = useState(false);
    const navigator = useNavigate();
    const [imageUrl, setImageUrl] = useState(null);
    const [imageGalery, setImageGalery] = useState([]);
  const canvasRef = useRef(null);
  const location = useLocation();
    const pdfUrl = `${API_URL}/pdf/Modul_Pengoperasian_Komputer.pdf`;
    useEffect(() => {
    axios.get(`${API_URL}/api/galeri`)
        .then((res) => {
            const data = Array.isArray(res.data) ? res.data : res.data?.galeris ?? [];
            console.log("Galeri data:", data);
            setImageGalery(data);
        })
        .catch((err) => {
            console.error("Error fetching galeri:", err);
        });
}, []);

    useEffect(() => {
        const renderFirstPageAsImage = async () => {
        
        const loadingTask = pdfjsLib.getDocument(pdfUrl);
        const pdf = await loadingTask.promise;

        const page = await pdf.getPage(1);

        const viewport = page.getViewport({ scale: 1.5 }); // Ubah scale jika perlu
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const renderContext = {
            canvasContext: context,
            viewport: viewport,
        };

        await page.render(renderContext).promise;

        // Convert canvas to data URL (image)
        const dataUrl = canvas.toDataURL();
        setImageUrl(dataUrl);
        };

        renderFirstPageAsImage();
    }, [pdfUrl]);
    const navLinks = [
    { href: '#galeri', label: 'Galeri' },
    { href: '#modul', label: 'Modul' },
    { href: '#potensi', label: 'Potensi' },
    { href: '#umkm', label: 'UMKM' }
  ];
  const [isContentVisible, setIsContentVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Show content when scrolled past 50% of viewport height
      if (scrollPosition > windowHeight * 0.5) {
        setIsContentVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };
  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }
      }, 100);
    }
  }, [location.hash]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setTimeout(() => {
                    fetchPotensi();
                    fetchProducts();
                    fetchSites();
                    fetchImageGalery();
                    fetchUmkm();
                    setLoading(false);
                }, 1000);
            } catch (err) {
                console.error("Error fetching data:", err);
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    
    const fetchUmkm = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/umkms`);
            setUmkms(response.data);
        } catch (err) {
            console.error("Error fetching UMKM data:", err);
        }
    };

    const fetchSites = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/sites`);
            setSites(response.data);
        } catch (err) {
            console.error("Error fetching Sites data:", err);
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/products`);
            setProducts(response.data);
        } catch (err) {
            console.error("Error fetching Products data:", err);
        }
    };
    const fetchImageGalery = async () => {
        try{
            const response = await axios.get(`${API_URL}/api/galeri`);
            setImageGalery(response.data);
        }catch(err){
            console.error("Error fetching Image Gallery data:", err);
        }   
     };

    const fetchPotensi = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/potensi`);
            setPotensis(response.data);
        } catch (err) {
            console.error("Error fetching Potensi data:", err);
        }
    };

    // Filter function for search
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.umkm?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredUmkms = umkms.filter(umkm =>
        umkm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        umkm.owner_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" variant="primary" size="lg" className="mb-3" />
                <h5>Loading Dashboard Padukuhan Sumber...</h5>
                <p className="text-muted">Sedang memuat data...</p>
            </Container>
        );
    }

    const getCategoryVariant = (category) => {
        const variants = {
            'Kuliner': 'danger',
            'Kerajinan': 'primary',
            'Retail': 'success',
            'Jasa': 'warning',
            'Makanan': 'info'
        };
        return variants[category] || 'secondary';
    };

    const StatCard = ({ title, value, icon: Icon, variant, subtitle }) => (
        <Card className={`border-start border-${variant} border-4 shadow-sm h-100 hover-shadow`} style={{ transition: 'all 0.3s ease' }}>
            <Card.Body className="d-flex justify-content-between align-items-center">
                <div>
                    <Card.Title className="h6 text-muted mb-1">{title}</Card.Title>
                    <Card.Text className="h3 mb-1 fw-bold">{value}</Card.Text>
                    {subtitle && <small className="text-muted">{subtitle}</small>}
                </div>
                <div className={`bg-${variant} text-white p-3 rounded-circle`}>
                    <Icon size={24} />
                </div>
            </Card.Body>
        </Card>
    );

    const handleImageClick = (image) => {
        setSelectedImage(image);
        setShowGalleryModal(true);
    };


    // Get all images from products and sites
    const getAllImages = () => {
        const galeriImages = imageGalery.map(img => ({
            url: `${API_URL}/galeri/${img.gambar}` || "https://via.placeholder.com/400x250?text=No+Image",
            title: img.nama || "Gambar Galeri",
            subtitle: img.description || "Deskripsi Galeri",
            type: 'gallery'
        }));

        return [...galeriImages].filter(img => img.url !== "https://via.placeholder.com/400x250?text=No+Image");
    };

    return (
        <>
        <style>{`
        .hero-section {
          height: 100vh;
          background: linear-gradient(rgba(0, 30, 60, 0.5), rgba(0, 30, 60, 0.5)), 
                      url('${API_URL}/balai.png ');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        @media (max-width: 768px) {
        .hero-section {
            background-size: contain;
            background-repeat: no-repeat;
            background-position: top;
        }
        }
        .hero-content {
          text-align: center;
          color: white;
          z-index: 2;
          animation: fadeInUp 1.5s ease-out;
        }
        
        .hero-title {
          font-size: 4rem;
          font-weight: 700;
          text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.7);
          margin-bottom: 1rem;
          letter-spacing: 2px;
        }
        
        .hero-subtitle {
          font-size: 1.5rem;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
          margin-bottom: 2rem;
          opacity: 0.9;
        }
        
        .scroll-indicator {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          color: white;
          text-align: center;
          animation: bounce 2s infinite;
          cursor: pointer;
          z-index: 2;
        }
        
        .content-section {
          padding: 100px 0;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.8s ease-out;
        }
        
        .content-section.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .service-card {
          border: none;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          height: 100%;
        }
        
        .service-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }
        
        .card-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          display: block;
        }
        
        .section-title {
          position: relative;
          margin-bottom: 3rem;
        }
        
        .section-title::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 4px;
          background: linear-gradient(45deg, #007bff, #0056b3);
          border-radius: 2px;
        }
        
        .cta-card {
          background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
          border: none;
          border-radius: 20px;
          color: white;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(2rem);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateX(-50%) translateY(0);
          }
          40% {
            transform: translateX(-50%) translateY(-10px);
          }
          60% {
            transform: translateX(-50%) translateY(-5px);
          }
        }
        
        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }
          .hero-subtitle {
            font-size: 1.2rem;
          }
        }
      `}</style>
        <HeaderComponent currentPage="dashboard"/>
        <div className="bg-light min-vh-100">
            <section className="hero-section">
            <div className="hero-content">
                <h1 className="hero-title">Padukuhan Sumber</h1>
                
                <Button 
                variant="outline-light" 
                size="lg" 
                className="px-4 py-2 rounded-pill"
                onClick={scrollToContent}
                >
                Jelajahi Lebih Lanjut
                </Button>
            </div>
            
            <div className="scroll-indicator" onClick={scrollToContent}>
                <div className="fs-1 mb-2">↓</div>
                <small>Scroll ke bawah</small>
            </div>
            </section>
            <section id="potensi">
                    <Card className="mb-4 shadow">
                    
                    <Card.Body className="p-0">
                        {potensis.length > 0 ? (
                            <Carousel indicators={true} controls={true} interval={5000}>
                                {potensis.map((potensi, index) => { 
                                    const imageUrl = encodeURI(`${API_URL}/${potensi.gambar.trim()}`);

                                    return (
                                    <Carousel.Item key={index}>
                                        <div 
                                            className="d-block w-100 position-relative"
                                            style={{
                                                height: '400px',
                                                backgroundImage: `url("${imageUrl}")`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center'
                                            }}
                                        >
                                            <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"></div>
                                        </div>
                                        <Carousel.Caption className="position-absolute bottom-0 start-0 end-0 text-start p-4">
                                            <div className="bg-dark bg-opacity-75 p-3 rounded">
                                                <h5 className="text-white mb-2">{potensi.nama}</h5>

                                                <p className="text-white-50 mb-3">{potensi.deskripsi}</p>
                                                <p className="text-white-50 mb-3">Penanggung Jawab : {potensi.penanggung_jawab}</p>

                                            </div>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                )})}
                            </Carousel>
                        ) : (
                            <div className="text-center py-5">
                                <Award size={48} className="text-muted mb-3" />
                                <p className="text-muted">Belum ada data potensi.</p>
                            </div>
                        )}
                    </Card.Body>
                </Card>
                </section>



            
            <Container className="py-4">
                {/* Stats Cards */}
                <Row className="mb-4">
                    
                    <Col md={6} className="mb-3">
                        <div onClick={() => navigator('/umkm')} style={{ cursor: 'pointer' }}>
                            <StatCard
                                title="UMKM Aktif"
                                value={umkms.length}
                                icon={Store}
                                variant="success"
                                subtitle="Usaha beroperasi"
                            />
                        </div>
                    </Col>
                    <Col md={6} className="mb-3">
                        <div onClick={() => navigator('/product')} style={{ cursor: 'pointer' }}>
                            <StatCard
                                title="Produk Tersedia"
                                value={products.length}
                                icon={Package}
                                variant="info"
                                subtitle="Barang dijual"
                            />
                        </div>
                    </Col>
                </Row>


                {/* Sites Carousel */}
                

                {/* UMKM and Products */}
                <section id="umkm">
                        <Row className="mb-4">
                    {/* UMKM List */}
                    <Col lg={6} className="mb-4">
                        <Card className="shadow h-100">
                            <Card.Header className="bg-success text-white d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">
                                    <Store size={20} className="me-2" />
                                    Daftar UMKM
                                </h5>
                                <Button variant="outline-light" size="sm" onClick={() => navigator('/umkm')}>
                                    Lihat Semua
                                </Button>
                            </Card.Header>
                            <Card.Body className="p-0">
                                {(searchTerm ? filteredUmkms : umkms).length > 0 ? (
                                    <ListGroup variant="flush">
                                        {(searchTerm ? filteredUmkms : umkms).slice(0, 5).map((umkm) => (
                                            <ListGroup.Item 
                                                key={umkm.id} 
                                                className="d-flex justify-content-between align-items-start list-group-item-action" 
                                                onClick={() => navigator('/umkm', { state: { searchText: umkm.name } })}
                                                style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
                                            >
                                                <div className="flex-grow-1">
                                                    <h6 className="mb-1">{umkm.name}</h6>
                                                    <p className="mb-2 text-muted small">Pemilik: {umkm.owner_name}</p>
                                                    <div className="d-flex align-items-center gap-2">
                                                        <Badge bg={getCategoryVariant(umkm.category)}>
                                                            {umkm.category}
                                                        </Badge>
                                                        <div className="d-flex align-items-center">
                                                            <Star size={14} className="text-warning me-1" fill="currentColor" />
                                                            <small className="text-muted">{umkm.rating}</small>
                                                        </div>
                                                    </div>
                                                </div>
                                                <ChevronRight size={16} className="text-muted" />
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                ) : (
                                    <div className="text-center py-5">
                                        <Store size={48} className="text-muted mb-3" />
                                        <p className="text-muted">
                                            {searchTerm ? 'Tidak ditemukan UMKM yang sesuai.' : 'Belum ada UMKM terdaftar.'}
                                                       
                                        </p>
                                    </div>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Products List */}
                    <Col lg={6} className="mb-4">
                        <Card className="shadow h-100">
                            <Card.Header className="bg-info text-white d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">
                                    <Package size={20} className="me-2" />
                                    Produk UMKM Terbaru 
                                </h5>
                                <Button variant="outline-light" size="sm" onClick={() => navigator('/product')}>
                                    Lihat Semua
                                </Button>
                            </Card.Header>
                            <Card.Body className="p-0">
                                {(searchTerm ? filteredProducts : products).length > 0 ? (
                                    <ListGroup variant="flush">
                                        {(searchTerm ? filteredProducts : products).slice(0, 5).map((product) => (
                                            <ListGroup.Item 
                                                key={product.id} 
                                                onClick={() => navigator(`/product`, {state: { searchText: product.name } })}
                                                className="d-flex justify-content-between align-items-start list-group-item-action"
                                                style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
                                            >
                                                <div className="flex-grow-1">
                                                    <h6 className="mb-1">{product.name}</h6>
                                                    <p className="mb-2 text-muted small">dari {product.umkm?.name}</p>
                                                    <div className="d-flex align-items-center gap-2">
                                                        <Star size={14} className="text-warning me-1" fill="blue" />
                                                        <Badge bg={getCategoryVariant(product.category)}>
                                                            {product.category}
                                                        </Badge>
                                                    </div>
                                                </div>
                                                <ChevronRight size={16} className="text-muted" />
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                ) : (
                                    <div className="text-center py-5">
                                        <Package size={48} className="text-muted mb-3" />
                                        <p className="text-muted">
                                            {searchTerm ? 'Tidak ditemukan produk yang sesuai.' : 'Belum ada produk ditambahkan.'}
                                        </p>
                                    </div>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                </section>
                {/* State untuk modal modul - tambahkan di bagian useState */}
                {/* const [showModulModal, setShowModulModal] = useState(false); */}

                <section id="modul">
                    <Row>
                    {/* Enhanced Modul Pengoperasian Komputer Section */}
                <Card className="shadow mb-4">
                    <Card.Header className="bg-gradient-warning text-dark d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">
                            <BookOpen size={20} className="me-2" />
                            Modul Pengoperasian Komputer
                        </h5>
  
                    </Card.Header>
                    <Card.Body>
                        <Row className="align-items-center">
                            <Col lg={4}>
                                <div className="position-relative">
                                    <div className="border rounded shadow-sm overflow-hidden">
                                        <Document 
                                            file={pdfUrl} 
                                            onLoadSuccess={() => {}}
                                            loading={
                                                <div className="text-center p-4">
                                                    <div className="spinner-border text-primary" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </div>
                                                    <p className="mt-2 text-muted">Memuat PDF...</p>
                                                </div>
                                            }
                                            error={
                                                <div className="text-center p-4 text-danger">
                                                    <AlertCircle size={48} className="mb-3" />
                                                    <p>Gagal memuat PDF</p>
                                                </div>
                                            }
                                        >
                                            <Page 
                                                pageNumber={1} 
                                                scale={0.6} 
                                                renderAnnotationLayer={false} 
                                                renderTextLayer={false}
                                                className="w-100"
                                            />
                                        </Document>
                                    </div>
                                    <div className="position-absolute top-0 end-0 m-2">
                                        <Badge bg="primary" className="px-2 py-1">
                                            <FileText size={14} className="me-1" />
                                            PDF
                                        </Badge>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={8}>
                                <div className="ps-lg-4">
                                    <h4 className="mb-3 text-primary">Modul Pengoperasian Komputer</h4>
                                    <p className="text-muted mb-4">
                                        Panduan lengkap untuk mempelajari dasar-dasar pengoperasian komputer, 
                                        mulai dari pengenalan hardware hingga penggunaan software aplikasi.
                                    </p>
                                    
                                    <Row className="mb-4">
                                        <Col md={6}>
                                            <div className="d-flex align-items-center mb-3">
                                                <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-3">
                                                    <Users size={20} className="text-primary" />
                                                </div>
                                                <div>
                                                    <h6 className="mb-0">Target Pengguna</h6>
                                                    <small className="text-muted">Pemula - Menengah</small>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="d-flex align-items-center mb-3">
                                                <div className="bg-success bg-opacity-10 rounded-circle p-2 me-3">
                                                    <Clock size={20} className="text-success" />
                                                </div>
                                                <div>
                                                    <h6 className="mb-0">Estimasi Waktu</h6>
                                                    <small className="text-muted">2-3 Jam Belajar</small>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>

                                    <div className="mb-4">
                                        <h6 className="mb-3">
                                            <BookOpen size={16} className="me-2" />
                                            Materi yang Dipelajari:
                                        </h6>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <ul className="list-unstyled">
                                                    <li className="mb-2">
                                                        <Check size={16} className="text-success me-2" />
                                                        Pengenalan Hardware Komputer
                                                    </li>
                                                    <li className="mb-2">
                                                        <Check size={16} className="text-success me-2" />
                                                        Pengenalan Komputer
                                                    </li>
                                                    <li className="mb-2">
                                                        <Check size={16} className="text-success me-2" />
                                                        Microsoft Office Basic / Pembuatan Dokumen
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="col-md-6">
                                                <ul className="list-unstyled">
                                                    <li className="mb-2">
                                                        <Check size={16} className="text-success me-2" />
                                                        Penggunaan Internet
                                                    </li>
                                                    <li className="mb-2">
                                                        <Check size={16} className="text-success me-2" />
                                                        Pengoperasian File
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="d-flex gap-2 flex-wrap">
                                        <Button 
                                            variant="primary" 
                                            
                                            className="d-flex align-items-center"
                                            onClick={() => setShowModulModal(true)}
                                        >
                                            <Play size={16} className="me-2" />
                                            Mulai Belajar
                                        </Button>

                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                </Row>
                </section>

                
                {/* Enhanced Gallery Section */}
                <section id="galeri">
                    <Card className="shadow">
                    <Card.Header className="bg-gradient-secondary text-black d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">
                            <Grid size={20} className="me-2" />
                            Galeri Padukuhan Sumber
                        </h5>
                        <Button variant="outline-light" size="sm" onClick={() => setShowGalleryModal(true)}>
                            Lihat Semua
                        </Button>
                    </Card.Header>
                    <Card.Body>
                        {getAllImages().length > 0 ? (
                            <Row className="g-3">
                                {getAllImages().slice(0, 8).map((image, index) => (
                                    <Col md={3} key={index}>
                                        <div className="position-relative gallery-item">
                                            <Image
                                                src={image.url}
                                                className="w-100 rounded shadow-sm"
                                                style={{ 
                                                    height: '200px', 
                                                    objectFit: 'cover',
                                                    cursor: 'pointer',
                                                    transition: 'transform 0.3s ease'
                                                }}
                                                onClick={() => handleImageClick(image)}
                                                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                                                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                                                onError={(e) => {
                                                    e.target.src = "https://via.placeholder.com/400x250?text=Gambar+Tidak+Tersedia";
                                                }}
                                            />
                                            <div className="position-absolute bottom-0 start-0 end-0 bg-dark bg-opacity-75 text-white p-2 rounded-bottom">
                                                <small className="fw-bold d-block">{image.title}</small>
                                                
                                            </div>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        ) : (
                            <div className="text-center py-5">
                                <Grid size={48} className="text-muted mb-3" />
                                <p className="text-muted">Belum ada gambar dalam galeri.</p>
                            </div>
                        )}
                    </Card.Body>
                </Card>
                </section>
                {/* Modul Pengoperasian Komputer */}
                

                {/* Gallery Modal */}
                <Modal show={showGalleryModal} onHide={() => setShowGalleryModal(false)} size="lg" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <Grid size={20} className="me-2" />
                            Galeri Padukuhan Sumber
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row className="g-3">
                            {getAllImages().map((image, index) => (
                                <Col md={6} key={index}>
                                    
                                    <div className="position-relative">
                                        
                                        <Image
                                            src={image.url}
                                            className="w-100 rounded shadow-sm"
                                            style={{ 
                                                height: '250px', 
                                                objectFit: 'cover',
                                                cursor: 'pointer'
                                            }}
                                            onClick={() => handleImageClick(image)}
                                            onError={(e) => {
                                                e.target.src = "https://via.placeholder.com/400x250?text=Gambar+Tidak+Tersedia";
                                            }}
                                        />
                                        <div className="position-absolute bottom-0 start-0 end-0 bg-dark bg-opacity-75 text-white p-2 rounded-bottom">
                                           
                                            <small className="fw-bold d-block">{image.title}</small>
                                            <small className="text-white-50">{image.subtitle}</small>
                                        </div>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </Modal.Body>
                </Modal>

                {/* Image Preview Modal */}
                <Modal show={!!selectedImage} onHide={() => setSelectedImage(null)} size="lg" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedImage?.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="text-center">
                        {selectedImage && (
                            <div>
                                <Image
                                    src={selectedImage.url}
                                    className="img-fluid rounded shadow"
                                    style={{ maxHeight: '70vh' }}
                                />
                                <div className="mt-3">
                                    <h6>{selectedImage.title}</h6>
                                    
                                    <p className="text-muted">{selectedImage.subtitle}</p>
                                    <Badge bg={selectedImage.type === 'product' ? 'info' : 'primary'}>
                                        {selectedImage.type === 'product' ? 'Produk' : 'Tempat'}
                                    </Badge>
                                </div>
                            </div>
                        )}
                    </Modal.Body>
                </Modal>
                {/* Modul Detail Modal */}
                <Modal show={showModulModal} onHide={() => setShowModulModal(false)} size="xl" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <BookOpen size={20} className="me-2" />
                            Modul Pengoperasian Komputer - Detail
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col lg={8}>
                                <div className="border rounded">
                                    <Document 
                                        file={pdfUrl} 
                                        onLoadSuccess={() => {}}
                                        loading={
                                            <div className="text-center p-5">
                                                <div className="spinner-border text-primary mb-3" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                                <p className="text-muted">Memuat PDF...</p>
                                            </div>
                                        }
                                        error={
                                            <div className="text-center p-5 text-danger">
                                                <AlertCircle size={48} className="mb-3" />
                                                <p>Gagal memuat PDF</p>
                                                <Button variant="outline-primary" onClick={() => window.open(pdfUrl, '_blank')}>
                                                    Buka di Tab Baru
                                                </Button>
                                            </div>
                                        }
                                    >
                                        <Page 
                                            pageNumber={1} 
                                            scale={0.8} 
                                            renderAnnotationLayer={false} 
                                            renderTextLayer={false}
                                            className="w-100"
                                        />
                                    </Document>
                                </div>
                            </Col>
                            <Col lg={4}>
                                <div className="ps-lg-3">
                                    <h5 className="mb-3">Daftar Isi</h5>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <strong>Bab 1:</strong> Pengenalan Komputer
                                            </div>
                                            <Badge bg="primary">Hal 1-4</Badge>
                                        </ListGroup.Item>
                                        <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <strong>Bab 2:</strong> Hardware Komputer
                                            </div>
                                            <Badge bg="primary">Hal 5-8</Badge>
                                        </ListGroup.Item>
                                        <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <strong>Bab 3:</strong> Pengoperasian File
                                            </div>
                                            <Badge bg="primary">Hal 9-11</Badge>
                                        </ListGroup.Item>
                                        <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <strong>Bab 4:</strong> Pembuatan Dokumen / Microsoft Office
                                            </div>
                                            <Badge bg="primary">Hal 12-13</Badge>
                                        </ListGroup.Item>
                                        <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <strong>Bab 5:</strong> Penggunaan Internet
                                            </div>
                                            <Badge bg="primary">Hal 14-15</Badge>
                                        </ListGroup.Item>
                                        
                                    </ListGroup>

                                    <div className="mt-4 p-3 bg-light rounded">
                                        <h6 className="mb-2">
                                            <Info size={16} className="me-2" />
                                            Informasi Modul
                                        </h6>
                                        <small className="text-muted d-block mb-1">
                                            <Calendar size={14} className="me-1" />
                                            Terakhir diperbarui: Januari 2025
                                        </small>
                                        <small className="text-muted d-block mb-1">
                                            <FileText size={14} className="me-1" />
                                            Total halaman: 25
                                        </small>
                                        <small className="text-muted d-block mb-1">
                                            <Users size={14} className="me-1" />
                                            Level: Pemula - Menengah
                                        </small>
                                        <small className="text-muted d-block">
                                            <Award size={14} className="me-1" />
                                            Sertifikat: Tersedia
                                        </small>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModulModal(false)}>
                            Tutup
                        </Button>
                        <Button variant="primary" onClick={() => navigator('/module')}>
                            <Download size={16} className="me-2" />
                            Buka Modul
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </div>
        </>
    );
};
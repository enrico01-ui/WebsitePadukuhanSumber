import React, { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { 
    Card, 
    Row, 
    Col, 
    Container, 
    Button, 
    Spinner, 
    Alert, 
    Badge,
    Image,
    Placeholder,
    InputGroup,
    Form,
    Dropdown,
    Toast,
    ToastContainer
} from "react-bootstrap";
import { Search, Filter, Star, Eye, ShoppingCart, Heart, RefreshCw } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";
import HeaderComponent from "./navbarComponent";
import "./ProductStyle.css";
import { API_URL } from "../api/api";

export const ProductPage = () => {
    const location = useLocation();
    const searchText = location.state?.searchText || "";
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("name");
    const [favorites, setFavorites] = useState(new Set());
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const toast = {
        "produk umkm": "Produk UMKM",
}
    
    const url = `${API_URL}/product_image/`;

    useEffect(() => {
        setSearchTerm(searchText);
    }, [searchText]);
    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await axios.get(`${API_URL}/api/products`);
            setProducts(response.data);
            setFilteredProducts(response.data);
        } catch (err) {
            console.error("Error fetching products:", err);
            setError("Gagal memuat produk. Silakan coba lagi nanti.");
        } finally {
            setLoading(false);
        }
    }, []);

    // Initial fetch
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    // Filter and sort products
    useEffect(() => {
        let filtered = products;

        // Apply search filter
        if (searchTerm.trim()) {
            filtered = filtered.filter(product =>
                product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply sorting
        filtered.sort((a, b) => {
            switch (sortBy) {
                case "price-low":
                    return (a.price || 0) - (b.price || 0);
                case "price-high":
                    return (b.price || 0) - (a.price || 0);
                case "name":
                    return (a.name || "").localeCompare(b.name || "");
                case "featured":
                    return (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0);
                default:
                    return 0;
            }
        });

        setFilteredProducts(filtered);
    }, [products, searchTerm, sortBy]);

    const formatPrice = (price) => {
        if (!price) return "Harga tidak tersedia";
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price);
    };

    const handleFavorite = (productId) => {
        const newFavorites = new Set(favorites);
        if (newFavorites.has(productId)) {
            newFavorites.delete(productId);
            setToastMessage("Produk dihapus dari favorit");
        } else {
            newFavorites.add(productId);
            setToastMessage("Produk ditambahkan ke favorit");
        }
        setFavorites(newFavorites);
        setShowToast(true);
    };

    const handleAddToCart = (productId) => {
        // Add your cart logic here
        console.log("Add to cart:", productId);
        setToastMessage("Produk ditambahkan ke keranjang");
        setShowToast(true);
    };

    const calculateDiscount = (originalPrice, currentPrice) => {
        if (!originalPrice || !currentPrice || originalPrice <= currentPrice) return 0;
        return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
    };

    const LoadingCard = () => (
        <Col lg={4} md={6} className="mb-4">
            <Card className="shadow-sm h-100 border-0">
                <Placeholder as="div" animation="glow">
                    <Placeholder xs={12} style={{ height: '200px', backgroundColor: '#f8f9fa' }} />
                </Placeholder>
                <Card.Body>
                    <Placeholder as={Card.Title} animation="glow">
                        <Placeholder xs={8} />
                    </Placeholder>
                    <Placeholder as={Card.Text} animation="glow">
                        <Placeholder xs={6} />
                        <Placeholder xs={4} />
                    </Placeholder>
                    <div className="d-flex justify-content-between align-items-center">
                        <Placeholder xs={3} />
                        <Placeholder.Button variant="primary" xs={3} />
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );

    const ProductCard = ({ product }) => {
        const discount = calculateDiscount(product.original_price, product.price);
        
        return (
            <Col lg={4} md={6} className="mb-4">
                <Card className="shadow-sm h-100 border-0 product-card position-relative">
                    {/* Favorite Button */}
                    <Button
                        variant="light"
                        size="sm"
                        className="position-absolute top-0 end-0 m-2 rounded-circle shadow-sm"
                        style={{ zIndex: 10, width: '40px', height: '40px' }}
                        onClick={() => handleFavorite(product.id)}
                    >
                        <Heart
                            size={16}
                            className={favorites.has(product.id) ? "text-danger" : "text-muted"}
                            fill={favorites.has(product.id) ? "currentColor" : "none"}
                        />
                    </Button>

                    <div className="position-relative overflow-hidden">
                        <Image
                            src={`${url}${product.image_url}`}
                            className="card-img-top"
                            style={{ 
                                height: '200px', 
                                objectFit: 'cover',
                                transition: 'transform 0.3s ease'
                            }}
                        />
                        
                        {/* Badges */}
                        <div className="position-absolute top-0 start-0 m-2">
                            {product.is_featured && (
                                <Badge bg="warning" className="me-1 mb-1">
                                    <Star size={12} className="me-1" />
                                    Featured
                                </Badge>
                            )}
                            {discount > 0 && (
                                <Badge bg="danger" className="me-1 mb-1">
                                    -{discount}%
                                </Badge>
                            )}
                        </div>
                    </div>
                    
                    <Card.Body className="d-flex flex-column">
                        <Card.Title className="h5 mb-2 text-truncate" title={product.name}>
                            {product.name}
                        </Card.Title>
                        
                        {product.description && (
                            <Card.Text className="text-muted small mb-3 flex-grow-1">
                                {product.description.length > 100 
                                    ? `${product.description.substring(0, 100)}...` 
                                    : product.description
                                }
                            </Card.Text>
                        )}
                        
                        <div className="mt-auto">
                            
                            
                            <div className="d-flex gap-2">
                                <Button
                                    variant="outline-primary"
                                    size="sm"
                                    className="flex-fill"
                                    href={`https://wa.me/${product.umkm.contact ? product.umkm.contact.replace(/\D/g, '') : ''}`}
                                >
                                    <ShoppingCart size={14} className="me-1" />
                                    Pesan
                                </Button>
                                
                                <Link 
                                    to={`/products/${product.id}`}
                                    className="text-decoration-none flex-fill"
                                >
                                    <Button 
                                        variant="primary" 
                                        size="sm"
                                        className="w-100"
                                    >
                                        <Eye size={14} className="me-1" />
                                        Detail
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        );
    };

    if (loading) {
        return (
            <Container className="mt-4">
                <Row>
                    <Col>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h1 className="display-5 fw-bold text-primary">Produk UMKM</h1>
                            <Badge bg="secondary" className="fs-6">
                                <Spinner animation="border" size="sm" className="me-2" />
                                Loading...
                            </Badge>
                        </div>
                    </Col>
                </Row>
                <Row>
                    {[...Array(6)].map((_, index) => (
                        <LoadingCard key={index} />
                    ))}
                </Row>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-4">
                <Row>
                    <Col>
                        <h1 className="display-5 fw-bold text-primary mb-4">Produk UMKM</h1>
                        <Alert variant="danger" className="text-center">
                            <Alert.Heading>
                                <i className="bi bi-exclamation-triangle display-4 text-danger mb-3"></i>
                                <div>Oops! Terjadi kesalahan</div>
                            </Alert.Heading>
                            <p className="mb-0">{error}</p>
                            <hr />
                            <Button 
                                variant="outline-danger" 
                                onClick={fetchProducts}
                                className="mt-2"
                                disabled={loading}
                            >
                                <RefreshCw size={16} className="me-2" />
                                {loading ? "Memuat..." : "Coba Lagi"}
                            </Button>
                        </Alert>
                    </Col>
                </Row>
            </Container>
        );
    }

    return (
        <>
        < HeaderComponent />
        
        <Container className="mt-4">
            {/* Header */}
            <Row>
                <Col>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h1 className="display-5 fw-bold text-primary">Produk UMKM</h1>
                        <Badge bg="primary" className="fs-6">
                            {filteredProducts.length} dari {products.length} Produk
                        </Badge>
                    </div>
                </Col>
            </Row>

            {/* Search and Filter */}
            <Row className="mb-4">
                <Col lg={8}>
                    <InputGroup>
                        <InputGroup.Text>
                            <Search size={16} />
                        </InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Cari produk berdasarkan nama atau deskripsi..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </InputGroup>
                </Col>
                <Col lg={4}>
                    <Dropdown>
                        <Dropdown.Toggle variant="outline-secondary" className="w-100">
                            <Filter size={16} className="me-2" />
                            Urutkan: {
                                sortBy === "name" ? "Nama" :
                                
                                "Featured"
                            }
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="w-100">
                            <Dropdown.Item onClick={() => setSortBy("name")}>Nama</Dropdown.Item>
                            
                            <Dropdown.Item onClick={() => setSortBy("featured")}>Featured</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
                <Row className="justify-content-center">
                    <Col md={8} lg={6}>
                        <Card className="text-center shadow-sm border-0">
                            <Card.Body className="py-5">
                                <div className="mb-4">
                                    <i className="bi bi-box-seam display-1 text-muted"></i>
                                </div>
                                <Card.Title className="h3 text-muted">
                                    {searchTerm ? "Produk Tidak Ditemukan" : "Belum Ada Produk"}
                                </Card.Title>
                                <Card.Text className="text-muted">
                                    {searchTerm ? 
                                        `Tidak ada produk yang cocok dengan "${searchTerm}". Coba kata kunci lain.` :
                                        "Saat ini belum ada produk UMKM yang tersedia. Silakan periksa kembali nanti."
                                    }
                                </Card.Text>
                                {searchTerm ? (
                                    <Button 
                                        variant="outline-primary" 
                                        onClick={() => setSearchTerm("")}
                                        className="mt-3"
                                    >
                                        Hapus Filter
                                    </Button>
                                ) : (
                                    <Button 
                                        variant="outline-primary" 
                                        onClick={fetchProducts}
                                        className="mt-3"
                                    >
                                        Refresh Halaman
                                    </Button>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            ) : (
                <Row>
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </Row>
            )}

            {/* Toast Notifications */}
            <ToastContainer position="bottom-end" className="p-3">
                <Toast 
                    show={showToast} 
                    onClose={() => setShowToast(false)}
                    delay={3000}
                    autohide
                >
                    <Toast.Header>
                        <strong className="me-auto">Notifikasi</strong>
                    </Toast.Header>
                    <Toast.Body>{toastMessage}</Toast.Body>
                </Toast>
            </ToastContainer>
        </Container>
        </>
    );
};
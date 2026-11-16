import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
    Container, 
    Row, 
    Col, 
    Card, 
    Carousel, 
    Spinner, 
    Button, 
    Badge, 
    Alert,
    Breadcrumb,
    Image,
    ListGroup,
    Tab,
    Tabs,
    Placeholder
} from "react-bootstrap";
import "./DetailStyle.css";
import HeaderComponent from "./navbarComponent";
import axios from "axios";

export const DetailProductPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('description');

    useEffect(() => {
        setLoading(true);
        setError(null);
        
        axios.get(`${API_URL}/api/products/${id}`)
            .then(res => {
                setProduct(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching product:", err);
                setError("Gagal memuat detail produk. Silakan coba lagi nanti.");
                setLoading(false);
            });
    }, [id]);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price);
    };

    const handleContactUMKM = (contact) => {
        if (contact) {
            // Check if it's a phone number
            if (contact.match(/^[\d\s\-\+\(\)]+$/)) {
                window.open(`https://wa.me/${contact.replace(/\D/g, '')}`, '_blank');
            } else if (contact.includes('@')) {
                window.open(`mailto:${contact}`, '_blank');
            } else {
                // Copy to clipboard
                navigator.clipboard.writeText(contact);
                alert('Kontak disalin ke clipboard!');
            }
        }
    };

    const LoadingPlaceholder = () => (
        <Container className="mt-4">
            <Row>
                <Col>
                    <Placeholder as="div" animation="glow">
                        <Placeholder xs={6} size="lg" />
                    </Placeholder>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col lg={7}>
                    <Placeholder as="div" animation="glow">
                        <Placeholder xs={12} style={{ height: '400px' }} />
                    </Placeholder>
                </Col>
                <Col lg={5}>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Placeholder as="div" animation="glow">
                                <Placeholder xs={8} size="lg" />
                                <Placeholder xs={12} />
                                <Placeholder xs={12} />
                                <Placeholder xs={6} />
                            </Placeholder>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );

    if (loading) {
        return <LoadingPlaceholder />;
    }

    if (error) {
        return (
            <Container className="mt-4">
                <Row>
                    <Col>
                        <Alert variant="danger" className="text-center">
                            <Alert.Heading>Oops! Terjadi kesalahan</Alert.Heading>
                            <p>{error}</p>
                            <hr />
                            <div className="d-flex gap-2 justify-content-center">
                                <Button 
                                    variant="outline-danger" 
                                    onClick={() => window.location.reload()}
                                >
                                    Coba Lagi
                                </Button>
                                <Button 
                                    variant="outline-secondary" 
                                    onClick={() => navigate('/products')}
                                >
                                    Kembali ke Produk
                                </Button>
                            </div>
                        </Alert>
                    </Col>
                </Row>
            </Container>
        );
    }

    if (!product) {
        return (
            <Container className="mt-4">
                <Row className="justify-content-center">
                    <Col md={8} lg={6}>
                        <Card className="text-center shadow-sm">
                            <Card.Body className="py-5">
                                <div className="mb-4">
                                    <i className="bi bi-exclamation-triangle display-1 text-warning"></i>
                                </div>
                                <Card.Title className="h3 text-muted">
                                    Produk Tidak Ditemukan
                                </Card.Title>
                                <Card.Text className="text-muted">
                                    Produk yang Anda cari tidak tersedia atau telah dihapus.
                                </Card.Text>
                                <Button 
                                    variant="primary" 
                                    onClick={() => navigate('/products')}
                                    className="mt-3"
                                >
                                    Kembali ke Produk
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
    const url = `${API_URL}/product_image/`;
    return (
        <>
        < HeaderComponent />
        <Container className="mt-4">
            {/* Breadcrumb */}
            <Row>
                <Col>
                    <Breadcrumb>
                        <Breadcrumb.Item onClick={() => navigate('/')}>Home</Breadcrumb.Item>
                        <Breadcrumb.Item onClick={() => navigate('/product')}>Produk</Breadcrumb.Item>
                        <Breadcrumb.Item active>{product.name}</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>

            {/* Main Product Section */}
            <Row className="mt-3">
                {/* Product Image */}
                <Col lg={7} className="mb-4">
                    <Card className="shadow-sm border-0">
                        <div className="position-relative">
                            <Image
                                src={`${url}${product.image_url}` || "https://via.placeholder.com/800x400?text=No+Image"}
                                alt={product.name}
                                className="w-100 rounded"
                                style={{ 
                                    height: '400px', 
                                    objectFit: 'cover',
                                    cursor: 'pointer'
                                }}
                                onClick={() => window.open(product.image_url, '_blank')}
                                onError={(e) => {
                                    e.target.src = "https://via.placeholder.com/800x400?text=No+Image";
                                }}
                            />
                            {product.is_featured && (
                                <Badge 
                                    bg="warning" 
                                    className="position-absolute top-0 start-0 m-3 fs-6"
                                >
                                    Featured
                                </Badge>
                            )}
                        </div>
                    </Card>
                </Col>

                {/* Product Info */}
                <Col lg={5}>
                    <Card className="shadow-sm border-0 h-100">
                        <Card.Body className="p-4">
                            <div className="mb-3">
                                <h1 className="h2 fw-bold text-dark mb-2">{product.name}</h1>
                                {product.category && (
                                    <Badge bg="secondary" className="mb-3">{product.category}</Badge>
                                )}
                            </div>

                            <div className="mb-4">
                                <div className="d-flex align-items-center gap-2 mb-2">
                                    <span className="h3 text-primary fw-bold mb-0">
                                        {formatPrice(product.price)}
                                    </span>
                                    {product.original_price && product.original_price > product.price && (
                                        <span className="text-muted text-decoration-line-through">
                                            {formatPrice(product.original_price)}
                                        </span>
                                    )}
                                </div>
                                {product.original_price && product.original_price > product.price && (
                                    <Badge bg="success">
                                        Hemat {Math.round((1 - product.price / product.original_price) * 100)}%
                                    </Badge>
                                )}
                            </div>

                            {/* Stock Info */}
                            {product.stock !== undefined && (
                                <div className="mb-4">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span className="text-muted">Stok:</span>
                                        <Badge bg={product.stock > 0 ? "success" : "danger"}>
                                            {product.stock > 0 ? `${product.stock} tersedia` : 'Habis'}
                                        </Badge>
                                    </div>
                                </div>
                            )}

                            {/* UMKM Info */}
                            {product.umkm && (
                                <Card className="bg-light border-0 mb-4">
                                    <Card.Body className="p-3">
                                        <h6 className="fw-bold mb-2">
                                            <i className="bi bi-shop me-2"></i>
                                            Informasi UMKM
                                        </h6>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item className="bg-transparent p-0 mb-2">
                                                <strong>Nama:</strong> {product.umkm.name}
                                            </ListGroup.Item>
                                            {product.umkm.contact && (
                                                <ListGroup.Item className="bg-transparent p-0 mb-2">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <span><strong>Kontak:</strong> {product.umkm.contact}</span>

                                                    </div>
                                                </ListGroup.Item>
                                            )}
                                            {product.umkm.address && (
                                                <ListGroup.Item className="bg-transparent p-0">
                                                    <strong>Alamat:</strong> {product.umkm.address}
                                                </ListGroup.Item>
                                            )}
                                        </ListGroup>
                                    </Card.Body>
                                </Card>
                            )}

                            {/* Action Buttons */}
                            <div className="d-grid gap-2">
                                <Button
                                    variant="primary"
                                    size="lg"
                                    href={`https://wa.me/${product.umkm.contact ? product.umkm.contact.replace(/\D/g, '') : ''}`}
                                    disabled={product.stock === 0}
                                    
                                >
                                    <i className="bi bi-cart-plus me-2"></i>
                                    {product.stock === 0 ? 'Stok Habis' : 'Pesan Sekarang'}
                                </Button>
                                <Button
                                    variant="outline-secondary"
                                    onClick={() => navigate('/products')}
                                >
                                    <i className="bi bi-arrow-left me-2"></i>
                                    Kembali ke Produk
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Product Details Tabs */}
            <Row className="mt-5">
                <Col>
                    <Card className="shadow-sm border-0">
                        <Card.Body>
                            <Tabs
                                activeKey={activeTab}
                                onSelect={(k) => setActiveTab(k)}
                                className="mb-4"
                            >
                                <Tab eventKey="description" title="Deskripsi">
                                    <div className="py-3">
                                        {product.description ? (
                                            <div className="fs-6 text-muted" style={{ lineHeight: '1.6' }}>
                                                {product.description.split('\n').map((line, index) => (
                                                    <p key={index} className="mb-2">{line}</p>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-muted fst-italic">
                                                Tidak ada deskripsi untuk produk ini.
                                            </p>
                                        )}
                                    </div>
                                </Tab>
                                
                                <Tab eventKey="specifications" title="Spesifikasi">
                                    <div className="py-3">
                                        <ListGroup variant="flush">
                                            <ListGroup.Item className="d-flex justify-content-between">
                                                <strong>Nama Produk:</strong>
                                                <span>{product.name}</span>
                                            </ListGroup.Item>
                                            <ListGroup.Item className="d-flex justify-content-between">
                                                <strong>Harga:</strong>
                                                <span>{formatPrice(product.price)}</span>
                                            </ListGroup.Item>
                                            {product.category && (
                                                <ListGroup.Item className="d-flex justify-content-between">
                                                    <strong>Kategori:</strong>
                                                    <span>{product.category}</span>
                                                </ListGroup.Item>
                                            )}
                                            {product.weight && (
                                                <ListGroup.Item className="d-flex justify-content-between">
                                                    <strong>Berat:</strong>
                                                    <span>{product.weight}</span>
                                                </ListGroup.Item>
                                            )}
                                            {product.dimensions && (
                                                <ListGroup.Item className="d-flex justify-content-between">
                                                    <strong>Dimensi:</strong>
                                                    <span>{product.dimensions}</span>
                                                </ListGroup.Item>
                                            )}
                                        </ListGroup>
                                    </div>
                                </Tab>

                                {product.umkm && (
                                    <Tab eventKey="seller" title="Penjual">
                                        <div className="py-3">
                                            <Row>
                                                <Col md={6}>
                                                    <ListGroup variant="flush">
                                                        <ListGroup.Item>
                                                            <strong>Nama UMKM:</strong><br />
                                                            {product.umkm.name}
                                                        </ListGroup.Item>
                                                        {product.umkm.description && (
                                                            <ListGroup.Item>
                                                                <strong>Deskripsi:</strong><br />
                                                                {product.umkm.description}
                                                            </ListGroup.Item>
                                                        )}
                                                    </ListGroup>
                                                </Col>
                                                <Col md={6}>
                                                    <ListGroup variant="flush">
                                                        {product.umkm.owner_name && (
                                                            <ListGroup.Item>
                                                                <strong>Pemilik:</strong><br />
                                                                {product.umkm.owner_name}
                                                            </ListGroup.Item>
                                                        )}
                                                        {product.umkm.address && (
                                                            <ListGroup.Item>
                                                                <strong>Alamat:</strong><br />
                                                                {product.umkm.address}
                                                            </ListGroup.Item>
                                                        )}
                                                    </ListGroup>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Tab>
                                )}
                            </Tabs>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
        </>
    );
};
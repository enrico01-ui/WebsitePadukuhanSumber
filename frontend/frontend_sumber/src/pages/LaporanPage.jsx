import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button, Alert, Card, Form, Spinner } from "react-bootstrap";
import { Download, FileText, Calendar, Search } from "lucide-react";
import axios from "axios";

export const LaporanPage = () => {
    const [laporanData, setLaporanData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDate, setSelectedDate] = useState("");

    
    useEffect(() => {
    setLoading(true);
    axios.get("https://api.sumberplanjan.com/api/laporan")
        .then((response) => {
            setLaporanData(response.data); // pastikan struktur data dari API sesuai
            setFilteredData(response.data);
        })
        .catch((error) => {
            console.error("Gagal mengambil data laporan:", error);
        })
        .finally(() => {
            setLoading(false);
        });
}, []);


    useEffect(() => {
        // Filter data berdasarkan search term dan tanggal
        let filtered = laporanData;

        if (searchTerm) {
            filtered = filtered.filter(laporan =>
                laporan.nama_laporan.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedDate) {
            filtered = filtered.filter(laporan =>
                laporan.created_at.startsWith(selectedDate)
            );
        }

        setFilteredData(filtered);
    }, [searchTerm, selectedDate, laporanData]);

    const handleDownload = (laporan) => {
        // Simulasi download PDF
        setLoading(true);
        setTimeout(() => {
            // Dalam implementasi nyata, ini akan memanggil API untuk download file
            const link = document.createElement('a');
            link.href = `data:application/pdf;base64,`; // Dalam implementasi nyata, gunakan URL file yang sebenarnya
            link.download = laporan.file;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setLoading(false);
            
            // Show success message
            alert(`Download ${laporan.nama_laporan} berhasil!`);
        }, 1500);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <Container fluid className="py-4">
            <Row>
                <Col>
                    <Card className="shadow">
                        <Card.Header className="bg-primary text-white">
                            <div className="d-flex align-items-center">
                                <FileText className="me-2" size={24} />
                                <h4 className="mb-0">Daftar Laporan</h4>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            {/* Filter Section */}
                            <Row className="mb-4">
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            <Search size={16} className="me-1" />
                                            Cari Laporan
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Masukkan nama laporan..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            <Calendar size={16} className="me-1" />
                                            Filter Tanggal
                                        </Form.Label>
                                        <Form.Control
                                            type="date"
                                            value={selectedDate}
                                            onChange={(e) => setSelectedDate(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            {/* Table Section */}
                            {loading ? (
                                <div className="text-center py-5">
                                    <Spinner animation="border" variant="primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner>
                                    <p className="mt-3">Memuat data laporan...</p>
                                </div>
                            ) : filteredData.length > 0 ? (
                                <>
                                    <div className="table-responsive">
                                        <Table striped bordered hover>
                                            <thead className="table-dark">
                                                <tr>
                                                    <th className="text-center" style={{width: '60px'}}>#</th>
                                                    <th>Nama Laporan</th>
                                                    <th className="text-center" style={{width: '200px'}}>File</th>
                                                    <th className="text-center" style={{width: '180px'}}>Dibuat</th>
                                                    <th className="text-center" style={{width: '180px'}}>Diperbarui</th>
                                                    <th className="text-center" style={{width: '120px'}}>Aksi</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredData.map((laporan, index) => (
                                                    <tr key={laporan.id}>
                                                        <td className="text-center">{index + 1}</td>
                                                        <td>
                                                            <strong>{laporan.nama_laporan}</strong>
                                                        </td>
                                                        <td className="text-center">
                                                            <span className="badge bg-secondary mb-1">
                                                                <FileText size={14} className="me-1" />
                                                                PDF
                                                            </span>
                                                            <br />
                                                            <small className="text-muted">
                                                                {laporan.file}
                                                            </small>
                                                        </td>
                                                        <td className="text-center">
                                                            <small>{formatDate(laporan.created_at)}</small>
                                                        </td>
                                                        <td className="text-center">
                                                            <small>{formatDate(laporan.updated_at)}</small>
                                                        </td>
                                                        <td className="text-center">
                                                            <Button
                                                                variant="success"
                                                                size="sm"
                                                                onClick={() => handleDownload(laporan)}
                                                                disabled={loading}
                                                                className="d-flex align-items-center mx-auto"
                                                            >
                                                                <Download size={16} className="me-1" />
                                                                Download
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </div>

                                    {/* Summary */}
                                    <div className="mt-3">
                                        <small className="text-muted">
                                            Menampilkan {filteredData.length} dari {laporanData.length} laporan
                                            {searchTerm && ` dengan kata kunci "${searchTerm}"`}
                                            {selectedDate && ` pada tanggal ${selectedDate}`}
                                        </small>
                                    </div>
                                </>
                            ) : (
                                <Alert variant="info" className="text-center py-5">
                                    <div className="mb-3">
                                        <FileText size={48} className="text-muted" />
                                    </div>
                                    <Alert.Heading as="h5">Tidak ada laporan ditemukan</Alert.Heading>
                                    <p className="mb-0">
                                        Belum ada laporan yang tersedia saat ini.
                                    </p>
                                </Alert>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};
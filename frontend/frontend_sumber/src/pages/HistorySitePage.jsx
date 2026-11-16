import React, { useEffect, useState } from "react";
import { Card, Row, Col, Container, Spinner, Badge } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../api/api";

export const HistorySitePages = () => {
    const [historySites, setHistorySites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${API_URL}/api/sites`)
            .then((res) => {
                setHistorySites(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Gagal mengambil data history sites:", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-2">Memuat data tempat sejarah...</p>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <Row>
                <Col md={12}>
                    <h1 className="mb-4">Daftar Tempat Bersejarah</h1>
                </Col>
            </Row>

            <Row>
                {historySites.length > 0 ? (
                    historySites.map((site) => (
                        <Col md={6} lg={4} className="mb-4" key={site.id}>
                            <Card className="h-100 shadow-sm">
                                <Card.Img
                                    variant="top"
                                    src={site.image_url || "https://via.placeholder.com/400x200?text=No+Image"}
                                    alt={site.name}
                                    style={{ height: "200px", objectFit: "cover" }}
                                />
                                <Card.Body>
                                    <Card.Title>{site.name}</Card.Title>
                                    <Card.Text className="mb-2">{site.description}</Card.Text>
                                    <div className="d-flex flex-wrap gap-2">
                                        <Badge bg="info">Kategori: {site.type}</Badge>
                                        <Badge bg="secondary">Tahun: {site.year_established}</Badge>
                                        <Badge bg="dark">{site.location}</Badge>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <Col md={12}>
                        <p className="text-muted text-center">Belum ada data tempat sejarah.</p>
                    </Col>
                )}
            </Row>
        </Container>
    );
};

import React, { useState, useCallback, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCw, Download, Maximize2, SkipBack, SkipForward } from "lucide-react";

import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import HeaderComponent from "./navbarComponent";
import { API_URL } from "../api/api";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

export const PDFViewerPage = () => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [scale, setScale] = useState(1.0);
    const [rotation, setRotation] = useState(0);
    const [inputPage, setInputPage] = useState('1');
    const [isFullscreen, setIsFullscreen] = useState(false);

    // URL PDF dari Laravel
    const fileUrl = `${API_URL}/pdf/Modul_Pengoperasian_Komputer.pdf`;

    const onDocumentLoadSuccess = useCallback(({ numPages }) => {
        setNumPages(numPages);
        setPageNumber(1);
        setInputPage('1');
    }, []);

    const changePage = useCallback((newPageNumber) => {
        if (newPageNumber >= 1 && newPageNumber <= numPages) {
            setPageNumber(newPageNumber);
            setInputPage(newPageNumber.toString());
        }
    }, [numPages]);

    const nextPage = () => changePage(pageNumber + 1);
    const prevPage = () => changePage(pageNumber - 1);
    const firstPage = () => changePage(1);
    const lastPage = () => changePage(numPages);

    const handlePageInputChange = (e) => {
        const value = e.target.value;
        setInputPage(value);
        
        const pageNum = parseInt(value);
        if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= numPages) {
            setPageNumber(pageNum);
        }
    };

    const handlePageInputKeyPress = (e) => {
        if (e.key === 'Enter') {
            const pageNum = parseInt(inputPage);
            if (!isNaN(pageNum)) {
                changePage(pageNum);
            }
        }
    };

    const zoomIn = () => setScale(prev => Math.min(prev + 0.25, 3.0));
    const zoomOut = () => setScale(prev => Math.max(prev - 0.25, 0.5));
    const setZoomLevel = (level) => setScale(level);
    const fitToWidth = () => setScale(1.2);
    const fitToPage = () => setScale(0.8);

    const rotateClockwise = () => setRotation(prev => (prev + 90) % 360);

    const downloadPDF = () => {
        const downloadUrl = `${API_URL}/pdf-download/Modul_Pengoperasian_Komputer.pdf`;
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', 'Modul_Pengoperasian_Komputer.pdf');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Don't trigger shortcuts when typing in input field
            if (e.target.tagName === 'INPUT') return;
            
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    prevPage();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    nextPage();
                    break;
                case 'Home':
                    e.preventDefault();
                    firstPage();
                    break;
                case 'End':
                    e.preventDefault();
                    lastPage();
                    break;
                case '+':
                case '=':
                    e.preventDefault();
                    zoomIn();
                    break;
                case '-':
                    e.preventDefault();
                    zoomOut();
                    break;
                case 'r':
                case 'R':
                    e.preventDefault();
                    rotateClockwise();
                    break;
                case 'f':
                case 'F':
                    e.preventDefault();
                    toggleFullscreen();
                    break;
                case 'd':
                case 'D':
                    if (e.ctrlKey) {
                        e.preventDefault();
                        downloadPDF();
                    }
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [pageNumber, numPages, scale]);

    const scaleOptions = [
        { value: 0.5, label: '50%' },
        { value: 0.75, label: '75%' },
        { value: 1.0, label: '100%' },
        { value: 1.25, label: '125%' },
        { value: 1.5, label: '150%' },
        { value: 2.0, label: '200%' },
    ];

    return (
        <>
            <HeaderComponent />
            {/* Bootstrap CSS */}
            <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css" rel="stylesheet" />
            
            <div className={`${isFullscreen ? 'vh-100' : 'min-vh-100'} bg-light`}>
                {/* Header */}
                <div className="bg-white border-bottom shadow-sm sticky-top">
                    <div className="container-fluid py-3">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <div>
                                <h2 className="mb-0 text-primary">📄 Modul Pengoperasian Komputer</h2>
                                <small className="text-muted">SKRIPSI_Fatimah_Aria_Utami-min.pdf</small>
                            </div>
                            <button 
                                onClick={toggleFullscreen}
                                className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1"
                            >
                                <Maximize2 size={16} />
                                {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                            </button>
                        </div>

                        {/* Toolbar */}
                        <div className="d-flex flex-wrap gap-2 align-items-center">
                            {/* Navigation Controls */}
                            <div className="btn-group" role="group">
                                <button 
                                    onClick={firstPage} 
                                    disabled={pageNumber <= 1}
                                    className="btn btn-outline-secondary btn-sm"
                                    title="First Page"
                                >
                                    <SkipBack size={16} />
                                </button>
                                <button 
                                    onClick={prevPage} 
                                    disabled={pageNumber <= 1}
                                    className="btn btn-outline-secondary btn-sm"
                                    title="Previous Page"
                                >
                                    <ChevronLeft size={16} />
                                </button>
                                <button 
                                    onClick={nextPage} 
                                    disabled={pageNumber >= numPages}
                                    className="btn btn-outline-secondary btn-sm"
                                    title="Next Page"
                                >
                                    <ChevronRight size={16} />
                                </button>
                                <button 
                                    onClick={lastPage} 
                                    disabled={pageNumber >= numPages}
                                    className="btn btn-outline-secondary btn-sm"
                                    title="Last Page"
                                >
                                    <SkipForward size={16} />
                                </button>
                            </div>

                            {/* Page Input */}
                            <div className="input-group" style={{ width: '140px' }}>
                                <input
                                    type="number"
                                    value={inputPage}
                                    onChange={handlePageInputChange}
                                    onKeyPress={handlePageInputKeyPress}
                                    min="1"
                                    max={numPages}
                                    className="form-control form-control-sm text-center"
                                />
                                <span className="input-group-text">/ {numPages}</span>
                            </div>

                            {/* Zoom Controls */}
                            <div className="btn-group" role="group">
                                <button 
                                    onClick={zoomOut}
                                    disabled={scale <= 0.5}
                                    className="btn btn-outline-secondary btn-sm"
                                    title="Zoom Out"
                                >
                                    <ZoomOut size={16} />
                                </button>
                                <div className="dropdown">
                                    <button 
                                        className="btn btn-outline-secondary btn-sm dropdown-toggle"
                                        type="button"
                                        data-bs-toggle="dropdown"
                                        style={{ minWidth: '70px' }}
                                    >
                                        {Math.round(scale * 100)}%
                                    </button>
                                    <ul className="dropdown-menu">
                                        {scaleOptions.map((option) => (
                                            <li key={option.value}>
                                                <button
                                                    className={`dropdown-item ${scale === option.value ? 'active' : ''}`}
                                                    onClick={() => setZoomLevel(option.value)}
                                                >
                                                    {option.label}
                                                </button>
                                            </li>
                                        ))}
                                        <li><hr className="dropdown-divider" /></li>
                                        <li>
                                            <button className="dropdown-item" onClick={fitToWidth}>
                                                Fit to Width
                                            </button>
                                        </li>
                                        <li>
                                            <button className="dropdown-item" onClick={fitToPage}>
                                                Fit to Page
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                                <button 
                                    onClick={zoomIn}
                                    disabled={scale >= 3.0}
                                    className="btn btn-outline-secondary btn-sm"
                                    title="Zoom In"
                                >
                                    <ZoomIn size={16} />
                                </button>
                            </div>

                            {/* Other Controls */}
                            <div className="btn-group" role="group">
                                <button 
                                    onClick={rotateClockwise}
                                    className="btn btn-outline-info btn-sm"
                                    title="Rotate (R)"
                                >
                                    <RotateCw size={16} />
                                </button>
                                <button 
                                    onClick={downloadPDF}
                                    className="btn btn-outline-success btn-sm"
                                    title="Download PDF (Ctrl+D)"
                                >
                                    <Download size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* PDF Content */}
                <div className="container-fluid py-4">
                    <div className="row justify-content-center">
                        <div className="col-12 d-flex justify-content-center">
                            <div className="bg-white shadow-lg rounded-3 overflow-hidden">
                                <Document
                                    file={fileUrl}
                                    onLoadSuccess={onDocumentLoadSuccess}
                                    loading={
                                        <div className="text-center p-5">
                                            <div className="spinner-border text-primary mb-3" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                            <p className="text-muted">Memuat PDF...</p>
                                        </div>
                                    }
                                    error={
                                        <div className="text-center p-5">
                                            <div className="alert alert-danger" role="alert">
                                                <h5 className="alert-heading">❌ Gagal memuat PDF</h5>
                                                <p className="mb-0">Pastikan file PDF tersedia dan dapat diakses</p>
                                            </div>
                                        </div>
                                    }
                                >
                                    <Page
                                        pageNumber={pageNumber}
                                        scale={scale}
                                        rotate={rotation}
                                        renderAnnotationLayer={false}
                                        renderTextLayer={false}
                                        className="mx-auto"
                                    />
                                </Document>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Page Navigation */}
                {numPages && numPages > 5 && (
                    <div className="bg-white border-top shadow-sm sticky-bottom">
                        <div className="container-fluid py-3">
                            <div className="d-flex justify-content-center">
                                <div className="d-flex gap-1 flex-wrap">
                                    {Array.from({ length: Math.min(15, numPages) }, (_, i) => {
                                        const pageNum = i + 1;
                                        const isActive = pageNum === pageNumber;
                                        return (
                                            <button
                                                key={pageNum}
                                                onClick={() => changePage(pageNum)}
                                                className={`btn btn-sm ${
                                                    isActive ? 'btn-primary' : 'btn-outline-secondary'
                                                }`}
                                                style={{ minWidth: '40px' }}
                                            >
                                                {pageNum}
                                            </button>
                                        );
                                    })}
                                    {numPages > 15 && (
                                        <>
                                            <span className="px-2 py-1 text-muted">...</span>
                                            <button
                                                onClick={() => changePage(numPages)}
                                                className={`btn btn-sm ${
                                                    pageNumber === numPages ? 'btn-primary' : 'btn-outline-secondary'
                                                }`}
                                                style={{ minWidth: '40px' }}
                                            >
                                                {numPages}
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Keyboard Shortcuts Tooltip */}
                <div className="position-fixed bottom-0 end-0 m-3">
                    <div className="bg-dark text-white p-3 rounded-3 shadow" style={{ fontSize: '0.75rem', opacity: 0.8 }}>
                        <div className="fw-bold mb-1">⌨️ Keyboard Shortcuts:</div>
                        <div>← → Arrow keys: Navigate pages</div>
                        <div>+ -: Zoom in/out</div>
                        <div>R: Rotate • F: Fullscreen</div>
                        <div>Ctrl+D: Download</div>
                    </div>
                </div>
            </div>

            {/* Bootstrap JS */}
            <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js"></script>
        </>
    );
};
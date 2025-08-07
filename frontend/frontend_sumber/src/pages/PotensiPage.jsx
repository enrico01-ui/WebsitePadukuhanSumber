import React from "react";
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

export const PotensiPage = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("name");
    const [favorites, setFavorites] = useState(new Set());
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    return (
        <Container className="mt-2">
            
        </Container>
    );

};
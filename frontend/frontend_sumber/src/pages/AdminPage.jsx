import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Button, Form, Modal, Tabs, Tab, Card, Alert } from 'react-bootstrap';
import axios from 'axios';
import { API_URL } from '../api/api';

const AdminPage = () => {
  // === UMKM STATE ===
  const [umkms, setUmkms] = useState([]);
  const [newUmkm, setNewUmkm] = useState({ name: '', owner_name: '', contact: '', address: '', description: '' });
  const [editUmkm, setEditUmkm] = useState(null);

  // === PRODUCT STATE ===
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ nama: '', deskripsi: '', penanggung_jawab: '', gambar: '', jenis: '' });
  const [editProduct, setEditProduct] = useState(null);

  // === POTENSI STATE ===
  const [potensis, setPotensis] = useState([]);
  const [newPotensi, setNewPotensi] = useState({ nama: '', deskripsi: '', penanggung_jawab: '', gambar: '', jenis: '' });
  const [editPotensi, setEditPotensi] = useState(null);

  // === SITE STATE ===
  const [galeris, setGaleris] = useState([]);
  const [newGaleri, setNewGaleri] = useState({ nama: '', gambar: null });
  const [editGaleri, setEditGaleri] = useState(null);

  // === UI STATE ===
  const [activeTab, setActiveTab] = useState('umkm');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const [newLaporan, setNewLaporan] = useState({ nama_laporan: '', file: null });
const [editLaporan, setEditLaporan] = useState(null);



  const endpoint = `${API_URL}/admin-khusus-sumber-87sdn83n4s`;

  useEffect(() => {
    loadData();
  }, []);

  const [laporans, setLaporans] = useState([]);

const loadData = async () => {
  try {
    const [umkmRes, productRes, potensiRes, galeriRes, laporanRes] = await Promise.all([
      axios.get(`${endpoint}/umkms`),
      axios.get(`${endpoint}/products`),
      axios.get(`${endpoint}/potensi`),
      axios.get(`${endpoint}/galeri`),
      axios.get(`${endpoint}/laporan`) // <-- tambahkan ini
    ]);
    setUmkms(umkmRes.data);
    setProducts(productRes.data);
    setPotensis(potensiRes.data);
    setGaleris(galeriRes.data);
    setLaporans(laporanRes.data); // <-- ini
  } catch (error) {
    console.error('Error loading data:', error);
  }
};


  // === UMKM CRUD ===
  const handleUmkmSave = async () => {
    try {
      if (editUmkm) {
        await axios.put(`${endpoint}/umkms/${editUmkm.id}`, newUmkm);
        setEditUmkm(null);
      } else {
        await axios.post(`${endpoint}/umkms`, newUmkm);
      }
      
      const res = await axios.get(`${endpoint}/umkms`);
      setUmkms(res.data);
      setNewUmkm({ name: '', owner_name: '', contact: '', address: '', description: '' });
      setShowModal(false);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving UMKM:', error);
    }
  };

  const handleUmkmDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      try {
        await axios.delete(`${endpoint}/umkms/${id}`);
        setUmkms(umkms.filter(item => item.id !== id));
      } catch (error) {
        console.error('Error deleting UMKM:', error);
      }
    }
  };

  // === PRODUCT CRUD ===
  const handleProductSave = async () => {
  try {
    const formData = new FormData();
    formData.append('nama', newProduct.nama);
    formData.append('deskripsi', newProduct.deskripsi);
    formData.append('penanggung_jawab', newProduct.penanggung_jawab);
    formData.append('jenis', newProduct.jenis);
    if (newProduct.gambar) {
      formData.append('gambar', newProduct.gambar);
    }

    if (editProduct) {
      await axios.post(`${endpoint}/products/${editProduct.id}?_method=PUT`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setEditProduct(null);
    } else {
      await axios.post(`${endpoint}/products`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    }

    const res = await axios.get(`${endpoint}/products`);
    setProducts(res.data);
    setNewProduct({ nama: '', deskripsi: '', penanggung_jawab: '', gambar: null, jenis: '' });
    setShowModal(false);
    setIsEditing(false);
  } catch (error) {
    console.error('Error saving product:', error);
  }
};


  const handleProductDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      try {
        await axios.delete(`${endpoint}/products/${id}`);
        setProducts(products.filter(item => item.id !== id));
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  // === POTENSI CRUD ===
  const handlePotensiSave = async () => {
    try {
      if (editPotensi) {
        await axios.put(`${endpoint}/potensi/${editPotensi.id}`, newPotensi);
        setEditPotensi(null);
      } else {
        await axios.post(`${endpoint}/potensi`, newPotensi);
      }
      
      const res = await axios.get(`${endpoint}/potensi`);
      setPotensis(res.data);
      setNewPotensi({ nama: '', deskripsi: '', penanggung_jawab: '', gambar: null, jenis: '' });
      setShowModal(false);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving potensi:', error);
    }
  };

  const handlePotensiDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      try {
        await axios.delete(`${endpoint}/potensi/${id}`);
        setPotensis(potensis.filter(item => item.id !== id));
      } catch (error) {
        console.error('Error deleting potensi:', error);
      }
    }
  };

 const handleGaleriSave = async () => {
  try {
    const formData = new FormData();
    formData.append('nama', newGaleri.nama);
    if (newGaleri.gambar) {
      formData.append('gambar', newGaleri.gambar);
    }

    if (editGaleri) {
      await axios.post(`${endpoint}/galeri/${editGaleri.id}?_method=PUT`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setEditGaleri(null);
    } else {
      await axios.post(`${endpoint}/galeri`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    }

    const res = await axios.get(`${endpoint}/galeri`);
    setGaleris(res.data);
    setNewGaleri({ nama: '', gambar: null });
    setShowModal(false);
    setIsEditing(false);
  } catch (error) {
    console.error('Error saving galeri:', error);
  }
};
const handleLaporanDelete = async (id) => {
  if (window.confirm('Hapus laporan ini?')) {
    try {
      await axios.delete(`${endpoint}/laporan/${id}`);
      setLaporans(laporans.filter(l => l.id !== id));
    } catch (error) {
      console.error('Gagal menghapus laporan:', error);
    }
  }
};



  const handleGaleriDelete = async (id) => {
  if (window.confirm('Apakah Anda yakin ingin menghapus gambar ini?')) {
    try {
      await axios.delete(`${endpoint}/galeri/${id}`);
      setGaleris(galeris.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting galeri:', error);
    }
  }
};


  // === MODAL HANDLERS ===
  const openAddModal = (type) => {
    setModalType(type);
    setIsEditing(false);
    setShowModal(true);
    
    // Reset forms
    switch(type) {
      case 'umkm':
        setNewUmkm({ name: '', owner_name: '', contact: '', address: '', description: '' });
        break;
      case 'product':
        setNewProduct({ nama: '', deskripsi: '', penanggung_jawab: '', gambar: null, jenis: '' });
        break;
      case 'potensi':
        setNewPotensi({ nama: '', deskripsi: '', penanggung_jawab: '', gambar: null, jenis: '' });
        break;
      case 'galeri':
        setNewGaleri({ nama: '', gambar: null });
        break;
      case 'laporan':
        setNewLaporan({ nama_laporan: '', file: null });
        break;

      
    }
  };

  const openEditModal = (type, item) => {
    setModalType(type);
    setIsEditing(true);
    setShowModal(true);
    
    switch(type) {
      case 'umkm':
        setEditUmkm(item);
        setNewUmkm({ ...item });
        break;
      case 'product':
        setEditProduct(item);
        setNewProduct({ ...item });
        break;
      case 'potensi':
        setEditPotensi(item);
        setNewPotensi({ ...item });
        break;
      case 'galeri':
        setEditGaleri(item);
        setNewGaleri({ nama: item.nama, gambar: null });
        break;
      case 'laporan':
        setEditLaporan(item);
        setNewGaleri({nama_laporan: item.nama_laporan, })
    }
  };
  const handleLaporanSave = async () => {
    try {
      const formData = new FormData();
      formData.append('nama_laporan', newLaporan.nama_laporan);
      formData.append('file', newLaporan.file);

      if(editLaporan){
        await axios.post(`${endpoint}/laporan/${editLaporan.id}?_method=PUT`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      }else{
        await axios.post(`${endpoint}/laporan`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      }

      const res = await axios.get(`${endpoint}/laporan`);
      setLaporans(res.data);
      setNewLaporan({ nama: '', file: null });
      setShowModal(false);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving laporan:', error);
    }
  };

  const handleModalSave = () => {
    switch(modalType) {
      case 'umkm':
        handleUmkmSave();
        break;
      case 'product':
        handleProductSave();
        break;
      case 'potensi':
        handlePotensiSave();
        break;
      case 'galeri':
        handleGaleriSave();
        break;
      case 'laporan':
        handleLaporanSave();
        break;

    }
  };

  const getModalFields = () => {
    switch(modalType) {
      case 'umkm':
        return [
          { key: 'name', label: 'Nama UMKM', value: newUmkm.name },
          { key: 'owner_name', label: 'Nama Pemilik', value: newUmkm.owner_name },
          { key: 'contact', label: 'Kontak', value: newUmkm.contact },
          { key: 'address', label: 'Alamat', value: newUmkm.address },
          { key: 'description', label: 'Deskripsi', value: newUmkm.description, type: 'textarea' }
        ];
      case 'product':
        return [
          { key: 'nama', label: 'Nama Produk', value: newProduct.nama },
          { key: 'deskripsi', label: 'Deskripsi', value: newProduct.deskripsi, type: 'textarea' },
          { key: 'penanggung_jawab', label: 'Penanggung Jawab', value: newProduct.penanggung_jawab },
          { key: 'gambar', label: 'Gambar', type: 'file' },
          { key: 'jenis', label: 'Jenis', value: newProduct.jenis }
        ];
      case 'potensi':
        return [
          { key: 'nama', label: 'Nama Potensi', value: newPotensi.nama },
          { key: 'deskripsi', label: 'Deskripsi', value: newPotensi.deskripsi, type: 'textarea' },
          { key: 'penanggung_jawab', label: 'Penanggung Jawab', value: newPotensi.penanggung_jawab },
          { key: 'gambar', label: 'Gambar', type: 'file' },
          { key: 'jenis', label: 'Jenis', value: newPotensi.jenis }
        ];
      case 'galeri':
        return [
          { key: 'nama', label: 'Nama Gambar', value: newGaleri.nama },
          { key: 'gambar', label: 'Upload Gambar', type: 'file' }
        ];
      case 'laporan':
        return [
          { key: 'nama_laporan', label: 'Nama Laporan', value: newLaporan.nama_laporan },
          { key: 'file', label: 'Upload File (PDF)', type: 'file' }
        ];

      default:
        return [];
    }
  };

  const handleFieldChange = (key, value) => {
    switch(modalType) {
      case 'umkm':
        setNewUmkm({ ...newUmkm, [key]: value });
        break;
      case 'product':
        if (key === 'gambar') {
          setNewProduct({ ...newProduct, gambar: value.target.files[0] });
        } else {
          setNewProduct({ ...newProduct, [key]: value });
        }
        break;
      case 'potensi':
        setNewPotensi({ ...newPotensi, [key]: value });
        break;
      case 'galeri':
      if (key === 'gambar') {
        setNewGaleri({ ...newGaleri, gambar: value.target.files[0] });
      } else {
        setNewGaleri({ ...newGaleri, [key]: value });
      }
      case 'laporan':
      if (key === 'file') {
        setNewLaporan({ ...newLaporan, file: value.target.files[0] });
      } else {
        setNewLaporan({ ...newLaporan, [key]: value });
      }
  break;

      break;
    }
  };

  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col>
          <h2 className="text-center mb-0">Dashboard Admin</h2>
          <p className="text-center text-muted">Kelola data UMKM, Produk, Potensi, site dan laporan</p>
        </Col>
      </Row>

      <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-4">
        <Tab eventKey="umkm" title={`UMKM (${umkms?.length})`}>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Manajemen UMKM</h5>
              <Button variant="primary" onClick={() => openAddModal('umkm')}>
                + Tambah UMKM
              </Button>
            </Card.Header>
            <Card.Body>
              {umkms.length === 0 ? (
                <Alert variant="info">Belum ada data UMKM</Alert>
              ) : (
                <Table responsive striped bordered hover>
                  <thead className="table-dark">
                    <tr>
                      <th width="5%">#</th>
                      <th width="20%">Nama UMKM</th>
                      <th width="15%">Pemilik</th>
                      <th width="15%">Kontak</th>
                      <th width="25%">Alamat</th>
                      <th width="15%">Deskripsi</th>
                      <th width="10%">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {umkms.map((item, i) => (
                      <tr key={item.id}>
                        <td>{i + 1}</td>
                        <td><strong>{item.name}</strong></td>
                        <td>{item.owner_name}</td>
                        <td>{item.contact}</td>
                        <td>{item.address}</td>
                        <td>{item.description?.substring(0, 50)}{item.description?.length > 50 ? '...' : ''}</td>
                        <td>
                          <Button
                            size="sm"
                            variant="outline-warning"
                            className="me-2"
                            onClick={() => openEditModal('umkm', item)}
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline-danger"
                            onClick={() => handleUmkmDelete(item.id)}
                          >
                            Hapus
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="products" title={`Produk (${products.length})`}>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Manajemen Produk</h5>
              <Button variant="primary" onClick={() => openAddModal('product')}>
                + Tambah Produk
              </Button>
            </Card.Header>
            <Card.Body>
              {products.length === 0 ? (
                <Alert variant="info">Belum ada data produk</Alert>
              ) : (
                <Table responsive striped bordered hover>
                  <thead className="table-dark">
                    <tr>
                      <th width="5%">#</th>
                      <th width="20%">Nama</th>
                      <th width="25%">Deskripsi</th>
                      <th width="15%">Penanggung Jawab</th>
                      <th width="15%">Jenis</th>
                      <th width="10%">Gambar</th>
                      <th width="10%">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((item, i) => (
                      <tr key={item.id}>
                        <td>{i + 1}</td>
                        <td><strong>{item.name}</strong></td>
                        <td>{item.description.substring(0, 50)}{item.description.length > 50 ? '...' : ''}</td>
                        <td>{item.price}</td>
                        <td>{item.umkm.name}</td>
                        <td>{item.image_url ? '✓' : '✗'}</td>
                        <td>
                          <Button
                            size="sm"
                            variant="outline-warning"
                            className="me-2"
                            onClick={() => openEditModal('product', item)}
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline-danger"
                            onClick={() => handleProductDelete(item.id)}
                          >
                            Hapus
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="potensi" title={`Potensi (${potensis.length})`}>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Manajemen Potensi</h5>
              <Button variant="primary" onClick={() => openAddModal('potensi')}>
                + Tambah Potensi
              </Button>
            </Card.Header>
            <Card.Body>
              {potensis.length === 0 ? (
                <Alert variant="info">Belum ada data potensi</Alert>
              ) : (
                <Table responsive striped bordered hover>
                  <thead className="table-dark">
                    <tr>
                      <th width="5%">#</th>
                      <th width="20%">Nama</th>
                      <th width="25%">Deskripsi</th>
                      <th width="15%">Penanggung Jawab</th>
                      <th width="15%">Jenis</th>
                      <th width="10%">Gambar</th>
                      <th width="10%">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {potensis.map((item, i) => (
                      <tr key={item.id}>
                        <td>{i + 1}</td>
                        <td><strong>{item.nama}</strong></td>
                        <td>{item.deskripsi?.substring(0, 50)}{item.deskripsi?.length > 50 ? '...' : ''}</td>
                        <td>{item.penanggung_jawab}</td>
                        <td>{item.jenis}</td>
                        <td>{item.gambar ? '✓' : '✗'}</td>
                        <td>
                          <Button
                            size="sm"
                            variant="outline-warning"
                            className="me-2"
                            onClick={() => openEditModal('potensi', item)}
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline-danger"
                            onClick={() => handlePotensiDelete(item.id)}
                          >
                            Hapus
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="galeri" title={`Galeri (${galeris.length})`}>
  <Card>
    <Card.Header className="d-flex justify-content-between align-items-center">
      <h5 className="mb-0">Manajemen Galeri</h5>
      <Button variant="primary" onClick={() => openAddModal('galeri')}>
        + Tambah Gambar
      </Button>
    </Card.Header>
    <Card.Body>
      {galeris.length === 0 ? (
        <Alert variant="info">Belum ada gambar di galeri</Alert>
      ) : (
        <Table responsive striped bordered hover>
          <thead className="table-dark">
            <tr>
              <th width="5%">#</th>
              <th width="30%">Nama</th>
              <th width="45%">Gambar</th>
              <th width="20%">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {galeris.map((item, i) => (
              <tr key={item.id}>
                <td>{i + 1}</td>
                <td>{item.nama}</td>
                <td>
                  <img
                    src={`${API_URL}/galeri/${item.gambar}`}
                    alt={item.nama}
                    style={{ maxWidth: '100px' }}
                  />
                </td>
                <td>
                  <Button size="sm" variant="outline-warning" className="me-2" onClick={() => openEditModal('galeri', item)}>
                    Edit
                  </Button>
                  <Button size="sm" variant="outline-danger" onClick={() => handleGaleriDelete(item.id)}>
                    Hapus
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Card.Body>
  </Card>
</Tab>
<Tab eventKey="laporan" title={`Laporan (${laporans.length})`}>
  <Card>
    <Card.Header className="d-flex justify-content-between align-items-center">
      <h5 className="mb-0">Manajemen Laporan</h5>
      <Button variant="primary" onClick={() => openAddModal('laporan')}>
        + Tambah Laporan
      </Button>
    </Card.Header>
    <Card.Body>
      {laporans.length === 0 ? (
        <Alert variant="info">Belum ada data laporan</Alert>
      ) : (
        <Table responsive striped bordered hover>
          <thead className="table-dark">
            <tr>
              <th width="5%">#</th>
              <th width="30%">Nama Laporan</th>
              <th width="20%">File</th>
              <th width="25%">Tanggal</th>
              <th width="20%">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {laporans.map((item, i) => (
              <tr key={item.id}>
                <td>{i + 1}</td>
                <td>{item.nama_laporan}</td>
                <td>
                  <a href={`${API_URL}/laporan/${item.file}`} target="_blank" rel="noopener noreferrer">
                    {item.file}
                  </a>
                </td>
                <td>{new Date(item.created_at).toLocaleString('id-ID')}</td>
                <td>
                  <Button size="sm" variant="outline-warning" className="me-2" onClick={() => openEditModal('laporan', item)}>
                    Edit
                  </Button>
                  <Button size="sm" variant="outline-danger" onClick={() => handleLaporanDelete(item.id)}>
                    Hapus
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Card.Body>
  </Card>
</Tab>


      </Tabs>

      {/* Modal for Add/Edit */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditing ? 'Edit' : 'Tambah'} {modalType === 'umkm' ? 'UMKM' : modalType === 'product' ? 'Produk' : modalType === 'potensi' ? 'Potensi' : modalType === 'galeri' ? 'Gambar Galeri' : modalType === 'laporan' ? 'Laporan' : ''}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {getModalFields().map((field) => (
              <Form.Group key={field.key} className="mb-3">
                <Form.Label>{field.label}</Form.Label>
                {field.type === 'textarea' ? (
  <Form.Control
    as="textarea"
    rows={3}
    value={field.value || ''}
    onChange={(e) => handleFieldChange(field.key, e.target.value)}
    placeholder={`Masukkan ${field.label.toLowerCase()}`}
  />
) : field.type === 'file' ? (
  <Form.Control
    type="file"
    onChange={(e) => handleFieldChange(field.key, e)}
  />
) : (
  <Form.Control
    type={field.type || 'text'}
    value={field.value || ''}
    onChange={(e) => handleFieldChange(field.key, e.target.value)}
    placeholder={`Masukkan ${field.label.toLowerCase()}`}
  />
)}

              </Form.Group>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Batal
          </Button>
          <Button variant="primary" onClick={handleModalSave}>
            {isEditing ? 'Update' : 'Simpan'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminPage;
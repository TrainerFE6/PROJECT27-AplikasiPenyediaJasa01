// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Container, Row, Col, Form, Button } from 'react-bootstrap';
// import './Pembelian.css';

// const FormPembelian = () => {
//   const diproses = "diproses";
//   const [jenisLayanan, setJenisLayanan] = useState('');
//   const [tanggal, setTanggal] = useState('');
//   const [nama, setNama] = useState('');
//   const [nomorTelepon, setNomorTelepon] = useState('');
//   const [totalHarga, setTotalHarga] = useState('');
//   const [status, setStatus] = useState('');
//   const [paymentMode, setPaymentMode] = useState('transfer');
//   const [transferImage, setTransferImage] = useState(null);

//   const [admins, setAdmins] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [teknisi, setTeknisi] = useState([]);
//   const [kategori, setKategori] = useState([]);
//   const [orderData, setOrderData] = useState({
//     id_admin: '',
//     id_user: '',
//     id_teknisi: '',
//     id_katagori: '',
//     tanggal_bayar: '',
//     tanggal_pelayanan: '',
//     total_harga: '',
//     opsi_pembayaran: paymentMode,
//     status: ''
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const adminResponse = await axios.get('http://localhost:5000/admin');
//         const userResponse = await axios.get('http://localhost:5000/users');
//         const teknisiResponse = await axios.get('http://localhost:5000/teknisi');
//         const kategoriResponse = await axios.get('http://localhost:5000/kategori');
//         setAdmins(adminResponse.data.data);
//         setUsers(userResponse.data.data);
//         setTeknisi(teknisiResponse.data.data);
//         setKategori(kategoriResponse.data.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleModeChange = (mode) => {
//     setPaymentMode(mode);
//     setOrderData({
//       ...orderData,
//       opsi_pembayaran: mode
//     });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setOrderData({
//       ...orderData,
//       [name]: value
//     });
//   };

//   const handleFileChange = (e) => {
//     setTransferImage(e.target.files[0]);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const formData = new FormData();
//     formData.append('id_admin', orderData.id_admin);
//     formData.append('id_user', orderData.id_user);
//     formData.append('id_teknisi', orderData.id_teknisi);
//     formData.append('id_katagori', orderData.id_katagori);
//     formData.append('tanggal_bayar', orderData.tanggal_bayar);
//     formData.append('tanggal_pelayanan', orderData.tanggal_pelayanan);
//     formData.append('total_harga', orderData.total_harga);
//     formData.append('opsi_pembayaran', orderData.opsi_pembayaran);
//     formData.append('status', orderData.status);
//     if (transferImage) {
//       formData.append('bukti_pembayaran', transferImage);
//     }

//     console.log('FormData yang dikirim:');
//     for (let pair of formData.entries()) {
//       console.log(pair[0] + ': ' + pair[1]);
//     }

//     try {
//       const response = await axios.post('http://localhost:5000/order', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
//       console.log('Response dari server:', response.data);
//       alert('Pembelian Anda Berhasil!');
//     } catch (error) {
//       console.error('Terjadi kesalahan saat menambahkan data:', error);
//       if (error.response) {
//         console.error('Data error:', error.response.data);
//         console.error('Status error:', error.response.status);
//         console.error('Header error:', error.response.headers);
//       }
//     }
//   };

//   return (
//     <Container className='mt-5'>
//       <Row className="justify-content-center">
//         <Col md={6}>
//           <h2>Form Pembelian</h2>
//           <Form onSubmit={handleSubmit}>
          
//             <Form.Group>
//               <Form.Label>ID User:</Form.Label>
//               <Form.Control as="select" name="id_user" value={orderData.id_user} onChange={handleChange} required>
//                 <option value="">Pilih User</option>
//                 {users.map(user => (
//                   <option key={user.id_user} value={user.id_user}>
//                     {user.username}
//                   </option>
//                 ))}
//               </Form.Control>
//             </Form.Group>
//         <Form.Group>
//               <Form.Label>ID Teknisi:</Form.Label>
//               <Form.Control as="select" name="id_teknisi" value={orderData.id_teknisi} onChange={handleChange} required>
//                 <option value="">Pilih Teknisi</option>
//                 {teknisi.map(tech => (
//                   <option key={tech.id_teknisi} value={tech.id_teknisi}>
//                     {tech.nama}
//                   </option>
//                 ))}
//               </Form.Control>
//             </Form.Group>
//             <Form.Group>
//               <Form.Label>ID Kategori:</Form.Label>
//               <Form.Control as="select" name="id_katagori" value={orderData.id_katagori} onChange={handleChange} required>
//                 <option value="">Pilih Kategori</option>
//                 {kategori.map(cat => (
//                   <option key={cat.id_katagori} value={cat.id_katagori}>
//                     {cat.nama_katagori}
//                   </option>
//                 ))}
//               </Form.Control>
//             </Form.Group>
//             <Form.Group>
//               <Form.Label>Tanggal Bayar:</Form.Label>
//               <Form.Control type="datetime-local" name="tanggal_bayar" value={orderData.tanggal_bayar} onChange={handleChange} required />
//             </Form.Group>
//             <Form.Group>
//               <Form.Label>Tanggal Pelayanan:</Form.Label>
//               <Form.Control type="datetime-local" name="tanggal_pelayanan" value={orderData.tanggal_pelayanan} onChange={handleChange} required />
//             </Form.Group>
//             <Form.Group>
//               <Form.Label>Total Harga:</Form.Label>
//               <Form.Control type="number" name="total_harga" value={orderData.total_harga} onChange={handleChange} required />
//             </Form.Group>
//             <Form.Group >
//               <Form.Label>Status:</Form.Label>
//               <Form.Control type="text" name="status" value={orderData.status}  onChange={handleChange}  />
//             </Form.Group>
//             <Form.Group>
//               <Form.Label>Pilih Mode Pembayaran:</Form.Label>
//               <Form.Check type="radio" label="Transfer" name="paymentMode" checked={paymentMode === 'transfer'} onChange={() => handleModeChange('transfer')} />
//               <Form.Check type="radio" label="COD (Cash On Delivery)" name="paymentMode" checked={paymentMode === 'cod'} onChange={() => handleModeChange('cod')} />
//             </Form.Group>
//             {paymentMode === 'transfer' && (
//               <Form.Group>
//                 <Form.Label>Upload Gambar Bukti Transfer:</Form.Label>
//                 <Form.Control type="file" accept="image/*" onChange={handleFileChange} required />
//               </Form.Group>
//             )}
//             <Button variant="primary" type="submit" className="mt-3" style={{ backgroundColor: '#1D204F' }}>
//               Kirim
//             </Button>
//           </Form>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default FormPembelian;



// // import React, { useState } from 'react';
// // import 'bootstrap/dist/css/bootstrap.min.css';

// // import { Container, Row, Col, Form, Button } from 'react-bootstrap';
// // import './Pembelian.css';


// // function FormPembelian() {
// //   const [jenisLayanan, setJenisLayanan] = useState('');
// //   const [tanggal, setTanggal] = useState('');
// //   const [nama, setNama] = useState('');
// //   const [nomorTelepon, setNomorTelepon] = useState('');
// //   const [totalHarga, setTotalHarga] = useState('');
// //   const [status, setStatus] = useState('');
// //   const [paymentMode, setPaymentMode] = useState('transfer');
// //   const [transferImage, setTransferImage] = useState(null);

// //   const handleModeChange = (mode) => {
// //     setPaymentMode(mode);
// //   };

// //   const handleImageUpload = (event) => {
// //     const image = event.target.files[0];
// //     setTransferImage(image);
// //   };

// //   const handleSubmit = (event) => {
// //     event.preventDefault();
// //     console.log('Data Pembelian:', { jenisLayanan, tanggal, nama, nomorTelepon, totalHarga, status });
// //     if (paymentMode === 'transfer') {
// //       console.log('Bukti pembayaran dikirim:', transferImage);
// //     }
// //     alert('Pembelian Anda Berhasil!');
// //   };

// //   return (
// //     <Container className='mt-5'>
// //       <Row className="justify-content-center">
// //         <Col md={6}>
// //           <h2>Form Pembelian</h2>
// //           <Form onSubmit={handleSubmit}>
// //             <div className="form-group">
// //               <label>Jenis Layanan:</label>
// //               <input type="text" className="form-control" value={jenisLayanan} onChange={(e) => setJenisLayanan(e.target.value)} />
// //             </div>
// //             <div className="form-group">
// //               <label>Tanggal:</label>
// //               <input type="date" className="form-control" value={tanggal} onChange={(e) => setTanggal(e.target.value)} />
// //             </div>
// //             <div className="form-group">
// //               <label>Nama:</label>
// //               <input type="text" className="form-control" value={nama} onChange={(e) => setNama(e.target.value)} />
// //             </div>
// //             <div className="form-group">
// //               <label>Nomor Telepon:</label>
// //               <input type="tel" className="form-control" value={nomorTelepon} onChange={(e) => setNomorTelepon(e.target.value)} />
// //             </div>
// //             <div className="form-group">
// //               <label>Total Harga:</label>
// //               <input type="number" className="form-control" value={totalHarga} onChange={(e) => setTotalHarga(e.target.value)} />
// //             </div>
// //             <div className="form-group">
// //               <label>Status:</label>
// //               <input type="text" className="form-control" value={status} onChange={(e) => setStatus(e.target.value)} />
// //             </div>
// //             <Form.Group>
// //               <Form.Label >Pilih Mode Pembayaran:</Form.Label>
// //               <Form.Check type="radio" label="Transfer" name="paymentMode" checked={paymentMode === 'transfer'} onChange={() => handleModeChange('transfer')}/>
// //               <Form.Check type="radio" label="COD (Cash On Delivery)" name="paymentMode" checked={paymentMode === 'cod'} onChange={() => handleModeChange('cod')} />
// //             </Form.Group>
// //             {paymentMode === 'transfer' && (
// //               <Form.Group>
// //                 <Form.Label>Upload Gambar Bukti Transfer:</Form.Label>
// //                 <Form.Control type="file" accept="image/*" onChange={handleImageUpload}/>
// //               </Form.Group>
// //             )}
// //             <Button variant="primary" type="submit" className="mt-3" style={{ backgroundColor: '#1D204F' }}>
// //               Kirim
// //             </Button>
// //           </Form>
// //         </Col>
// //       </Row>
// //     </Container>
// //   );
// // }

// // export default FormPembelian;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './Pembelian.css';

const FormPembelian = () => {
  const [jenisLayanan, setJenisLayanan] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [nama, setNama] = useState('');
  const [nomorTelepon, setNomorTelepon] = useState('');
  const [totalHarga, setTotalHarga] = useState('');
  const [status, setStatus] = useState('');
  const [paymentMode, setPaymentMode] = useState('transfer');
  const [transferImage, setTransferImage] = useState(null);

  const [admins, setAdmins] = useState([]);
  const [users, setUsers] = useState([]);
  const [teknisi, setTeknisi] = useState([]);
  const [kategori, setKategori] = useState([]);
  const [orderData, setOrderData] = useState({
    id_admin: '',
    id_user: '',
    id_teknisi: '',
    id_katagori: '',
    tanggal_bayar: '',
    tanggal_pelayanan: '',
    total_harga: '',
    opsi_pembayaran: paymentMode,
    status: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const adminResponse = await axios.get('http://localhost:5000/admin');
        const userResponse = await axios.get('http://localhost:5000/users');
        const teknisiResponse = await axios.get('http://localhost:5000/teknisi');
        const kategoriResponse = await axios.get('http://localhost:5000/kategori');
        setAdmins(adminResponse.data.data);
        setUsers(userResponse.data.data);
        setTeknisi(teknisiResponse.data.data);
        setKategori(kategoriResponse.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleModeChange = (mode) => {
    setPaymentMode(mode);
    setOrderData({
      ...orderData,
      opsi_pembayaran: mode
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData({
      ...orderData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setTransferImage(e.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('id_admin', orderData.id_admin);
    formData.append('id_user', orderData.id_user);
    formData.append('id_teknisi', orderData.id_teknisi);
    formData.append('id_katagori', orderData.id_katagori);
    formData.append('tanggal_bayar', orderData.tanggal_bayar);
    formData.append('tanggal_pelayanan', orderData.tanggal_pelayanan);
    formData.append('total_harga', orderData.total_harga);
    formData.append('opsi_pembayaran', orderData.opsi_pembayaran);
    formData.append('status', orderData.status);
    if (transferImage) {
      formData.append('bukti_pembayaran', transferImage);
    }

    console.log('FormData yang dikirim:');
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }

    try {
      const response = await axios.post('http://localhost:5000/order', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Response dari server:', response.data);
      alert('Pembelian Anda Berhasil!');
    } catch (error) {
      console.error('Terjadi kesalahan saat menambahkan data:', error);
      if (error.response) {
        console.error('Data error:', error.response.data);
        console.error('Status error:', error.response.status);
        console.error('Header error:', error.response.headers);
      }
    }
  };

  return (
    <Container className='mt-5'>
      <Row className="justify-content-center">
        <Col md={6}>
          <h2>Form Pembelian</h2>
          <Form onSubmit={handleSubmit}>
            
            <Form.Group>
              <Form.Label>ID User:</Form.Label>
              <Form.Control as="select" name="id_user" value={orderData.id_user} onChange={handleChange} required>
                <option value="">Pilih User</option>
                {users.map(user => (
                  <option key={user.id_user} value={user.id_user}>
                    {user.username}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            
            <Form.Group>
              <Form.Label>ID Kategori:</Form.Label>
              <Form.Control as="select" name="id_katagori" value={orderData.id_katagori} onChange={handleChange} required>
                <option value="">Pilih Kategori</option>
                {kategori.map(cat => (
                  <option key={cat.id_katagori} value={cat.id_katagori}>
                    {cat.nama_katagori}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Tanggal Bayar:</Form.Label>
              <Form.Control type="datetime-local" name="tanggal_bayar" value={orderData.tanggal_bayar} onChange={handleChange} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Tanggal Pelayanan:</Form.Label>
              <Form.Control type="datetime-local" name="tanggal_pelayanan" value={orderData.tanggal_pelayanan} onChange={handleChange} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Total Harga:</Form.Label>
              <Form.Control type="number" name="total_harga" value={orderData.total_harga} onChange={handleChange} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Status:</Form.Label>
              <Form.Control type="text" name="status" value={orderData.status} onChange={handleChange} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Pilih Mode Pembayaran:</Form.Label>
              <Form.Check type="radio" label="Transfer" name="paymentMode" checked={paymentMode === 'transfer'} onChange={() => handleModeChange('transfer')} />
              <Form.Check type="radio" label="COD (Cash On Delivery)" name="paymentMode" checked={paymentMode === 'cod'} onChange={() => handleModeChange('cod')} />
            </Form.Group>
            {paymentMode === 'transfer' && (
              <Form.Group>
                <Form.Label>Upload Gambar Bukti Transfer:</Form.Label>
                <Form.Control type="file" accept="image/*" onChange={handleFileChange} required />
              </Form.Group>
            )}
            <Button variant="primary" type="submit" className="mt-3" style={{ backgroundColor: '#1D204F' }}>
              Kirim
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default FormPembelian;
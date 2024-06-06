var fs = require('fs');
var path = require('path');
var connection = require('../library/database');

/**
 * INDEX teknisi
 */
const getAllcatagori = function (req, res) {
    connection.query('SELECT * FROM tbl_catagoris', function (err, rows) {
        if (err) {
            res.send('error', err);
        } else {
            res.json({
                data: rows
            });
        }
    });
};

const getcatagoriId = function (req, res) {
    let id = req.params.id;
    connection.query('SELECT * FROM tbl_catagoris WHERE id_katagori = ' + id, function (err, rows) {
        if (err) {
            res.send('error', err);
        } else {
            res.json({
                data: rows
            });
        }
    });
};

const createcatagori = function (req, res) {
    let nama_katagori = req.body.nama_katagori;
    let judul = req.body.judul;
    let lokasi = req.body.lokasi;
    let harga = req.body.harga;
    let gambar = req.file.filename;
   
    let errors = false;

       if(!nama_katagori) {
    errors = true;
    res.json({pesan :'Field nama_katagori belum diisi, Field harus diisi dengan lengkap'});
    }

    if(!judul) {
        errors = true;
        res.json({pesan :'Field judul cabang belum diisi, Field harus diisi dengan lengkap'});
    }

    if(!lokasi) {
        errors = true;
        res.json({pesan :'Field lokasi hp belum diisi, Field harus diisi dengan lengkap'});
    }

    if(!harga) {
        errors = true;
        res.json({pesan :'Field harga belum diisi, Field harus diisi dengan lengkap'});
    }

    if(!gambar) {
        errors = true;
        res.json({pesan :'Field gambar belum diisi, Field harus diisi dengan lengkap'});
    }

    if (!errors) {
        let formData = {
            nama_katagori: nama_katagori,
            judul: judul,
            lokasi: lokasi,
            harga: harga,
            gambar: gambar
            
        };

        connection.query('INSERT INTO tbl_catagoris SET ?', formData, function (err, result) {
            if (err) {
                res.json({ pesan: 'Data gagal disimpan' });
            } else {
                res.send('Data Berhasil Disimpan!');
            }
        });
    }
};

const updatecatagori = function (req, res) {
    let id = req.params.id;
    let nama_katagori = req.body.nama_katagori;
    let judul = req.body.judul;
    let lokasi = req.body.lokasi;
    let harga = req.body.harga;
    let gambar = req.file ? req.file.filename : req.body.gambar;
    let errors = false;

    if(!nama_katagori) {
        errors = true;
        res.json({pesan :'Field nama_katagori belum diisi, Field harus diisi dengan lengkap'});
        }
    
        if(!judul) {
            errors = true;
            res.json({pesan :'Field judul cabang belum diisi, Field harus diisi dengan lengkap'});
        }
    
        if(!lokasi) {
            errors = true;
            res.json({pesan :'Field lokasi hp belum diisi, Field harus diisi dengan lengkap'});
        }
    
        if(!harga) {
            errors = true;
            res.json({pesan :'Field harga belum diisi, Field harus diisi dengan lengkap'});
        }
    
        if(!gambar) {
            errors = true;
            res.json({pesan :'Field gambar belum diisi, Field harus diisi dengan lengkap'});
        }

    if (!errors) {
        let formData = {
            nama_katagori: nama_katagori,
            judul: judul,
            lokasi: lokasi,
            harga: harga,
            gambar: gambar
        };

        connection.query('UPDATE tbl_catagoris SET ? WHERE id_katagori = ' + id, formData, function (err, result) {
            if (err) {
                res.send('error', err);
            } else {
                res.send('Data Berhasil Diupdate!');
            }
        });
    }
};



const deletecatagori = function (req, res) {
  let id = req.params.id;

  // Pertama, ambil nama file gambar dari database
  connection.query('SELECT gambar FROM tbl_catagoris WHERE id_katagori = ?', [id], function (err, rows) {
      if (err) {
          res.send('error', err);
          return;
      }

      if (rows.length === 0) {
          res.send('Data tidak ditemukan');
          return;
      }

      let gambar = rows[0].gambar;
      let gambarPath = path.join(__dirname, '../public/uploads/catagori', gambar);

      // Hapus data teknisi dari database
      connection.query('DELETE FROM tbl_catagoris WHERE id_katagori = ?', [id], function (err, result) {
          if (err) {
              res.send('error', err);
              return;
          }

          // Hapus file gambar dari sistem file
          fs.unlink(gambarPath, (err) => {
              if (err) {
                  res.send('Data berhasil dihapus, tetapi gagal menghapus gambar: ' + err);
                  return;
              }

              res.send('Data dan gambar berhasil dihapus!');
          });
      });
  });
};

module.exports = {
  getAllcatagori,
  getcatagoriId,
  createcatagori,
  updatecatagori,
  deletecatagori,
};

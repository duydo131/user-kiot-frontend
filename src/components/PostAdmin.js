import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

function PageAdmin() {
    const [show, setShow] = useState(false);
    const notify = (string) => toast(string);
    const notifySale = (string) => toast(string);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showSale, setShowSale] = useState(false);
    const handleCloseSale = () => setShowSale(false);
    const handleShowSale = () => setShowSale(true);

    const [showGuarantee, setShowGuarantee] = useState(false);
    const handleCloseGuarantee = () => setShowGuarantee(false);
    const handleShowGuarantee = () => setShowGuarantee(true);

    const [productsAPI, setProductAPI] = useState([]);
    useEffect(() => {
        async function fetchProduct() {
            await axios.get(`http://localhost:8081/product`)
                .then(res => {
                    const productsFetch = res.data.content;
                    setProductAPI(productsFetch)
                })
                .catch(error => console.log(error));
        }
        fetchProduct();
    }, []);


    function handleAddProduct() {
        var filename = document.getElementById('filename').value;
        if (filename === "") {
            notify("Không tìm thấy file")
            return
        }
        var apiBaseUrl = "http://localhost:8081/product/add";
        var payload = {
            "filename": filename,
        }
        axios.post(apiBaseUrl, payload)
            .then(function (response) {
                var data = response.data;
                if (data.add === 0 && data.update === 0) notify("Không có sản phẩm nào")
                if (response.status == 200) {
                    notify("Thêm " + data.add + ", Cập nhật " + data.update + " sản phẩm thành công!!")
                }
                handleClose()
            })
            .catch(function (error) {
                notify("Thêm sản phẩm thất bại")
                handleClose()
            });

    }

    function handleStatisticSale() {
        var start = document.getElementById('start').value;
        var end = document.getElementById('end').value;
        if (start === "" || end === "") {
            notify("Chưa chọn ngày")
            return
        }
        var apiBaseUrl = `http://localhost:8081/statistic/sales?start_date=${start}&end_date=${end}`;
        axios.get(apiBaseUrl)
            .then(function (response) {
                if (response.status == 200) {
                    notifySale("Thống kê doanh thu thành công!!")
                }
                handleCloseSale()
            })
            .catch(function (error) {
                notifySale("Thống kê doanh thu thất bại")
                handleCloseSale()
            });

    }

    function handleStatisticProduct() {
        var apiBaseUrl = `http://localhost:8081/statistic/product`;
        axios.get(apiBaseUrl)
            .then(function (response) {
                if (response.status == 200) {
                    notifySale("Thống kê sản phẩm thành công!!")
                }
                handleCloseSale()
            })
            .catch(function (error) {
                notifySale("Thống kê sản phẩm thất bại")
                handleCloseSale()
            });
    }

    function handleStatisticProductGuarantee() {
        var apiBaseUrl = `http://localhost:8081/statistic/product_guarantee`;
        axios.get(apiBaseUrl)
            .then(function (response) {
                if (response.status == 200) {
                    notifySale("Thống kê sản phẩm thành công!!")
                }
                handleCloseSale()
            })
            .catch(function (error) {
                notifySale("Thống kê sản phẩm thất bại")
                handleCloseSale()
            });
    }

    function handleAddGuarantee() {
        var user = document.getElementById('user_id').value;
        var product = document.getElementById('product_id').value;
        var bill = document.getElementById('bill_id').value;
        var total = document.getElementById('total_amount').value;
        if (user === "" || product === "" || bill === "" || total === "") {
            notify("Chưa điền đủ thông tin!!!")
            return
        }
        var token = JSON.parse(localStorage.getItem('token'));
        var apiBaseUrl = `http://localhost:8081/guarantee`;
        var payload = {
            "user": { "id": user },
            "bill_broken": { "id": bill },
            "product": { "id": product },
            "totalAmount": total
        }
        axios.post(
            apiBaseUrl,
            payload,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(function (response) {
                if (response.status == 201) {
                    notifySale("Thêm bảo hành thành công!!")
                }
                handleCloseGuarantee()
            })
            .catch(function (error) {
                console.log(error)
                notifySale("Thêm bảo hành thất bại!!")
                handleCloseGuarantee()
            });
    }

    return (
        <div >
            <h1 className="section-heading">Quản lý</h1>
            <div>
                <div className="new_line_custom left-add">
                    <Button variant="primary" onClick={handleShow}>
                        Thêm sản phẩm
                    </Button>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Thêm sản phẩm</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="form-group text-left">
                                <label >Filename</label>
                                <input type="text" className="form-control" id="filename" placeholder="Nhập filename" />
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Đóng
                            </Button>
                            <Button variant="primary" onClick={handleAddProduct}>
                                Thêm
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <Button variant="primary" onClick={handleShowGuarantee}>
                        Thêm bảo hành
                    </Button>

                    <Modal show={showGuarantee} onHide={handleCloseGuarantee}>
                        <Modal.Header closeButton>
                            <Modal.Title>Thêm bảo hành</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="form-group text-left">
                                <label >User</label>
                                <input type="text" className="form-control" id="user_id" />
                            </div>
                            <div className="form-group text-left">
                                <label >Product</label>
                                <input type="text" className="form-control" id="product_id" />
                            </div>
                            <div className="form-group text-left">
                                <label >Code Bill</label>
                                <input type="text" className="form-control" id="bill_id" />
                            </div>
                            <div className="form-group text-left">
                                <label >Total Amount</label>
                                <input type="text" className="form-control" id="total_amount" />
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseGuarantee}>
                                Đóng
                            </Button>
                            <Button variant="primary" onClick={handleAddGuarantee}>
                                Thêm
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>

                <div className=" left-table">
                    <Button variant="primary" onClick={handleShowSale}>
                        Thống kê doanh thu
                    </Button>

                    <Modal show={showSale} onHide={handleCloseSale}>
                        <Modal.Header closeButton>
                            <Modal.Title>Thống kê doanh thu</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <span>Ngày bắt đầu</span>
                            <input
                                className="top-date"
                                type="date"
                                id="start"
                                name="trip-start"
                                min="2018-01-01"
                                max="2021-12-31" />

                            <div className="top-bar" />
                            <span>Ngày kết thúc</span>
                            <input
                                className="top-date"
                                type="date"
                                id="end"
                                name="trip-start"
                                min="2018-01-01"
                                max="2021-12-31" />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseSale}>
                                Đóng
                            </Button>
                            <Button variant="primary" onClick={handleStatisticSale}>
                                Thống kê
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <button
                        type="button"
                        className="btn btn-primary waves-effect waves-light"
                        onClick={handleStatisticProduct}
                    >
                        Thống kê sản phẩm
                    </button>

                    <button
                        type="button"
                        className="btn btn-primary waves-effect waves-light"
                        onClick={handleStatisticProductGuarantee}
                    >
                        Thống kê sản phẩm bảo hành
                    </button>

                </div>

            </div>
            <br />
            <h3 className="section-heading">Danh Sách Sản Phẩm</h3>
            <br />
            <div className="rtable left-table">
                <table>
                    <thead>
                        <tr>
                            <td>{"STT"}</td>
                            <td>{"Name"}</td>
                            <td>{"Code"}</td>
                            <td>{"Guarantee"}</td>
                            <td>{"Price"}</td>
                            <td>{"Quantity"}</td>
                            <td>{"Rating"}</td>
                        </tr>
                    </thead>
                    <tbody>
                        {productsAPI.map((product, index) => {
                            return (
                                <tr key={index + 1}>
                                    <td>{index + 1}</td>
                                    <td>{product.name}</td>
                                    <td>{product.code}</td>
                                    <td>{product.guarantee}</td>
                                    <td>{product.price}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.rating}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

                <ToastContainer autoClose={1000}/>
            </div>

        </div>
    );
}

export default PageAdmin;

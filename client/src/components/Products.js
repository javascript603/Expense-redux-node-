import React from 'react';
import { browserHistory } from 'react-router';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Navbar, Nav, NavDropdown, MenuItem, NavItem, Modal, Button, Row, Col } from 'react-bootstrap';
import EditForm from './contents/EditForm'

export default class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            data: [
                {
                    Toms: 23423,
                    jack: 423423
                }
            ],
            showCreateModal: false,
            showDeleteModal: false,
            showAddLableModel: false,
            editData: [],
            addLabelData: [],
            name: '',
            showlabels: []

        }
    }

    componentWillMount() {
        const currentUser = this.props.user;

        try {
            if (currentUser.status === 200) {
                const user = currentUser.user;
                this.setState({ username: user.username });
                localStorage.setItem('user', JSON.stringify(user));
            }

            if (localStorage.getItem('user')) {
                this.setState({
                    username: JSON
                        .parse(localStorage.getItem('user'))
                        .username
                });
                this
                    .props
                    .mappedproductGetList();
            } else {
                browserHistory.push('/login');
            }
        } catch (err) {
            browserHistory.push('/login');
        }
    }

    submitData = (e) => {
        e.preventDefault();
        const editForm = document.getElementById('EditForm');
        if (editForm.title.value !== "") {
            const data = new FormData();
            data.append('id', editForm.id.value);
            data.append('title', editForm.title.value);
            data.append('amount', editForm.amount.value);
            data.append('category', editForm.status.value);
            data.append('description', editForm.description.value);
            data.append('label', JSON.stringify(this.state.editData.label));
            this
                .props
                .mappedproductCreate(data);
        } else {
            return;
        }
        this.handleClose("edit");
    }

    deleteData = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('id', this.state.editData._id);
        this
            .props
            .mappedproductDelete(data);
        this.handleClose("delete");
    }

    filteronChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    filteronSubmit = (e) => {
        const { startprice, endprice, startdate, enddate } = this.state
        const data = new FormData();
        data.append('flag', e.target.name);
        data.append('startprice', startprice);
        data.append('endprice', endprice);
        data.append('startdate', startdate);
        data.append('enddate', enddate);
        this
            .props
            .mappedproductFilterResult(data);
    }

    createExpense = () => {
        this.setState({ editData: [] })
        this.handleShow("edit")
    }

    handleRowSelect = (row, isSelected, e) => {
        if (e.target.getAttribute("name") === "edit") {
            if (row.label) {
                if (row.label.constructor !== [].constructor) {
                    row.label = JSON.parse(row.label)
                }
            }
            this.setState({ editData: row })
            this.handleShow("edit")
        } else if (e.target.getAttribute("name") === "delete") {
            this.setState({ editData: row })
            this.handleShow("delete");
        } else {
            this.setState({ addLabelData: row })
            this.handleShow("addlabel");
        }
    }

    handleClose = (flag) => {
        if (flag === "edit")
            this.setState({ showCreateModal: false });
        else if (flag === "addlabel") this.setState({ showAddLableModel: false })
        else
            this.setState({ showDeleteModal: false });
    }

    handleShow = (flag) => {
        if (flag === "edit")
            this.setState({ showCreateModal: true });
        else if (flag === "addlabel") this.setState({ showAddLableModel: true })
        else
            this.setState({ showDeleteModal: true });
    }

    handleAddLabel = (e) => {
        let { editData } = this.state;
        if (!editData.label) editData.label = [];
        editData.label.push("");
        this.setState({
            editData: editData
        });
    }

    handleShowlabelNameChange = (idx) => (evt) => {
        let { editData } = this.state;
        editData.label[idx] = evt.target.value;
        this.setState({ editData: editData });
    }

    handleRemoveShowlabel = (idx) => () => {
        let { editData } = this.state;
        editData.label.splice(idx, 1);
        this.setState({
            editData: editData
        });
    }
    render() {

        const options = {
            insertModalFooter: this.createCustomModalFooter,
            page: 3,
            sizePerPageList: [
                {
                    text: '5',
                    value: 5
                }, {
                    text: '10',
                    value: 10
                }
            ],
            sizePerPage: 10,
            pageStartIndex: 1,
            paginationSize: 3,
            prePage: 'Prev',
            nextPage: 'Next',
            firstPage: 'First',
            lastPage: 'Last',
            paginationShowsTotal: this.renderShowsTotal
        };

        function indexN(cell, row, enumObject, index) {
            return (
                <div>{index + 1}</div>
            )
        }

        function priceFormatter(cell, row) {
            return `<i class='glyphicon glyphicon-usd'></i> ${cell}`;
        }

        function editFormatter(cell, row) {
            return "<a><i  name='edit' class='fa fa-edit'></i></a>";
        }

        function deleteFormatter(cell, row) {
            return "<a><i  name='delete' class='fa fa-trash'></i></a>";
        }

        const category = {
            0: 'Airfare',
            1: 'Gas',
            2: 'Supplies'
        };

        function enumFormatter(cell, row, enumObject) {
            return enumObject[cell];
        }

        function dateFormatter(cell, row) {
            const date = new Date(cell);
            return `${('0' + date.getHours()).slice(-2)}/${('0' + date.getMinutes()).slice(-2)}/${('0' + date.getSeconds()).slice(-2)} - ${('0' + date.getDate()).slice(-2)}/${('0' + (date.getMonth() + 1)).slice(-2)}/${date.getFullYear()}`;
        }

        function columnClassNameFormat(fieldValue, row, rowIdx, colIdx) {
            return 'column' + rowIdx;
        }

        let style = {
            backgroundColor: "#2b2b2be6"
        }

        const selectRowProp = {
            mode: 'radio',
            hideSelectColumn: true,
            onSelect: this.handleRowSelect,
            clickToSelect: true
        };

        return (
            <div className="expenseList">

                <Navbar style={style}>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="/">Home</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav pullRight>
                        <NavItem eventKey={1} href="/products">
                            Expenses
                        </NavItem>
                        <NavDropdown title="Reports" id="basic-nav-dropdown">
                            <MenuItem href="/report_c/all">Reports by category</MenuItem>
                            <MenuItem href="/report_s">Expenses Reports</MenuItem>
                        </NavDropdown>
                        <NavItem eventKey={4} href="/">
                            Log out
                        </NavItem>
                    </Nav>

                </Navbar>

                <div className="Home">
                    <p>&nbsp;</p><br />
                    <h1>Expense List</h1>
                    <div className="table-content">
                        <h3 id="main">User : {this.state.username}</h3>
                        <div className="filter">
                            <h4>Filter Content</h4>
                            <Row className="clearfix">
                                <Col xs={5}>
                                    <lable>
                                        Price :
                                    </lable>
                                    <input
                                        type="number"
                                        onChange={this.filteronChange}
                                        name="startprice"
                                        className="start-price"
                                        placeholder="start price" />
                                    <span>&nbsp;to&nbsp;</span>
                                    <input
                                        type="number"
                                        onChange={this.filteronChange}
                                        name="endprice"
                                        className="end-price"
                                        placeholder="end price" />
                                    <span>&nbsp;&nbsp;</span>
                                    <button className="price-filter" name="price" onClick={this.filteronSubmit}>apply</button>
                                </Col>
                                <Col xs={5}>
                                    <lable>
                                        Date :
                                    </lable>
                                    <input
                                        type="date"
                                        onChange={this.filteronChange}
                                        name="startdate"
                                        className="start-date" />
                                    <span>&nbsp;to&nbsp;</span>
                                    <input
                                        type="date"
                                        onChange={this.filteronChange}
                                        name="enddate"
                                        className="end-date" />
                                    <span>&nbsp;&nbsp;</span>
                                    <button className="date-filter" name="date" onClick={this.filteronSubmit}>apply</button>
                                </Col>
                            </Row>
                        </div>
                        <div className="table-action-bar">
                            <h4>Extense List</h4>
                            <button
                                type="button"
                                className="btn btn-info react-bs-table-add-btn "
                                onClick={this.createExpense}>
                                <span>
                                    <i className="glyphicon glyphicon-plus"></i>NEW</span>
                            </button>
                        </div>
                        <BootstrapTable
                            data={this.props.productArray.products}
                            options={options}
                            pagination={true}
                            selectRow={selectRowProp}>
                            <TableHeaderColumn
                                dataField="any"
                                dataFormat={indexN}
                                dataAlign='center'
                                width='5%'>No</TableHeaderColumn>
                            <TableHeaderColumn
                                dataField='title'
                                isKey={true}
                                headerAlign='center'
                                columnClassName={columnClassNameFormat}>Title</TableHeaderColumn>
                            <TableHeaderColumn
                                dataField='amount'
                                dataFormat={priceFormatter}
                                dataSort={true}
                                headerAlign='center'
                                dataAlign='center'>Amount</TableHeaderColumn>
                            <TableHeaderColumn
                                dataField='category'
                                dataFormat={enumFormatter}
                                dataSort={true}
                                formatExtraData={category}
                                headerAlign='center'
                                dataAlign='center'>Category</TableHeaderColumn>
                            <TableHeaderColumn dataField='description' headerAlign='center'>Description</TableHeaderColumn>
                            <TableHeaderColumn
                                dataField='createdAt'
                                dataFormat={dateFormatter}
                                dataSort={true}
                                dataAlign='center'
                                headerAlign='center'>Date</TableHeaderColumn>
                            <TableHeaderColumn
                                dataField='active'
                                dataFormat={editFormatter}
                                headerAlign='center'
                                dataAlign='center'
                                width='7%'>Edit</TableHeaderColumn>
                            <TableHeaderColumn
                                dataField='active'
                                dataFormat={deleteFormatter}
                                headerAlign='center'
                                dataAlign='center'
                                width='7%'>Active</TableHeaderColumn>
                        </BootstrapTable>
                    </div>
                </div>

                {/* Edit/Create Modal */}
                <Modal show={this.state.showCreateModal}>
                    <Modal.Body>
                        <EditForm expenseData={this.state.editData} labelData={this.state.showlabels} editAction={this.submitData}
                            handleAddLabel={this.handleAddLabel}
                            handleShowlabelNameChange={this.handleShowlabelNameChange}
                            handleRemoveShowlabel={this.handleRemoveShowlabel}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={(e) => this.handleClose("edit", e)}>CLOSE</Button>
                    </Modal.Footer>
                </Modal>

                {/* Delete confirm Modal */}
                <Modal show={this.state.showDeleteModal} id="DeleteModal">
                    <Modal.Header>
                        <h3>Delete Dialog</h3>
                    </Modal.Header>
                    <Modal.Body>
                        <h5>Would you like to delete this expense from the list?</h5>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.deleteData}>DELETE</Button>
                        <Button onClick={(e) => this.handleClose("delete", e)}>CLOSE</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

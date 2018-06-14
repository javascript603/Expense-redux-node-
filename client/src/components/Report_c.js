import React from 'react';
import {browserHistory} from 'react-router';
import { Navbar, Nav, NavDropdown, MenuItem, NavItem } from 'react-bootstrap';
import ReportList from './contents/ReportList_c'
import ReportDetail from './contents/ReportDetail_c'

export default class Roport extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: ''
        }
    }

    componentWillMount() {
        const currentUser = this.props.user;

        try {
            if (currentUser.status === 200) {
                const user = currentUser.user;
                this.setState({username: user.username});
                localStorage.setItem('user', JSON.stringify(user));
            }

            if (localStorage.getItem('user')) {
                this.setState({
                    username: JSON
                        .parse(localStorage.getItem('user'))
                        .username
                });
                this.props.mappedproductGetList();
            } else {
                browserHistory.push('/login');
            }
        } catch (err) {
            browserHistory.push('/login');
        }
    }

    render() {

        let style = {
            backgroundColor: "#2b2b2be6"
        }

        const category = {
            0: 'Airfare',
            1: 'Gas',
            2: 'Supplies'
        };

        let data = this.props.productArray.products;
        let result = [];

        for (let i = 0; i < Object.keys(category).length; i++) {
            let custom_data = data.filter(function (el) {
                return el.category === i;
            });

            Array.prototype.sum = function (prop) {
                var total = 0
                for (var i = 0, _len = this.length; i < _len; i++) {
                    total += this[i][prop]
                }
                return total
            }

            result[i] = {
                title: category[i] + " Report",
                category: i,
                data: custom_data,
                date: new Date(),
                amount: custom_data.sum("amount")
            }
        }

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
                    <p>&nbsp;</p><br/>
                    <h1 >
                        {this.props.params.cat === "all"
                            ? "Report by category"
                            : "Report for " + category[this.props.params.cat]
}
                    </h1>
                    <div className="table-content">
                        <h3 id="main">User : {this.state.username}</h3>
                        <div>
                            {this.props.params.cat === "all"
                                ? <ReportList data={result}/>
                                : <ReportDetail data={result[this.props.params.cat]}/>
}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

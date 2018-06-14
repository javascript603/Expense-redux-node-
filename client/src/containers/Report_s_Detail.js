import { connect } from 'react-redux';
import Report_s_Detail from '../components/Report_s_Detail';
import * as productAction from '../actions/productAction';
import * as reportAction from '../actions/reportAction';

// map state from store to props
const mapStateToProps = (state) => {
  return {
    //you can now say this.props.mappedAppSate
    user: state.userState,
    productArray: state.productState,
    reports: state.report.reports
  }
}

// map actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    //you can now say this.props.mappedAppActions
    mappedproductGetList: () => dispatch(productAction.getList()),
    mappedReportDelete: (data) => dispatch(reportAction.deleteReport(data)),
    mappedExpenseOfReportDelete: (data) => dispatch(reportAction.deleteExpenseOfReport(data)),
    mappedUpdateReport: (data) => dispatch(reportAction.updateReport(data)),
    mappedReportGetList: () => dispatch(reportAction.getReportList())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Report_s_Detail);

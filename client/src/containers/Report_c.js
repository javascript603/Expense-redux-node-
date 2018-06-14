import { connect } from 'react-redux';
import Report_c from '../components/Report_c';
import * as productAction from '../actions/productAction';

// map state from store to props
const mapStateToProps = (state) => {
  return {
    //you can now say this.props.mappedAppSate
    user: state.userState,
    productArray: state.productState
  }
}

// map actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    //you can now say this.props.mappedAppActions
    mappedproductGetList: () => dispatch(productAction.getList()),
    mappedproductCreate: (data) => dispatch(productAction.createExpense(data)),    
    mappedproductDelete: (data) => dispatch(productAction.deleteExpense(data)),
    mappedproductFilterResult: (data) => dispatch(productAction.getFilterList(data)),            
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Report_c);

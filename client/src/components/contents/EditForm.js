import React from 'react';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';


const EditForm = (props) => {
  console.log(props)
  const { label } = props.expenseData;
  return (
    <form className="form form-horizontal" id="EditForm" onSubmit={props.editAction}>
      <div className="row">
        <div className="col-md-12">
          <h2 className="text-center">{props.expenseData._id ? "Edit Extense" : "Create New Extense"}</h2>
          <FormGroup>
            <ControlLabel>Title: </ControlLabel>
            <input type="hidden" value={props.expenseData._id} name="id" />
            <FormControl
              type="text" placeholder="Enter Title"
              name="title" defaultValue={props.expenseData.title} required
            />
          </FormGroup>
        </div>
        <div className="col-md-12">
          <FormGroup>
            <ControlLabel>Amount: </ControlLabel>
            <FormControl
              type="number" placeholder="Enter Amount"
              name="amount" defaultValue={props.expenseData.amount} required
            />
          </FormGroup>
        </div>
        <div className="col-md-12">
          <FormGroup>
            <ControlLabel>Description: </ControlLabel>
            <FormControl
              componentClass="textarea" placeholder="Enter description"
              name="description" defaultValue={props.expenseData.description} required
            />
          </FormGroup>
        </div>
        <div className="col-md-12">
          <FormGroup>
            <ControlLabel>Status: </ControlLabel>
            <FormControl
              componentClass="select" placeholder="In"
              name="status" defaultValue={props.expenseData.status}
            >
              <option value="0">In</option>
              <option value="1">Out</option>
            </FormControl>
          </FormGroup>
        </div>
        <div className="row">
          <div className="col-md-5"></div>
          <div className="col-md-4"></div>
          <div className="col-md-3">
            <FormGroup>
              <Button bsStyle="success" onClick={props.handleAddLabel} >Add Labels</Button>
            </FormGroup>
          </div>
        </div>

        {label ?
          label.map((showlabel, idx) => (
            <div className="row" key={idx}>
              <div className="col-md-2">
                <div style={{ textAlign: "center", marginBottom: "10px" }}>
                  <ControlLabel>Label{idx + 1}: </ControlLabel>
                </div>
              </div>
              <div className="col-md-8">
                <input
                  type="text" name={`label${idx}`}
                  placeholder={`showlabel ${idx + 1} name`}
                  className="form-control"
                  value={showlabel}
                  onChange={props.handleShowlabelNameChange(idx)}
                />

              </div>
              <div className="col-md-2">
                <button style={{ width: "30px", height: '30px', marginTop: '2px', borderRadius: '3px' }} type="button" onClick={props.handleRemoveShowlabel(idx)} className="small">
                  <i style={{ fontSize: "20px" }} className="fa fa-trash"></i>
                </button>
              </div>
            </div>
          )) : null}


      </div>
      <FormGroup>
        <Button type="submit" bsStyle="success" bsSize="large" block >Submit</Button>
      </FormGroup>
    </form>
  );
}

export default EditForm;

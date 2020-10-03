import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import {clearNewData, formValues} from '../../actions';
import myInput from '../my-input';
import ReportList from '../report';



class InputPanel extends Component{

    

  render(){
  
        const {
          handleSubmit,
          owner,
          repo,
          reset, formValues

      
        } = this.props
      
        const submit = (values) => {
          return values;
          };
          

    return(
        <>
        <form onSubmit={handleSubmit(submit)}>
          
        <label htmlFor="owner">Owner</label>
        <Field id="owner" name="owner" component={myInput}type='text'/>
        <label htmlFor="repo">Repository</label>
        <Field id="repo" name="repo" component={myInput} type='text' />
        <button type='submit' onClick={()=>{
       
          
          clearNewData();
          formValues({owner,repo}) }}>Submit</button>
        <button type='reset' onClick={reset}>Reset</button>
        </form>
      
        <ReportList/>
        
        
        </>
    )
  }



}

InputPanel = reduxForm({
    form: 'selectingFormValues' 
  })(InputPanel)
  
  const mapDispatchToProps={
    formValues,
    clearNewData
}

  const selector = formValueSelector('selectingFormValues') 
  InputPanel = connect((state => {
   
    const owner = selector(state, 'owner')
    const repo = selector(state, 'repo')
   
    return {
      owner,
      repo
    }
  }), mapDispatchToProps)(InputPanel)
  
  export default InputPanel;





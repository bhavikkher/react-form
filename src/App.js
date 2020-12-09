import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      rememberMe: false,
      isFormContainError: false,
      formErrorMessages: {
        emailError: '',
        passwordError: '',
      },
      isFormDirty: false,
      isSubmitButtonCliked: false
    }
  }
  handleFormChangeInputValues = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    const name = e.target.name;
    this.setState({
      ...this.state, 
      [name]: value,
      isSubmitButtonCliked: false
    })
    if (this.state.isFormDirty) {
      const newStateValues = { ...this.state, [name]: value };
      this.validForm(newStateValues)
    }
  }
  handleFormSubmit = (e) => {
    e.preventDefault();
    this.validForm(this.state);
    if (!this.state.isFormDirty) {
      this.setState({ isFormDirty: true })
    }
  }

  validForm = (formData) => {
    const { email, password, formErrorMessages } = formData;
    let isFormContainError = false;
    const regex=/([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (email === '') {
      isFormContainError = true;
      formErrorMessages.emailError = "Email is required."
    } else if (! regex.test(email)) {
      isFormContainError = true;
      formErrorMessages.emailError = "Please enter your email address in format: yourname@example.com"
    } else {
      formErrorMessages.emailError = ""
    }
    if (password === '') {
      isFormContainError = true;
      formErrorMessages.passwordError = "Password is required"
    } else {
      formErrorMessages.passwordError = ""
    }
    this.setState({
      ...this.state.formErrorMessages,
      isFormContainError,
      formErrorMessages
    })
  }

  render() {
    const { isFormContainError, isSubmitButtonCliked, formErrorMessages } = this.state;
    return (
      <div className="App">
        <h1 style={{ textAlign: "center" }}> React Form </h1>
        <div className="container">
          <div className="row">
            <div className="col-sm-6 offset-sm-3">
              {
                isFormContainError && <>
                  <div className="alert alert-danger" role="alert">
                    This form has error
                </div>
                </>
              }
              {
                !isFormContainError && isSubmitButtonCliked && <>
                  <div className="alert alert-success" role="alert">
                    Login Successfully
                </div>
                </>
              }
              <form className="jumbotron" onSubmit={this.handleFormSubmit} style={{ padding: "2rem" }}>
                <div className="form-group" >
                  <label htmlFor="exampleInputEmail1">Email address</label>
                  <input type="email" className="form-control" name="email" id="exampleInputEmail1" placeholder="Email address"
                    value={this.state.email.trim()} onChange={(e) => (this.handleFormChangeInputValues(e))}
                  />
                  {
                    formErrorMessages.emailError && <small className="form-text text-danger">{formErrorMessages.emailError}</small>
                  }
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <input type="password" className="form-control" name="password" id="exampleInputPassword1" placeholder="Password"
                    value={this.state.password} onChange={(e) => (this.handleFormChangeInputValues(e))}
                  />
                  {
                    formErrorMessages.passwordError && <small className="form-text text-danger">{formErrorMessages.passwordError}</small>
                  }
                </div>
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" name="rememberMe" id="exampleCheck1" checked={this.state.rememberMe} onChange={(e) => this.handleFormChangeInputValues(e)} />
                  <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
                  {
                    formErrorMessages.checkboxError && <small className="form-text text-danger">{formErrorMessages.checkboxError}</small>
                  }
                </div>
                <br />
                <button type="submit" className="btn btn-primary" onClick={() => { this.setState({ isSubmitButtonCliked: true }) }}>Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;

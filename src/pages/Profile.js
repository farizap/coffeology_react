import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
// import material ui
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

// import image
import profileIcon from '../assets/images/profile.png';
import editProfile from '../assets/images/edit-profile.png';
import loading from '../assets/images/loading.gif';

// import store
import { connect } from 'unistore/react';
import actionsProfile from '../store/actionsProfile';
import useStyles from '../store/style';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editProfileView: false,
      editPasswordView: false,
      showPasswordOld: false,
      showPasswordNew: false,
      passwordOld: '',
      passwordNew: '',
    };
    this.name = React.createRef();
    this.bio = React.createRef();
    this.passwordOld = React.createRef();
    this.passwordNew = React.createRef();
    this.retypePasswordNew = React.createRef();
  }

  componentDidMount = () => {
    if (sessionStorage.getItem('token') === null) {
      return <Redirect to={{ pathname: '/login' }} />;
    } else {
      this.props.getProfile();
    }
  };

  componentWillUnmount = () => {
    this.props.setDataUserMe(null);
  };

  // handle show hide modal
  handleChangeView = async (e, state, value) => {
    e.preventDefault();
    await this.setState({ state: value });
  };

  // handle edit name and bio
  handleSubmitProfile = async (e) => {
    e.preventDefault();
    let data = {
      name: this.name.current.value,
      bio: this.bio.current.value,
    };
    await this.props.editProfile(data);
    // if data is not valid
    if (this.props.editProfileStatus) {
      await this.props.getProfile();
      await this.setState({ editProfileView: false });
      await this.props.resetEditProfileStatus();
    }
  };

  // handle edit password user
  handleSubmitPassword = async (e) => {
    e.preventDefault();

    let data = {
      passwordOld: this.state.passwordOld,
      passwordNew: this.state.passwordNew,
    };

    await this.props.editPassword(data);

    // if data is not valid
    if (this.props.changePasswordStatus) {
      await this.props.resetChangePasswordStatus();
      data = {
        email: this.props.userMe.email,
        password: this.state.passwordNew,
      };
      await this.props.login(data);
      await this.props.getProfile();
      await this.setState({
        editPasswordView: false,
        showPasswordOld: false,
        showPasswordNew: false,
      });
    } else {
    }
  };

  // handle logout
  handleLogot = async (e) => {
    e.preventDefault();
    sessionStorage.removeItem('token');
    this.props.setLogin();
    this.props.history.push('/');
  };

  render() {
    if (sessionStorage.getItem('token') === null) {
      return <Redirect to={{ pathname: '/login' }} />;
    }
    // Ade - menghandle page loading dan jika data tidak ada
    else if (this.props.userMe === null) {
      return <img src={loading} alt="loading..." />;
    } else if (this.props.userMe === false) {
      return (
        <div>
          <h3>Data User Tidak Ada, Silahkan Logout Dan Login Kembali</h3>
          <button
            onClick={(e) => this.handleLogot(e)}
            type="button"
            className="btn btn-primary mb-3"
          >
            Keluar
          </button>
        </div>
      );
    }
    // Ade - End
    else {
      return (
        <div className="container profile">
          <h4 className="font-weight-bold">PROFILE</h4>
          <div className="row border login_box">
            <div className="col-12 py-3" align="center">
              <img
                src={profileIcon}
                className="rounded-circle"
                width="100px"
                alt="profileIcon"
              />{' '}
              <br />
              <h4 className="pt-2">
                {this.props.userMe.name}
                <img
                  onClick={(e) => {
                    e.preventDefault();
                    this.setState({ editProfileView: true });
                  }}
                  src={editProfile}
                  alt="altTag"
                  width="20px"
                  className="ml-2"
                ></img>
              </h4>
              <span className="text-justify text-secondary font-italic">{this.props.userMe.bio}</span>
            </div>
            <div
              className="col-6 p-0"
              align="center"
              onClick={(e) => this.props.history.push('/activity')}
            >
              <h5 className='py-3 border rounded text-white  profileinfo'>
                {this.props.userMe.brewCount} <br /> <span>Brew</span>
              </h5>
            </div>
            <div
              className="col-6 p-0"
              align="center"
              onClick={(e) => this.props.history.push('/activity')}
            >
              <h5 className='py-3 border rounded text-white  profileinfo'>
                {this.props.userMe.recipeCount} <br /> <span>Resep</span>
              </h5>
            </div>

            <div className="col-12 my-4">
              <div align="left">
                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  onClick={(e) => {
                    e.preventDefault();
                    this.setState({ editPasswordView: true });
                  }}
                >
                  Ubah Password
                </button>
                <hr></hr>
              </div>
              <div align="left">
                <button
                  onClick={(e) => this.handleLogot(e)}
                  type="button"
                  className="btn btn-primary  btn-block"
                >
                  Keluar
                </button>
              </div>
            </div>
          </div>

          <Modal show={this.state.editProfileView}>
            <Modal.Header>
              <Modal.Title>Edit Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={this.handleSubmitProfile}>
                <Form.Group role="form" controlId="formBasicEmail">
                  <Form.Label>Nama</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={this.props.userMe.name}
                    ref={this.name}
                    defaultValue={this.props.userMe.name}
                    required
                  />
                </Form.Group>
                <Form.Group
                  role="form"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Bio</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder={this.props.userMe.bio}
                    defaultValue={this.props.userMe.bio}
                    ref={this.bio}
                    rows="3"
                    maxLength="250"
                    required
                  />
                </Form.Group>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={(e) => {
                      e.preventDefault();
                      this.setState({ editProfileView: false });
                    }}
                  >
                    Batal
                  </Button>
                  <Button value="Submit" type="submit" variant="primary">
                    Simpan
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal.Body>
          </Modal>

          <Modal show={this.state.editPasswordView}>
            <Modal.Header>
              <Modal.Title>Current Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={this.handleSubmitPassword}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="passwordold"
                  label="Current Password"
                  id="passwordold"
                  type={this.state.showPasswordOld ? 'text' : 'password'}
                  onChange={(e) => {
                    e.preventDefault();
                    this.setState({ passwordOld: e.target.value });
                  }}
                  autoComplete="current-password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={(e) => {
                            e.preventDefault();
                            this.setState({
                              showPasswordOld: !this.state.showPasswordOld,
                            });
                          }}
                          onMouseDown={(e) => e.preventDefault()}
                        >
                          {this.state.showPasswordOld ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />{' '}
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="passwordnew"
                  label="New Password"
                  id="passwordnew"
                  type={this.state.showPasswordNew ? 'text' : 'password'}
                  onChange={(e) => {
                    e.preventDefault();
                    this.setState({ passwordNew: e.target.value });
                  }}
                  autoComplete="current-password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={(e) => {
                            e.preventDefault();
                            this.setState({
                              showPasswordNew: !this.state.showPasswordNew,
                            });
                          }}
                          onMouseDown={(e) => e.preventDefault()}
                        >
                          {this.state.showPasswordNew ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={(e) => {
                      e.preventDefault();
                      this.setState({ editPasswordView: false });
                    }}
                  >
                    Batal
                  </Button>
                  <Button value="Submit" type="submit" variant="primary">
                    Simpan
                  </Button>
                </Modal.Footer>
              </form>
            </Modal.Body>
          </Modal>
        </div>
      );
    }
  }
}

export default connect(
  'userMe, changePasswordStatus, Toast, editProfileStatus',
  actionsProfile,
  useStyles,
)(Profile);

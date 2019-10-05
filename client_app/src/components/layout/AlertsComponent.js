import React from "react";
import { connect } from "react-redux";
import { removeAlert } from "../../actions/alertActions";
import PropTypes from "prop-types";

const AlertsComponent = ({ alerts, removeAlert }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(alert => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
     <span className="float-right" >
      <i className="fas fa-times" id={alert.id} onClick={(e)=>removeAlert(e.target.id)}></i></span>
    </div>
  ));

AlertsComponent.propTypes = {
  alerts: PropTypes.array.isRequired,
  removeAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ alerts: state.alerts });

export default connect(
  mapStateToProps,
  { removeAlert }
)(AlertsComponent);

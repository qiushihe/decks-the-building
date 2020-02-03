import React from "react";
import PropTypes from "prop-types";

class S3Login extends React.PureComponent {
  render() {
    const { value, onChange } = this.props;
    return (
      <div>
        S3 Login:
        <input type="password" value={value} onChange={onChange} />
        <div>
          Login format: <code>access-key@secret-key@region@bucket</code>
        </div>
      </div>
    );
  }
}

S3Login.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func
};

S3Login.defaultProps = {
  value: "",
  onChange: () => {}
};

export default S3Login;

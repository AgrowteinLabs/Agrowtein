import React from 'react';

const HeaderSection = ({ title, breadcrumb }) => {
  const headerStyle = {
    position: 'relative',
    backgroundImage: `url(${require('../assets/images/bg.jpg')})`, // Adjust the path if necessary
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '60vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    textAlign: 'center'
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  };

  const breadcrumbStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  return (
    <div style={headerStyle}>
      <div style={overlayStyle}>
        <h1 className="text-white">{title}</h1>
        <div style={breadcrumbStyle}>
          {breadcrumb.map((item, index) => (
            <React.Fragment key={index}>
              <a href={item.link} className="text-white no-underline"><strong>{item.label}</strong></a>
              {index < breadcrumb.length - 1 && <i className="far fa-circle text-white px-2"></i>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;

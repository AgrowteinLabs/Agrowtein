import React, { useEffect } from 'react';
import 'animate.css/animate.min.css';
import WOW from 'wowjs';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'font-awesome/css/font-awesome.min.css';

// Importing images
import praveenImg from '../assets/images/Praveen e.jpg';
import onesiImg from '../assets/images/Onesi e.jpg';
import mathaiImg from '../assets/images/Mathai e.jpg';
import cjkImg from '../assets/images/CJK e.jpg';
import saathanImg from '../assets/images/Saathan e.jpg';
import rubinImg from '../assets/images/rubin e.jpg';
import ananthiImg from '../assets/images/Ananthi e.jpg';
import jubinImg from '../assets/images/jubin e.jpg';
import abhinavImg from '../assets/images/Abhinav e.jpg';

const Team = () => {
  useEffect(() => {
    new WOW.WOW().init();
  }, []);

  return (
    <div className="container-fluid py-5 wow fadeInUp" data-wow-delay="0.3s">
      <div className="container py-5">
        <div className="section-title text-center position-relative pb-3 mb-5 mx-auto" style={{ maxWidth: '800px' }}>
          <h5 className="fw-bold text-success text-uppercase">Team Members</h5>
          <h1 className="mb-0">Unlocking Business Potential: <br />Our Professional Team Is Ready to Assist</h1>
        </div>
        <div className="row g-5">
          {/* Team member cards */}
          {[
          {
            img: jubinImg, name: 'Jubin Thaj', title: 'Director', description: 'Dynamo of Decision-Making', delay: '0.9s', instagram: 'https://www.instagram.com/jubin.thaj', linkedin: 'https://www.linkedin.com/in/jubin-thaj/'
          },
          {
            img: praveenImg, name: 'Praveen Aloysius', title: 'C E O', description: 'Sultan of Strategy and Success', delay: '0.3s', instagram: 'https://www.instagram.com/praveen_aloysius', linkedin: 'https://www.linkedin.com/in/praveen-aloysius-25a012167/'
          }, 
          {
            img: onesiImg, name: 'Onesimos K K', title: 'C T O', description: 'Chief Troubleshooting Officer', delay: '0.6s', instagram: 'https://www.instagram.com/onesi_mus_', linkedin: 'https://www.linkedin.com/in/onesimos-kunjumon/'
          }, 
          {
            img: mathaiImg, name: 'Mathew Jais', title: 'C O O', description: 'Chief Obstacle Overcomer', delay: '0.6s', instagram: 'https://www.instagram.com/immathewjais', linkedin: 'https://www.linkedin.com/in/mathew-jais-734bab2a8/'
          }, 
          {
            img: cjkImg, name: 'Christin Jose Kuruvila', title: 'C M O', description: 'Wizard of Buzzwords', delay: '0.9s', instagram: 'https://www.instagram.com/_.cjk__', linkedin: 'https://www.linkedin.com/in/christin-jose-kuruvilla-7b95b0169/'
          }, 
          {
            img: saathanImg, name: 'Rethic Jiji', title: 'C I O', description: 'Monarch of Megabytes', delay: '0.9s', instagram: 'https://www.instagram.com/itzz_me_rethic', linkedin: 'https://www.linkedin.com/in/rethic-jiji-798117200/'
          }, 
          {
            img: rubinImg, name: 'Rubin Binu Roy', title: 'C S O', description: 'Guardian of Gateway', delay: '0.9s', instagram: 'https://www.instagram.com/le.radioactive', linkedin: 'https://www.linkedin.com/in/rubinbinuroy902/'
          },
          // {
          //   img: ananthiImg, name: 'Ananthakrishnan R', title: 'Project Manager', description: 'Pioneer of Progress', delay: '0.9s', instagram: '#', linkedin: 'https://www.linkedin.com/in/ananthakrishnan-r/'
          // },
          {
            img: abhinavImg, name: 'Abhinav Bavos', title: 'Design Head', description: 'Captain of Creativity', delay: '0.9s', instagram: 'https://www.instagram.com/ab_bavos', linkedin: 'https://www.linkedin.com/in/abhinav-bavos-727b97278/'
          }].map((member, index) => (
            <div className="col-lg-3 col-md-6 wow slideInUp" data-wow-delay={member.delay} key={index}>
              <div className="team-item bg-light rounded overflow-hidden">
                <div className="team-img position-relative overflow-hidden">
                  <img className="img-fluid w-100" src={member.img} alt={member.name} />
                  <div className="team-social">
                    <a className="btn btn-lg btn-success text-white btn-lg-square rounded" href={member.instagram}><i className="fab fa-instagram fw-normal"></i></a>
                    <a className="btn btn-lg btn-success text-white btn-lg-square rounded" href={member.linkedin}><i className="fab fa-linkedin-in fw-normal"></i></a>
                  </div>
                </div>
                <div className="text-center py-4">
                  <h4 className="text-success">{member.name}</h4>
                  <p className="text-uppercase m-0"><strong>{member.title}</strong> <br />{member.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;

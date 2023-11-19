// import React from 'react';

// export default function About() {
//   return (
//     <div className='py-20 px-4 max-w-6xl mx-auto'>
//       <h1 className='text-3xl font-bold mb-4 text-slate-800'>About Property Plaza</h1>
//       <p className='mb-4 text-slate-700'>Welcome to Property Plaza, where your space dreams come to life! We're not just a real estate platform; we're your companion in finding the perfect spaces for living, working, hosting events, and more.</p>
//       <p className='mb-4 text-slate-700'>
//         Our mission is to simplify the process of discovering and securing ideal spaces. Whether you're seeking the coziest apartment, a secure parking spot, or inspiring spaces for your business, Property Plaza is your guide to a world of possibilities.
//       </p>
//       <p className='mb-4 text-slate-700'>Our dedicated team is committed to providing a seamless and enjoyable experience. We understand that each user has unique requirements, and our platform is designed to cater to a wide range of preferences. Explore Property Plaza and make your next space discovery an exciting and rewarding journey.</p>
//       <p className='mb-4 text-slate-700'>Discover, experience, thrive—Property Plaza is where your space story begins!</p>
//     </div>
//   );
// }
import React from 'react';

export default function About() {
  const styles = {
    aboutContainer: {
      padding: '20px',
      backgroundColor: '#f4f4f4',
      borderRadius: '10px',
      boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
    },
    heading: {
      fontSize: '4rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
      color: '#1e40af', // Blue color
    },
    paragraph: {
      fontSize: '1.5rem',
      marginBottom: '2rem',
      color: '#374151', // Gray color
    },
    boldText: {
      fontSize: '1.8rem',
      fontWeight: 'bold',
      marginBottom: '2rem',
      color: '#374151', // Gray color
    },
    animated: {
      animation: 'fadeInUp 1s ease-in-out',
    },
  };

  return (
    <div style={styles.aboutContainer}>
      <h1 style={styles.heading}>Welcome to Property Plaza</h1>
      <p style={styles.paragraph}>
        Where your space dreams come to life! We're not just a real estate platform; we're your companion in finding the perfect spaces for living, working, hosting events, and more.
      </p>
      <p style={styles.paragraph}>
        Our mission is to simplify the process of discovering and securing ideal spaces. Whether you're seeking the coziest apartment, a secure parking spot, or inspiring spaces for your business, Property Plaza is your guide to a world of possibilities.
      </p>
      <p style={styles.paragraph}>
        Our dedicated team is committed to providing a seamless and enjoyable experience. We understand that each user has unique requirements, and our platform is designed to cater to a wide range of preferences. Explore Property Plaza and make your next space discovery an exciting and rewarding journey.
      </p>
      <p style={{ ...styles.paragraph, ...styles.boldText, ...styles.animated }}>
        Discover, experience, thrive—Property Plaza is where your space story begins!
      </p>
    </div>
  );
}

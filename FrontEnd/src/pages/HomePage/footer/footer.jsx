import React from 'react'
import styles from './footer.module.css' 
import { useEffect } from 'react'



function Footer (){
  useEffect(() => {
    const script = document.createElement('script');
    const script1 =document.createElement('script') ;
    script.type="module" ;
    script.src = 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js';
    script1.src= "https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js" ;
    script.async = true;
    document.body.appendChild(script);
    
    // Cleanup the script on component unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

    return (
        <>
          <footer id="Contact">
            <div className={styles.waves}>
                <div className={styles.wave} id="wave1"></div>
                <div className={styles.wave} id="wave2"></div>
                <div className={styles.wave} id="wave3"></div>
                <div className={styles.wave} id="wave4"></div>

            </div>
            <ul className={styles.social_icons}>
                <li>
                    <a href="https://www.facebook.com/netflixmiddleeastnorthafrica/?brand_redir=475822799216240&locale=fr_FR"><ion-icon name="logo-facebook"></ion-icon></a>
                </li>
                <li>
                    <a href="https://x.com/netflix?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"><ion-icon name="logo-twitter"></ion-icon></a>
                </li>
                <li>
                    <a href="https://www.linkedin.com/company/netflix"><ion-icon name="logo-linkedin"></ion-icon></a>
                </li>
                <li>
                    <a href="https://www.instagram.com/netflix/"><ion-icon name="logo-instagram"></ion-icon></a>
                </li>
                
            </ul>
            <ul className={styles.menu}> 
                <li><a>Home</a></li>
                <li><a>About</a></li>

                <li><a>Services</a></li>

                <li><a>Teams</a></li>

                <li><a>Contact</a></li>


            </ul>
            <p> NetFy | All Rights Reserved</p>



        </footer>

        
        </>
    )
}
export default Footer

import React ,{useState}  from 'react'

import  styles  from './navbar.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';




function Navbar(){
    let initial="A" ; 
    const[isVisible , setIsVisible] = useState(false) ;
    const handleclick=()=>{
        setIsVisible(!isVisible) ;
    };
    const [isListVisible , setIsListVisible] = useState(false) ; 
    const handleMouseEnter=()=>{
        setIsListVisible(true) ;
        

    }
    const handleMouseLeave=()=>{
        setIsListVisible(false) ;
        
    }
    



    
    




    return (
        <>
        
            
                    <ul className={styles.container} > 
                        <ul className={styles.Rlist}>
                        <li className={styles.logoItem} >
                        <a  id="link_title" className={styles.link}>NETFY</a>
                        </li>
                        <li className={styles.navitems} >Home</li>
                        <li  className={styles.navitems}>Series</li>
                        <li className={styles.navitems}>History</li>
                        <li className={styles.navitems}>Liked</li>
                        <li className={styles.navitems}>MyList</li>

                        </ul>
                        
                        
                        <ul className= {styles.Llist}>
                        <li className={styles.inputItem}>

                                          {isVisible && <input type="text" className={styles.inputSearch }></input>}    
                                        <FontAwesomeIcon onClick={()=>{handleclick()}} icon={faMagnifyingGlass} style={{ padding:'0px 20px' ,fontSize: '1.5rem',color: ' rgba(225, 56, 56, 0.778) ' ,textShadow:'0px 0px 5px rgba(255, 255, 255, 0.838)' , cursor:'pointer'}}/> 
                                        

                            </li>
                            <li className={styles.circleItem}>
                                <div className={styles.circleContainer}>
                                        <div className={styles.circle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                                {initial}
                                        </div>

                                </div>
                                       
                                        {isListVisible&&<div className={styles.userinfosContainer}>
                                            <ul className={styles.userinfos}>
                                                <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} > Profile

                                                </li>
                                                <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}> Add another user 

                                                </li>
                                                <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}> sign out

                                                </li>
                                            </ul>

                                        </div>}
                            </li>
                           

                            
                            
                            
                        </ul>   
                            

                            
                        
                        
                        


                    </ul>
                          { /* { 

                            isListVisible? <div className={styles.containerUserinfos} >
                                <ul className={styles.userinfos}>
                                    <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} > Profile

                                    </li>
                                    <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}> Add another user 

                                    </li>
                                    <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}> sign out

                                    </li>
                                </ul>

                          </div>
                          :
                          <div className={styles.containerUserinfos} style={{visibility:"hidden"}} >
                                <ul className={styles.userinfos}>
                                    <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} > Profile

                                    </li>
                                    <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}> Add another user 

                                    </li>
                                    <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}> sign out

                                    </li>
                                </ul>

                          </div>

                           } */
}
                           
                   
                    
                
      

            
            
            
            
        
        
        
        </>
    )
}
export default Navbar 
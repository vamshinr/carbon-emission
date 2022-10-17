import {FaRegCopyright} from 'react-icons/fa';
export default function FooterApp(){
    return(
        <div id="footer" style={{backgroundColor:'#022e22', height:'55px', color:'#fff', bottom: 0}}> 
            <div style={{padding:'15px'}}>
            <span style={{padding: '15px', paddingLeft:'8px'}}><FaRegCopyright /> Team-4</span>
            <span ><a href="https://community.vendia.net/c/support-share/6" style={{color:'#fff', float:'right'}}>Vendia Community Support</a></span>
            <span><a href="https://community.vendia.net/t/sac-state-ux-test-razer-keyboard-raffle/43" style={{color:'#fff' , paddingRight:'25px', float:'right' }}> Vendia tutorial</a></span>
            </div>
        </div>
    );
}
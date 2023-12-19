import '../Styles/tbd.css';
import Button from 'react-bootstrap/Button';

const TBD = () => {
    return (
        <>
            
            <div className='TBD_Container'> 
                <div> 
                    <p id='UMText'>Under Maintenance... Coming Soon!</p>
                </div>
                <div> 
                    <p id='issuesText'>We are currently facing some issues with our system and our team is working hard to resolve it. You can subscribe to our mailing list if you want to get notified.</p>
                </div>
                <br/>
                <div className='TBD_General'>
                        <label> <input type="text" name="name" placeholder='Email' required/></label>
                </div>

                <br/>
                <div className='TBD_General'> 
                    <Button variant="dark">Subscribe</Button>
                </div>
            </div>
        </>
    )
}

export default TBD;